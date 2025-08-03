import {Router} from 'express'
import authorize from '../middlewares/auth.middleware.js'
const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>res.send({title:'Get all subscriber'}));

subscriptionRouter.get('/:id',(req,res)=>res.send({title:'Get subscripption details'}));

subscriptionRouter.post('/',authorize,(req,res)=>res.send({title:'Create  Subscription'}));

subscriptionRouter.put('/:id',(req,res)=>res.send({title:'updatae subsciption'}));

subscriptionRouter.delete('/:id',(req,res)=>res.send({title:'delete subscription'}));

subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:'Get all user subscription'}));

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'Get all user subscription'}));

subscriptionRouter.get('/upcoming-renevals',(req,res)=>res.send({title:'Get upcoming renevals'}));

export default subscriptionRouter
