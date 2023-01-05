import styles from "./NovoCircunstanciado.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";
import { useCrimeTypes } from "../../hooks/useCrimeTypes";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import PartesList from "../../components/extras/PartesList";
import InputMask from "react-input-mask";

const NovoCircunstanciado = () => {
  const { insertDocument, response } = useInsertDocument("TCs");
  const { documents: partes } = useFetchDocuments("partes");
  const { documents: TCs } = useFetchDocuments("TCs");

  const [selectedVictim, setSelectedVictim] = useState("");
  const [selectedDefendant, setSelectedDefendant] = useState("");

  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [ocurrencyNumber, setOcurrencyNumber] = useState("");
  const [ministri, setMinistri] = useState("");
  const [dateCreate, setDateCreate] = useState("");
  const [dateFact, setDateFact] = useState("");
  const [hourFact, setHourFact] = useState("");
  const [datePrison, setDatePrison] = useState("");
  const [addressFact, setAddressFact] = useState("");
  const [selectedState, setSelectedState] = useState("RO");
  const [selectedCity, setSelectedCity] = useState("MACHADINHO D'OESTE");
  const [crimeType, setCrimeType] = useState("");
  const [crimeKind, setCrimeKind] = useState("");
  const [article, setArticle] = useState("");
  const [clerk, setClerk] = useState("");
  const [chief, setChief] = useState("");
  const [sectional, setSectional] = useState("");

  const { states } = useStates();
  const { cities } = useCities({ siglaUF: selectedState });
  const { crimeTypes } = useCrimeTypes();

  const navigate = useNavigate();

  async function chekTC() {
    var checkTCNumber = await TCs.find(
      (TC) => TC.circunstanciado.numero === number
    );
    if (checkTCNumber) {
      setError(
        `Número de TC ${number} já existente no banco de dados.\nPor favor informe um número novo.`
      );
    } else {
      setError("");
    }
  }

  useEffect(() => {
    chekTC();
  }, [number]);

  async function handleSubmit(e) {
    e.preventDefault();

    insertDocument({
      circunstanciado: { numero: number, ocorrencia: ocurrencyNumber, MP: ministri },
      informacoes: {
        portaria: dateCreate,
        data_fato: dateFact,
        hora_fato: hourFact,
        data_prisão: datePrison,
      },
      local: {
        endereco: addressFact,
        cidade: selectedCity,
        estado: selectedState,
      },
      tipo: { categoria: crimeKind, artigo: article, classe: crimeType },
      partes: { vitimas: selectedVictim, suspeitos: selectedDefendant },
      team: { escrivao: clerk, delegado: chief },
      sectional,
    });

    navigate("/circunstanciados");
  }

  const cancel = () => {
    navigate("/inserir");
  };

  return (
    <div className={styles.novo_circunstanciado_container}>
      <div className={styles.form_container}>
        <h2>
          Cadastrar novo <span>Termo Circunstanciado:</span>
        </h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.rowData}>
            <label>
              <span>Número do TC:</span>
              <InputMask
                mask="999/9999"
                placeholder="Número do TC e ano:"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            </label>
            <label>
              <span>Ocorrência policial:</span>
              <input
                type="text"
                name="ocurrencyNumber"
                placeholder="Número da ocorrência:"
                onChange={(e) => setOcurrencyNumber(e.target.value)}
                value={ocurrencyNumber}
              />
            </label>
            <label>
              <span>Decisão MP:</span>
              <input
                type="text"
                name="ocurrencyNumber"
                placeholder="Número da ordem:"
                onChange={(e) => setMinistri(e.target.value)}
                value={ministri}
              />
            </label>
          </div>
          <div className={styles.rowData}>
            <label>
              <span className={styles.special_span}>Data da Portaria:</span>
              <input
                type="date"
                onChange={(e) => setDateCreate(e.target.value)}
                required
                value={dateCreate}
              />
            </label>
            <label>
              <span className={styles.special_span}>Data da prisão:</span>
              <input
                type="date"
                onChange={(e) => setDatePrison(e.target.value)}
                value={datePrison}
              />
            </label>
            <label>
              <span className={styles.special_span}>Data do fato:</span>
              <input
                type="date"
                onChange={(e) => setDateFact(e.target.value)}
                value={dateFact}
              />
            </label>
            <label>
              <span className={styles.special_span}>Hora do fato:</span>
              <input
                type="time"
                onChange={(e) => setHourFact(e.target.value)}
                value={hourFact}
              />
            </label>
          </div>
          <div className={styles.rowData}>
            <div>
              <label htmlFor="">
                <span>Endereço da ocorrência:</span>
                <input
                  type="text"
                  name="addressFact"
                  placeholder="Rua, número e bairro:"
                  onChange={(e) => setAddressFact(e.target.value)}
                  value={addressFact}
                />
              </label>
            </div>
            <label>
              <span>Local do fato:</span>
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
          </div>
          <div className={styles.rowData}>
            <div>
              <label>
                <span>Natureza do fato:</span>
                <input
                  type="text"
                  name="crimeType"
                  placeholder="Descreva sobre crime em tela:"
                  onChange={(e) => setCrimeType(e.target.value)}
                  value={crimeType}
                  required
                />
              </label>
              <label>
                <select
                  value={crimeKind}
                  onChange={(e) => setCrimeKind(e.target.value)}
                  required
                >
                  {crimeTypes.map((crime) => (
                    <option key={crime.id} value={crime.crime}>
                      {crime.crime}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              <span>Tipificação:</span>
              <input
                type="text"
                name="Tipification"
                placeholder="informe o artigo penal:"
                onChange={(e) => setArticle(e.target.value.toUpperCase())}
                value={article}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <span>Vítima(s):</span>
              <select
                value={selectedVictim}
                onChange={(e) => setSelectedVictim(e.target.value)}
                name="victim"
              >
                <option value=""></option>
                {partes && <PartesList partes={partes} />}
              </select>
            </label>
            <label>
              <span>Infrator(es)/Suspeito(s):</span>
              <select
                value={selectedDefendant}
                onChange={(e) => setSelectedDefendant(e.target.value)}
                name="defendant"
              >
                <option value=""></option>
                {partes && <PartesList partes={partes} />}
              </select>
            </label>
            <label>
              <span>Escrivão:</span>
              <select
                value={clerk}
                onChange={(e) => setClerk(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Danilo dos Santos Silva Bortolotti">
                  Danilo dos Santos Silva Bortolotti
                </option>
                <option value="Enoque Alencar de Souza">
                  Enoque Alencar de Souza
                </option>
                <option value="Paula Fabianne Lovo da Rocha">
                  Paula Fabianne Lovo da Rocha
                </option>
                <option value="Rafael Rodrigues Fagundes">
                  Rafael Rodrigues Fagundes
                </option>
              </select>
            </label>
            <label>
              <span>Autoridade Policial:</span>
              <select
                value={chief}
                onChange={(e) => setChief(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Celso André Kondageski">
                  Celso André Kondageski
                </option>
                <option value="Caritiana Cuellar da Silva">
                  Caritiana Cuellar da Silva
                </option>
                <option value="Rodrigo Spiça">Rodrigo Spiça</option>
                <option value="Salomão de Mattos Chaves">
                  Salomão de Mattos Chaves
                </option>
              </select>
            </label>
            <label>
              <span>Seção atual:</span>
              <select
                value={sectional}
                onChange={(e) => setSectional(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Cartório">Cartório</option>
                <option value="Ministério Público">Ministério Público</option>
                <option value="Fórum">Fórum</option>
                <option value="Relatado">Relatado</option>
                <option value="Sala do Delegado">Sala do Delegado</option>
                <option value="Outros">Outros</option>
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
        {response.error && <p className={styles.error}>{response.error}</p>}
      </div>
    </div>
  );
};

export default NovoCircunstanciado;
