import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const usuarioLogin = {
    email,
    senha
  };

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem("@usuario", JSON.stringify(usuarioLogin))

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // informa que o corpo está em JSON
      },
      body: JSON.stringify(usuarioLogin)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json(); // ou response.text(), response.blob(), etc.
    })
    .then((usuario) => {
      localStorage.setItem("@usuario", JSON.stringify(usuario))
      console.log(usuario)
      navigate('/locais/novo');
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  return (
  <div className='pagina-login'>
    <form className='formulario-login' onSubmit={handleSubmit}>
      <img className='img-login' src="https://img.freepik.com/fotos-premium/sinal-de-reciclagem-no-fundo-do-globo_99433-4375.jpg" alt="imagem-login" />
      <div className='campos-login'>
        <section className='header-login'>
          <p>Bem vindo!</p>
          <h1>Login</h1>
        </section>

        <section className='campo-login'>
          <label htmlFor="email">Endereço de E-mail</label>
          <input className='input-login' type="email" id="email" name="email" required value={email} onChange={(event) => {
            setEmail(event.target.value);
          }}/>
        </section>

        <section className='campo-login'>
          <label htmlFor="senha">Senha</label>
          <input className='input-login' type="password" id="senha" name="senha" required value={senha} onChange={(event) => {
            setSenha(event.target.value);
          }}/>
        </section>

        <button className='botao-login'>Logar</button>
        <Link to='./criar-conta' className='link-para-cadastro'>Criar conta</Link>
      </div>
    </form>
  </div>
  )
}

export default Login;

