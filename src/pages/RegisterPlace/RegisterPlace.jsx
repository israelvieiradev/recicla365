import Menu from '../../components/Menu/Menu';

import { useState } from 'react';

import './RegisterPlace.css';

function RegisterPlace() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });
  const [residuos, setResiduos] = useState([]);

  const [coordenadas, setCoordenadas] = useState({
    latitude: '',
    longitude: ''
  });

  const usuarioLogado = JSON.parse(localStorage.getItem("@usuario")) || '';

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch('http://localhost:3000/coletas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // informa que o corpo está em JSON
        usuarioId: usuarioLogado.usuario.id
      },
      body: JSON.stringify({
        nome,
        descricao,
        endereco,
        coordenadas,
        residuos
      })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return res.json();
    })
    .then((pontoColeta) => {
      console.log('Ponto de coleta cadastrado com sucesso:', pontoColeta);
      alert('Ponto de coleta cadastrado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao cadastrar ponto de coleta:', error);
      alert('Erro ao cadastrar ponto de coleta.');
    });      
  }

  function handleChange(event) {
    const { value, checked } = event.target;

    setResiduos((prevResiduos) => {
      if (checked) {
        // Adiciona o valor à lista anterior
        return [...prevResiduos, value];
      } else {
        // Remove o valor da lista anterior
        return prevResiduos.filter((item) => item !== value);
      }
    });
  }

  function localizarEndereco(cep) {
    if (cep.length === 8) {
      fetch(`http://localhost:3000/cep/${cep}`) 
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((enderecoObtido) => {
        setEndereco((prev) => ({
          ...prev,
          cep: enderecoObtido.cep,
          logradouro: enderecoObtido.logradouro,
          bairro: enderecoObtido.bairro,
          localidade: enderecoObtido.localidade,
          uf: enderecoObtido.uf
        }))
        setCoordenadas(enderecoObtido.coordenada || '');
        
        console.log(enderecoObtido);
      })
      .catch((error) => {
        console.error('Erro ao localizar endereço:', error);
        alert('Endereço não encotrado.');
      });
    }
  }
  

  return (
  <div className="pagina-cadastro-ponto">
    <Menu></Menu>
    <form className="formulario-cadastro-ponto" onSubmit={handleSubmit}>
      <h1 className="titulo-cadastro-ponto">Cadastro de ponto de coleta</h1>
      <p className='paragrafo-cadastro-coleta'>Adicione todos os pontos de coleta necessários antes de mudar de tela</p>

      <section className="campo-cadastro-ponto">
        <label htmlFor="nome-ponto">Nome do ponto</label>
        <input type="text" id="nome-ponto" name="nome-ponto" required value={nome} onChange={(event) => {
          setNome(event.target.value);
        }}/>
      </section>

      <section className="campo-cadastro-ponto">
        <label htmlFor="descricao">Descrição</label>
        <textarea name="descricao" id="descricao" required value={descricao} onChange={(event) => {
          setDescricao(event.target.value);
        }}></textarea>
      </section>

      <fieldset className="materiais-aceitos">
        <legend>Materiais aceitos</legend>
        <section className='material-aceito'>
          <input type="checkbox" id="vidro" name="vidro" value='Vidro' onChange={handleChange}/>
          <label htmlFor="vidro">Vidro</label>
        </section>

        <section className='material-aceito'>
          <input type="checkbox" id="papel" name="papel" value='Papel' onChange={handleChange}/>
          <label htmlFor="papel">Papel</label>
        </section>

        <section className='material-aceito'>
          <input type="checkbox" id="plastico" name="plastico" value='Plástico' onChange={handleChange}/>
          <label htmlFor="plastico">Plástico</label>
        </section>

        <section className='material-aceito'>
          <input type="checkbox" id="metal" name="metal" value='Metal' onChange={handleChange}/>
          <label htmlFor="metal">Metal</label>
        </section>

        <section className='material-aceito'>
          <input type="checkbox" id="organico" name="organico" value='Orgânico' onChange={handleChange}/>
          <label htmlFor="organico">Orgânico</label>
        </section>
      </fieldset>
      
      <fieldset className="endereco">
        <legend>Endereço</legend>
        <section className='secao-endereco'>
          <label htmlFor="cep">Cep</label>
          <input type="text" id="cep" name="cep" className='tamanho-input' value={endereco.cep} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["cep"]: event.target.value
            }))

            localizarEndereco(event.target.value)
          }}/>
        </section>

        <section className='secao-endereco'>
          <label htmlFor="logradouro">Logradouro</label>
          <input type="text" id="logradouro" name="logradouro" className='tamanho-input' value={endereco.logradouro} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["logradouro"]: event.target.value
            }))
          }}/>
        </section>

        <section className='secao-endereco'>
          <label htmlFor="bairro">Bairro</label>
          <input type="text" id="bairro" name="bairro" className='tamanho-input' value={endereco.bairro} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["bairro"]: event.target.value
            }))
          }}/>
        </section>

        <section className='secao-endereco'>
          <label htmlFor="numero">Número</label>
          <input type="text" id="numero" name="numero" className='tamanho-input' value={endereco.numero} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["numero"]: event.target.value
            }))
          }}/>
        </section>

        <section className='secao-endereco'>
          <label htmlFor="cidade">Cidade</label>
          <input type="text" id="cidade" name="cidade" className='tamanho-input' value={endereco.localidade} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["localidade"]: event.target.value
            }))
          }}/>
        </section>

        <section className='secao-endereco'>
        <label htmlFor="estado">Estado</label>
        <input type="text" id="estado" name="estado" className='tamanho-input' placeholder='UF' value={endereco.uf} onChange={(event) => {
            setEndereco((prev) => ({
              ...prev,
              ["uf"]: event.target.value
            }))
          }}/>
        </section>
      </fieldset>
      <section className="secao-botao">
        <button className="botao-cadastro-ponto">Adicionar</button>
      </section>
    </form>
  </div>
  )
}

export default RegisterPlace;

