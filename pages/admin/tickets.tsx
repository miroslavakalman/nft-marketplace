import { useEffect, useState } from "react";
import axios from "axios";

interface Ticket {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "open" | "closed";
}

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await axios.get("/api/tickets");
      setTickets(data);
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.name}</td>
              <td>{ticket.email}</td>
              <td>{ticket.message}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsPage;
