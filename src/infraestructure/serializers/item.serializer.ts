import { Item } from "../adapters/models/item.model";

export const itemSerializer = (items: Item | Item[]) => {

    if (Array.isArray(items)) {
        return items.map(item => serializer(item))
    }

    return serializer(items);
}

const serializer = (item: Item) => {
    const fields = [
        'id',
        'name',
        'price',
        'amount',
        'rent'
    ];

    let serialized = {};

    fields.map(field => (item[field] ? serialized[field] = item[field] : null));

    return serialized;
}