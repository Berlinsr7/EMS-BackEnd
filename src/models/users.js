import mongoose from "./index.js";

const validateEmail = (value)=>{
    return String(value)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            message:"Name is required"
        },
        email:{
            type:String,
            unique:true,
            required:true,
            validate:{
                validator:validateEmail,
                message:props=>`{props.value} is invalid`
            },
            message:"Email is required"
        },
        password:{
            type: String,
            required: true,
            message: "Password is required"
        },
        role:{
            type : String,
            enum: ["admin","employee"],
            required: true,
            message: "Role is required"
        },
        tasks: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "tasks",default: null }]
        },
    },{
        timestamps: true,
        versionKey:false,
        collection:'users'
    }
)

const User = mongoose.model('users',UserSchema);

export default User