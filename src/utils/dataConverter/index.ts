import { SORT_BY_KEYS } from "../../constants";

export const convertPayload = (payload: string) => {
    const payloadUnit = payload.slice(-2);
    const payloadValue = payload.slice(0, -2);
    return [+payloadValue, payloadUnit]
}

export const sortTruckList = (data, sortBy) => {
    if (sortBy == SORT_BY_KEYS.NAME_ASC) {
        data.sort((item1, item2) => {
            return item1.driver >= item2.driver ? 1 : -1;
        });
    }
    if (sortBy == SORT_BY_KEYS.NAME_DESC) {
        data.sort((item1, item2) => {
            return item1.driver > item2.driver ? -1 : 1;
        });
    }
    if (sortBy == SORT_BY_KEYS.PAYLOAD_ASC) {
        data.sort((item1, item2) => {
            return item1.payloadValue - item2.payloadValue;
        });
    }
    if (sortBy == SORT_BY_KEYS.PAYLOAD_DESC) {
        data.sort((item1, item2) => {
            return item2.payloadValue - item1.payloadValue;
        });
    }
    return [...data];
}