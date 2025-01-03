import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="text-center text-gray-300">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-md leading-7">
        Rentopc, a public name of "crosssales.in", specializes in selling finest and high end refurbished and Pre- Owned laptops and desktop at lowest prices, without compromising quality, which is also our USP. We also provide IT products on rental to Corporates. Our catalogue includes a wide range of PCs, Desktops, Workstations, Servers, Projectors, and other products.
        </p>
        <div className="mt-6 space-y-4">
          <p className="text-gray-400">
            Founded: <span className="text-white">1992</span>
          </p>
          <p className="text-gray-400">
            Headquarters: <span className="text-white">New Delhi, India</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
