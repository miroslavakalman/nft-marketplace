import { useState, useEffect } from "react";
import axios from "axios";
import { useAddress, useConnect, useDisconnect } from "@thirdweb-dev/react";

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

  const adminAddresses = [
    '0xA4A4Da700f0C538e5f4E6081233CeDCf63E513b1',
    '0xBB9D62A7d334c337aeD74fFb14807399FA70AbB0'
  ];

  const isAdmin = adminAddresses.includes(userAddress || "");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replyMessage, setReplyMessage] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

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
      await axios.post(`/api/tickets/${ticketId}`, {
        email: ticket.email,
        message: replyMessage[ticketId] || "Сообщение пусто.",
      });

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
            <div className="desktop-table" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "650px" }}>
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
              <td style={{ border: "1px solid black", padding: "8px" }}>{ticket._id}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{ticket.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{ticket.email}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{ticket.message}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{ticket.status}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {ticket.status === "open" ? (
                  <button onClick={() => handleClose(ticket._id)} style={{ marginRight: "5px" }}>
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
       <div className="mobile-table">
        {tickets.map((ticket) => (
          <div key={ticket._id} style={{
            border: "1px solid #000",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "15px"
          }}>
            <div><strong>ID:</strong> {ticket._id}</div>
            <div><strong>Имя:</strong> {ticket.name}</div>
            <div><strong>Email:</strong> {ticket.email}</div>
            <div><strong>Сообщение:</strong> {ticket.message}</div>
            <div><strong>Статус:</strong> {ticket.status}</div>
            
            <div style={{ margin: "10px 0", display: "flex", gap: "5px" }}>
              {ticket.status === "open" ? (
                <button onClick={() => handleClose(ticket._id)} style={{ flex: 1 }}>
                  Закрыть
                </button>
              ) : (
                <span style={{ flex: 1, textAlign: "center" }}>Закрыто</span>
              )}
              <button onClick={() => handleDelete(ticket._id)} style={{ flex: 1 }}>
                Удалить
              </button>
            </div>
            
            <div>
              <input
                type="text"
                value={replyMessage[ticket._id] || ""}
                onChange={handleReplyChange(ticket._id)}
                placeholder="Введите ответ..."
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <button 
                onClick={() => handleReplySubmit(ticket._id)}
                style={{ width: "100%" }}
              >
                Отправить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
