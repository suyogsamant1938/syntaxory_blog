import Hero from '../components/blog/Hero';
import SubscribeSection from '../components/subscribe/SubscribeSection';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />

      {/* Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
