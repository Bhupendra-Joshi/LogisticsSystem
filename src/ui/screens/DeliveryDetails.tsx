import React, {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux'

import CustomText from '../components/CustomText';
import PieChart from '../components/PieChart';
import { TRUCK_STATUS } from '../../constants';
import { DELIVERED_PAYLOAD_COLOR, REMAINING_PAYLOAD_COLOR } from '../../constants/colors';
import CustomFlatList from '../components/CustomFlatList';
import TruckListItem from '../components/TruckListItem';
import CustomScrollView from '../components/CustomScrollView';

const width = Dimensions.get('window').width - 100;
const TOTAL_REQUIRED = 100;

const getPieChartColor = (truckData) => {
    let emptyTruckAvailable = false;
    const itemDelivered = truckData.reduce(
        (total, item) => {
            if (item.status == TRUCK_STATUS.ON_ROAD) {
                return total + item.payloadValue
            } else if (item.status == TRUCK_STATUS.EMPTY) {
                emptyTruckAvailable = true;
            }
            return total;
        }, 0);

    const percentDelivered = itemDelivered / TOTAL_REQUIRED * 100;
    return {
        delivered: itemDelivered,
        sections: [
            {
                percentage: percentDelivered,
                color: DELIVERED_PAYLOAD_COLOR
            },
            {
                percentage: 100 - itemDelivered,
                color: REMAINING_PAYLOAD_COLOR,
            }
        ],
        emptyTruckAvailable,
    }
}
const DeliveryDetails = (props) => {
    const {
        data,
        isLoading,
    } = props;

    const [pieChartData, setPieChartData] = useState(getPieChartColor(data));

    useEffect(() => {
        setPieChartData(getPieChartColor(data));
    }, [data]);

    return (
        <CustomScrollView style={styles.container}>
            {
                (isLoading && data.length == 0)
                    ? <ActivityIndicator
                        size={'large'}
                    />
                    :
                    <View>
                        <View style={styles.pieChartContainer}>
                            <PieChart
                                radius={(width / 2 - 30)}
                                sections={pieChartData.sections}
                                strokeCap={'round'}
                                innerRadius={(width / 2 - 30) / 1.5}
                            />
                        </View>
                        <View style={styles.colorDetails}>
                            <View style={styles.colorRow}>
                                <View style={styles.colorBox(DELIVERED_PAYLOAD_COLOR)} />
                                <CustomText>
                                    Payload delivered/on road ({pieChartData.delivered})
                                </CustomText>
                            </View>
                            <View style={styles.colorRow}>
                                <View style={styles.colorBox(REMAINING_PAYLOAD_COLOR)} />
                                <CustomText>
                                    Payload remaining ({TOTAL_REQUIRED - pieChartData.delivered})
                                </CustomText>
                            </View>
                        </View>
                        {
                            pieChartData.emptyTruckAvailable
                                ? <View>
                                    <CustomText style={styles.availableTrucksLabel}>
                                        Available Trucks
                                    </CustomText>
                                    <CustomFlatList
                                        data={data}
                                        keyExtractor={item => item.id + ''}
                                        ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                                        renderItem={({ item }) => {
                                            if (item.status == TRUCK_STATUS.EMPTY) {
                                                return (<TruckListItem truck={item} />);
                                            } else {
                                                return null;
                                            }
                                        }}
                                    />
                                </View>
                                : null
                        }
                    </View>
            }
        </CustomScrollView>
    );
};

DeliveryDetails.options = {
    topBar: {
        title: {
            text: 'Delivery Details'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    pieChartContainer: {
        alignItems: 'center',
    },
    colorDetails: {
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    colorBox: (color: string) => ({
        height: 20,
        width: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: color,
        marginEnd: 10,
    }),
    availableTrucksLabel: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#0000ff66',
        marginHorizontal: 20
    }
});



const mapStateToProps = state => ({
    isLoading: state.trucksData.isLoading,
    data: state.trucksData.data,
    error: state.trucksData.error,
});


export default connect(mapStateToProps)(DeliveryDetails);
