import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  name: string;
  email: string;
  message: string;
  status: "open" | "closed";
}

const ticketSchema = new Schema<ITicket>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);
