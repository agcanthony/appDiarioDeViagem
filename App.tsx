import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'reflect-metadata';
import { Splash } from 'screens/Splash';
import { Routes } from './src/routes';
import * as SplashScreen from 'expo-splash-screen';

LogBox.ignoreLogs([
  'Failed prop type:',
  'Key "cancelled" in the image picker',
  'Require cycle: src\\core\\database\\models',
]);

void SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  return (
    <Splash>
      <RootSiblingParent>
        <Routes />
      </RootSiblingParent>
    </Splash>
  );
}
