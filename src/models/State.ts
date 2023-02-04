import { Schema, model, Model, connection } from 'mongoose';

type Type = {
    name: string
}

const schema = new Schema<Type>({
    name: String
})

const modelName = 'State';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<Type>
:
    model<Type>(modelName, schema);