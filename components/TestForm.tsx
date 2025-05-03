import { useState } from "react";
import axios from "axios";

export default function TestForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/sendEmail", { to, subject, text });
      setStatus("Отправлено!");
    } catch (error) {
      console.error(error);
      setStatus("Ошибка отправки.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <input
        type="email"
        placeholder="Кому"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Тема"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Отправить</button>
      <p>{status}</p>
    </form>
  );
}
