import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signup with ${name}, ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 w-80">
      <h2 className="text-xl font-bold">Signup</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <Button type="submit" className="mt-2">Signup</Button>
    </form>
  );
}
