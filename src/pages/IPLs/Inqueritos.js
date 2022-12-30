import styles from './Inqueritos.module.css'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import IPLsDashboard from '../../components/extras/IPLsDashboard';

const Inqueritos = () => {
  const [queryNumber, setQueryNumber] = useState("");
  const [queryCPF, setQueryCPF] = useState("");
  const [queryParents, setQueryParents] = useState("");
  const { documents: IPLs, loading } = useFetchDocuments("IPLs");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (queryNumber) {
      return navigate(`/inqueritos/search?q=${queryNumber}`);
    }

    // if (queryCPF) {
    //   let selectedCPF = (partes.find((parte) => parte.cpf === queryCPF));
    //   setQueryName(selectedCPF.name)
    //   return navigate(`/inqueritos/search?q=${queryName}`);
    // }

    // if (queryParents) {
    //   let selectedParents = partes.find(
    //     (parte) =>
    //       parte.motherName === queryParents.toUpperCase() ||
    //       parte.fatherName === queryParents.toUpperCase()
    //   );
    //   return navigate(`/inqueritos/search?q=${selectedParents.name}`);
    // }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_body}>
      <h2>
        Lista de <span>Inquéritos</span> no banco de dados:
      </h2>
      <form className={styles.form_new} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="informe o número do Inquérito"
          onChange={(e) => setQueryNumber(e.target.value.toUpperCase())}
        />
        <button className={styles.btn_query}>pesquisar IPL</button>
        {/* <input
          type="text"
          placeholder="informe nome da mãe ou do pai"
          onChange={(e) => setQueryParents(e.target.value)}
        />
        <button className={styles.btn_query}>pesquisar mãe/pai</button>
        <input
          type="text"
          placeholder="informe o cpf da parte"
          onChange={(e) => setQueryCPF(e.target.value)}
        />
        <button className={styles.btn_query}>pesquisar CPF</button> */}
      </form>
      <div className={styles.peopleList}>
        {loading && <h1>Carregando...</h1>}
        {IPLs && IPLs.length === 0 && (
          <div className={styles.noIPLs}>
            <p>
              Banco de dados vazio. <br />
              Insira mais pessoas no menu <span>inserir</span> e depois escolha
              a opção <span>partes</span> ou clique em:{" "}
              <Link to="/inserir/parte">Inserir</Link> <br />
              Após a inserção de uma nova pessoa, retorne a esta página e
              verifique as pessoas listadas!
            </p>
          </div>
        )}
        {IPLs &&
          IPLs.map((IPL) => (
            <IPLsDashboard key={IPL.id} IPL={IPL} />
          ))}
      </div>
    </div>
    </div>
  )
}

export default Inqueritos