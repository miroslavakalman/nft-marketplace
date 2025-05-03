import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Ticket from "../../../models/Ticket";
import nodemailer from "nodemailer";

const sendEmailReply = async (email: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `${process.env.SMTP_USER}>`,
    to: email,
    subject,
    text,
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  if (method === "PUT") {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, { status: "closed" }, { new: true });
      res.status(200).json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(400).json({ error: "Failed to close ticket" });
    }
  } else if (method === "DELETE") {
    try {
      await Ticket.findByIdAndDelete(id);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(400).json({ error: "Failed to delete ticket" });
    }
  } else if (method === "POST") {
    const { email, message } = req.body;

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    try {
      await sendEmailReply(email.trim(), "Re: Ваше обращение", message.trim());
      res.status(200).json({ message: "Reply sent successfully" });
      console.log("Reply sent to:", email.trim());
    } catch (error) {
      console.error("Error sending reply:", error);
      res.status(400).json({ error: "Failed to send reply" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
