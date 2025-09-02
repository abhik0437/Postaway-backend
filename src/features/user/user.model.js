import {v4 as uuidv4} from "uuid";

var users = [];

class User{
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = uuidv4();
        this.bookmarks=[]
    }

    static getAllUsers(){
        return users;
    }

    static addUser(name, email, password){
        const newUser = new User(name, email, password);
        users.push(newUser);
        return newUser;
    }

    static getUser(email, password){
        const user = users.find(u=>u.email==email && u.password==password);
        return user;
    }

    static getAllUsers(){
        return users;
    }






}

export default User;