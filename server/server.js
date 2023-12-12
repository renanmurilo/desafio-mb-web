const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let dadosEnviados = null;

// Middleware para analisar o corpo da solicitação como JSON
app.use(bodyParser.json());
app.use(cors());

// Endpoint GET para renderizar o formulário
app.get('/registration', (req, res) => {
  const formularioHTML = `
  <html>
    <body>
      <h1>Formulário de Registro</h1>
      ${dadosEnviados ? `<p>Dados enviados anteriormente: ${JSON.stringify(dadosEnviados)}</p>` : ''}
      <!-- Adicione aqui o restante do seu formulário -->
    </body>
  </html>
`;

  res.send(formularioHTML);
});

// Endpoint POST para processar o formulário
app.post('/registration', (req, res) => {
  const { tipoCadastro } = req.body;

  // Campos obrigatórios comuns a ambos os tipos
  const commonFields = ['email', 'telefone', 'senha'];

  // Campos específicos para cada tipo de cadastro
  const pessoaFisicaFields = ['nome', 'cpf', 'dataNascimento'];
  const pessoaJuridicaFields = ['razaoSocial', 'cnpj', 'dataAbertura'];

  // Verificar se os campos obrigatórios comuns estão presentes
  const missingCommonFields = commonFields.filter(field => !req.body[field]);
  if (missingCommonFields.length > 0) {
    return res.status(400).json({ error: `Campos obrigatórios ausentes: ${missingCommonFields.join(', ')}` });
  }

  // Verificar campos específicos com base no tipoCadastro
  if (tipoCadastro === 'Pessoa física') {
    console.log('fisica');
    const missingFields = pessoaFisicaFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Campos obrigatórios para Pessoa Física ausentes: ${missingFields.join(', ')}` });
    }
  } else if (tipoCadastro === 'Pessoa jurídica') {
    const missingFields = pessoaJuridicaFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Campos obrigatórios para Pessoa Jurídica ausentes: ${missingFields.join(', ')}` });
    }
  } else {
    return res.status(400).json({ error: 'Tipo de cadastro inválido' });
  }

  // Processar os dados (simulação)
  console.log('Dados recebidos:', req.body);

  dadosEnviados = req.body;
  // Responder com sucesso (simulação)
  res.status(200).json({ success: true });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
