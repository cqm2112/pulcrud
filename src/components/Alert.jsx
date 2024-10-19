import  { useEffect, useState } from 'react';
import './Alert.css'; 

// eslint-disable-next-line react/prop-types
export const Alert = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); 
    }, duration);

    return () => clearTimeout(timer); 
  }, [onClose, duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className="alert">
      <p>{message}</p>
    </div>
  );
};

