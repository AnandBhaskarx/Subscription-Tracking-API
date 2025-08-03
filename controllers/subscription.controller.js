import  Subscription from '../models/subscription.model.js'

export const createSubscription = async(req,res,next)=>{
    try{
        const subscription = await Subscription.create(docs:{
            ...req.body,
            user:req.user._id,
        })
    }catch(e){
        next(e);
    }
}