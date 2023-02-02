const mongoose = require('mongoose');
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true)

export const mongoConnect = async () => {
    try {
        console.log('Conectando ao mongoDB');

        await mongoose.connect(process.env.DATABASE as string, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })

        console.log('MongoDB conectado com sucesso!');
    } catch(error) {
        console.log("Erro de conexão no MongoDB", error);
    }
}