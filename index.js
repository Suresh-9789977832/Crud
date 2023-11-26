const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const router=require ('./router/router')
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/users',router)


app.listen(PORT, () => console.log(`App is running in port ${PORT}`))



