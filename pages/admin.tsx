import { useState, useEffect } from "react";
import axios from "axios";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { useAddress, useConnect, useDisconnect } from "@thirdweb-dev/react";
import Ticket from "../models/Ticket";

interface Ticket {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
  comments: { user: string; message: string; createdAt: string }[];
}

export default function AdminPanel() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  const adminAddresses = [
    '0xA4A4Da700f0C538e5f4E6081233CeDCf63E513b1',
    '0xBB9D62A7d334c337aeD74fFb14807399FA70AbB0'
  ];

  const isAdmin = adminAddresses.includes(userAddress || "");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replyMessage, setReplyMessage] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const sendEmail = async (to: string, subject: string, text: string) => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY!,
    });

    try {
      const result = await mg.messages.create(process.env.NEXT_PUBLIC_MAILGUN_DOMAIN!, {
        from: "Администратор EtherArt <admin@etherart.com>",
        to: [to],
        subject: subject,
        text: text,
      });
      console.log("Email sent successfully:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleClose = async (id: string) => {
    try {
      const response = await axios.put(`/api/tickets/${id}`, {
        status: "closed",
      });
      setTickets((prev) =>
        prev.map((ticket) => (ticket._id === id ? response.data : ticket))
      );
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tickets/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const handleReplyChange = (ticketId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyMessage((prev) => ({
      ...prev,
      [ticketId]: event.target.value,
    }));
  };

  const handleReplySubmit = async (ticketId: string) => {
    const ticket = tickets.find((t) => t._id === ticketId);
    if (!ticket) {
      console.error("Ticket not found");
      return;
    }

    try {
      await sendEmail(
        ticket.email,
        "Ответ на Ваше обращение",
        replyMessage[ticketId] || "Сообщение пусто."
      );
      setReplyMessage((prev) => ({ ...prev, [ticketId]: "" }));
      console.log("Reply sent successfully.");
    } catch (error) {
      console.error("Error replying to ticket:", error);
    }
  };

  if (!isAdmin) {
    return <p>У вас нет доступа к панели администратора. Пожалуйста, подключитесь как администратор.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Имя</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Сообщение</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Статус</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Действия</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Ответ</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket._id}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.email}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.message}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.status}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.status === "open" ? (
                  <button
                    onClick={() => handleClose(ticket._id)}
                    style={{ marginRight: "5px" }}
                  >
                    Закрыть
                  </button>
                ) : (
                  <span>Закрыто</span>
                )}
                <button onClick={() => handleDelete(ticket._id)}>Удалить</button>
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <input
                  type="text"
                  value={replyMessage[ticket._id] || ""}
                  onChange={handleReplyChange(ticket._id)}
                  placeholder="Введите ответ..."
                />
                <button onClick={() => handleReplySubmit(ticket._id)}>Отправить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}