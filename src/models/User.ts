import { Schema, model, Model, connection } from 'mongoose';

type Type = {
    name: string,
    email: string,
    state: string,
    passwordHash: string,
    token: string
}

const schema = new Schema<Type>({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String
})

const modelName = 'User';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<Type>
:
    model<Type>(modelName, schema);