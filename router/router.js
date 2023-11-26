const express = require("express")
const router = express.Router()
const controller = require("../Controller/users")
const auth=require("../Common/Auth")

router.get('/',auth.validate,auth.adminguard,controller.getusers)

router.get('/:id',auth.validate,auth.adminguard,controller.getusersbyId)

router.post('/', controller.createusers)

router.put('/:id',auth.validate,auth.adminguard, controller.editusers)

router.delete('/:id',auth.validate,auth.adminguard, controller.deleteusers)

router.post('/login',controller.login)

router.put('/changepassword/:id',auth.validate,controller.changepassword)

module.exports=router