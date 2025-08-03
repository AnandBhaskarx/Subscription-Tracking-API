import {Router} from 'express'
import auothorize from '../middlewares/auth.middleware.js'
import {getUsers,getUser} from '../controllers/user.controller.js'
const userRouter = Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',auothorize,getUser);
userRouter.post('/',(req,res)=>res.send({title:'create new Users'}));
userRouter.put('/:id',(req,res)=>res.send({title:'Updadte Users'}));
userRouter.delete('/:id',(req,res)=>res.send({title:'delete the Users'}));

export default userRouter