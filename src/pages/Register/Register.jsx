import { Link, useNavigate} from 'react-router';
import { useState } from 'react';

import './Register.css';

function Register() {

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if(senha === confirmarSenha) {
      fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // informa que o corpo está em JSON
        },
        body: JSON.stringify({
          nome,
          sexo: genero,
          cpf,
          nascimento: dataNascimento,
          email,
          senha
        })
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((usuario) => {
        console.log('Usuário cadastrado com sucesso:', usuario);
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário.');
      });
    } else {
      alert('Senha e Confirmar senha não são iguais!')
    }
  }

  return (
    <div className='pagina-cadastro'>
      <form className='formulario-cadastro' onSubmit={handleSubmit}>
        <img className='img-cadastro' src="https://img.freepik.com/fotos-gratis/reciclagem-e-poluicao-ambiental_23-2152005804.jpg?semt=ais_hybrid&w=740&q=80" alt="imagem-cadastro" />
        <div className='campos-cadastro'>
          <section className='header-cadastro'>
            <p>Bem vindo!</p>
            <h1>Criar conta</h1>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="nome">Nome Completo</label>
            <input className='input-cadastro' type="text" id="nome" name="nome" required value={nome} onChange={(event) => {
              setNome(event.target.value);
            }}/>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="genero">Gênero</label>
            <select className='input-cadastro' name="genero" id="genero" required value={genero} onChange={(event) => {
              setGenero(event.target.value);
            }}>
              <option value="">--Selecione--</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="cpf">CPF</label>
            <input className='input-cadastro' type="text" id="cpf" name="cpf" required value={cpf} onChange={(event) => {
              setCpf(event.target.value);
            }}/>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="data-nascimento">Data de Nascimento</label>
            <input className='input-cadastro' type="date" id="data-nascimento" name={dataNascimento} required value={dataNascimento} onChange={(event) => {
              setDataNascimento(event.target.value);
            }}/>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="email">E-mail</label>
            <input className='input-cadastro' type="email" id="email" name="email" required value={email} onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="senha">Senha</label>
            <input className='input-cadastro' type="password" id="senha" name="senha" required value={senha} onChange={(event) => {
              setSenha(event.target.value);
            }}/>
          </section>

          <section className='campo-cadastro'>
            <label htmlFor="confirmar-senha">Confirmar senha</label>
            <input className='input-cadastro' type="text" id="confirmar-senha" name="confirmar-senha" required value={confirmarSenha} onChange={(event) => {
              setConfirmarSenha(event.target.value);
            }}/>
          </section>

          <button className='botao-cadastro'>Cadastrar</button>
        </div>
      </form>
    </div>
    )
}

export default Register;

