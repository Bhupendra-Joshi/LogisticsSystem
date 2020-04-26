import { Navigation } from "react-native-navigation";
import navigation from './src/navigation';

Navigation.events().registerAppLaunchedListener(navigation);


