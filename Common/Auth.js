const bcrypt = require("bcryptjs")
const saltround = 10
const jwt=require("jsonwebtoken")

const hashpassword = async(password) => {
    let salt = await bcrypt.genSalt(saltround)
    let hashedpassword = await bcrypt.hash(password, salt)
    return hashedpassword
    
}

const comparepassword = async (password, hashedpassword) => {
    return bcrypt.compare(password,hashedpassword)
}

const createtoken = async(value) => {
    const token = await jwt.sign
        (   value,
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRE
            }
    )
    return token
}

const decodetoken = async (value) => {
    return await jwt.decode(value)
}

const validate = async (req, res, next) => {
    try {
        let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null
        if (token) {
            let decodevalue = await decodetoken(token)
            let currentTime = Math.round(+new Date() / 1000)
        
            if (currentTime < decodevalue.exp) {
                next()
            } else {
                res.status(401).send({
                    message:"Token Expired"
                })
            }
        }
        else {
            res.status(401).send({message:"Token not found"})
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
        })
    }
}

const adminguard = async (req, res, next) => {
    try {
        let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null
        if (token) {
            let decodevalue = await decodetoken(token)

        
            if (decodevalue.role=='Admin') {
                next()
            } else {
                res.status(401).send({
                    message:"Only admin are allowed to access"
                })
            }
        }
        else {
            res.status(401).send({message:"Token not found"})
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
        })
    }
}
module.exports = {
    hashpassword,
    comparepassword,
    createtoken,
    decodetoken,
    validate,
    adminguard
}
