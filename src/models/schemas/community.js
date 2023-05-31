const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunitySchema = new Schema(
    {
        community_no: {
            type: Number,
        }, 
        author: [{
            user_id:  {
                type: mongoose.Types.ObjectId, 
                ref: "User",
            },  
            name: {
                type: String,
                ref: "User",
            },  
        }], 
        title: {
            type: String,
            required: true,
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
            reply_no: {
                type: Number,
            },
            reply_author: [{  //댓글 작성자
                user_id: {
                     type: mongoose.Types.ObjectId,
                     ref: "User",
                },
                name: {
                     type: String,
                     ref: "User",
                },
            }],
            reply_content : { //댓글 내용
                type: String,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
              },
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = CommunitySchema;