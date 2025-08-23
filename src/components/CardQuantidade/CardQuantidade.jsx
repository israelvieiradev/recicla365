import './CardQuantidade.css'

function CardQuantidade({estado, quantidade}) {
    return(
        <li className='card-estado'>
            <h3 className='titulo-card'>{estado}</h3>
            <span className='quantidade-estado'>{quantidade}</span>
        </li>
    )
}

export default CardQuantidade;