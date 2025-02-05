import mongoose from "./index.js";

const TaskSchema = new mongoose.Schema(
    {
        no:{
            type:String,
            required:true
        },
        title:{
            type: String,
            required: true,
            message: "Task Title is required"
        },
        description:{
            type: String,
            required: true,
            message: "Description is required"
        },
        progress:{
            type:String,
            enum:["Open", "To-Do", "In-Progress", "Done"],
            default: "Open"
        },
        assignedTo: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users",
            default: null 
        }, 
        date: 
        { 
            type: Date, 
            required: true,
            default: Date.now() 
        },
        deadline:{
            type: String,
            default: null
        },
        startTime:{
            type: Date,
            default: null
        },
        endTime:{
            type: Date,
            default: null
        },
        resolution:{
            type: String,
            default:null
        },
        hoursWorked: 
        { 
            type: Number, 
            default: 0, 
            min: 0 
        }
    },
    {
        timestamps: true,
        versionKey:false,
        collection:'tasks'
    }
)

const Task = mongoose.model("tasks", TaskSchema);

export default Task