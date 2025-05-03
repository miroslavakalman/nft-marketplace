
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text } = req.body;

  // Минимальная валидация
  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields: to, subject, or text" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, 
      },
    });

    await transporter.verify(); 

    const mailOptions = {
      from: `"Мирослава Калманбетова" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    console.log(`[email] Sent successfully to ${to}`);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("[email] Failed to send:", error?.response || error);
    res.status(500).json({
      error: "Failed to send email",
      detail: error?.response || error?.message || "Unknown error",
    });
  }
};

export default sendEmail;
