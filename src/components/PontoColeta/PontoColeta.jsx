import './PontoColeta.css'

import MyLocationIcon from '@mui/icons-material/MyLocation';

function PontoColeta({id, nome, logradouro, uf, residuos, deletePonto}) {


    return(
        <li className='card-ponto'>
            <h1 className='nome-ponto'>{nome} <button type='button' onClick={() => (deletePonto(id))}>Excluir</button></h1>
            <div id='localizacao'>
                <MyLocationIcon style={{fontSize: '12px'}} />
                <p className='endereco-ponto'>{logradouro} / {uf}</p>
            </div>
            <ul className='residuos-ponto'>{residuos.map((residuo, index) => (
                <li key={index}>{residuo}</li>
            ))}</ul>
        </li>
    )
}

export default PontoColeta;