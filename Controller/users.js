const usermodal = require("../Modal/users")
const sanitize = require("../Common/Sanitize")
const auth=require("../Common/Auth")


const getusers = async (req, res) => {
    try {
        let data=await usermodal.find()
        res.status(200).send({
            data,
            message:"user data successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const getusersbyId = async (req,res) => {
    try {
        let id = sanitize.isstring(req.params.id)
        let user = await usermodal.findById(id)
        if (user) {
            res.status(200).send({
                user,
                message:"user id fetch successfull"
            })
        }
        else {
            res.status(400).send({
                message:"Invalid user id"
            })
        }
      
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const createusers = async (req,res) => {
    try {
        let firstname = sanitize.isstring(req.body.firstname)
        let lastname = sanitize.isstring(req.body.lastname)
        let batch = sanitize.isstring(req.body.batch)
        let email = sanitize.isstring(req.body.email)    
        let password = sanitize.isstring(req.body.password)
        
        password= await auth.hashpassword(password)

        let existsuser=await usermodal.findOne({email:email})

        if (!existsuser) {

            await usermodal.create({firstname, lastname, batch, email,password})
            res.send({
                message:"user data created successfully"
            })
        }
        else {
            res.send({
                message:`${email} already exists`
            })
        }
        

        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const editusers = async (req,res) => {
    try {

        let firstName = sanitize.isstring(req.body.firstname)
        let lastName = sanitize.isstring(req.body.lastname)
        let batch = sanitize.isstring(req.body.batch)
        let email = sanitize.isstring(req.body.email)



        let id = sanitize.isstring(req.params.id)
        let user = await usermodal.findById(id)



        if (user) {
            
        user.firstName = firstName
        user.lastName = lastName
        user.batch = batch
        user.email = email
            await user.save()
            
            
        res.status(200).send({
            message:"user data Edited successfully"
        })

        }
        else {
            res.status(400).send({
                message:"Invalid user id"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}


const deleteusers = async (req, res) => {
    
    try {
        let id = sanitize.isstring(req.params.id)
        let user = await usermodal.findById(id)
        if (user) {
            await usermodal.deleteOne({_id:id})
            res.status(200).send({
                message:"user data deleted successfully"
            })
        }
        else {
            res.status(400).send({
                message:"Invalid user id"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}


const login = async(req,res)=> {
    try {
        let email = sanitize.isstring(req.body.email)
        let password = sanitize.isstring(req.body.password)
        let user = await usermodal.findOne({ email: email })

        if (user) {
            if (await auth.comparepassword(password, user.password)) {
                
                let token=await auth.createtoken({email:user.email,role:user.role,firstName:user.firstname,lastname:user.lastname})
                res.status(200).send({
                    message: "Login Successfull",
                    token
                })
            }
            else {
                res.status(400).send({
                    message:"Invalid Password"
                })
            }
        }
        else {
            res.status(400).send({
                message:"Invalid email address"
            })
        }

        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const changepassword = async(req,res) => {
    try {

        let id = sanitize.isstring(req.params.id)
        let password = sanitize.isstring(req.params.password)
        let user = await usermodal.findById(id)
        
        if (user) {
            user.password = await auth.hashpassword(password)
            await user.save()
            res.status(200).send({
                message:"Password Changed Successfully"
            })
        }
        else {
            res.status(400).send({
                message:"Invalid user"
            })
        }
 
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}


module.exports = {
    getusers,
    getusersbyId,
    createusers,
    editusers,
    deleteusers,
    login,
    changepassword
}