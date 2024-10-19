import  { useEffect, useState } from 'react';
import './Alert.css'; // Archivo CSS para los estilos

// eslint-disable-next-line react/prop-types
export const Alert = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ocultar la alerta después de `duration` milisegundos
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Llamar a la función para cerrar la alerta
    }, duration);

    return () => clearTimeout(timer); // Limpiar el temporizador si se desmonta el componente
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

