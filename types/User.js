//No external users can register and create an account
//One account per employee
//Username (staff email) must exist on a dummy database or have a set format
class User {
    constructor(name, username, password) {
        this.name = name
        //Username is a staff email
        this.username = username
        //Password must be hashed and stored on a database
        this.password = password
    }

    createForum() {

    }

    //Could also be placed in "Forum.js"
    createToDoList() {
        
    }
}