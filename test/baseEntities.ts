import moment from 'moment';

moment.defaultFormat = 'YYYY-MM-DD';

export const userBase = {
    id: null,
    name: "test",
    email: "test@test.com",
    password: "test",
    address: "test",
    dni: "12345",
    phone: "123456789"
};

export const itemBase = {
    id: null,
    name: "ITEM",
    price: 100,
    amount: 2
};

export const rentBase = (item, user) => ({
    id: null,
    itemId: item || 0,
    userId: user || 0,
    fromDate: `${moment().subtract(5, 'days').format()}`,
    toDate: `${moment().format()}`
})