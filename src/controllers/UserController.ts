import { Request, Response } from "express";
import { validationResult, matchedData } from 'express-validator';
import State from "../models/State";
import User from "../models/User";
import Category from "../models/Category";
import Ad from "../models/Ad";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const getStates = async (req: Request, res: Response) => {
    const states = await State.find();
    res.json({ states })
}

export const info = async (req: Request, res: Response) => {
    const { token } = req.query

    const user = await User.findOne({ token })
    const state = await State.findById(user?.state)
    const ads = await Ad.find({idUser: user?._id.toString()})


    // Puxar anúncios do usuário

    let adList:any = []

    ads.forEach(async(item )=> {
        const cat = await Category.findById(item.category)
        adList.push({...item, category: cat?.slug})
    })

    res.json({
        name: user?.name,
        email: user?.email,
        state: state?.name,
        ads: adList
    })
    
}

type UpdatesType = {
    name?: string,
    email?: string,
    state?: string,
    passwordHash?: string
}

export const editAction = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
    }
    const data = matchedData(req)

    let updates: UpdatesType = { };

    if(data.name) {
        updates.name = data.name
    }

    if(data.email) {
        const emailCheck = await User.findOne({email: data.email})

        if(emailCheck) {
            res.json({error: 'Email já existente'})
            return
        }

        updates.email = data.email
    }

    if(data.state) {
        if(mongoose.Types.ObjectId.isValid(data.state)) {
            const stateCheck = await State.findById(data.state)

            if(!stateCheck) {
                res.json({error: 'Estado não existente'})
                return
            }

            updates.state = data.state
        } else {
            res.json({error: 'Código de estado inválido'})
            return
        }
    }

    if(data.password) {
        updates.passwordHash = await bcrypt.hash(data.password, 10)
    }

    await User.findOneAndUpdate({token: data.token}, {$set: updates})

    res.json({})
}