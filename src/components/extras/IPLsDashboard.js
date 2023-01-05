import styles from "./IPLsDashboard.module.css";

import { Link } from "react-router-dom";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

const IPLsDashboard = ({ IPL }) => {
  const { deleteDocument } = useDeleteDocument("IPLs");

  return (
    <div className={styles.main_square}>
      <div className={styles.number_tree}>
        <h6>IPL: {IPL.inquerito.numero}</h6>
        {IPL.inquerito.MP ? (
          <p>Ordem Ministerial: {IPL.inquerito.MP}</p>
        ) : (
          <p>Ocorrência policial: {IPL.inquerito.ocorrencia}</p>
        )}
        {IPL.infos === "URGENTE" && <p><span>{IPL.infos}</span></p>}
        {IPL.infos === "COTA" && <p className={styles.cota} >{IPL.infos}</p>}
      </div>
      <div className={styles.partes}>
        <h6>Partes:</h6>
        <p>Vítimas: {IPL.partes.vitimas}</p>
        <p>Infratores: {IPL.partes.suspeitos}</p>
      </div>
      <div className={styles.crime_type}>
        <h6>Tipo:</h6>
        <p>{IPL.tipo.artigo}</p>
        <p>{IPL.tipo.classe}</p>
        <p>{IPL.tipo.categoria}</p>
      </div>
      <div className={styles.data}>
        <h6>Eventos:</h6>
        <p>
          Ocorrido {IPL.informacoes.data_fato}, às {IPL.informacoes.hora_fato}{" "}
          horas.
        </p>
        <p>Conduzido apresentado no dia {IPL.informacoes.data_prisão}.</p>
      </div>
      <div className={styles.status}>
        <p>Procedimento: {IPL.ordinance}</p>
        {IPL.status === "PRESO" ? (
          <p>
            <span>RÉU: {IPL.status}</span>
          </p>
        ) : (
          <p>RÉU: {IPL.status}</p>
        )}
        <p>Seção atual: {IPL.sectional}</p>
      </div>
      <div>
        <Link to={`/inqueritos/${IPL.id}`} className={styles.edit_button}>
          <RiIcons.RiEdit2Line /> Editar
        </Link>
        <button
          onClick={() => deleteDocument(IPL.id)}
          className={styles.delete_button}
        >
          <MdIcons.MdDeleteOutline /> Excluir
        </button>
      </div>
    </div>
  );
};

export default IPLsDashboard;
