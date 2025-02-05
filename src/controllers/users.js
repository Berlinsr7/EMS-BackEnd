import Auth from "../common/auth.js";
import mongoose from "../models/index.js";
import UserModel from "../models/users.js"
import TaskModel from "../models/tasks.js";

const getAllUsers = async (req,res) => {
    try {   
        let users = await UserModel.find({},{password:0});
        res.status(200).send({
            message:"Data Fetch Successful",
            users
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }
}

const createUser = async (req, res) =>{
    try {
        let {name, email, password,role} = req.body;
        let user = await UserModel.findOne({email : email})

        if(!user){
            password = await Auth.hashpassword(password);
            await UserModel.create({name, email, password, role})

            res.status(200).send({
                message: 'User created Successfully',
            })
        }
        else{
            res.status(400).send({
                message: `User with mail ID ${email} already exist`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }
}

const deleteUser = async (req, res)=>{
    try {
        let userId = req.params.userId;
        let user = await UserModel.findById(userId);

        if(user){
            await UserModel.deleteOne({_id:userId})
            res.status(200).send({
                message: "User Deleted Successfully"
            })
        }
        else{
            res.status(400).send({
                message: "Invalid User"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal server error"
        })
    }
}

const getUserById = async(req, res)=>{
    try {   
        let userId = req.params.userId;
        let user = await UserModel.findOne({_id: userId},{password:0}).populate("tasks");
        res.status(200).send({
            message:"Data Fetched Successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }
}

const login = async (req,res)=>{
    try {
        let {email,password} = req.body;
        let user = await UserModel.findOne({email: email}); 

        if(user){
            if(await Auth.hashCompare(password, user.password)){
                let token = Auth.createToken({
                    email,
                    role:user.role,
                    id: user._id
                })
                res.status(200).send({
                    message:"Login Successful",
                    role:user.role,
                    token,
                    name:user.name
                })
            }
            else{
                res.status(400).send({message: "Invalid credentials"})
            }
        }else{
            res.status(400).send("User Does not Exists")
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal server error"
        })
    }
}

const updateUserTasks = async (req, res) => {
    // try {
    //     const { userId } = req.params; // Get user ID from URL
    //     const { taskIds } = req.body; // Get task IDs from request body

    //     // Validate taskIds
    //     if (!Array.isArray(taskIds)) {
    //         return res.status(400).send({ message: "taskIds must be an array" });
    //     }

    //     // Ensure all IDs are valid ObjectId
    //     if (!taskIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
    //         return res.status(400).send({ message: "Invalid Task ID format" });
    //     }

    //     // Update user with new tasks
    //     const user = await UserModel.findByIdAndUpdate(
    //         userId,
    //         { $set: { tasks: taskIds.length ? taskIds : null } }, // Update tasks or set null if empty
    //         { new: true }
    //     ).populate("tasks"); // Populate tasks to return task details

    //     if (!user) {
    //         return res.status(404).send({ message: "User not found" });
    //     }

    //     res.status(200).send({
    //         message: "User tasks updated successfully",
    //         user
    //     });

    // } catch (error) {
    //     res.status(500).send({
    //         message: error.message || "Internal Server Error"
    //     });
    // }
    try {
        const { userId } = req.params; // Get user ID from URL
        const { taskId } = req.body; // Single Task ID

        // Validate taskId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send({ message: "Invalid Task ID format" });
        }

        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }

        // Find user and add task to tasks array
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { tasks: taskId } }, // ✅ Add task to array without replacing existing ones
            { new: true }
        ).populate("tasks"); // Populate tasks to return task details

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        task.assignedTo = userId;
        await task.save();

        res.status(200).send({
            message: "Task added successfully to user",
            user,
            task
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};


export default{
    createUser,
    getAllUsers,
    deleteUser,
    getUserById,
    login,
    updateUserTasks
}