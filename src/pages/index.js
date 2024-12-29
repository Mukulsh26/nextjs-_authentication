import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      toast.success("Signup successful"); 
      setTimeout(() => {
        router.push("/login");
      }, 1000); 
    } catch (err) {
      toast.error("Email Already Exist");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      toast.error("Failed to sign in with Google. Please try again."); 
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/dashboard" });
    } catch (err) {
      toast.error("Failed to sign in with Facebook. Please try again."); 
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-8 rounded-lg bg-gray-800 text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none"
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Signup successful!</p>}
          <button type="submit" className="w-full bg-blue-600 p-3 rounded">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-500 hover:underline"
          >
            Sign in
          </a>
        </p>


        <div className="my-8">
          <p className="text-center text-gray-400">Or connect with</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
          >
            Sign up with Google
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg"
          >
            Sign up with Facebook
          </button>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
