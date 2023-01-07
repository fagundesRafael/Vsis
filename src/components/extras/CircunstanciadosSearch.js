import styles from "./CircunstanciadosSearch.module.css";

import { useFetchDocumentsTCs } from "../../hooks/useFetchDocumentsTCs";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

import CircunstanciadosDashboard from "./CircunstanciadosDashboard";

const CircunstanciadosSearch = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: TCs } = useFetchDocumentsTCs("TCs", search);

  return (
    <div className={styles.search_container}>
      <h2>
        Resultado da <span>pesquisa:</span>
      </h2>
      {TCs && TCs.length === 0 && (
        <>
          <h3>Seu parâmetro de busca não encontrou nenhum objeto... </h3>
          <h3>
            Verifique o número de TC informado no campo de busca...
          </h3>
        </>
      )}
      {TCs && TCs.map((TC) => <CircunstanciadosDashboard key={TC.id} TC={TC} />)}
      <Link to="/circunstanciados" className="btn btn-dark">
        Voltar
      </Link>
    </div>
  );
};

export default CircunstanciadosSearch;
