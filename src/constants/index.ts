export const TRUCK_STATUS = {
    EMPTY: 'empty',
    ON_ROAD: 'on_road'
}

export const SORT_BY_KEYS = {
    NAME_ASC: "NAME_ASC",
    NAME_DESC: "NAME_DESC",
    PAYLOAD_ASC: "PAYLOAD_ASC",
    PAYLOAD_DESC: "PAYLOAD_DESC"
}

export const SORT_OPTIONS = [
    {
        key: SORT_BY_KEYS.NAME_ASC,
        label: "Name (Ascending)"
    },
    {
        key: SORT_BY_KEYS.NAME_DESC,
        label: "Name (Descending)"
    },
    {
        key: SORT_BY_KEYS.PAYLOAD_ASC,
        label: "Payload (Ascending)"
    },
    {
        key: SORT_BY_KEYS.PAYLOAD_DESC,
        label: "Payload (Descending)"
    },
]

export const STATUS_FILTER_OPTIONS = [
    {
        key: "ALL",
        label: "All"
    },
    {
        key: TRUCK_STATUS.EMPTY,
        label: "Empty"
    },
    {
        key: TRUCK_STATUS.ON_ROAD,
        label: "On Road"
    },
]