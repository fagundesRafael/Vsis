import styles from "./AccountCreate.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const AccountCreate = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
      confirmPassword,
    };

    if (confirmPassword !== password) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    if (res) {
      navigate('/')
    }
  
  };

  const toHome = () => {
    navigate('/')
  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.createaccount_container}>
      <div className={styles.form_container}>
        <h2>
          Cadastre-se para <span>utilizar</span> o Vsis:
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome do usuário:</span>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Informe o nome de usuário"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
          <label>
            <span>E-mail de usuário:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Seu login será obrigatoriamente seu email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Defina uma senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <label>
            <span>Confirme a senha:</span>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </label>
          {!loading ? (
            <button className="btn">
              Cadastrar
            </button>
          ) : (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          <button className="btn-red" onClick={toHome}>Voltar</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p>
          Antes mesmo de registrar sua conta, solicite para a central de
          atendimento para a listagem de seu e-mail.
          <br />
          Nenhuma conta, em nenhuma hipótese será criada sem a prévia
          autorização da central de atendimento.
          <br />
          Informe-se com o RH dos documentos pertinentes a serem anexados via
          e-mail para a conclusão do pedido de autorização.
        </p>
      </div>
    </div>
  );
};

export default AccountCreate;
