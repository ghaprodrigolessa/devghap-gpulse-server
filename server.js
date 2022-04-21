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

// INTERCONSULTAS.
// retornar todos os registros de interconsultas (utilizado para exibir total distribuído entre as unidades de atendimento).
app.get("/list_interconsultasall", (req, res) => {
  var sql = "SELECT * FROM atendimento_interconsulta";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de interconsultas para o atendimento selecionado.
app.get("/list_interconsultas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_interconsulta WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir interconsulta.
app.post("/insert_interconsulta", (req, res) => {
  const { idpct, idatendimento, especialidade, motivo, parecer, datainicio, datatermino, idsolicitante, idatendente, status, unidade } = req.body;
  var sql = "INSERT INTO atendimento_interconsulta (idpct, idatendimento, especialidade, motivo, parecer, datainicio, datatermino, idsolicitante, idatendente, status, unidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  pool.query(sql, [idpct, idatendimento, especialidade, motivo, parecer, datainicio, datatermino, idsolicitante, idatendente, status, unidade], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar interconsulta.
app.post("/update_interconsulta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, especialidade, motivo, parecer, datainicio, datatermino, idsolicitante, idatendente, status, unidade } = req.body;
  var sql = "UPDATE atendimento_interconsulta SET idpct = $1, idatendimento = $2, especialidade = $3, motivo = $4, parecer = $5, datainicio = $6, datatermino = $7, idsolicitante = $8, idatendente = $9, status = $10, unidade = $11 WHERE id = $12";
  pool.query(sql, [idpct, idatendimento, especialidade, motivo, parecer, datainicio, datatermino, idsolicitante, idatendente, status, unidade, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar interconsulta.
app.get("/delete_interconsulta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_interconsulta WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ESCALAS
// listar opções de escalas.
app.get("/list_opcoes_escalas", (req, res) => {
  var sql = "SELECT * FROM escala";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de escalas para o atendimento selecionado.
app.get("/list_escalas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_escala WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir escala.
app.post("/insert_escala", (req, res) => {
  const { idpct, idatendimento, data, cd_escala, ds_escala, valor_resultado, ds_resultado, idprofissional, status } = req.body;
  var sql = "INSERT INTO atendimento_escala (idpct, idatendimento, data, cd_escala, ds_escala, valor_resultado, ds_resultado, idprofissional, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  pool.query(sql, [idpct, idatendimento, data, cd_escala, ds_escala, valor_resultado, ds_resultado, idprofissional, status], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar escala.
app.post("/update_escala/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, data, cd_escala, ds_escala, valor_resultado, ds_resultado, idprofissional, status } = req.body;
  var sql = "UPDATE atendimento_escala SET idpct = $1, idatendimento = $2, data = $3, cd_escala = $4, ds_escala = $5, valor_resultado = $6, ds_resultado = $7, idprofissional = $8, status = $9 WHERE id = $10";
  pool.query(sql, [idpct, idatendimento, data, cd_escala, ds_escala, valor_resultado, ds_resultado, idprofissional, status, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar escala.
app.get("/delete_escala/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_escala WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// LINHA DE CUIDADO.
// retornar opções de linhas de cuidado.
app.get("/opcoes_linhasdecuidado", (req, res) => {
  var sql = "SELECT * FROM planoterapeutico_linhas_de_cuidado";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de linhas de cuidado para o atendimento selecionado.
app.get("/linhasdecuidado/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_linhadecuidado WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir linha de cuidado.
app.post("/insert_linhadecuidado", (req, res) => {
  const { idpct, idatendimento, id_linhadecuidado, var_linhadecuidado, datainicio, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_linhadecuidado (idpct, idatendimento, id_linhadecuidado, var_linhadecuidado, datainicio, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, id_linhadecuidado, var_linhadecuidado, datainicio, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar linha de cuidado.
app.post("/update_linhadecuidado/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, id_linhadecuidado, var_linhadecuidado, datainicio, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_linhadecuidado SET idpct = $1, idatendimento = $2, id_linhadecuidado = $3, var_linhadecuidado = $4, datainicio = $5, datatermino = $6, idprofissional = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, id_linhadecuidado, var_linhadecuidado, datainicio, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar linha de cuidado.
app.get("/delete_linhadecuidado/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_linhadecuidado WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// PLANO TERAPÊUTICO.
// retornar registros de planos terapêuticos para o atendimento selecionado.
app.get("/list_planosterapeuticos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_planoterapeutico WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir plano terapêutico.
app.post("/insert_planoterapeutico", (req, res) => {
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, moraes, decliniofuncional, riscofuncional, linhadecuidados, status } = req.body;
  var sql = "INSERT INTO atendimento_planoterapeutico (idpct, idatendimento, datainicio, datatermino, idprofissional, moraes, decliniofuncional, riscofuncional, linhadecuidados, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, moraes, decliniofuncional, riscofuncional, linhadecuidados, status], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar plano terapêutico.
app.post("/update_planoterapeutico/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, datainicio, datatermino, idprofissional, moraes, decliniofuncional, riscofuncional, linhadecuidados, status } = req.body;
  var sql = "UPDATE atendimento_planoterapeutico SET idpct = $1, idatendimento = $2, datainicio = $3, datatermino = $4, idprofissional = $5, moraes = $6, decliniofuncional = $7, riscofuncional = $8, linhadecuidados = $9, status = $10 WHERE id = $11";
  pool.query(sql, [idpct, idatendimento, datainicio, datatermino, idprofissional, moraes, decliniofuncional, riscofuncional, linhadecuidados, status, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar plano terapêutico.
app.get("/delete_planoterapeutico/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_planoterapeutico WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// OBJETIVOS.
// listar opções de objetivos primários e secundários.
app.get("/list_opcoes_objetivos", (req, res) => {
  var sql = "SELECT * FROM planoterapeutico_objetivos";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de objetivos para o atendimento selecionado.
app.get("/list_objetivos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_planoterapeutico_objetivos WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir objetivo.
app.post("/insert_objetivo", (req, res) => {
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, objetivo, datainicio, datatermino, idprofissional, tipoobjetivo, statusobjetivo, escala } = req.body;
  var sql = "INSERT INTO atendimento_planoterapeutico_objetivos (idpct, idatendimento, idplanoterapeutico, idobjetivo, objetivo, datainicio, datatermino, idprofissional, tipoobjetivo, statusobjetivo, escala) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, objetivo, datainicio, datatermino, idprofissional, tipoobjetivo, statusobjetivo, escala], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar objetivo.
app.post("/update_objetivo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, objetivo, datainicio, datatermino, idprofissional, tipoobjetivo, statusobjetivo, escala } = req.body;
  var sql = "UPDATE atendimento_planoterapeutico_objetivos SET idpct = $1, idatendimento = $2, idplanoterapeutico = $3, idobjetivo = $4, objetivo = $5, datainicio = $6, datatermino = $7, idprofissional = $8, tipoobjetivo = $9, statusobjetivo = $10, escala = $11 WHERE id = $12";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, objetivo, datainicio, datatermino, idprofissional, tipoobjetivo, statusobjetivo, escala, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar objetivo.
app.get("/delete_objetivo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_planoterapeutico_objetivos WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// METAS.
// listar opções de metas.
app.get("/list_opcoes_metas", (req, res) => {
  var sql = "SELECT * FROM planoterapeutico_metas";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de metas para o atendimento selecionado.
app.get("/list_metas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_planoterapeutico_metas WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir meta.
app.post("/insert_meta", (req, res) => {
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, meta, datainicio, dataestimada, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_planoterapeutico_metas (idpct, idatendimento, idplanoterapeutico, idobjetivo, meta, datainicio, dataestimada, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, meta, datainicio, dataestimada, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar meta.
app.post("/update_meta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, meta, datainicio, dataestimada, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_planoterapeutico_metas SET idpct = $1, idatendimento = $2, idplanoterapeutico = $3, idobjetivo = $4, meta = $5, datainicio = $6, dataestimada = $7, datatermino = $8, idprofissional = $9 WHERE id = $10";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, meta, datainicio, dataestimada, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar meta.
app.get("/delete_meta/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_planoterapeutico_metas WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// PROPOSTAS TERAPÊUTICAS.
// listar opções de propostas terapêuticas.
app.get("/list_opcoes_propostasterapeuticas", (req, res) => {
  var sql = "SELECT * FROM planoterapeutico_propostasterapeuticas";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar registros de propostas terapêuticas para o atendimento selecionado.
app.get("/list_propostasterapeuticas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_planoterapeutico_propostasterapeuticas WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir proposta terapêutica.
app.post("/insert_propostaterapeutica", (req, res) => {
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, idmeta, propostaterapeutica, datainicio, dataestimada, datatermino, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_planoterapeutico_propostasterapeuticas (idpct, idatendimento, idplanoterapeutico, idobjetivo, idmeta, propostaterapeutica, datainicio, dataestimada, datatermino, idprofissional) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, idmeta, propostaterapeutica, datainicio, dataestimada, datatermino, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar proposta terapêutica.
app.post("/update_propostaterapeutica/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idplanoterapeutico, idobjetivo, idmeta, propostaterapeutica, datainicio, dataestimada, datatermino, idprofissional } = req.body;
  var sql = "UPDATE atendimento_planoterapeutico_propostasterapeuticas SET idpct = $1, idatendimento = $2, idplanoterapeutico = $3, idobjetivo = $4, idmeta = $5, propostaterapeutica = $6, datainicio = $7, dataestimada = $8, datatermino = $9, idprofissional = $10 WHERE id = $11";
  pool.query(sql, [idpct, idatendimento, idplanoterapeutico, idobjetivo, idmeta, propostaterapeutica, datainicio, dataestimada, datatermino, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar proposta terapêutica.
app.get("/delete_propostaterapeutica/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_planoterapeutico_propostasterapeuticas WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// PRESCRIÇÃO.
// 1. registros de prescrição.
// listar registros de prescrição para um atendimento.
app.get("/atendimento_prescricao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_prescricao WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir registro de prescrição.
app.post("/insert_prescricao", (req, res) => {
  const { idpct, idatendimento, data, status, idprofissional } = req.body;
  var sql = "INSERT INTO atendimento_prescricao (idpct, idatendimento, data, status, idprofissional) VALUES ($1, $2, $3, $4, $5)";
  pool.query(sql, [idpct, idatendimento, data, status, idprofissional], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar registros de prescrição.
app.post("/update_prescricao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, data, status, idprofissional } = req.body;
  var sql = "UPDATE atendimento_prescricao SET idpct = $1, idatendimento = $2, data = $3, status = $4, idprofissional = $5 WHERE id = $6";
  pool.query(sql, [idpct, idatendimento, data, status, idprofissional, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar registro de prescrição.
app.get("/delete_prescricao/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_prescricao WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 2. itens de prescrição (medicamentos e insumos).
// listar opções de itens de prescrição.
app.get("/list_opcoes_itens_prescricao", (req, res) => {
  var sql = "SELECT * FROM prescricao_opcoes_itens";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar itens de prescrição para um atendimento selecionado (importante para os antibióticos).
app.get("/atendimento_todos_itens/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_prescricao_item WHERE idatendimento = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar itens de prescrição para uma prescrição selecionada.
app.get("/atendimento_prescricao_item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_prescricao_item WHERE idprescricao = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir item de prescrição.
app.post("/insert_atendimento_prescricao_item", (req, res) => {
  const { idpct, idatendimento, idprescricao, iditem, nome_item, keyword_item, qtde, via, horario, observacao, status, justificativa, datainicio, datatermino, tipoitem, aprazamento, tag_componente } = req.body;
  var sql = "INSERT INTO atendimento_prescricao_item (idpct, idatendimento, idprescricao, iditem, nome_item, keyword_item, qtde, via, horario, observacao, status, justificativa, datainicio, datatermino, tipoitem, aprazamento, tag_componente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)";
  pool.query(sql, [idpct, idatendimento, idprescricao, iditem, nome_item, keyword_item, qtde, via, horario, observacao, status, justificativa, datainicio, datatermino, tipoitem, aprazamento, tag_componente], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar item de prescrição.
app.post("/update_atendimento_prescricao_item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idprescricao, iditem, nome_item, keyword_item, qtde, via, horario, observacao, status, justificativa, datainicio, datatermino, tipoitem, aprazamento, tag_componente } = req.body;
  var sql = "UPDATE atendimento_prescricao_item SET idpct = $1, idatendimento = $2, idprescricao = $3, iditem = $4, nome_item = $5, keyword_item = $6, qtde = $7, via = $8, horario = $9, observacao = $10, status = $11, justificativa = $12, datainicio = $13, datatermino = $14, tipoitem = $15, aprazamento = $16, tag_componente = $17 WHERE id = $18";
  pool.query(sql, [idpct, idatendimento, idprescricao, iditem, nome_item, keyword_item, qtde, via, horario, observacao, status, justificativa, datainicio, datatermino, tipoitem, aprazamento, tag_componente, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar item de prescrição.
app.get("/delete_atendimento_prescricao_item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_prescricao_item WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 3. componentes de prescrição (acompanham medicamentos e insumos).
// listar opções de componentes de prescrição.
app.get("/list_opcoes_componentes_prescricao", (req, res) => {
  var sql = "SELECT * FROM prescricao_opcoes_componentes";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// retornar componentes de prescrição para uma prescrição selecionada.
app.get("/atendimento_prescricao_componente/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var sql = "SELECT * FROM atendimento_prescricao_componente WHERE idprescricao = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir componente de prescrição.
app.post("/insert_atendimento_prescricao_componente", (req, res) => {
  const { idpct, idatendimento, idprescricao, iditemprescricao, componente, qtde, iditem } = req.body;
  var sql = "INSERT INTO atendimento_prescricao_componente (idpct, idatendimento, idprescricao, iditemprescricao, componente, qtde, iditem) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  pool.query(sql, [idpct, idatendimento, idprescricao, iditemprescricao, componente, qtde, iditem], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// atualizar componente de prescrição.
app.post("/update_atendimento_prescricao_componente/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { idpct, idatendimento, idprescricao, iditemprescricao, componente, qtde, iditem } = req.body;
  var sql = "UPDATE atendimento_prescricao_componente SET idpct = $1, idatendimento = $2, idprescricao = $3, iditemprescricao = $4, componente = $5, qtde = $6, iditem = $7 WHERE id = $8";
  pool.query(sql, [idpct, idatendimento, idprescricao, iditemprescricao, componente, qtde, iditem, id], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// deletar componentes de prescrição pelo iditem (massivo).
app.get("/delete_atendimento_prescricao_componente/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_prescricao_componente WHERE iditem = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// deletar componentes de prescrição pelo id (pontual).
app.get("/delete_atendimento_prescricao_componente_pontual/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM atendimento_prescricao_componente WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});