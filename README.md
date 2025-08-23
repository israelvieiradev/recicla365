# React + Vite

Nome do Software: Recicla365

Objetivo: 

O Recicla365, criado em 2025, é uma plataforma que facilita o gerenciamento de resíduos 
e o acesso a pontos de coleta de materiais recicláveis pelo País.
Os usuários podem cadastrar novos pontos de coleta, verificar pontos de coleta 
em uma lista, visualizar informações sobre os materiais aceitos em cada ponto e 
registrar suas próprias contribuições para a reciclagem.

Tecnologias utilizadas:

HTML, CSS, JavaScript, React, React Router, React Leaflet

APIs:

https://github.com/FuturoDEV-Joinville-V1/api_coletas.git

Fornecida pelo Professor Douglas Cavalcante, pode ser usada para
obter informações através da API: https://viacep.com.br, que obtém informações baseadas
no CEP, cadastrar usuários, cadastrar pontos de coleta, entre outras funções.

Execução:

1. Cadastro de usuário
Clicar em "Criar Conta". Na tela criar conta deve ser inserido o nome completo, 
seu gênero, cpf com 11 dígitos sem caracteres especiais, data de nascimento, 
e-mail válido e senha

2. Login
Após cadastrar será redirecionado para tela de login. 
Na tela de login informe seu e-mail e senha cadastrados

3. Cadastro de Ponto
Após o login será redirecionado para tela de cadastro de ponto de coleta.
Na tela de cadastro de ponto de coleta:

informar nome do ponto, descrição; 

selecionar os tipos de materiais que o ponto de coleta pode receber;

informar cep que ao ser informado buscará informações sobre esse cep e
caso seja encontrado prencherá alguns campos do endereço, se não, 
o usuário deve informar todos os campos disponíveis

Aqui o usuário pode adicionar campos pontos de coleta quiser

4. Menu
É disponibilizado um menu para navegação entre as páginas de DashBoard e Locais cadastrados 
e opção de sair que redireciona o usuário para tela de login

5. Dashboard
É uma página que fornece um mapa-múndi, focado na região do Brasil, que mostra os pontos de coleta 
cadastrados e também cards que mostram a quantidade de pontos por estado

6. Locais
Uma tela que mostra cards com informações mais detalhadas sobre cada ponto de coleta, opção de
deletar o ponto dos registros e um botão para redirecionar para tela de cadastro de ponto de coleta