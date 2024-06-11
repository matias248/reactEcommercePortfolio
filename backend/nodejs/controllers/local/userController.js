
import { usersLocal } from "../../localData/user.js"


const users = usersLocal;

export class UserController {
    signup = async (req, res, next) => {
        const user = {
            email: req.body.email,
            password: req.body.password,
            token:req.body.email+req.body.password
        };
        users.push(user)
        res.status(201).json({ message: 'User created !' })

    };

    login = async (req, res, next) => {
        const user = users.find(user => user.email === req.body.email);
        if (!user) {
            return res.status(401).json({ error: 'User not found !' });
        }
        if(req.body.password !== user.password ){
            return res.status(401).json({ error: 'Bad password !' });
        }
        return res.status(200).json(user);

    }


}