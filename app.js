const { createElement } = require("react");

const botaoMenu = document.querySelector(".btn-menu")
const menuEscondido = document.querySelector(".menu-lateral")
botaoMenu.addEventListener("click",function(){
    menuEscondido.classList.toggle("ativo");
    botaoMenu.classList.toggle("girar")
})
//AGARRANDO O BOTÃO CHAVEAMENTO//
/*
const btnBrasil = document.querySelector('#time1');
const btnChile = document.querySelector('#time2');
const vagaSemi1 = document.querySelector('#vencedor-q1');

btnBrasil.addEventListener("click",function(){
    if(vagaSemi1.innerText === "?"){
        vagaSemi1.innerText = btnBrasil.innerText;
        btnBrasil.classList.add("brilho-vencedor")
    }
    else{
        console.log("Atenção: Este jogo já foi decidido")
        alert("Atenção: Este jogo já foi decidido")
    }
})
*/
async function carregarTime(){
    try{
        let response = await fetch("https://api.npoint.io/ff49b9f5a8971dc32c21")
        let timesDaApi = await response.json();
        console.log("Dados recebidos:",timesDaApi);
        const tabuleiro = document.getElementById("tabuleirro-copa");
        const primeiraSemi = document.getElementById("vencedor-q1");
        timesDaApi.forEach(function(time){
            let novoBotao = document.createElement("button");
            novoBotao.innerText = time.nome;
            novoBotao.dataset.destino = time.destino;
            novoBotao.classList.add("jogo", "quartas");
            tabuleiro.insertBefore(novoBotao,primeiraSemi);
        });
        console.log("Botões Criados na Tela!");
        ativarMaquinaCliques();
    }
    catch(erro){
        console.log("Erro ao buscar os times:", erro);
    }
}
function ativarMaquinaCliques(){
    const todosOsJogos = document.querySelectorAll(".jogo");
    todosOsJogos.forEach(function(botao){
        botao.addEventListener("click", function(event){
            let nomeDoTime = event.target.innerText;
            let idDoDestino = event.target.dataset.destino;
            if(nomeDoTime === " ?" || !idDoDestino){
                return;
            }
            let espacoDestino = document.getElementById(idDoDestino);
            if(espacoDestino.innerText === " ? "||espacoDestino.innerText === "A grande Final"){
                if(espacoDestino.innerText === "A grande Final"){
                    espacoDestino.innerText = nomeDoTime + " CAMPEÃO! 🏆";
                } else{
                    espacoDestino.innerText = nomeDoTime;
                }
                event.target.classList.add("brilho-vencedor");
            } else{
                console.log("O juíz já apitou o fim deste confronto!")
            }
        })
    })
}
carregarTime()