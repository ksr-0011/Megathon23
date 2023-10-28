const mongoose = require("mongoose");
const recentsSchema = new mongoose.Schema({
    user_ID :{
        type:mongoose.Schema.Types.ObjectId
    }
})

module.exports=mongoose.model('recents',recentsSchema);