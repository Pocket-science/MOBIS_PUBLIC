import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.ddq.mobisapp',
  appName: 'mobisapp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: '778522712103-put key here.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
