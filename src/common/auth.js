import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUND = 10;

const hashpassword = async(password) =>{
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

const hashCompare = async(password,hash)=>{
    return await bcrypt.compare(password,hash);
}

const createToken = (payload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
    return token;
}

const decodeToken = (token)=>{
    return jwt.decode(token);
}

const verifyToken = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

export default {
    hashpassword,
    hashCompare,
    createToken,
    decodeToken,
    verifyToken
}