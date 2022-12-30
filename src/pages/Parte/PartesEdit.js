import styles from "./PartesEdit.module.css";

import InputMask from "react-input-mask";

import { useState, useEffect } from "react";
import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";

import { useAuthValue } from "../../contexts/AuthContext";

import { useParams, useNavigate } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const PartesEdit = () => {
  const { id } = useParams();
  const { document: parte, loading } = useFetchDocument("partes", id);

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

  const navigate = useNavigate();

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("partes");

  useEffect(() => {
    if (parte) {
      setName(parte.name)
      setMotherName(parte.motherName);
      setFatherName(parte.fatherName);
      setRg(parte.rg);
      setCpf(parte.cpf);
      setGender(parte.gender);
      setBirthday(parte.birthday);
      setAddress(parte.address);
      setPhoneNumber(parte.phoneNumber);
      setProfession(parte.profession);
      setIfSingle(parte.ifSingle);
      setError(parte.error);
      setSelectedState(parte.birthPlace.state);
      setSelectedCity(parte.birthPlace.city);
    }
  }, [parte]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const data = {
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
    }

    updateDocument(id, data);

    navigate("/partes");
  };

  const cancel = () => {
    navigate("/partes");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
        <h2>
          Página de <span>atualização</span> cadastral:
        </h2>
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
            <button className="btn">Atualizar</button>
          ) : (
            <button className="btn" disabled>
              Inserindo...
            </button>
          )}
          <button className="btn-red" onClick={cancel}>
            Voltar
          </button>
        </form>
        {response.error && <p className="error">{response.error}</p>}
      </div>
    </div>
  );
};

export default PartesEdit;
