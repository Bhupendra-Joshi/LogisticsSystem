const commonHeaders = {

}

const fetchRequest = (
    url: string,
    options?: any
) => {
    const {
        method = "GET",
        headers = {},
        payload,
        onSuccess,
        onFailure,
    } = options || {};

    const requestOptions = {
        method,
        headers: { ...commonHeaders, ...headers },
        body: payload && JSON.stringify(payload)
    }

    if (url == 'login') {
        onSuccess({
            "id": "1123",
            "email": "test@coalshasta.com",
            "mobile": "7021966405",
            "password": "12345678",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4"
        });
    } else if (url == 'trucks') {
        onSuccess([
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
        ]);
    } else {
        fetch(url, requestOptions)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json()
                        .then(data => { onSuccess && onSuccess(data) })
                        .catch(error => { onFailure && onFailure(error) })
                } else {
                    onFailure && onFailure("Something went wrong!!");
                }
            }
            ).catch(error => {
                onFailure && onFailure(error);
            });
    }
}

export default fetchRequest;