import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import Ticket from "../../models/Ticket";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const tickets = await Ticket.find({});
    return res.status(200).json(tickets);
  }

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTicket = await Ticket.create({ name, email, message });
    return res.status(201).json(newTicket);
  }

  res.status(405).json({ error: "Method not allowed" });
}
