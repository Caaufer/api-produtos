const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let produtos = [];
let id = 1;

// listar produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// criar produto
app.post('/produtos', (req, res) => {
   const produto = {
    id: id++,
    nome: req.body.nome,
    preco: req.body.preco,
    categoria: req.body.categoria,
    estoque: req.body.estoque
};

    produtos.push(produto);
    res.json(produto);
});

// deletar produto
app.delete('/produtos/:id', (req, res) => {
    const idParam = parseInt(req.params.id);

    produtos = produtos.filter(p => p.id !== idParam);

    res.json({ mensagem: 'Produto deletado!' });
});





    // servidor fora


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor rodando 🚀');
});

