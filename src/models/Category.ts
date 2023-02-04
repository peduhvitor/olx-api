import { Schema, model, Model, connection } from 'mongoose';

type Type = {
    name: string,
    slug: string
}

const schema = new Schema<Type>({
    name: String,
    slug: String
})

const modelName = 'Category';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<Type>
:
    model<Type>(modelName, schema);