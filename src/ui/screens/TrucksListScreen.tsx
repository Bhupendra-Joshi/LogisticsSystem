import React, {
    useEffect,
    useState,
} from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import { fetchTrucksList } from '../../store/actions/trucks';
import CustomFlatList from '../components/CustomFlatList';
import TruckListItem from '../components/TruckListItem';
import CustomDropDown from '../components/CustomDropDown';
import { SORT_OPTIONS, STATUS_FILTER_OPTIONS } from '../../constants';
import { sortTruckList } from '../../utils/dataConverter';
import CustomText from '../components/CustomText';


const TrucksListScreen = (props) => {
    const {
        fetchTrucksList,
        data,
        isLoading,
        error,
    } = props;

    const [isRefreshing, setRefreshing] = useState(false);

    const [filterSelected, setFilterSelected] = useState(null);
    const [sortBySelected, setSortBySelected] = useState(null);

    const [finalList, setFinalList] = useState(data);
    const getData = () => {
        fetchTrucksList();
    }
    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        setFinalList(data);
    }, [data]);

    useEffect(() => {
        let result = data;
        if (filterSelected && filterSelected.key != "ALL") {
            result = data.filter(item => item.status == filterSelected.key);
        }
        if (sortBySelected) {
            result = sortTruckList(result, sortBySelected.key);
        }
        setFinalList(result)
    }, [data, filterSelected, sortBySelected]);

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <CustomDropDown
                    title={sortBySelected ? sortBySelected.label : 'Sort by'}
                    options={SORT_OPTIONS}
                    onOptionSelected={setSortBySelected}
                />
                <CustomDropDown
                    title={filterSelected ? filterSelected.label : 'Filter'}
                    options={STATUS_FILTER_OPTIONS}
                    onOptionSelected={setFilterSelected}
                />

            </View>
            <View style={styles.subContainer}>
                {
                    (isLoading && data.length == 0)
                        ? <ActivityIndicator
                            size={'large'}
                        />
                        : (finalList.length > 0)
                            ? <CustomFlatList
                                refreshing={isLoading && isRefreshing}
                                data={finalList}
                                keyExtractor={item => item.id + ''}
                                onRefresh={() => {
                                    setRefreshing(true);
                                    getData()
                                }}
                                renderItem={({ item }) =>
                                    <TruckListItem truck={item} />
                                }
                                ItemSeparatorComponent={() => (<View style={styles.separator} />)}

                            />
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <CustomText style={{ textAlign: 'center', fontSize: 20 }}>
                                    No truck matches selected criteria.
                                </CustomText>
                            </View>
                }
            </View>
        </View>
    );
};

TrucksListScreen.options = {
    topBar: {
        title: {
            text: 'Truck List'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#0000ff66',
        marginHorizontal: 20,
    }
});

const mapStateToProps = state => ({
    isLoading: state.trucksData.isLoading,
    data: state.trucksData.data,
    error: state.trucksData.error,
});

const mapDispatchToProps = {
    fetchTrucksList,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrucksListScreen);
