import styles from "./Inqueritos.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import InputMask from "react-input-mask";
import IPLsDashboard from "../../components/extras/IPLsDashboard";

const Inqueritos = () => {
  const [queryNumber, setQueryNumber] = useState("");
  const [policeReport, setPoliceReport] = useState("");
  const [queryVictim, setQueryVictim] = useState("");
  const [queryDefendand, setQueryDefendant] = useState("");
  const { documents: IPLs, loading } = useFetchDocuments("IPLs");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (queryNumber) {
      return navigate(`/inqueritos/search?q=${queryNumber}`);
    }

    if (policeReport) {
      let selectedReport = IPLs.find((IPL) => IPL.inquerito.ocorrencia === policeReport);
      return navigate(`/inqueritos/search?q=${selectedReport.inquerito.numero}`);
    }

    if (queryVictim) {
      let selectedVictim = IPLs.find((IPL) => IPL.partes.vitimas === queryVictim);
      return navigate(`/inqueritos/search?q=${selectedVictim.inquerito.numero}`);
    }

    if (queryDefendand) {
      let selectedDefendant = IPLs.find((IPL) => IPL.partes.suspeitos === queryDefendand);
      return navigate(`/inqueritos/search?q=${selectedDefendant.inquerito.numero}`);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_body}>
        <h2>
          Lista de <span>Inquéritos</span> no banco de dados:
        </h2>
        <form className={styles.form_new} onSubmit={handleSubmit}>
          <InputMask
            mask="999/9999"
            placeholder="NÚMERO DO IPL"
            onChange={(e) => setQueryNumber(e.target.value.toUpperCase())}
            value={queryNumber}
          />
          <input
            type="text"
            placeholder="DA OCORRÊNCIA"
            onChange={(e) => setPoliceReport(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            placeholder="NOME DA VÍTIMA"
            onChange={(e) => setQueryVictim(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            placeholder="OU DO(A) INFRATOR(A)"
            onChange={(e) => setQueryDefendant(e.target.value.toUpperCase())}
          />
          <button className={styles.btn_query}>Pesquisar</button>
        </form>
        <div className={styles.peopleList}>
          {loading && <h1>Carregando...</h1>}
          {IPLs && IPLs.length === 0 && (
            <div className={styles.noIPLs}>
              <p>
                Banco de dados vazio. <br />
                Insira mais pessoas no menu <span>inserir</span> e depois
                escolha a opção <span>partes</span> ou clique em:{" "}
                <Link to="/novoinquerito">Inserir</Link> <br />
                Após a inserção de uma nova pessoa, retorne a esta página e
                verifique as pessoas listadas!
              </p>
            </div>
          )}
          {IPLs && IPLs.map((IPL) => <IPLsDashboard key={IPL.id} IPL={IPL} />)}
        </div>
      </div>
    </div>
  );
};

export default Inqueritos;
