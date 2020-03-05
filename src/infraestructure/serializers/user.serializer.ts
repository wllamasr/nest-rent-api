import { User } from "../adapters/models/user.model";

export const userSerializer = (users: User | User[]) => {

    if (Array.isArray(users)) {
        return users.map(user => serializer(user))
    }

    return serializer(users);
}

const serializer = (user: User) => {
    const fields = [
        'id',
        'address',
        'name',
        'email',
        'phone',
        'dni'
    ];

    let serialized = {};

    fields.map(field => (serialized[field] = user[field]));

    return serialized;
}