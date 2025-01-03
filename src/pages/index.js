import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-center text-gray-300">
        <h1 className="text-4xl font-bold mb-6">Welcome to RentoPc</h1>
        <p className="text-md">
        Experience the best in refurbished and pre-owned laptops and desktops at unbeatable prices with Rentopc. We also offer IT product rentals for corporates, including PCs, workstations, and more.
        </p>
        <div className="mt-8">
          <a
            href="/about"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </Layout>
  );
}
