export const ENV = {
     production: false,
     parseAppId: 'PARSE APP HERE',
     parseServerUrl: 'PARSE URL HERE',
     parseJSKey: 'parseJSKey here',
     fileKey: 'parsefileKey here',
     plantnetKey: 'plantnetKey here'
 }


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'mobisapp-prod',
    appId: 'firebase app id',
    storageBucket: 'xx-prod.appspot.com',
    //locationId: 'europe-west',
    apiKey: 'xxx-no',
    authDomain: 'xxxm',
    messagingSenderId: 'xxx',
  },

  production: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
