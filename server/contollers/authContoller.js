const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            "message": "Invalid input"
        })
    }

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(400).json({
            "message": "Email is not registered,please register"
        })
    }

    const checkedPassword=await bcryptjs.compare(password,existingUser.password)

    if(!checkedPassword){
        return res.status(400).json({
            "message":"wrong password"
        })
    }

    const token=jwt.sign({id:existingUser._id},process.env.SECRET_KEY)

    res.status(200).json({
        "message": "Login Successfully...",
        "Token":token
    })

}



async function register(req, res) {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            "message": "Invalid input"
        })
    }

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        return res.status(400).json({
            "message": "Email already registered"
        })
    }
    const encrytPassword = await bcryptjs.hash(password, 4)

    const newUser = await User.create({
        name: name,
        email: email,
        password: encrytPassword,
        role: role
    })

    res.status(200).json({
        "message": "User registered Successfully..."
    })
}

module.exports = {
    login,
    register
}