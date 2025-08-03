import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
        name:{
            type:String,
            required:[true,"name is required"],
            trim:true,
            minLength:2,
            maxLength:100,
        },
        price:{
            type:Number,
            required:[true,'subscription price is required'],
            min:[0,'price must be greater than 0']
        },
        currency:{
            type:String,
            enum:['RS','USD'],
            default :'RS'
        },
        frequecy:{
            type:String,
            enum:['daily','weekly','monthly','yearly'],
            required:true,
        },
        category:{
            type:String,
            enum:['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
            required:true,
        },
        paymentMethod:{
            type:String,
            required:true,
            trum:true,
        },
        status:{
            type:String,
            enum:['active','cancelled','expired'],
            default:'active' 
        },
        startDate:{
            type:Date,
            required:true,
            validate:{
                validator:(value)=>value<=new Date(),
                message:'start date must be in the past',
            }
        },
            
        renewalDate:{
            type:Date,
            validate:{
                validator:function(value){
                 return value>this.startDate;
                },
                message:'Renewal date must be after the start date',
            }
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            Ref:'User',
            required:true,
            index:true,
        }
         }
,{timestamps:true})

//Auto-calculate renewal date if missing .

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily :1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequecy]);

    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription',subscriptionSchema)

export default Subscription