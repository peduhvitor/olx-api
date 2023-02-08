import { checkSchema } from 'express-validator'

export const signup = checkSchema({
    name: { 
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'O nome precisa ter pelo menos 2 caracteres'
     },
     email: {
        isEmail: true,
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: 'Email inválido'
     },
     password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'A senha precisa ter pelo menos 2 caracteres'
     },
     state: {
        notEmpty: true,
        errorMessage: 'Estado não preenchido'
     }
})