import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../models/UserModel.js";

export class UserController {
    signup = async (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new userModel({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'User created !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error =>{console.log(error); res.status(500).json(  )});
    };




    login = async (req, res, next) => {
        userModel.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'User not found !' });
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Invalid password!' });
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '7d' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));

    }


}