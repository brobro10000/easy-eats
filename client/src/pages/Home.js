import Products from "../components/Products";
import Hero from "../components/Hero";
import Contact from "../pages/Contact";

const Home = () => {
  return (
    <div className="background">
      <Hero />
      <Products />
      <Contact />
    </div>
  );
};

export default Home;
