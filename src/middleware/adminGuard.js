import Auth from '../common/auth.js'

const adminGuard = async(req,res,next)=>{
    try {
        let token = req?.headers?.authorization?.split(" ")[1]

        if(token)
        {

            let data = await Auth.decodeToken(token)
            let user = req.headers.user;
           
            if(user.role === "admin" && data.role === "admin")
            {
                next()
            }
            else
            {
                res.status(401).send({
                    message:"Unauthorized access"
                })
            }
            
        }
        else
        {
            res.status(401).send({
                message:"Unauthorised Access"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error'
        })
    }
}

export default adminGuard