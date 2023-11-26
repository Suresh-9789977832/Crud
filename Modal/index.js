const mongoose = require("mongoose")

mongoose.connect(`${process.env.dburl}/${process.env.dbname}`)

module.exports=mongoose