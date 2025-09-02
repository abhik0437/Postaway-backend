import jwt from 'jsonwebtoken';
import User from "./user.model.js";
import ApplicationError from '../../error-handler/applicationError.js';

//handling user registration

class UserController{

      signUp(req,res){
        const {name, email, password} = req.body;
        const user = User.addUser(name, email, password);
        res.status(201).send({user});

      }

      signIn(req,res){
        const {email, password} = req.body;
        const user = User.getUser(email, password);
        if(user){
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            },
            'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
            {
                expiresIn: '1h'
            }
        );

            res.status(200).send(token);
        }else{

            // throw new ApplicationError(400, "Incorrect credentials, please try again");
            
            res.status(400).send("Incorrect credentials, please try again")
        }
      }

      getAll(req, res){
        const users = User.getAllUsers();
        return res.status(200).send(users);
      }
}

export default UserController;