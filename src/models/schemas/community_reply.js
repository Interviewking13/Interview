const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunityReplySchema = new Schema(
    {
        reply_id: {
            type: Number,
        },
        reply_user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        reply_content : { 
            type: String,
        },
        community_id: {
            type: Number,
            ref: "Community",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = CommunityReplySchema;