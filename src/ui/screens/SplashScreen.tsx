import React, {
    useEffect,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import CustomImage from '../components/CustomImage';
import { Navigation } from 'react-native-navigation';
import { mainRoot, loginRoot } from '../../navigation'
import { getFromLocalStorage } from '../../utils/localStorage';
import { USER_TOKEN } from '../../utils/localStorage/constants';

const SplashScreen = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            getFromLocalStorage(USER_TOKEN)
                .then((token: string) => {
                    Navigation.setRoot(token ? mainRoot : loginRoot)
                })
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <View style={styles.container}>
            <CustomImage
                style={styles.image}
                source={require('../../assets/images/splash.png')}
            />
        </View>
    );
};

SplashScreen.options = {
    topBar: {
        visible: false,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    }

});

export default SplashScreen;
