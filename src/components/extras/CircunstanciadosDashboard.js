import styles from "./CircunstanciadosDashboard.module.css";

import { Link } from "react-router-dom";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

const CircunstanciadosDashboard = ({ TC }) => {
  const { deleteDocument } = useDeleteDocument("TCs");

  return (
    <div className={styles.main_square}>
      <div className={styles.number_tree}>
        <h6>TC: {TC.circunstanciado.numero}</h6>
        {TC.circunstanciado.MP ? (
          <p>Ordem Ministerial: {TC.circunstanciado.MP}</p>
        ) : (
          <p>Ocorrência policial: {TC.circunstanciado.ocorrencia}</p>
        )}
      </div>
      <div className={styles.partes}>
        <h6>Partes:</h6>
        <p>Vítimas: {TC.partes.vitimas}</p>
        <p>Infratores: {TC.partes.suspeitos}</p>
      </div>
      <div className={styles.crime_type}>
        <h6>Tipo:</h6>
        <p>{TC.tipo.artigo}</p>
        <p>{TC.tipo.classe}</p>
        <p>{TC.tipo.categoria}</p>
      </div>
      <div className={styles.data}>
        <h6>Eventos:</h6>
        <p>
          Ocorrido {TC.informacoes.data_fato}, às {TC.informacoes.hora_fato}{" "}
          horas.
        </p>
        <p>Conduzido apresentado no dia {TC.informacoes.data_prisão}.</p>
      </div>
      <div className={styles.status}>
        <h6>Seção atual: </h6>
        <p>{TC.sectional}</p>
      </div>
      <div>
        <Link to={`/circunstanciados/${TC.id}`} className={styles.edit_button}>
          <RiIcons.RiEdit2Line /> Editar
        </Link>
        <button
          onClick={() => deleteDocument(TC.id)}
          className={styles.delete_button}
        >
          <MdIcons.MdDeleteOutline /> Excluir
        </button>
      </div>
    </div>
  );
};

export default CircunstanciadosDashboard;
