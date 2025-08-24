import Menu from '../../components/Menu/Menu';
import PontoColeta from '../../components/PontoColeta/PontoColeta'

import { useState, useEffect } from 'react';
import { Link } from 'react-router';


import './Places.css'

function Places() {

  const usuarioLogado = JSON.parse(localStorage.getItem("@usuario")) || '';
  const usuarioId = usuarioLogado.usuario.id;
  const [pontosUsuario, setPontosUsuario] = useState([]);

  console.log(pontosUsuario);

  useEffect(() => {
    fetch('http://localhost:3000/coletas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // informa que o corpo está em JSON
        usuarioId: usuarioId
      }
    })
    .then(res => {
        if (!res.ok) throw new Error("Locais não encontrados ou erro na API.");
        return res.json();
    })
    .then(pontosUsuario => {
      setPontosUsuario(pontosUsuario)
    })
    .catch(err => {
      console.error("Erro ao buscar locais:", err.message);
    });
  }, [])

  function handleClick(id) {

    fetch(`http://localhost:3000/coletas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            usuarioId: usuarioId
        }
    })
    .then(res => {
    if (!res.ok) throw new Error('Erro ao excluir');
    return res.json();
    })
    .then(() => {
        setPontosUsuario(pontos => pontos.filter(ponto=> ponto.id !== id));
        alert('Ponto de coleta excluído com sucesso!')
    })
    .catch(err => {
    console.error('Erro:', err.message);
    });
  }


  return (
    <div className='pagina-places'>
      <Menu></Menu>
      <section className='cabecalho-places'>
        <h1>Seus pontos de coletas</h1>
        <Link to='novo'><button type='button' className='btn-criar-ponto'>Cadastrar</button></Link>
      </section>
      <ul className='cards'>
        {pontosUsuario.map((pontoUsuario, index) => (
          <PontoColeta 
          key={index} id={pontoUsuario.id} nome={pontoUsuario.nome} 
          logradouro={pontoUsuario.endereco.logradouro}
          uf={pontoUsuario.endereco.uf}
          residuos={pontoUsuario.residuos} deletePonto={() => handleClick(pontoUsuario.id)}></PontoColeta>
        ))}
      </ul>
    </div>
  )
}

export default Places;

