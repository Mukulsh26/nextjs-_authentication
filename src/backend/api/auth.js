import bcrypt from "bcryptjs";
import clientPromise from "../lib/mongodb";

export const signup = async ({ name, email, password }) => {
  const client = await clientPromise;
  const db = client.db();

  // Check if the user already exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return { message: "User created successfully" };
};

export const login = async ({ email, password }) => {
  const client = await clientPromise;
  const db = client.db();

  // Find user by email
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    console.error("User not found with email:", email);
    throw new Error("Invalid email or password");
  }

  // Verify the password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.error("Password mismatch for email:", email);
    throw new Error("Invalid email or password");
  }

  console.log("Login successful for email:", email);
  return { message: "Login successful" };
};

