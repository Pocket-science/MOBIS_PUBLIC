import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  UserCredential,
  sendPasswordResetEmail,
  signInWithCredential,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';
import { signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { OAuthProvider } from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NonceService } from './nonce.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = null;

  constructor(
    private afAuth: Auth,
    private platform: Platform,
    private nonceService: NonceService
  ) {
    //subscribe to user auth state in case user logs out or in somewhere
    //might want to change this to use user from angular/fire to also respond to token changes or logout from fb side
    this.afAuth.onAuthStateChanged((userState) => {
      this.user = userState;
    });
    this.initializeApp();
  }

  //get uid as promise for use in user data queries (to make sure uid is guaranteed before the query fires)
  getCurrentUserId() {
    return new Promise<string>((resolve, reject) => {
      try {
        const unsubscribe = this.afAuth.onAuthStateChanged((user) => {
          if (user !== null) {
            unsubscribe(); //unsubscribe to changes, so effectively you get a snapshot of current user (id)
            resolve(user.uid); //can also be just the user, but then you always need to extract uid in your code
          } else {
            resolve(null);
          }
        });
      } catch {
        reject(null);
      }
    });
  }

  //Hash function for nonce
  async sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  //initialization of web for google auth plugin
  initializeApp() {
    //should only run on web, not needed on native
    if (!this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        GoogleAuth.initialize({
          clientId:
          '1090658128897-uqpp3egk2v7d0errt8crl220e6tltblq.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: false,
        });
      });
    }
  }

  //firebase email/password actions
  async register({ name, email, password }) {
    console.log('received name', name);
    try {
      const loggedInUser = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      await this.sendVerificationMail();
      await this.updateUserName(name);
      return loggedInUser;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      console.log(this.user);
      return loggedInUser;
    } catch (e) {
      return null;
    }
  }

  async updateUserName(name: string) {
    await updateProfile(this.afAuth.currentUser, { displayName: name });
  }

  async updatePhotoURL(photoURL: string) {
    await updateProfile(this.afAuth.currentUser, { photoURL });
  }


  async sendPasswordResetEmail(email) {
    console.log('resetting password for email', email);
    try {
      sendPasswordResetEmail(this.afAuth, email).then();
    } catch (e) {
      return null;
    }
  }

  async sendVerificationMail() {
    console.log('sending verification email');
    await sendEmailVerification(this.afAuth.currentUser);
  }

  async anonymousLogin() {
    const anonymousUser = await signInAnonymously(this.afAuth);
    console.log('anonymous login', anonymousUser);
    return anonymousUser;
  }

  //Google Authentication
  async loginWithGoogle() {
    let loggedInUser = null;
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope('email');

    if (this.platform.is('desktop')) {
      console.log('Google Desktop login');
      loggedInUser = signInWithPopup(this.afAuth, new GoogleAuthProvider());
    } else {
      //sign in with credential
      console.log('Google Native login');
      const googleUser = await GoogleAuth.signIn();
      const googleOAuthProvider = new OAuthProvider('google.com');
      //allow user to select his google account (if there are more)
      googleOAuthProvider.setCustomParameters({
        prompt: 'select_account',
      });
      const credential = googleOAuthProvider.credential({
        idToken: googleUser.authentication.idToken,
      });
      console.log('credential', credential);
      await signInWithCredential(this.afAuth, credential).then(
        (signedInUser) => {
          loggedInUser = signedInUser;
        }
      );
      console.log(loggedInUser);
    }
    return loggedInUser;
  }

  //Apple Authentication, check platform and switch between web and native
  loginWithApple() {
    let loggedInUser = null;
    console.log(this.platform.platforms());

    if (this.platform.is('ios')) {
      //
      loggedInUser = this.loginWithAppleNative();
    } else {
      loggedInUser = this.loginWithAppleWeb();
    }
    return loggedInUser;
  }

  //see below for native, signinwithpopup doesn't work on native
  loginWithAppleWeb() {
    console.log('Apple Web login');
    const provider = new OAuthProvider('apple.com');
    const loggedInUser = signInWithPopup(this.afAuth, provider).then(
      (result: UserCredential) => {
        console.log(result);
      }
    );
    return loggedInUser;
  }

  // Apple native log in. First log in with Apple/ios (works)
  // Then grab the token and log in to firebase.
  async loginWithAppleNative() {
    console.log('Apple Native login');
    let loggedInUser = null;
    const nonce = this.nonceService.generateNonce();
    const hashedNonceHex = await this.sha256(nonce); // see next function
    const options: SignInWithAppleOptions = {
      clientId: 'nl.ddq.blackholefinder',
      redirectURI: 'https://www.ddq.nl',
      scopes: 'email, name',
      state: '123456',
      nonce: hashedNonceHex,
    };
    const appleUser: SignInWithAppleResponse = await SignInWithApple.authorize(options);
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({idToken: appleUser.response.identityToken, rawNonce: nonce});
    await signInWithCredential(this.afAuth, credential).then(
      (signedInUser) => {
        loggedInUser = signedInUser;
      }
    );
    return loggedInUser;
  }

  logout() {
    return signOut(this.afAuth);
  }

  deleteAccount(){
    return this.afAuth.currentUser.delete();
  }
}
