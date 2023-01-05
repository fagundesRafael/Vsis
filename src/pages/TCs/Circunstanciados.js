import styles from './Circunstanciados.module.css'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import InputMask from "react-input-mask";
import CircunstanciadosDashboard from '../../components/extras/CircunstanciadosDashboard';

const Circunstanciados = () => {
  const [queryNumber, setQueryNumber] = useState("");
  const [policeReport, setPoliceReport] = useState("");
  const [queryVictim, setQueryVictim] = useState("");
  const [queryDefendand, setQueryDefendant] = useState("");
  const { documents: TCs, loading } = useFetchDocuments("TCs");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (queryNumber) {
      return navigate(`/circunstanciados/search?q=${queryNumber}`);
    }

    if (policeReport) {
      let selectedReport = TCs.find((TC) => TC.circunstanciado.ocorrencia === policeReport);
      return navigate(`/circunstanciados/search?q=${selectedReport.circunstanciado.numero}`);
    }

    if (queryVictim) {
      let selectedVictim = TCs.find((TC) => TC.partes.vitimas === queryVictim);
      return navigate(`/circunstanciados/search?q=${selectedVictim.circunstanciado.numero}`);
    }

    if (queryDefendand) {
      let selectedDefendant = TCs.find((TC) => TC.partes.suspeitos === queryDefendand);
      return navigate(`/circunstanciados/search?q=${selectedDefendant.circunstanciado.numero}`);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_body}>
        <h2>
          Lista de <span>Termos Circunstanciados</span>:
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
          {TCs && TCs.length === 0 && (
            <div className={styles.noTCs}>
              <p>
                Banco de dados vazio. <br />
                Insira mais TCs no menu <span>inserir</span> e depois
                escolha a opção <span>partes</span> ou clique em:{" "}
                <Link to="/novocircunstanciado">Inserir</Link> <br />
                Após a inserção de um novo TC, retorne a esta página e
                verifique a lista de TCs!
              </p>
            </div>
          )}
          {TCs && TCs.map((TC) => <CircunstanciadosDashboard key={TC.id} TC={TC} />)}
        </div>
      </div>
    </div>
  )
}

export default Circunstanciados