const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors =require("cors")
const router=require ('./router/router')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use('/users',router)


app.listen(PORT, () => console.log(`App is running in port ${PORT}`))



