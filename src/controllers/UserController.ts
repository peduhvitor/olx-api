import { Request, Response } from "express";
import State from "../models/State";
import User from "../models/User";
import Category from "../models/Category";
import Ad from "../models/Ad";

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

export const editAction = async (req: Request, res: Response) => {

}