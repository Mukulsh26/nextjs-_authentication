import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <div className="text-center text-gray-300">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg">
          We'd love to hear from you! Feel free to reach out through any of the methods below.
        </p>
        <div className="mt-8 space-y-4">
          <p className="text-gray-400">
            Email: <a href="mailto:info@mywebsite.com" className="text-blue-400 hover:underline">info@rentopc.com</a>
          </p>
          <p className="text-gray-400">
            Phone: <span className="text-white">+91 701-189-8220</span>
          </p>
          <p className="text-gray-400">
            Address: <span className="text-white">Plot No. A5, jhilmil Industrial Area, Shahdara, Delhi- 110095</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
