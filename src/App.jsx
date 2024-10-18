import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import img1 from "./assets/emptyIcon.png";
import img2 from "./assets/penIcon.png";
import { listProcedimientos, deleteProcedimiento, createProcedimiento } from "../server/src/graphql/queries.js";
import config from "../server/src/amplifyconfiguration.json";
import Modal from "./components/modal.jsx";
import trash from "./assets/trash.png";

Amplify.configure(config);

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [procedures, setProcedures] = useState([]);
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [nextToken, setNextToken] = useState(null);

  useEffect(() => {
    if (!window.__hasFetched__) {
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
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const handleDeleteProcedure = async (id) => {
    try {
      const proceduresUpdated = procedures.filter((p) => p.id !== id);
      setEditingProcedure(proceduresUpdated);
    } catch (error) {
      console.log("Error deleting procedure:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      await UpdateProcedures();
      console.log("Confirmado");
    } catch (error) {
      console.error('Error durante la confirmación:', error);
    } finally {
      closeModal();
    }
  };

  const handleAddProcedure =  () => {
     setEditingProcedure([
      ...editingProcedure,  // Mantén los procedimientos existentes
      {
        __typename
        : 
        "Procedimiento"}  // Añade el nuevo procedimiento
    ])
  }

  const UpdateProcedures = async () => {
    try {
     console.log(editingProcedure)
      const client = generateClient();
      for (let proc of editingProcedure) {
        console.log(proc)
        if(proc.id){

          await client.graphql({
            query: deleteProcedimiento,
            variables: {
              input: { id: proc.id }
            }
          });
        }

        await client.graphql({
          query: createProcedimiento,
          variables: {
            input: {
              nombre: proc.nombre,        // Campo válido
              codigo: proc.codigo,        // Campo válido
              reclamadoRDS: proc.reclamadoRDS,    // Campo válido
              diferenciaRDS: proc.diferenciaRDS,  // Campo válido
              autorizadoRDS: proc.autorizadoRDS   // Campo válido
              // createdAt y updatedAt no se deben pasar si no están definidos en el esquema
            }
          }
        });
      }
      setProcedures(editingProcedure);
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
    setEditingProcedure(procedures);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div>
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
                        <span className="infoSection">
                          {procedure.reclamadoRDS}
                        </span>
                      </div>
                      <div className="infodiv">
                        <span className="infoTitle">{"Diferencia RD$"}</span>
                        <span className="infoSection">
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
                <button>Editar procedimientos</button>
              </div>
            )}
          </div>
        </div>

        <button onClick={openModal}>
          <img src={img2} style={{ width: "30px" }} />
          Editar procedimientos
        </button>
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
        <div style={{ gap: 32, display: "flex", flexDirection: "column" }}>
          {editingProcedure &&
            editingProcedure.map((procedure, idx) => (
              <div style={{display: 'flex',
                alignItems: 'center', gap: '3%'}} key={procedure.id}>
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
                  <span className="infoTitle">{"Procedimiento "}</span>

                  <input
                    key={idx}
                    name="nombre"
                    onChange={(e) => handleInputChange(e, idx, 'nombre')}
                    value={procedure.nombre}
                    placeholder="Nombre"
                  />
                </div>
                <div className="editSection">
                  <span className="infoTitle">{"Código"}</span>
                  <input
                    name="codigo"
                    onChange={(e) => handleInputChange(e, idx, 'codigo')}
                    value={procedure.codigo}
                    placeholder="Código"
                  />
                </div>
                <div className="editSection">
                  <span className="infoTitle">{"Reclamado"}</span>
                  <input
                    name="reclamadoRDS"
                    onChange={(e) => handleInputChange(e, idx, 'reclamadoRDS')}
                    value={procedure.reclamadoRDS}
                    placeholder="Reclamado RD$"
                  />
                </div>
                <div className="editSection">
                  <span className="infoTitle">{"Diferencia RD$"}</span>
                  <input
                    name="diferenciaRDS"
                    onChange={(e) => handleInputChange(e, idx, 'diferenciaRDS')}
                    value={procedure.diferenciaRDS}
                    placeholder="Diferencia RD$"
                  />
                </div>
                <div className="editSection">
                  <span className="infoTitle">{"Autorizado RD$"}</span>
                  <input
                    name="autorizadoRDS"
                    onChange={(e) => handleInputChange(e, idx, 'autorizadoRDS')}
                    value={procedure.autorizadoRDS}
                    placeholder="Autorizado RD$"
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
