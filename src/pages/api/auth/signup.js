import { signup } from "@/backend/api/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const result = await signup({ name, email, password });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
