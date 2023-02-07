import { Injectable } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import { deleteField, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { ref, uploadString, getDownloadURL, Storage, deleteObject } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private afAuth: Auth, private firestore: Firestore, private storage: Storage) { }

  getAvatar() {
    const user = this.afAuth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const result = docData(userDocRef, { idField: 'id' });
    return result;
  }


  async updatePhotoURL(photoURL: string) {
    await updateProfile(this.afAuth.currentUser, { photoURL });
  }

  removeImage(){
    const user = this.afAuth.currentUser;
    //delete the reference to the image in Firestore Database
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    updateDoc(userDocRef, { imageUrl: deleteField() });
    //delete the actual image in Storage
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
    deleteObject(storageRef);
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.afAuth.currentUser;
    //console.log(user);
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl
      });
      console.log(imageUrl);
      await this.updatePhotoURL(imageUrl);
      return true;
    } catch (e) {
      return null;
    }
  }
}
