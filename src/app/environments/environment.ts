/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  DDQparseServerURL: 'https://parse.ddq.nl/parse',
  DDQparseDSMJSKey: 'hEH22V1339sNBNu8HGdHzKsU5iAHSrTqKA3ZIsCde',
  DDQparseDSMAppId: 'iiNtsbeC8qZfzX243hZFUiV03bcGBkiBXtRMIZGG',
  DDQparseMOBISKey: '15Inx8rIAqZGhlEDNixoNHb8X8KioVg4DuMX7Bk7E',
  DDQparseMOBISAppId: '5yHaDCnG17ySDKKQ0BqL13eWOMoygILWmwnYjDbuDOE',
  Back4AppAPIURL: 'https://parseapi.back4app.com',
  Back4AppSpecificURL: 'https://parseapi.back4app.com/classes/Test',
  Back4AppJSKey: '0BRb0a2x57VjB4FV11nJZ37vTDuHHda74u2JS6yJ',
  Back4AppAppId: '3z7ETB9kJIjTNdligGBnGPfWRh4dMtUCbxpvDNSd',

  //COPIED PROD values to test issue with capacitor
  firebase: {
    projectId: 'mobisapp-prod',
    appId: '1:1090658128897:web:2d91733ed9e7b992a2dc00',
    storageBucket: 'mobisapp-prod.appspot.com',
    //locationId: 'europe-west',
    apiKey: 'AIzaSyDmgEw1MaPmTWyiFhlrywo5um8x_3Py-no',
    authDomain: 'mobisapp-prod.firebaseapp.com',
    messagingSenderId: '1090658128897',
  }

  //DEV VALUES
  // firebase: {
  //   projectId: 'mobisapp-dev',
  //   appId: '1:898286986083:web:ed0ad74a2e48623edf2956',
  //   storageBucket: 'mobisapp-dev.appspot.com',
  //   //locationId: 'europe-west',
  //   apiKey: 'AIzaSyBGVeTDnHDx_WSHZXiynNI8QnvNQXfkmxc',
  //   authDomain: 'mobisapp-dev.firebaseapp.com',
  //   messagingSenderId: '898286986083',
  // },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
