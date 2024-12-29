import React from "react";
import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  // If the session is still being loaded
  if (status === "loading") {
    return <p className="text-center text-lg text-gray-400">Loading...</p>;
  }

  // If the user is not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-red-500">Unauthorized</h1>
        <p className="text-lg mt-2">You must log in to access the dashboard.</p>
      </div>
    );
  }

  // Determine if the user logged in via a provider (e.g., Google/Facebook) or manually
  const isProviderLogin = session.provider === "google" || session.provider === "facebook";

  // If the user is logged in
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <p className="mb-4 text-gray-400">
            {isProviderLogin ? (
              <>
                You are logged in via <strong>{session.provider}</strong>.
              </>
            ) : (
              <>You are logged in with your email and password.</>
            )}
          </p>
          <div className="flex items-center space-x-6">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-16 h-16 rounded-full border-2 border-gray-700"
              />
            )}
            <div>
              <p className="text-lg font-semibold">{session.user.name}</p>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
