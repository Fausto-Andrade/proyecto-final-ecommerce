const User = require("../models/User")

const userCreate = async () => {

    const user = {
        firstName: 'John',
        lastName:'Doe',
        email:"john.doe@gmail.com", 
        password: "password123" ,
        phone: "+974568901234"
    }

    await User.create(user)
}

module.exports = userCreate;