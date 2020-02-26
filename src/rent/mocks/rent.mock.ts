export default () => ({
    findAll: async () => (
        [
            {
                "id": 1,
                "from_date": "2021-06-07T00:00:00.000Z",
                "to_date": "2021-06-09T00:00:00.000Z",
                "total": 0,
                "item_id": 1,
                "user_id": 1,
                "status": "rented",
                "createdAt": "2020-02-26T14:47:16.000Z",
                "updatedAt": "2020-02-26T14:47:16.000Z"
            },
            {
                "id": 2,
                "from_date": "2021-06-07T00:00:00.000Z",
                "to_date": "2021-06-09T00:00:00.000Z",
                "total": 0,
                "item_id": 1,
                "user_id": 1,
                "status": "rented",
                "createdAt": "2020-02-26T14:47:17.000Z",
                "updatedAt": "2020-02-26T14:47:17.000Z"
            },
            {
                "id": 3,
                "from_date": "2021-06-07T00:00:00.000Z",
                "to_date": "2021-06-09T00:00:00.000Z",
                "total": 0,
                "item_id": 1,
                "user_id": 1,
                "status": "rented",
                "createdAt": "2020-02-26T14:47:17.000Z",
                "updatedAt": "2020-02-26T14:47:17.000Z"
            }
        ]
    ),
    findByPk: async () => ({
        "id": 3,
        "from_date": "2021-06-07T00:00:00.000Z",
        "to_date": "2021-06-09T00:00:00.000Z",
        "total": 0,
        "item_id": 1,
        "user_id": 1,
        "status": "rented",
        "createdAt": "2020-02-26T14:47:17.000Z",
        "updatedAt": "2020-02-26T14:47:17.000Z"
    }),
    build: async () => ({
        "item_id": 2,
        "user_id": 1,
        "from_date": "2021-06-07"
    }),
    save: () => ({
        "id": 6,
        "name": "Rhianna DuBuque",
        "price": 456789,
        "amount": 56,
        "updatedAt": "2020-02-26T14:27:31.815Z",
        "createdAt": "2020-02-26T14:27:31.815Z"
    })
})
