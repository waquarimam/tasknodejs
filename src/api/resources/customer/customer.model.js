import mongoose from "mongoose";
export const STANDARD_ROLE = 2;

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
   
    createdAt: {
      type: Number,
      
    },
    customerId:{
      type:String
    },
    invoiceId: {
      type: String
      },
    
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("task", customerSchema, "task");
