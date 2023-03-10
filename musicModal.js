const mongoose = require("mongoose")
const schema = mongoose.Schema

const musicSchema = new schema({
    artistName : {
        type:String
    },
    title: {
        type:String
    },
    album: {
        full_title: {
            type:String
        },
        url:{
            type:String
        },
        name : {
            type : String
        }
    },
    label : {
        type:String
    }
})
const musicModal =  mongoose.model("data",musicSchema)
module.exports = musicModal 