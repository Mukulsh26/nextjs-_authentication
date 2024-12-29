import { login } from "@/backend/api/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const result = await login({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
