import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';

interface TruckListItemProps {
    truck: {
        id: number,
        driver: string,
        truck_number: string,
        status: string,
        max_payload: string
    };
    onItemClick?: () => void;
}

const TruckListItem = (props: TruckListItemProps) => {
    const {
        truck,
        onItemClick
    } = props;

    return (
        <CustomTouchableOpacity
            style={styles.container}
            onPress={onItemClick}
        >
            <View style={styles.detailsContainer}>
                <CustomText style={styles.truckNumber}>
                    {truck.truck_number}
                </CustomText>
                <CustomText style={styles.driver}>
                    {truck.driver}
                </CustomText>
                <CustomText style={styles.status}>
                    Status : {truck.status.toUpperCase()}
                </CustomText>
            </View>
            <View style={styles.maxPayloadContainer}>
                <CustomText style={styles.maxPayload}>
                    {truck.max_payload}
                </CustomText>
            </View>
        </CustomTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailsContainer: {
        flex: 1,
    },
    truckNumber: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    driver: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 12,
    },
    maxPayloadContainer: {
        flex: 0.4,
        borderRadius: 15,
        backgroundColor: '#ffff00',
        justifyContent: 'center',
        borderWidth: 1
    },
    maxPayload: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default TruckListItem