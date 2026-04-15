const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qbdxqdnfhokoutmyzrkc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZHhxZG5maG9rb3V0bXl6cmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTM5MzgsImV4cCI6MjA5MTg2OTkzOH0.CFxK2_LfkKbVhPSSXWgKYGC-BZlb9uk5NbHDCQpvpps'
);

const app = express();

db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL,
    categoria TEXT,
    estoque INTEGER
  )
`);

app.use(express.json());
app.use(cors());


let id = 1;

// listar produtos

app.get('/produtos', async (req, res) => {
  const { data } = await supabase
    .from('produtos')
    .select('*');

  res.json(data);
});


app.get('/produtos', (req, res) => {
    res.json(produtos);
});



app.get('/produtos', (req, res) => {
  db.all(`SELECT * FROM produtos`, [], (err, rows) => {
    res.json(rows);
  });
});

// criar produto

app.post('/produtos', async (req, res) => {
  const { nome, preco, categoria, estoque } = req.body;

  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, preco, categoria, estoque }]);

  res.json(data);
});

app.post('/produtos', (req, res) => {
  const { nome, preco, categoria, estoque } = req.body;

  db.run(
    `INSERT INTO produtos (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)`,
    [nome, preco, categoria, estoque],
    function (err) {
      res.json({ id: this.lastID, nome, preco, categoria, estoque });
    }
  );
});

app.post('/produtos', (req, res) => {
   const produto = {
    id: id++,
    nome: req.body.nome,
    preco: req.body.preco,
    categoria: req.body.categoria,
    estoque: req.body.estoque
};

app.get('/produtos', (req, res) => {
  db.all(`SELECT * FROM produtos`, [], (err, rows) => {
    res.json(rows);
  });
});

    produtos.push(produto);
    res.json(produto);
});

// deletar produto

app.delete('/produtos/:id', async (req, res) => {
  await supabase
    .from('produtos')
    .delete()
    .eq('id', req.params.id);

  res.json({ mensagem: 'Deletado' });
});

app.delete('/produtos/:id', (req, res) => {
  db.run(`DELETE FROM produtos WHERE id = ?`, [req.params.id]);
  res.json({ mensagem: 'Deletado' });
});


app.delete('/produtos/:id', (req, res) => {
    const idParam = parseInt(req.params.id);

    produtos = produtos.filter(p => p.id !== idParam);

    res.json({ mensagem: 'Produto deletado!' });
});





    // servidor fora
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});


