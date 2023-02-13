import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { validationResult, matchedData } from 'express-validator';
import User from "../models/User";
import State from "../models/State";


export const signin = async (req: Request, res: Response) => {
    
}

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
    }

    const data = matchedData(req)


    // Verificando se e-mail já existe

    const user = await User.findOne({
        email: data.email
    })

    if(user) {
        res.json({
            error: {email: {msg: 'Email já existe'}} 
        })
        return
    }


    // Verificando se o estado existe

    if(mongoose.Types.ObjectId.isValid(data.state)) {
        const stateItem = await State.findById(data.state)

        if(!stateItem) {
            res.json({
                error: {state: {msg: 'O estado não existe'}} 
            })
            return
        }
    } else {
        res.json({
            error: {state: {msg: 'Código de estado inválido'}} 
        })
        return
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)

    const newUser = new User({
        name: data.name,
        email: data.email,
        passwordHash,
        token,
        state: data.state
    })

    await newUser.save()

    res.json({token})
}