const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(express.json());
app.use(cors());

const supabase = createClient(
  'https://qbdxqdnfhokoutmyzrkc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZHhxZG5maG9rb3V0bXl6cmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTM5MzgsImV4cCI6MjA5MTg2OTkzOH0.CFxK2_LfkKbVhPSSXWgKYGC-BZlb9uk5NbHDCQpvpps'
);

// 🔥 LISTAR
app.get('/produtos', async (req, res) => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) return res.status(500).json(error);

  res.json(data);
});

// 🔥 CRIAR
app.post('/produtos', async (req, res) => {
  const { nome, preco, categoria, estoque } = req.body;

  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, preco, categoria, estoque }]);

  if (error) return res.status(500).json(error);

  res.json(data);
});

// 🔥 DELETAR
app.delete('/produtos/:id', async (req, res) => {
  const { error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json(error);

  res.json({ mensagem: 'Deletado' });
});

// 🚀 SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});