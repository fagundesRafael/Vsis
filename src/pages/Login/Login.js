import styles from "./Login.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    if (res) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login_container}>
      <div className={styles.form_container}>
        <h2>
          Informe o usuário<span>e senha</span>:
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Usuário:</span>
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
              placeholder="Informe sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          {!loading ? (
            <button className="btn">Entrar</button>
          ) : (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        </form>
        <a href="/accountcreate">Não possui conta de acesso?</a>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
