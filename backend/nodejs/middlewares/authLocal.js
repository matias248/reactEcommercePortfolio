import { usersLocal } from "../localData/user.js"

const users = usersLocal;

export const authMiddleware = async (req, res, next) => {
        
        const token = req.headers.authorization?.split(' ')[1];
        const user = usersLocal.find(user => user.token === token);
        if(user)
        next();
        else{
            res.status(401).json("error in authentication");
        }
};