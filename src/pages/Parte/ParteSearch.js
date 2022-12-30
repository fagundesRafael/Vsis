import styles from "./ParteSearch.module.css"

import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import { Link } from "react-router-dom"

import PartesDashboard from "../../components/extras/PartesDashboard"

const ParteSearch = () => {
  const query = useQuery()
  const search = query.get('q')

  const {documents: partes} = useFetchDocuments('partes', search)

  return (
    <div className={styles.search_container}>
      <h2>
        Resultado da <span>pesquisa:</span>
      </h2>
      {partes && partes.length === 0 && (
        <>
        <h3>Seu parâmetro de busca não encontrou nenhum objeto... </h3>
        <h3>Verifique o nome informado no campo de busca...</h3>
        </>
      )}
      {partes && partes.map(parte => (
        <PartesDashboard key={parte.id} parte={parte} />
      ))}
      <Link to='/partes' className="btn btn-dark">Voltar</Link>
    </div>
  )
}

export default ParteSearch