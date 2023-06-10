const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunitySchema = new Schema(
    {
        community_no: {
            type: Number,
        }, 
        /** 게시글 작성자 */
        user_id:  {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        /** 해당 게시글을 조회한 회원 : 한 회원은 조회수 하나만 카운트 */
        readUsers: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
        }],
        title: {
            type: String,
        }, 
        content: {
            type: String,
        },
        fileKey: {
            type: String,
        }, 
        fileETag: {
            type: String,
        }, 
        fileName: {
            type: String,
        }, 
        count: {
            type: Number,
        },
        reply_id:  {
                type: mongoose.Types.ObjectId, 
                ref: "Community",
        },    
    },
    {
        timestamps: true,
    }
);

module.exports = CommunitySchema;