import TaskModel from "../models/tasks.js"
import UserModel from "../models/users.js"


const create = async(req,res)=>{
    try{
        req.body.no = `TA${+new Date()}`
        let data = await TaskModel.create(req.body)

        res.status(200).send({
            message:"Task Created Successfully"
        })
    }
    catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const getAllTasks = async (req,res) =>{
    try {
        let tasks = await TaskModel.find();
        res.status(200).send({
            message: "Data fetched Successfully",
            tasks
        })
    } catch (error) {
        res.status(500).send({
            message: error || "Internal Server Error"
        })
    }
}

const getByTaskNo = async(req,res)=>{
    try{
        let data = await TaskModel.findOne({no:req.params.taskNo})
        if(data)
        {
            res.status(200).send({
                message:"Data Fetch Successfull",
                data
            })
        }
        else{
            res.status(400).send({
                message:"Invalid Task Number"
            })
        }
    }
    catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const deleteTask = async (req, res)=>{
    try {
        let task = await TaskModel.findOne({no:req.params.taskNo});

        if(task){
            await TaskModel.deleteOne({no:req.params.taskNo})
            res.status(200).send({
                message: "Task Deleted Successfully"
            })
        }
        else{
            res.status(400).send({
                message: "Invalid Task"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal server error"
        })
    }
}

const dashboardCount = async(req,res)=>{
    try{
        let data = await TaskModel.aggregate([{
            $group:{_id:"$progress",count:{$sum:1}}
          }])
        let count = {}
        data.forEach((e)=>{
            count[e._id]= e.count
        })
        if(data){
            res.status(200).send({
            message:"Data Fetch Successful",
            data:count
            })
        }
        else{
            res.status(400).send({
                message: "Data Not found"
            })
        }
        
    }
    catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const taskList = async(req,res)=>{
    try{
        let progress = req.params.progress
        let data = await TaskModel.find({progress:progress}).populate("assignedTo")

        res.status(200).send({
            message:"Data Fetch Successful",
            data
        })
    }
    catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const changeProgress = async (req, res) =>{
    try {
        let user = {}
        req.body.user ? user = req.body.user : user = req.headers.user;
        let task = await TaskModel.findOne({no:req.params.taskNo});
        if(task.progress === "Open"){
            task.progress = "To-Do",
            task.assignedTo = user._id

            await task.save()
        }
        else if(task.progress === "To-Do"){
            task.progress = "In-Progress";
            task.startTime = (req.body.startTime) ? req.body.startTime : Date.now()

            await task.save()
        }
        else if(task.progress === "In-Progress"){
            if(req.body.resolution){
                task.progress = "Done";
                task.endTime = (req.body.endTime) ? req.body.endTime : Date.now();       
                task.resolution = req.body.resolution;
                task.hoursWorked = ((task.endTime/1000000) - (task.startTime/1000000))

                await task.save();
            }
            else{
                res.status(400).send({
                    message: "Resolution required for closure",
                })
            }
        }

        res.status(200).send({
            message: "Progress Changed",
            task,
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

export default {
    create,
    getAllTasks,
    getByTaskNo,
    deleteTask,
    dashboardCount,
    taskList,
    changeProgress    
}

