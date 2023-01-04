import styles from "./IPLSearch.module.css";

import { useFetchDocumentsIPLs } from "../../hooks/useFetchDocumentsIPLs";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

import IPLsDashboard from "../../components/extras/IPLsDashboard";

const IPLSearch = () => {
  const query = useQuery();
  const search = query.get("q");

  const {documents: IPLs} = useFetchDocumentsIPLs('IPLs', search)

  return (
    <div className={styles.search_container}>
      <h2>
        Resultado da <span>pesquisa:</span>
      </h2>
      {IPLs && IPLs.length === 0 && (
        <>
        <h3>Seu parâmetro de busca não encontrou nenhum objeto... </h3>
        <h3>Verifique o número de inquérito informado no campo de busca...</h3>
        </>
      )}
      {IPLs && IPLs.map(IPL => (
        <IPLsDashboard key={IPL.id} IPL={IPL} />
      ))}
      <Link to='/inqueritos' className="btn btn-dark">Voltar</Link>
    </div>
  )
};

export default IPLSearch;
