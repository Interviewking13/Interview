const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunityReplySchema = new Schema(
    {
        reply_no: {
            type: Number,
        },
        reply_user_id: {
                 type: mongoose.Types.ObjectId,
                 ref: "User",
        },
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