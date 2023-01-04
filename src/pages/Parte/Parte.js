import styles from "./Parte.module.css";

import { useState, useEffect } from "react";
import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";
import InputMask from "react-input-mask";

import { useAuthValue } from "../../contexts/AuthContext";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useNavigate } from "react-router-dom";

const Parte = () => {
  const [name, setName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [ifSingle, setIfSingle] = useState("");
  const [error, setError] = useState("");

  const [selectedState, setSelectedState] = useState("RO");
  const [selectedCity, setSelectedCity] = useState("MACHADINHO D OESTE");
  const { states } = useStates();
  const { cities } = useCities({ siglaUF: selectedState });
  const { documents: partes } = useFetchDocuments("partes");
  const { insertDocument, response } = useInsertDocument("partes");

  const navigate = useNavigate();

  const { user } = useAuthValue();

  async function chekName() {
    var checkParteName = await partes.find((parte) => parte.name === name);
    if (checkParteName) {
      setError(
        `${name} já está cadastrado(a) no banco de dados.\nPor favor informe outro nome.`
      );
    } else {
      setError("");
    }
  }

  async function chekCPF() {
    var checkCPFNumber = await partes.find((parte) => parte.cpf === cpf);
    if (checkCPFNumber) {
      setError(
        `O CPF: ${cpf}, já está cadastrado(a) no banco de dados.\nPor favor informe outro número válido.`
      );
    } else {
      setError("");
    }
  }

  useEffect(() => {
    chekName();
  }, [name]);

  useEffect(() => {
    chekCPF();
  }, [cpf]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    insertDocument({
      name,
      motherName,
      fatherName,
      rg,
      cpf,
      gender,
      birthday,
      birthPlace: { city: selectedCity, state: selectedState },
      address,
      phoneNumber,
      profession,
      ifSingle,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  const cancel = () => {
    navigate("/inserir");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
        <h2>
          <span>Informe</span> os dados pertinentes da pessoa:
        </h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="MainName"
              required
              placeholder="Nome da parte"
              onChange={(e) => setName(e.target.value.toUpperCase())}
              value={name}
            />
          </label>
          <label>
            <span>Mãe:</span>
            <input
              type="text"
              name="MotherName"
              required
              placeholder="Filiação (mãe)"
              onChange={(e) => setMotherName(e.target.value.toUpperCase())}
              value={motherName}
            />
          </label>
          <label>
            <span>Pai (se houver):</span>
            <input
              type="text"
              name="FatherName"
              placeholder="Filiação (pai)"
              onChange={(e) => setFatherName(e.target.value.toUpperCase())}
              value={fatherName}
            />
          </label>
          <div className={styles.rowData}>
            <label>
              <span>RG:</span>
              <InputMask
                mask="999999999"
                placeholder="sem os 'zeros' iniciais"
                onChange={(e) => setRg(e.target.value)}
                value={rg}
              />
            </label>
            <label>
              <span>CPF:</span>
              <InputMask
                mask="999.999.999-99"
                placeholder="somente números"
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
              />
            </label>
            <label>
              <span>SEXO:</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="NI">Outro</option>
              </select>
            </label>
          </div>
          <div className={styles.rowData}>
            <label>
              <span>Local de nascimento:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {states.map((estado) => (
                  <option value={estado.sigla} key={estado.id}>
                    {estado.sigla}
                  </option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map((cidade) => (
                  <option value={cidade.nome} key={cidade.codigo_ibge}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Nascimento:</span>
              <InputMask
                mask="99/99/9999"
                placeholder="DD/MM/AAAA"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
              {/* <FetchLocation /> */}
            </label>
          </div>
          <label>
            <span>Endereço:</span>
            <input
              type="text"
              name="FatherName"
              placeholder="endereço atual"
              onChange={(e) => setAddress(e.target.value.toUpperCase())}
              value={address}
            />
          </label>
          <div className={styles.rowData}>
            <label>
              <span>Contato telefônico:</span>
              <InputMask
                mask="(99)9-9999-9999"
                placeholder="(69) _-____ ____"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </label>
            <label>
              <span>Profissão:</span>
              <input
                type="text"
                name="profession"
                placeholder="ocupação / ofício"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
              />
            </label>
            <label>
              <span>Estado civil:</span>
              <select
                name="estado-civil"
                id=""
                onChange={(e) => setIfSingle(e.target.value)}
                value={ifSingle}
              >
                <option value="">não informado</option>
                <option value="solteiro(a)">solteiro</option>
                <option value="casado(a)">casado</option>
                <option value="amaseado(a)">amaseado</option>
                <option value="viúvo(a)">viúvo</option>
              </select>
            </label>
          </div>
          {!response.loading ? (
            <button className="btn">Inserir</button>
          ) : (
            <button className="btn" disabled>
              Inserindo...
            </button>
          )}
          <button className="btn-red" onClick={cancel}>
            Cancelar
          </button>
        </form>
        {response.error && <p className="error">{response.error}</p>}
      </div>
    </div>
  );
};

export default Parte;
