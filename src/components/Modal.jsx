import './Modal.css'; // Asegúrate de tener un archivo CSS para estilos básicos
import plus from '../assets/plus.png'

// eslint-disable-next-line react/prop-types
const Modal = ({children,isOpen, onClose, onConfirm, onCreate} ) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className='modalTitle'>Procedimientos</h2>
          <h2 className='modalSubtitle' onClick={onCreate}><img src={plus}/> Anadir procedimiento</h2>
        </div>
        <div className="modal-body">
       {children}
        </div>
        <div className="modal-footer">
          <button className="Cancel" onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};


export default Modal;