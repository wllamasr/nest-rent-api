import { Rent } from "../adapters/models/rent.model";

export const rentSerializer = (rents: Rent | Rent[]) => {

    if (Array.isArray(rents)) {
        return rents.map(rent => serializer(rent))
    }

    return serializer(rents);
}

const serializer = (rent: Rent) => {
    const fields = [
        'id',
        'fromDate',
        'toDate',
        'userId',
        'itemId',
        'total',
        'status',
        'toPay',
        'item',
        'user'
    ];

    let serialized = {};

    fields.map(field => (rent[field] ? serialized[field] = rent[field] : null));

    return serialized;
}