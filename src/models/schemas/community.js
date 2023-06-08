const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunitySchema = new Schema(
    {
        community_no: {
            type: Number,
        }, 
        author: [{
            user_id:  {
                type: Number, //mongoose.Types.ObjectId
                ref: "User",
            },  
            user_name: {
                type: String,
                ref: "User",
            },  
        }], 
        title: {
            type: String,
        }, 
        content: {
            type: String,
        },
        attach: {
            type: String,
        }, 
        count: {
            type: Number,
        },
        reply : [{
            _id:  {
                type: mongoose.Types.ObjectId, 
                ref: "Community",
            },  
            reply_no: {
                type: Number,
                ref: "Community",
            },  
        }], 
    },
    {
        timestamps: true,
    }
);

module.exports = CommunitySchema;