import { FiCheck, FiZap, FiStar } from 'react-icons/fi';
import './SubscribeSection.css';

const SubscribeSection = () => {
  const handleSubscribe = () => {
    // TODO: Integrate with Stripe checkout
    console.log('Redirecting to Stripe checkout...');
  };

  const features = [
    'Unlimited blog posts',
    'AI-powered writing assistance',
    'Advanced analytics',
    'Custom domain support',
    'Priority support',
    'Ad-free experience',
    'Early access to new features',
    'Exclusive community access'
  ];

  return (
    <section className="subscribe-section">
      <div className="subscribe-bg">
        <div className="subscribe-gradient-1"></div>
        <div className="subscribe-gradient-2"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="subscribe-header">
          <div className="subscribe-badge">
            <FiStar />
            <span>Premium Membership</span>
          </div>
          <h2 className="subscribe-title">
            Unlock Your Full <span className="gradient-text">Potential</span>
          </h2>
          <p className="subscribe-subtitle">
            Join thousands of developers who are already creating amazing content
            with our premium features.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="pricing-card glass">
          <div className="pricing-header">
            <div className="pricing-icon">
              <FiZap />
            </div>
            <h3 className="pricing-title">Pro Plan</h3>
            <div className="pricing-price">
              <span className="price-currency">$</span>
              <span className="price-amount">9</span>
              <span className="price-period">/month</span>
            </div>
            <p className="pricing-description">
              Everything you need to build your technical brand
            </p>
          </div>

          <div className="pricing-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <FiCheck />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleSubscribe}>
            <FiZap />
            <span>Subscribe Now</span>
          </button>

          <p className="pricing-note">
            Cancel anytime. No questions asked.
          </p>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Syntaxory has transformed how I share my knowledge. The platform is
              intuitive and the community is amazing!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍💻</div>
              <div>
                <div className="author-name">Alex Johnson</div>
                <div className="author-role">Full Stack Developer</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              "The AI writing assistance is a game-changer. I can focus on the
              content while the platform handles the rest."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍💻</div>
              <div>
                <div className="author-name">Sarah Chen</div>
                <div className="author-role">DevOps Engineer</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              "Best investment for my technical writing career. The analytics help
              me understand what my readers want."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">🧑‍💻</div>
              <div>
                <div className="author-name">Mike Rodriguez</div>
                <div className="author-role">Tech Lead</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
