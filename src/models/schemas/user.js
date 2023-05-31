const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({

        "user_id": {
            type: Number
        },
        "name": {
            type: String
        }
    }
);

module.exports = UserSchema;