import styles from "./Início.module.css";

import { Link } from "react-router-dom";

import { useAuthentication } from "../../../hooks/useAuthentication";

import { useAuthValue } from "../../../contexts/AuthContext";

const Início = () => {
  const { user } = useAuthValue();

  return (
    <div className={styles.general_container}>
      <div className={styles.top_container}>
        <h1>
          Seja bem vindo Sr(a)<span>{user.displayName.split(" ")[0]}!</span>
        </h1>
        <p>
          Novidades do <span>Vsis versão WEB</span> estarão disponíveis nas
          próprias notificações de scripts padrões de seu navegador.
        </p>
      </div>
      <div className={styles.botton_container}>
        <Link to='/inqueritos'>INQUÉRITOS</Link>
        <Link to='/circunstanciados' >CIRCUNSTANCIADOS</Link>
        <Link>PAAIS</Link>
        <Link>OFÍCIOS</Link>
        <Link>ORDENS DE MISSÃO</Link>
        <Link to='/partes'>PARTES</Link>
        <Link>PEÇAS</Link>
        <Link>INTIMAÇÕES</Link>
        <Link>OBJETOS</Link>
        <Link>RESTITUIÇÕES</Link>
        <Link>VENCIMENTOS</Link>
        <Link>PROTETIVAS</Link>
        <Link>COTAS</Link>
        <Link>ESTATÍSTICAS</Link>
      </div>
    </div>
  );
};

export default Início;
