export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="bg-gray-900 shadow-lg rounded-lg pt-3 pb-3 pr-4 pl-4 w-full max-w-md text-white">
        {children}
      </div>
    </div>
  );
}
