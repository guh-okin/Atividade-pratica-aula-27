// Pegar elementos do DOM
const form = document.getElementById('cadastroForm');

const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const inputConfirma = document.getElementById('confirmaSenha');
const selectPerfil = document.getElementById('perfil');
const checkTermos = document.getElementById('termos');

const erroNome = document.getElementById('erroNome');
const erroEmail = document.getElementById('erroEmail');
const erroSenha = document.getElementById('erroSenha');
const erroConfirma = document.getElementById('erroConfirma');
const erroPerfil = document.getElementById('erroPerfil');
const erroTermos = document.getElementById('erroTermos');

const mensagemSucesso = document.getElementById('mensagemSucesso');
const painelVazio = document.getElementById('painelVazio');
const painelDados = document.getElementById('painelDados');
const saidaNome = document.getElementById('saidaNome');
const saidaEmail = document.getElementById('saidaEmail');
const saidaPerfil = document.getElementById('saidaPerfil');
const saidaTermos = document.getElementById('saidaTermos');

// Funções auxiliares
function mostrarErro(campo, caixaErro, texto) {
  caixaErro.textContent = texto;
  campo.classList.add('invalido');
}

function limparErro(campo, caixaErro) {
  caixaErro.textContent = '';
  campo.classList.remove('invalido');
}

function limparTodosOsErros() {
  limparErro(inputNome, erroNome);
  limparErro(inputEmail, erroEmail);
  limparErro(inputSenha, erroSenha);
  limparErro(inputConfirma, erroConfirma);
  limparErro(selectPerfil, erroPerfil);
  limparErro(checkTermos, erroTermos);
}

function emailValido(valor) {
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padrao.test(valor);
}

// Interceptar envio de formulário
form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const senha = inputSenha.value;
  const confirma = inputConfirma.value;
  const perfil = selectPerfil.value;
  const aceitouTermos = checkTermos.checked;

  limparTodosOsErros();
  mensagemSucesso.hidden = true;

  // Validações
  let formularioOk = true;
  let primeiroComErro = null;

  function registrarProblema(campo, caixaErro, texto) {
    mostrarErro(campo, caixaErro, texto);
    formularioOk = false;
    if (!primeiroComErro) {
      primeiroComErro = campo;
    }
  }

  if (nome === '') {
    registrarProblema(inputNome, erroNome, 'Por favor, informe seu nome completo.');
  } else if (nome.length < 3) {
    registrarProblema(inputNome, erroNome, 'O nome parece curto demais. Digite o nome completo.');
  }

  if (email === '') {
    registrarProblema(inputEmail, erroEmail, 'Informe o seu e-mail institucional.');
  } else if (!emailValido(email)) {
    registrarProblema(inputEmail, erroEmail, 'Esse e-mail não parece válido. Exemplo: nome@escola.edu.br');
  }

  if (senha === '') {
    registrarProblema(inputSenha, erroSenha, 'Crie uma senha de acesso.');
  } else if (senha.length < 6) {
    registrarProblema(inputSenha, erroSenha, 'A senha precisa ter pelo menos 6 caracteres.');
  }

  if (confirma === '') {
    registrarProblema(inputConfirma, erroConfirma, 'Digite a senha novamente para confirmar.');
  } else if (senha !== confirma) {
    registrarProblema(inputConfirma, erroConfirma, 'As senhas não conferem. Confira e tente de novo.');
  }

  if (perfil === '') {
    registrarProblema(selectPerfil, erroPerfil, 'Escolha a sua área de perfil técnico.');
  }

  if (!aceitouTermos) {
    registrarProblema(checkTermos, erroTermos, 'Você precisa aceitar os termos de uso para continuar.');
  }

  if (!formularioOk) {
    primeiroComErro.focus();
    return;
  }

  saidaNome.innerText = nome;
  saidaEmail.innerText = email;
  saidaPerfil.innerText = perfil;
  saidaTermos.innerText = 'Aceitos ✔';

  painelVazio.hidden = true;
  painelDados.hidden = false;

  mensagemSucesso.textContent = 'Cadastro realizado com sucesso, ' + nome.split(' ')[0];
  mensagemSucesso.hidden = false;

  form.reset();
  inputNome.focus();
});

inputNome.addEventListener('input', function () { limparErro(inputNome, erroNome); });
inputEmail.addEventListener('input', function () { limparErro(inputEmail, erroEmail); });
inputSenha.addEventListener('input', function () { limparErro(inputSenha, erroSenha); });
inputConfirma.addEventListener('input', function () { limparErro(inputConfirma, erroConfirma); });
selectPerfil.addEventListener('change', function () { limparErro(selectPerfil, erroPerfil); });
checkTermos.addEventListener('change', function () { limparErro(checkTermos, erroTermos); });
