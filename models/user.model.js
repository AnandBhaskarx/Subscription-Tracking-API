import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'username is required'],
        trim:true,
        minLenth:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'please fill valid email address'
        ]
    },
    password:{
        type:String,
        required:[true,'User password is required'],
        minLenth:6,
    }
},{
  timestamps:true  
})

const User = mongoose.model('User',userSchema);

export default User