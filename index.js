const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let flores = [
    { id: 1, nome: "Rosa", tipo: "exterior", preco: 25, cor: "Vermelha" },
    { id: 2, nome: "Margarida", tipo: "interior", preco: 20, cor: "Amarela" },
    { id: 3, nome: "Tulipa", tipo: "exterior", preco: 35, cor: "Rosa" },
    { id: 4, nome: "Orquídea", tipo: "interior", preco: 45, cor: "Branca" },
    { id: 5, nome: "Lírio", tipo: "interior", preco: 30, cor: "Laranja" }

];

//aqui começa tipo um CRUD em JS

//listar todas as flores cadastradas
app.get("/flores", (req, res) => {
    res.json(flores);
});


//cadastrar uma nova flor
app.post("/flores", (req, res) => {
  const novaFlor = {
    id: flores.length + 1,
    nome: req.body.nome,
    tipo: req.body.tipo,
    preco: req.body.preco,
    cor: req.body.cor
  };

  flores.push(novaFlor);
  res.status(201).json({
    mensagem: "Sua flor foi cadastrada com sucesso!",
    flor: novaFlor
  });
});

//atualizar uma flor que já foi cadastrada
app.put("/flores/:id", (req, res) => {
const index = flores.findIndex(f => f.id === parseInt(req.params.id));
if (index === -1) return res.status(404).json({ mensagem: "Flor não encontrada. Tente novamente..." });

flores[index] = {
  id: flores[index].id,
  nome: req.body.nome,
  tipo: req.body.tipo,
  preco: req.body.preco,
  cor: req.body.cor
};

res.json({
  mensagem: "Sua flor foi atualizada com sucesso!",
  flor: flores[index]
});


});


//apagar uma flor já cadastrada 
app.delete("/flores/:id", (req, res) => {
    const index = flores.findIndex(flor => flor.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ mensagem: "Flor não encontrada. Tente novamente..."});
    const florApagada = flores.splice(index, 1);
    res.json({ mensagem: "Sua flor foi apagada com sucesso!",
     flor: florApagada[0] });
});


//exemplos que o professor pediu para icluir

//flores que custam mais de 30 reais
app.get("/flores/preco/:valor", (req, res) => {
    const valor = parseFloat(req.params.valor);
    const selecionarFlor = flores.filter(f => f.preco > valor);
    res.json(selecionarFlor);
});

//listar a quantidade de flores que já foram cadastradas
app.get("/flores/qtd", (req, res) => {
    res.json({ qtd: flores.length });
});

//mostrar qual foi a primeira flor cadastrada
app.get("/flores/primeiraCadastrada", (req, res) => {
    res.json(flores[0]); //jeito mais fácil de fazer, já que seleciona pelo index do array
});

//mostrar qual foi a última flor cadastrada
app.get("/flores/ultimaCadastrada", (req, res) => {
    res.json(flores[flores.length - 1]); //é -1 porque é dessa maneira que se encontra o último intem do array, é como se constasse ao contrário
});

//cadastrar várias flores ao mesmo tempo
app.post("/flores/variasFlores", (req, res) => {
    const novasFlores = req.body.flores; 
    novasFlores.forEach((flor, index) => {
        flor.id = flores.length + index + 1;  
        flores.push(flor);
    });
    res.status(201).json({
        mensagem: "Todas as flores que você cadastrou estão registradas!",
        flores: novasFlores
    });
});


//dados estátisticos: média de preço das flores que foram cadastradas 
app.get("/flores/mediaPreco", (req, res) => {
    const total = flores.length;
    
    let soma = 0;
    for (let f=0; f < flores.length; f++) { //esse let só existe no FOR desse "bloco"
        soma += flores[f].preco;
    }

    const mediaPreco = soma/total;
    res.json({ mediaPreco: mediaPreco.toFixed(2) }); //limitar p/ 2 casas decimais
});

//selecionar a flor de acordo com o ID
app.get("/flores/:id", (req, res) => {
    const flor = flores.find(flor => flor.id === parseInt(req.params.id)); //garantir que o id seja um número inteiro
    if (!flor) return res.status(404).send("Flor não encontrada. Tente novamente..."); //imprimir caso o id não exista
    res.json(flor)});

    


//aonde o servirdor está rodando
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
