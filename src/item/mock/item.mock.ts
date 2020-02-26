export default () => ({
    findAll: async () => (
        [
            {
                "id": 1,
                "name": "Billie Bergnaum",
                "price": 456789,
                "amount": 3,
                "createdAt": "2020-02-26T13:30:07.000Z",
                "updatedAt": "2020-02-26T13:30:07.000Z"
            },
            {
                "id": 2,
                "name": "Sofia Balistreri",
                "price": 456789,
                "amount": 56,
                "createdAt": "2020-02-26T14:27:25.000Z",
                "updatedAt": "2020-02-26T14:27:25.000Z"
            }, {
                "id": 3,
                "name": "Eleonore Deckow",
                "price": 456789,
                "amount": 56,
                "createdAt": "2020-02-26T14:27:26.000Z",
                "updatedAt": "2020-02-26T14:27:26.000Z"
            }
        ]
    ),
    findByPk: async () => ({
        "id": 1,
        "name": "Billie Bergnaum",
        "price": 456789,
        "amount": 3,
        "createdAt": "2020-02-26T13:30:07.000Z",
        "updatedAt": "2020-02-26T13:30:07.000Z"
    }),
    build: async () => ({
        "name": "Rhianna DuBuque",
        "price": 456789,
        "amount": 56,
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
