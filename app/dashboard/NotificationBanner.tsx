import React from 'react';

interface NotificationBannerProps {
  message: string | null;
  color: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, color }) => {
  if (!message) return null;
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${color} text-white px-6 py-3 rounded shadow-lg z-50`}>
      {message}
    </div>
  );
};

export default NotificationBanner;