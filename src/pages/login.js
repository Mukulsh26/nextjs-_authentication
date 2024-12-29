import { useState } from "react";
import { signIn } from "next-auth/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const router = useRouter();

  // Handle regular email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid Email or Password");
    } else {
      toast.success("Signin successful");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  // Handle Facebook login
  const handleFacebookSignIn = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign in with Facebook. Please try again.");
    }
  };
  
  const handleMagicLinkSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("email", { email, redirect: false });
    if (res?.error) {
      setError("Failed to send magic link. Please try again.");
    } else {
      toast.success("Magic link sent! Check your inbox.");
      setIsMagicLink(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-8 rounded-lg bg-gray-800 text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>

        {/* Toggle between Magic Link and Email/Password login */}
        {isMagicLink ? (
          <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 p-3 rounded">
              Send Magic Link
            </button>
            <p
              onClick={() => setIsMagicLink(false)}
              className="text-center mt-6 text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              Back to login with password
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <button type="submit" className="w-full bg-blue-600 p-3 rounded">
              Log In
            </button>
            <p
              onClick={() => setIsMagicLink(true)}
              className="text-center mt-6 text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              Forgot your password? Login with magic link
            </p>
          </form>
        )}

<p className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/"
            className="text-blue-400 hover:text-blue-500 hover:underline"
          >
            Sign Up
          </a>
        </p>

        <div className="my-8">
          <p className="text-center text-gray-400">Or connect with</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
          >
            Log in with Google
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg"
          >
            Log in with Facebook
          </button>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
