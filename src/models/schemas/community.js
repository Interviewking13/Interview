const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunitySchema = new Schema(
    {
        community_id: {
            type: Number,
        }, 
        /** 게시글 작성자 */
        user_id:  {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        /** 해당 게시글을 조회한 회원 : 한 회원은 조회수 하나만 카운트 */
        read_users: [{
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
        }   
    },
    {
        timestamps: true,
    }
);

module.exports = CommunitySchema;
