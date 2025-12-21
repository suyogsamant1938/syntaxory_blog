import './StatCard.css';

const StatCard = ({ icon, title, value, change, changeType = 'positive' }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <div className="stat-icon">{icon}</div>
      </div>
      
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        
        {change && (
          <div className={`stat-change ${changeType}`}>
            <span className="change-indicator">
              {changeType === 'positive' ? '↑' : '↓'}
            </span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
