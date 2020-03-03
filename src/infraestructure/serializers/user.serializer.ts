import { User } from "../adapters/models/user.model";

export const userSerializer = (user: User) => {

    const fields = [
        'id',
        'address',
        'name',
        'email',
        'rol',
        'phone'
    ];

    let serialized = {};

    fields.map(field => (serialized[field] = user[field]));

    return serialized;
}