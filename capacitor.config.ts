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
      androidClientId: '778522712103-tqkc468qermr7hvbqsmm2p2ueglcmjsi.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
