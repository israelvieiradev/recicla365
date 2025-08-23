import './PontoColeta.css'

import { useState, useEffect} from 'react';

function PontoColeta({key, nome, logradouro, uf, residuos, deletePonto}) {


    return(
        <li className='card-ponto'>
            <h1 className='nome-ponto'>{nome} <button type='button' onClick={() => (deletePonto(key))}>Excluir</button></h1>
            <p className='endereco-ponto'>{logradouro} / {uf}</p>
            <ul className='residuos-ponto'>{residuos.map((residuo, index) => (
                <li key={index}>{residuo}</li>
            ))}</ul>
        </li>
    )
}

export default PontoColeta;