const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunityReplySchema = new Schema(
    {
        reply_no: {
            type: Number,
        },
        reply_author: [{  //댓글 작성자
            user_id: {
                 type: Number, //mongoose.Types.ObjectId
                 ref: "User",
            },
            user_name: {
                 type: String,
                 ref: "User",
            },
        }],
        reply_content : { //댓글 내용
            type: String,
        },
        community_no: {
            type: Number,
            ref: "Community",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = CommunityReplySchema;