//tamanho da bolinha
let xBolinha = 768
let yBolinha = 376
let diametro = 30
let raio = diametro / 2
//velocidade da bolinha
let velocidadeXbola = 9
let velocidadeYbola = 9

//tamanho da raquete
let Xraquete = 12
let Yraquete = 300
let largura = 15
let altura = 130
//velocidade da raquete
let velocidadeYraquete = 7
let velocidadeCPU

//tamanho da raquete inimiga
let xCpu = 1510
let yCpu = 300
let colidiu = false

//pontos
let meusPontos = 0
let pontosOponentes = 0
let chanceDeErrar = 0

//sons do jogo
let raquetada
let trilha
let ponto

//créditos
let criador = "FEITO_POR_Vitor_Avellar"


function preload() {
    trilha = loadSound("trilha.mp3")
    raquetada = loadSound("raquetada.mp3")
    ponto = loadSound("ponto.mp3")

}


function setup() {
    createCanvas(1536, 753)
    trilha.loop()
}

function draw() {
    background(0)

    mostraBola()

    movimentoBola()

    verificarColisao()

    mostraRaquete()

    monvimentoRquete()

    colisaoRaquete()

    cpu()

    movimentoCpu()

    calcularErro()

    //ative para jogar em dupla
    //multiplayer()

    colisaoCPU()

    placar()

    marcaPonto()

    creditos()

}

//movimento, apararição e erro da cpu 
function cpu() {
    rect(xCpu, yCpu, largura, altura)
}

function calcularErro() {
    if (pontosOponentes >= meusPontos) {
        chanceDeErrar += 1

        if (chanceDeErrar >= 39) {
            chanceDeErrar = 40
        }
    } else {
        chanceDeErrar -= 1
        if (chanceDeErrar <= 35) {
            chanceDeErrar = 35
        }
    }
}

function movimentoCpu() {
    velocidadeCPU = yBolinha - yCpu - largura / 2 - 30
    yCpu += velocidadeCPU + chanceDeErrar
    calcularErro()

}

function multiplayer() {

    if (keyIsDown(83)) {
        yCpu += velocidadeYraquete
    }
    if (keyIsDown(87)) {
        yCpu -= velocidadeYraquete
    }
}

//movimento e aparição da raquete
function mostraRaquete() {
    rect(Xraquete, Yraquete, largura, altura)
}

function monvimentoRquete() {

    if (keyIsDown(DOWN_ARROW)) {
        Yraquete += velocidadeYraquete
    }
    if (keyIsDown(UP_ARROW)) {
        Yraquete -= velocidadeYraquete
    }
}

//movimento e aparição da bolinha
function mostraBola() {
    circle(xBolinha, yBolinha, diametro)

}

function movimentoBola() {
    xBolinha += velocidadeXbola
    yBolinha += velocidadeYbola
}

//colisões
function verificarColisao() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {

        velocidadeXbola *= -1

    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {

        velocidadeYbola *= -1
    }

}

function colisaoRaquete() {
    colidiu = collideRectCircle(Xraquete, Yraquete, largura, altura, xBolinha, yBolinha, raio)
    if (colidiu) {
        velocidadeXbola *= -1
        raquetada.play()
    }
}

function colisaoCPU() {
    colidiu = collideRectCircle(xCpu, yCpu, largura, altura, xBolinha, yBolinha, raio)
    if (colidiu) {
        velocidadeXbola *= -1
        raquetada.play()
    }
}

//placar
function placar() {
    textAlign(CENTER)
    textSize(16)
    stroke(225)

    fill(color(0, 0, 255))
    rect(530, 10, 40, 20)
    fill(225)
    text(meusPontos, 550, 26)

    fill(color(255, 0, 0))
    rect(930, 10, 40, 20)
    fill(225)
    text(pontosOponentes, 950, 26)

}

function marcaPonto() {
    if (xBolinha > 1515) {
        meusPontos += 1
        ponto.play()
    }

    if (xBolinha < 14) {
        pontosOponentes += 1
        ponto.play()
    }
}

//creditos
function creditos() {

    fill(225)
    text(criador, 1200, 730, 40)
    textSize(16)
}