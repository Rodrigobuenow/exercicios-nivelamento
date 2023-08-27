class Produto {
    constructor(codigo, nome, preco, quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}

class Estoque {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    removerProduto(codigo) {
        this.produtos = this.produtos.filter(produto => produto.codigo !== codigo);
    }

    buscarProduto(codigo) {
        return this.produtos.find(produto => produto.codigo === codigo);
    }

    listarProdutos() {
        return this.produtos;
    }

    calcularValorTotal() {
        return this.produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    }
}

const estoque = new Estoque();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function exibirMenu() {
    console.log("1 - Adicionar produto");
    console.log("2 - Remover produto por código");
    console.log("3 - Buscar produto por código");
    console.log("4 - Listar todos os produtos");
    console.log("5 - Calcular valor total do estoque");
    console.log("0 - Sair");
}

function adicionarProduto() {
    readline.question("Informe o código do produto: ", codigo => {
        readline.question("Informe o nome do produto: ", nome => {
            readline.question("Informe o preço do produto: ", preco => {
                readline.question("Informe a quantidade do produto: ", quantidade => {
                    const novoProduto = new Produto(codigo, nome, parseFloat(preco), parseInt(quantidade));
                    estoque.adicionarProduto(novoProduto);
                    console.log("Produto adicionado ao estoque.");
                    exibirMenu();
                    realizarAcao();
                });
            });
        });
    });
}

function removerProduto() {
    readline.question("Informe o código do produto a ser removido: ", codigo => {
        estoque.removerProduto(codigo);
        console.log("Produto removido do estoque.");
        exibirMenu();
        realizarAcao();
    });
}

function buscarProduto() {
    readline.question("Informe o código do produto a ser buscado: ", codigo => {
        const produtoEncontrado = estoque.buscarProduto(codigo);
        if (produtoEncontrado) {
            console.log("Produto encontrado:", produtoEncontrado);
        } else {
            console.log("Produto não encontrado.");
        }
        exibirMenu();
        realizarAcao();
    });
}

function listarProdutos() {
    const listaProdutos = estoque.listarProdutos();
    console.log("Lista de produtos:", listaProdutos);
    exibirMenu();
    realizarAcao();
}

function calcularValorTotal() {
    const valorTotal = estoque.calcularValorTotal();
    console.log("Valor total do estoque:", valorTotal);
    exibirMenu();
    realizarAcao();
}

function realizarAcao() {
    readline.question("Escolha uma opção: ", opcao => {
        switch (opcao) {
            case '1':
                adicionarProduto();
                break;
            case '2':
                removerProduto();
                break;
            case '3':
                buscarProduto();
                break;
            case '4':
                listarProdutos();
                break;
            case '5':
                calcularValorTotal();
                break;
            case '0':
                readline.close();
                break;
            default:
                console.log("Opção inválida. Por favor, escolha uma opção válida.");
                exibirMenu();
                realizarAcao();
        }
    });
}

console.log("Bem-vindo ao sistema de controle de estoque!");
exibirMenu();
realizarAcao();