import { useState } from "react";
import axios from "axios";
import { Text, Button, background } from "@chakra-ui/react";

const CreateTicketForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/tickets", form);
      alert("Обращение создано!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Не удалось создать обращение.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-ticket" >
      <h1>Feedback</h1>
      <Text fontWeight="500" fontSize={{ base: "12px", md: "16px" }} lineHeight={{ base: "130%", md: "150%" }} color="#000">
      Есть вопросы или пожелания? Наши администраторы всегда готовы выслушать ваши обращения и дать подробный ответ.</Text>
      <input name="name" placeholder="Ваше имя" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Ваш вопрос или обращение" value={form.message} onChange={handleChange} required />
      <Button type="submit" bg="#A4735F" fontSize={{ base: "sm", md: "md" }}>
        Отправить
      </Button>    
      </form>
      
  );
};

export default CreateTicketForm;


