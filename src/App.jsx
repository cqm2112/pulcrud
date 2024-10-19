import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import img1 from "./assets/emptyIcon.png";
import img2 from "./assets/penIcon.png";
import { listProcedimientos, deleteProcedimiento, createProcedimiento } from "../server/src/graphql/queries.js";
import config from "../server/src/amplifyconfiguration.json";
import Modal from "./components/Modal.jsx";
import trash from "./assets/trash.png";
import { LoadingScreen } from "./components/Loading.jsx";
import { Alert } from "./components/Alert.jsx";

Amplify.configure(config);

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [procedures, setProcedures] = useState([]);
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!window.__hasFetched__) {
      setLoading(true)
      fetchProcedures();
      window.__hasFetched__ = true;
    }
  }, []);

  const fetchProcedures = async () => {
    try {
      const client = generateClient();
      const result = await client.graphql({ query: listProcedimientos });
      setProcedures(result.data.listProcedimientos.items);
      setEditingProcedure(result.data.listProcedimientos.items);
      setNextToken(result.data.listProcedimientos.nextToken);
      setLoading(false)
    } catch (error) {
      console.log("Error fetching todos:", error);
      setLoading(false)
    }
  };

  const validateProcedures = () => {
    return editingProcedure.every(procedure => {
      return Object.values(procedure).every(value => value !== '' && value !== null && value !== undefined);
    });
  };
  

  const handleDeleteProcedure = async (id) => {
    try {
      const proceduresUpdated = editingProcedure.filter((p) => p.id !== id);
      setEditingProcedure(proceduresUpdated);
    } catch (error) {
      console.log("Error deleting procedure:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const isValid = validateProcedures();
      console.log(isValid)
      if(isValid){
      closeModal();
      setLoading(true)
      await UpdateProcedures();
    }else{
      alert("Todos los campos son requeridos")
    }
      console.log("Confirmado");
    } catch (error) {
      console.error('Error durante la confirmación:', error);
    } 
  };
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const handleAddProcedure =  () => {
     setEditingProcedure([
      ...editingProcedure, 
      {
        id
        : 
        generateGUID(),
      nombre: '',
      codigo:'',
      reclamadoRDS: null,
      diferenciaRDS: null,
      autorizadoRDS: null
      } 
    ])
  }

  const UpdateProcedures = async () => {
  
    try {
      
     console.log(editingProcedure)
      const client = generateClient();
      for (let proc of procedures) {

        await client.graphql({
          query: deleteProcedimiento,
          variables: {
            input: { id: proc.id }
          }})

      }

      for (let proc of editingProcedure) {
     


        await client.graphql({
          query: createProcedimiento,
          variables: {
            input: {
              nombre: proc.nombre,        
              codigo: proc.codigo,
              reclamadoRDS: proc.reclamadoRDS, 
              diferenciaRDS: proc.diferenciaRDS, 
              autorizadoRDS: proc.autorizadoRDS  
            
            }
          }
        });
      }
      setProcedures(editingProcedure);
      setLoading(false)
      setShowAlert(true);
      console.log('Nuevos procedimientos creados');
    } catch (error) {
      console.error('Error al crear procedimientos:', error);
    }
 
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedProcedures = [...editingProcedure];
    updatedProcedures[index][field] = value;
    setEditingProcedure(updatedProcedures);
  };

  const openModal = () => {
    console.log(procedures)
    setEditingProcedure(procedures);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingProcedure([])
    setModalOpen(false)};

  return (
    <div>
    
      {loading &&

      <LoadingScreen/>
      }
          {showAlert && (
        <Alert
          message="Procedimientos Actualizados" 
          onClose={() =>console.log("test")} 
          duration={3000} 
        />
      )}
      <h2 className="title">Procedimientos</h2>
      <div className={procedures.length > 0 ? "container" : "empty"}>
        <div className="procedureList">
          <div className={procedures.length > 0 ? "container" : "empty"}>
            {procedures.length > 0 ? (
              <div className="procedureList">
                {procedures.map((procedure, index) => (
                  <div key={procedure.id} className="procedureContainer">
                    <div className="infoContainer">
                      <div className="infoSection">
                        <span className="infoTitle">
                          {"Procedimiento " + (index+1)}
                        </span>
                        <span className="infoBody">{procedure.nombre}</span>
                      </div>
                      <div className="infoSection">
                        <span className="infoTitle">{"Código"}</span>
                        <span className="infoBody">{procedure.codigo}</span>
                      </div>
                      <div className="infoSection">
                        <span className="infoTitle">{"Reclamado"}</span>
                        <span className="infoBody">
                          {procedure.reclamadoRDS}
                        </span>
                      </div>
                      <div className="infoSection">
                        <span className="infoTitle">{"Diferencia RD$"}</span>
                        <span className="infoBody">
                          {procedure.diferenciaRDS}
                        </span>
                      </div>
                      <div className="infoSection">
                        <span className="infoTitle">{"Autorizado RD$"}</span>
                        <span className="infoBody">
                          {procedure.autorizadoRDS}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">
                <img src={img1} alt="No data" />
                <p>No hay datos que mostrar</p>
                <button onClick={openModal}>
          <img src={img2} style={{ width: '19px', height: '16px', margin:'9px'}} />
          Editar procedimientos
        </button>
              </div>
            )}
          </div>
        </div>
        {procedures.length > 0 &&

        <button onClick={openModal}>
          <img src={img2} style={{ width: '19px', height: '16px', margin:'9px'}} />
          Editar procedimientos
        </button>
}
      </div>
      {nextToken && (
        <button onClick={() => fetchProcedures(nextToken)}>Cargar más</button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onCreate={handleAddProcedure}
      >
        <div style={{ gap: 32, display: "flex", flexDirection: "column", overflowY: 'auto', height: '100%', overflowX: 'hidden' }}>
          {editingProcedure &&
            editingProcedure.map((procedure, idx) => (
              <div style={{display: 'flex',
                alignItems: 'center', gap: '3%'}} key={idx}>
                <div style={{height:'10px'}}>
                  <img
                  onClick={() => handleDeleteProcedure(procedure.id)}
                    src={trash}
                    style={{
                      width: "20.57px",
                      height: "27px",
                      cursor: 'pointer'
                    }}
                  />
                </div>
              <div className="editForm">

                <div className="editSection">
                  <span className="infoEditTitle">{"Procedimiento "}</span>

                  <input
                    key={idx}
                    name="nombre"
                    onChange={(e) => handleInputChange(e, idx, 'nombre')}
                    value={procedure.nombre}
                    placeholder="Nombre"
                 
                  />
                </div>
                <div className="editSection">
                  <span className="infoEditTitle">{"Código"}</span>
                  <input
                    name="codigo"
                    onChange={(e) => handleInputChange(e, idx, 'codigo')}
                    value={procedure.codigo}
                    placeholder="Código"
                      type="number"
                  />
                </div>
                <div className="editSection">
                  <span className="infoEditTitle">{"Reclamado"}</span>
                  <input
                    name="reclamadoRDS"
                    onChange={(e) => handleInputChange(e, idx, 'reclamadoRDS')}
                    value={procedure.reclamadoRDS}
                    placeholder="Reclamado RD$"
                      type="number"
                  />
                </div>
                <div className="editSection">
                  <span className="infoEditTitle" >{"Diferencia RD$"}</span>
                  <input
                    name="diferenciaRDS"
                    onChange={(e) => handleInputChange(e, idx, 'diferenciaRDS')}
                    value={procedure.diferenciaRDS}
                    placeholder="Diferencia RD$"
                      type="number"
                  />
                </div>
                <div className="editSection">
                  <span className="infoEditTitle">{"Autorizado RD$"}</span>
                  <input
                    name="autorizadoRDS"
                    onChange={(e) => handleInputChange(e, idx, 'autorizadoRDS')}
                    value={procedure.autorizadoRDS}
                    placeholder="Autorizado RD$"
                    type="number"
                  />
                </div>
              </div>
              </div>
            ))}
        </div>

      </Modal>
    </div>
  );
}
