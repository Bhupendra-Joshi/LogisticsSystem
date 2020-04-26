import {
    FETCH_TRUCKS_START,
    FETCH_TRUCKS_SUCCESS,
    FETCH_TRUCKS_FAILURE,
} from '../constants';
import fetchRequest from '../../utils/network';
import { convertPayload } from '../../utils/dataConverter';

const fetchTrucksListStart = () => ({
    type: FETCH_TRUCKS_START,
})

const fetchTrucksListSuccess = (data) => ({
    type: FETCH_TRUCKS_SUCCESS,
    data,
})

const fetchTrucksListFailure = (error: string) => ({
    type: FETCH_TRUCKS_FAILURE,
    error
})

export const fetchTrucksList = () => dispatch => {
    dispatch(fetchTrucksListStart());
    setTimeout(() => {
        const response = [
            {
                "id": 1,
                "driver": "Shashank Ohja",
                "truck_number": "KA05B2578",
                "status": "empty",
                "max_payload": "40mt"
            },
            {
                "id": 2,
                "driver": "Sumit Gupta",
                "truck_number": "KA05B3338",
                "status": "on_road",
                "max_payload": "30mt"
            },
            {
                "id": 3,
                "driver": "Manish Sinha",
                "truck_number": "KA05B1001",
                "status": "empty",
                "max_payload": "20mt"
            },
            {
                "id": 4,
                "driver": "Rohan Sharma",
                "truck_number": "KA05B1785",
                "status": "empty",
                "max_payload": "10mt"
            },
        ];
        const data = response.map(item => {
            const [payloadValue, payloadUnit] = convertPayload(item.max_payload);
            return {
                ...item,
                payloadValue,
                payloadUnit
            }
        })
        dispatch(fetchTrucksListSuccess(data));
    }, 1000);
}