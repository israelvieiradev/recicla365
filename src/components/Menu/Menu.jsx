import { Link } from 'react-router';

import './Menu.css';

function Menu() {
    return (
        <nav className='menu'>
            <section className='botoes-navegacao'>
                <Link to='/dashboard'><button className='botao-navegacao'>Dashboard</button></Link>
                <Link to='/locais'><button className='botao-navegacao'>Locais</button></Link>
            </section>

            <Link to='/'><button className='botao-sair'>Sair</button></Link>
        </nav>
    )
}

export default Menu