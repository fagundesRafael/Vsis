import React from 'react'

const PartesList = ({partes}) => {
  return (
    <>
        {partes.map((parte) => (
            <option key={parte.id} value={parte.name}>{parte.name}</option>
        ))}
    </>
  )
}

export default PartesList