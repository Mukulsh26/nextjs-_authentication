import { getUsers, addUser } from "../../../backend/api/users";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch users" });
    }
  } else if (req.method === "POST") {
    try {
      const newUser = req.body;
      const result = await addUser(newUser);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Unable to add user" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
