const whiteCar = document.getElementById('white');
const redCar = document.getElementById('red');
const result = document.getElementById('result');
const btnBranco = document.getElementById('branco');
const btnVermelho = document.getElementById('vermelho');
const btnResetar = document.getElementById('resetar');
const btnAcelerar = document.getElementById('acelerar');
const btnDesacelerar = document.getElementById('desacelerar');

let selectedColor = null;
let whiteTop = 60;
let redTop = 60;

let whiteModel = 0;
let redModel = 0;

const whiteModels = [
    'assets/img/white_lotus.png',
    'assets/img/white_ats.png'
];

const redModels = [
    'assets/img/red_jaguar.png',
    'assets/img/red_kia.png'
];


const minTop = 10;
const maxTop = 60;
const minScale = 0.5;
const maxScale = 1;

function updateCarModels() {
    whiteCar.style.backgroundImage = `url(${whiteModels[whiteModel]})`;
    redCar.style.backgroundImage = `url(${redModels[redModel]})`;
}


function atualizarTamanho(carro, topAtual) {
    const topLimitado = Math.max(minTop, Math.min(maxTop, topAtual));
    const escalaNormalizada = (topLimitado - minTop) / (maxTop - minTop);
    const scale = minScale + (maxScale - minScale) * escalaNormalizada;

    carro.style.top = `${topLimitado}px`;

    if (carro.id === "white") {
        carro.style.left = "45%"; 
    } else if (carro.id === "red") {
        carro.style.left = "55%"; 
    }

    carro.style.right = ""; 
    carro.style.transform = `translateX(-50%) scale(${scale})`;
}


function selecionarCarro(cor) {
    selectedColor = cor;
    result.textContent = cor === 'branco' ? 'Branco' : 'Vermelho';

    if (cor === 'branco') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    } else {
        document.body.style.backgroundColor = 'darkred';
        document.body.style.color = 'white';
    }

    btnAcelerar.style.display = 'inline-block';
    btnDesacelerar.style.display = 'inline-block';
    btnResetar.style.display = 'inline-block';
}

function resetar() {
    selectedColor = null;
    whiteTop = maxTop;
    redTop = maxTop;
    result.textContent = '?';

    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';

    atualizarTamanho(whiteCar, whiteTop);
    atualizarTamanho(redCar, redTop);

    btnAcelerar.style.display = 'none';
    btnDesacelerar.style.display = 'none';
}

function acelerar() {
    if (selectedColor === 'branco') {
        whiteTop -= 5;
        atualizarTamanho(whiteCar, whiteTop);
    } else if (selectedColor === 'vermelho') {
        redTop -= 5;
        atualizarTamanho(redCar, redTop);
    }
}

function desacelerar() {
    if (selectedColor === 'branco') {
        whiteTop += 5;
        atualizarTamanho(whiteCar, whiteTop);
    } else if (selectedColor === 'vermelho') {
        redTop += 5;
        atualizarTamanho(redCar, redTop);
    }
}


btnBranco.addEventListener('click', () => selecionarCarro('branco'));
btnVermelho.addEventListener('click', () => selecionarCarro('vermelho'));
btnResetar.addEventListener('click', resetar);
btnAcelerar.addEventListener('click', acelerar);
btnDesacelerar.addEventListener('click', desacelerar);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') acelerar();
    if (e.key === 'ArrowDown') desacelerar();
});

whiteCar.addEventListener('click', () => {
    whiteModel = (whiteModel + 1) % whiteModels.length;
    updateCarModels();
});

redCar.addEventListener('click', () => {
    redModel = (redModel + 1) % redModels.length;
    updateCarModels();
});


updateCarModels();
resetar();

