import * as mongoose from "mongoose";

let Schema = mongoose.Schema;

export const TestSchema = new Schema({
   firstName : {
       type: String,
       required: 'Enter a first name'
   },
   lastName : {
       type: String,
       required: 'Enter a last name'
   },
   department: {
       type: String,
       default: 'IT'
   }
});
