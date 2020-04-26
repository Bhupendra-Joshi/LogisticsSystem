import { Navigation } from "react-native-navigation";
import LoginScreen from "../ui/screens/LoginScreen";
import TrucksListScreen from "../ui/screens/TrucksListScreen";
import { Provider } from 'react-redux';
import store from "../store";
import { getFromLocalStorage } from '../utils/localStorage'

import {
    LOGIN_SCREEN,
    TRUCKS_LIST_SCREEN,
    SPLASH_SCREEN,
    DELIVERY_DETAILS,
    USER_PROFILE
} from "./constants";
import { USER_TOKEN } from "../utils/localStorage/constants";
import SplashScreen from "../ui/screens/SplashScreen";
import DeliveryDetails from "../ui/screens/DeliveryDetails";
import UserProfile from "../ui/screens/UserProfile";

Navigation.registerComponent(SPLASH_SCREEN, () => SplashScreen);
Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store);
Navigation.registerComponentWithRedux(TRUCKS_LIST_SCREEN, () => TrucksListScreen, Provider, store);
Navigation.registerComponentWithRedux(DELIVERY_DETAILS, () => DeliveryDetails, Provider, store);
Navigation.registerComponentWithRedux(USER_PROFILE, () => UserProfile, Provider, store);

export const splashRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        id: SPLASH_SCREEN,
                        name: SPLASH_SCREEN,
                    }

                }
            ]
        }
    }
}

export const loginRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        id: LOGIN_SCREEN,
                        name: LOGIN_SCREEN,
                    }

                }
            ]
        }
    }
}

export const mainRoot = {
    root: {
        bottomTabs: {
            id: 'BOTTOM_TABS',
            children: [
                {
                    stack: {
                        id: 'HOME_TAB',
                        children: [
                            {
                                component: {
                                    id: TRUCKS_LIST_SCREEN,
                                    name: TRUCKS_LIST_SCREEN,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/truck/truck.png'),
                                selectedIcon: require('../assets/images/truck/truckSelected.png')
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'DETAILS_TAB',
                        children: [
                            {
                                component: {
                                    id: DELIVERY_DETAILS,
                                    name: DELIVERY_DETAILS,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/pie/pie.png'),
                                selectedIcon: require('../assets/images/pie/pieSelected.png')
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'PROFILE_TAB',
                        children: [
                            {
                                component: {
                                    id: USER_PROFILE,
                                    name: USER_PROFILE,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/profile/profile.png'),
                                selectedIcon: require('../assets/images/profile/profileSelected.png')
                            }
                        }
                    }
                }
            ]

        }
    }
}

getFromLocalStorage(USER_TOKEN)

export default () => {
    Navigation.setRoot(splashRoot);
}


