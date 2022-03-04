const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 3333;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Private-Network", "true");
  res.header("Access-Control-Allow-Private-Network", "true");
  res.header(
    "Access-Control-Request-Private-Network",
    "Access-Control-Allow-Private-Network",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "API Node.js + Express + Postgres API - PAULO DE TARSO",
  });
});

app.listen(port, () => {
  console.log("API rodando na porta " + port);
});

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ghap",
  host: "10.0.6.3",
  database: "pulse_apt",
  password: "ghap",
  port: 5432,
});

// ENDPOINTS //

// ATENDIMENTOS.
// listar todos os atendimentos.
app.get("/list_todos_atendimentos", (req, res) => {
  var sql = "SELECT * FROM atendimento";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir atendimento.
app.post("/insert_atendimento", (req, res) => {
  const { idpct, idatendimento } = req.body;
  var sql = "INSERT INTO atendimento (idpct, idatendimento) VALUES ($1, $2)";
  pool.query(sql, [idpct, idatendimento], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'MERDA: ' + error);
    res.send(results);
  });
});

// atualizar atendimento.
app.post("/update_atendimento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento } = req.body;
  var sql = "UPDATE atendimento SET idpct = $1, idatendimento = $2 WHERE id = $3";
  pool.query(sql, [idpct, idatendimento, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir atendimento.
app.get("/delete_atendimento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// PRECAUÇÕES.
// listar todas as OPÇÕES de precauções.
app.get("/list_opcoes_precaucoes", (req, res) => {
  var sql = "SELECT * FROM precaucao";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// listar todas as precauções.
app.get("/list_precaucoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_precaucao WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir precaucao.
app.post("/insert_precaucao", (req, res) => {
  const { idpct, idatendimento, idprecaucao, nome, datainicio, idprofissional, datatermino } = req.body;
  var sql = "INSERT INTO atendimento_precaucao (idpct, idatendimento, idprecaucao, nome, datainicio, idprofissional, datatermino) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, idprecaucao, nome, datainicio, idprofissional, datatermino], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar precaucao.
app.post("/update_precaucao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idprecaucao, nome, datainicio, idprofissional, datatermino } = req.body;
  var sql = "UPDATE atendimento_precaucao SET idpct = $1, idatendimento = $2, idprecaucao = $3, nome = $4, datainicio = $5, idprofissional = $6, datatermino = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, idprecaucao, nome, datainicio, idprofissional, datatermino, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir precaucao.
app.get("/delete_precaucao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_precaucao WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ALERGIAS.
// listar todas as alergias.
app.get("/list_alergias/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_alergia WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir alergia.
app.post("/insert_alergia", (req, res) => {
  const { idpct, idatendimento, nome, datainicio, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_alergia (idpct, idatendimento, nome, datainicio, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6)";
  pool.query(sql, [idpct, idatendimento, nome, datainicio, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar alergia.
app.post("/update_alergia/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, nome, datainicio, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_alergia SET idpct = $1, idatendimento = $2, nome = $3, datainicio = $4, datatermino = $5, idprofissional = $6 WHERE id = $7";
  pool.query(sql, [idpct, idatendimento, nome, datainicio, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// DIAGNÓSTICOS.
// listar CID10.
app.get("/list_cid", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM cid10";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// listar todos os diagnósticos.
app.get("/list_diagnosticos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_diagnostico WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir diagnóstico.
app.post("/insert_diagnostico", (req, res) => {
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, cid, descricao } = req.body;
  var sql = "INSERT INTO atendimento_diagnostico (idpct, idatendimento, datainicio, datatermino, idprofissional, cid, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, cid, descricao], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar diagnóstico.
app.post("/update_diagnostico/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, cid, descricao } = req.body;
  var sql = "UPDATE atendimento_diagnostico SET idpct = $1, idatendimento = $2, datainicio = $3, datatermino = $4, idprofissional = $5, cid = $6, descricao = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, cid, descricao, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// PROPOSTAS.
// listar todas as propostas.
app.get("/list_propostas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_proposta WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir proposta.
app.post("/insert_proposta", (req, res) => {
  const { idpct, idatendimento, datainicio, datatermino, proposta, idprofissional, status } = req.body;
  var sql = "INSERT INTO atendimento_proposta (idpct, idatendimento, datainicio, datatermino, proposta, idprofissional, status) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, proposta, idprofissional, status], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar proposta.
app.post("/update_proposta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, datainicio, datatermino, proposta, idprofissional, status } = req.body;
  var sql = "UPDATE atendimento_proposta SET idpct = $1, idatendimento = $2, datainicio = $3, datatermino = $4, proposta = $5, idprofissional = $6, status = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, proposta, idprofissional, status, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// VIA DE DIETA E ELEVAÇÃO DA CABECEIRA.
// retornar último registro de dieta e elevação da cabeceira.
app.get("/list_dieta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_dieta ORDER BY datainicio DESC LIMIT 1 WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir dieta.
app.post("/insert_dieta", (req, res) => {
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, via, cabeceira, infusao, get } = req.body;
  var sql = "INSERT INTO atendimento_dieta (idpct, idatendimento, datainicio, datatermino, idprofissional, via, cabeceira, infusao, get) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, via, cabeceira, infusao, get], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar dieta.
app.post("/update_dieta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, via, cabeceira, infusao, get } = req.body;
  var sql = "UPDATE atendimento_dieta SET idpct = $1, idatendimento = $2, datainicio = $3, datatermino = $4, idprofissional = $5, via = $6, cabeceira = $7, infusao = $8, get = $9 WHERE id = $10";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, via, cabeceira, infusao, get, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// INVASÕES.
// retornar registros de invasão ativos para o atendimento selecionado.
app.get("/list_invasoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_invasao WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir invasão.
app.post("/insert_invasao", (req, res) => {
  const { idpct, idatendimento, dispositivo, local, datainicio, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_invasao (idpct, idatendimento, dispositivo, local, datainicio, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, dispositivo, local, datainicio, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar invasão.
app.post("/update_invasao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, dispositivo, local, datainicio, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_invasao SET idpct = $1, idatendimento = $2, dispositivo = $3, local = $4, datainicio = $5, datatermino = $6, idprofissional = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, dispositivo, local, datainicio, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// LESÕES.
// retornar registros de lesões ativas para o atendimento selecionado.
app.get("/list_lesoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_lesao WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir lesão.
app.post("/insert_lesao", (req, res) => {
  const { idpct, idatendimento, lesao, grau, descricao, tratamento, datainicio, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_lesao (idpct, idatendimento, lesao, grau, descricao, tratamento, datainicio, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  pool.query(sql, [idpct, idatendimento, lesao, grau, descricao, tratamento, datainicio, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar lesão.
app.post("/update_lesao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, lesao, grau, descricao, tratamento, datainicio, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_lesao SET idpct = $1, idatendimento = $2, lesao = $3, grau = $4, descricao = $5, tratamento = $6, datainicio = $7, datatermino = $8, idprofissional = $9 WHERE id = $10";
  pool.query(sql, [idpct, idatendimento, lesao, grau, descricao, tratamento, datainicio, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});