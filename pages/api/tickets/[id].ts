import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import formData from "form-data";
import Mailgun from "mailgun.js";
import Ticket from "../../../models/Ticket"; // Модель тикета

// Создаем Mailgun клиент
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY!,
});

// Функция для отправки email
const sendEmailReply = async (email: string, subject: string, text: string) => {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `Администратор EtherArt <postmaster@etherart.ru>`, // Указываем отправителя
      to: [email],
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  if (method === "PUT") {
    // Обновление статуса тикета на "closed"
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, { status: "closed" }, { new: true });
      res.status(200).json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(400).json({ error: "Failed to close ticket" });
    }
  } else if (method === "DELETE") {
    // Удаление тикета
    try {
      await Ticket.findByIdAndDelete(id);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(400).json({ error: "Failed to delete ticket" });
    }
  } else if (method === "POST") {
    // Проверка данных в запросе
    const { email, message } = req.body;
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    try {
      // Отправка ответа на email пользователя
      await sendEmailReply(email, "Re: Ваше обращение", message.trim());

      res.status(200).json({ message: "Reply sent successfully" });
      console.log("Received message:", message.trim());
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(400).json({ error: "Failed to send reply" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}