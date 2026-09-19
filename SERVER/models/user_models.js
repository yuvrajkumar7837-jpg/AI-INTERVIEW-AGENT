import mongoose  from "mongoose";

const UserSchema = mongoose.Schema(
    {
        // name: String
        name:{ type : String , required :true},
        email : {type : String , required :true ,unique :true, lowercase: true, trim: true},
        credit : {type  :Number , default  :100}

    },
    {timestamps  :true}
)

const User = mongoose.model("User" , UserSchema)

export default User;