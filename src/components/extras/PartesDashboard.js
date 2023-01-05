import styles from "./PartesDashboard.module.css";

import { Link } from "react-router-dom";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

const PartesDashboard = ({ parte }) => {
  const { deleteDocument } = useDeleteDocument("partes");

  return (
    <div className={styles.main_square}>
      <div className={styles.family_tree}>
        <h6>{parte.name}</h6>
        <p>MÃE: {parte.motherName}</p>
        <p>PAI: {parte.fatherName}</p>
      </div>
      <div className={styles.docs_data}>
        <h6>Documentos:</h6>
        <p>RG: {parte.rg}</p>
        <p>CPF: {parte.cpf}</p>
      </div>
      <div className={styles.birth_data}>
        <h6>Nascimento:</h6>
        <p>{parte.birthday}</p>
        <p>{parte.birthPlace.city}</p>
        <p>{parte.birthPlace.state}</p>
      </div>
      <div className={styles.contact}>
        <h6>Profissão:</h6>
        <p>{parte.profession}</p>
        <h6>Contato:</h6>
        <p>{parte.phoneNumber}</p>
      </div>
      <div className={styles.address}>
        <h6>Endereço:</h6>
        <p>{parte.address}</p>
      </div>
      <div>
        <Link to={`/partes/${parte.id}`} className={styles.edit_button}>
          <RiIcons.RiEdit2Line /> Editar
        </Link>
        <button
          onClick={() => deleteDocument(parte.id)}
          className={styles.delete_button}
        >
          <MdIcons.MdDeleteOutline /> Excluir
        </button>
      </div>
    </div>
  );
};

export default PartesDashboard;
