import React from 'react'
import { useState } from 'react'
import { useStates } from '../../hooks/useStates'
import { useCities } from '../../hooks/useCities'

const FetchLocation = () => {
    const [selectedState, setSelectedState] = useState('RO')
    const [selectedCity, setSelectedCity] = useState('MACHADINHO D OESTE')
    const {states} = useStates()
    const {cities} = useCities({siglaUF: selectedState})

  return (
    <div>
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            {states.map((estado) => (
                <option value={estado.sigla} key={estado.id}>{estado.sigla}</option>
            ))}
        </select>
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} >
            {cities.map((cidade) => (
                <option value={cidade.nome} key={cidade.codigo_ibge}>{cidade.nome}</option>
            ))}
        </select>
    </div>
  )
}

export default FetchLocation