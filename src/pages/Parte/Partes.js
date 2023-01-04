import styles from "./Partes.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import PartesDashboard from "../../components/extras/PartesDashboard";
import InputMask from "react-input-mask";

const Partes = () => {
  const [queryName, setQueryName] = useState("");
  const [queryCPF, setQueryCPF] = useState("");
  const [queryParents, setQueryParents] = useState("");
  const { documents: partes, loading } = useFetchDocuments("partes");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (queryName) {
      return navigate(`/partes/search?q=${queryName}`);
    }

    if (queryCPF) {
      let selectedCPF = partes.find((parte) => parte.cpf === queryCPF);
      return navigate(`/partes/search?q=${selectedCPF.name}`);
    }

    if (queryParents) {
      let selectedParents = partes.find(
        (parte) =>
          parte.motherName === queryParents.toUpperCase() ||
          parte.fatherName === queryParents.toUpperCase()
      );
      return navigate(`/partes/search?q=${selectedParents.name}`);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_body}>
        <h2>
          Lista de <span>Partes inseridas</span> no banco de dados:
        </h2>
        <form className={styles.form_new} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="NOME DA PARTE"
            onChange={(e) => setQueryName(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            placeholder="FILIAÇÃO (PAI OU MÃE)"
            onChange={(e) => setQueryParents(e.target.value)}
          />
          <InputMask
            mask="999.999.999-99"
            placeholder="OU CPF"
            onChange={(e) => setQueryCPF(e.target.value)}
            value={queryCPF}
          />
          <button className={styles.btn_query}>Pesquisar</button>
        </form>
        <div className={styles.peopleList}>
          {loading && <h1>Carregando...</h1>}
          {partes && partes.length === 0 && (
            <div className={styles.noParts}>
              <p>
                Banco de dados vazio. <br />
                Insira mais pessoas no menu <span>inserir</span> e depois
                escolha a opção <span>partes</span> ou clique em:{" "}
                <Link to="/inserir/parte">Inserir</Link> <br />
                Após a inserção de uma nova pessoa, retorne a esta página e
                verifique as pessoas listadas!
              </p>
            </div>
          )}
          {partes &&
            partes.map((parte) => (
              <PartesDashboard key={parte.id} parte={parte} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Partes;
