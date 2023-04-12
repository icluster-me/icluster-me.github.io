const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 600;

const ctx = canvas.getContext('2d');

class Sprite {
    constructor(path) {
        this.image = new Image();
        this.image.src = path;
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
            this._w2 = this.image.width/2;
            this._h2 = this.image.height/2;
    
        }

        this.x = 0;
        this.y = 0;
    }

    render() {
        if (!this.loaded) return;

        ctx.drawImage(this.image, canvas.width/2 + this.x - this._w2, canvas.height/2 - this.y - this._h2);
    }

    renderEx(x, y, sx, sy) {
        if (!this.loaded) return;

        ctx.drawImage(this.image, canvas.width/2 + x - this._w2 * sx, canvas.height/2 - y - this._h2 * sy, this.image.width * sx, this.image.height * sy);
    }
}

class Timer {
    constructor() {
        this.m_Time = new Date().getTime();
    }
    restart() {
        this.m_Time = new Date().getTime();        
    }
    getElapsedTime() {
        return (new Date().getTime() - this.m_Time) / 1000.0;
    }
}

function renderCircle(x, y, radius, strokeStyle = 'dodgerblue') {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeStyle;
    ctx.arc(canvas.width/2 + x, canvas.height/2 - y, radius, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}

function renderLine(x1, y1, x2, y2, strokeStyle = 'dodgerblue') {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function renderText(text, x, y, fillStyle = '#000') {
    ctx.font = '18px serif';
    ctx.fillStyle = fillStyle;
    text = text.toUpperCase();
    ctx.fillText(text, canvas.width/2 + x, canvas.height/2 - y);
}

const coinFrontSide = new Sprite('./dollar.png');
const cointBackSide = new Sprite('./coin.png');

coinFrontSide.x = 100;
cointBackSide.x = -100;

const timer = new Timer();

var dt = 1;

var coinId = -1;
var stat = [0, 0];
var targetCoin = null;

class _Array extends Array {
    push(obj) {
        if (this.length > 48) {
            this.shift();
        }
        super.push(obj);
    }
}

var g1 = new _Array(), g2 = new _Array();

const gTimer = new Timer();

function renderPath(path, strokeStyle) {
    if (path.length === 0) return;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.moveTo(50, 450 + path[0] * 100);
    for (var i=1; i<path.length; i++) {
        ctx.lineTo(50 + 10 * i, 450 + path[i] * 100);
    }
    ctx.stroke();
    ctx.closePath();
}

var started = false;

var resetButton = document.querySelector('#reset-btn');
var playButton = document.querySelector('#play-btn');

resetButton.addEventListener('click', evt => {
    started = false;
    targetCoin = null;
    stat = [0, 0];
    coinId = -1;
    dt = 1;
    g1 = new _Array();
    g2 = new _Array();
    resetButton.classList.add('selected');
    playButton.classList.remove('selected');
})

playButton.addEventListener('click', evt => {
    started = true;
    resetButton.classList.remove('selected');
    playButton.classList.add('selected');
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (started && timer.getElapsedTime() >= Math.max(dt, 0.001)) {

        const result = Math.random();

        if (result >= 0.5) {
            coinId = 0;
        } else {
            coinId = 1;
        }

        stat[coinId]++;
        targetCoin = (coinId === 1) ? coinFrontSide: cointBackSide;

        // console.log(stat);
        // console.log(stat[0]+stat[1]);
        renderCircle(targetCoin.x, targetCoin.y, targetCoin._w2 + 1);


        timer.restart();
        dt /= 1.2;
    }

    targetCoin?.render();

    // +++++++++++++++++++ //

    coinFrontSide.renderEx(-200, 200, 0.5, 0.5);
    cointBackSide.renderEx(-200+64, 200, 0.5, 0.5);

    var N = stat[0]+stat[1];

    if (started && gTimer.getElapsedTime() > 0.1 && N > 2) {

        g1.push(stat[0]/N);
        g2.push(stat[1]/N);
        gTimer.restart();
    }



    renderText(stat[1].toString(), -210 - 4 * Math.floor(Math.log10(stat[1]+0.1)), 200-40, 'red');
    renderText(stat[0].toString(), -210+70 - 4 * Math.floor(Math.log10(stat[0]+0.1)), 200-40, 'dodgerblue');

    renderText('TOTAL: '+N, -250, -100);
    
    if (N > 0) {
        renderText((stat[1]/N * 100).toFixed(2) + ' %', 0, 190, 'red');

        renderText((stat[0]/N * 100).toFixed(2) + ' %', 100, 190, 'dodgerblue');    
    } else {
        renderText('0 %', 0, 190, 'red');

        renderText('0 %', 100, 190, 'dodgerblue');
    }

    // +++++++++++++++++++ //

    renderLine(50, 500, 550, 500, '#333');
    renderLine(50, 450, 50, 550, '#333');

    renderPath(g2, 'red');
    renderPath(g1, 'dodgerblue');
}


animate();