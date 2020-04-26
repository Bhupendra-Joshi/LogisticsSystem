import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import CustomImage from '../components/CustomImage';
import { Navigation } from 'react-native-navigation';
import { loginRoot } from '../../navigation'
import LocalStorage from '../../utils/localStorage';
import { USER_TOKEN } from '../../utils/localStorage/constants';
import CustomTouchableOpacity from '../components/CustomTouchableOpacity';
import CustomText from '../components/CustomText';
import { logout } from '../../store/actions/user';

const UserProfile = (props) => {
    const {
        logout
    } = props;

    const logoutUser = () => {
        LocalStorage.removeItem(USER_TOKEN);
        Navigation.setRoot(loginRoot);
        logout();
    }

    return (
        <View style={styles.container}>
            <CustomImage
                style={styles.image}
                source={require('../../assets/images/profile/userProfile.png')} />

            <CustomTouchableOpacity
                onPress={logoutUser}
                style={styles.logoutButton}
            >
                <CustomText style={styles.logout}>LOGOUT</CustomText>
            </CustomTouchableOpacity>
        </View>
    );
};

UserProfile.options = {
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
        width: 100,
        height: 100,
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'cyan',
        borderRadius: 25,
        marginTop: 100,
    },
    logout: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        paddingVertical: 10,
    }

});


const mapStateToProps = state => ({
    data: state.userData.data,
});

const mapDispatchProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchProps)(UserProfile);
