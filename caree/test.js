const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 600;

const ctx = canvas.getContext('2d');

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

const dx = 50;
const dw = canvas.width/dx, dh = canvas.height/dx;

function drawGrid() {
    for (var i=0; i<=dw; i++) {
        drawLine(0, dx * i, canvas.width, dx * i);
    }

    for (var i=0; i<=dh; i++) {
        drawLine(dx * i, 0, dx * i, canvas.height);
    }
}

function fillGridRect(i, j) {
    var x, y;
    x = dx * i;
    y = canvas.height - dx * j - dx;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, dx, dx);
    ctx.closePath();
}

function drawDiagonal(n, p) {
    drawLine(0, canvas.height,
        dx * n, canvas.height - dx * p);
}

function checkDiagonalIntersection(n, p, i, j) {
    if (i >= n || j >= p) return;
    var x, y, x0, y0;
    x0 = i * dx;
    y0 = j * dx;

    x = n*y0 / p;
    if (x >= x0 && x < x0+dx) return true;

    y = p*x0 / n;
    if (y > y0 && y < y0+dx) return true;

    return false;
}

function pgcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return pgcd(b, a % b);
    }
  }

function Log(text) {
    document.getElementById('log').innerHTML = text;
}

var n = 0, p = 1;


function animate() {
    // requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var N = 0;

    for (var i=0; i<dw; i++) {
        for (var j=0; j<dh; j++) {
            if (checkDiagonalIntersection(n, p, i, j)) {
                fillGridRect(i, j);
                N++;
            }
        }
    }

    var n0 = n+p-pgcd(n, p);

    var err = (n0 == N) ? 'walo 🙃': '******';

    Log(`n = ${n}, p = ${p}, nombre de carrés = ${N}<br/> n + p - pgcd(n, p) = ${n0}, erreur? : ${err}`);


    drawGrid();
    drawDiagonal(n, p);
}

const prButton = document.getElementById('ctrl');

var sim_status = 'none';

prButton.addEventListener('click', evt => {
    if (sim_status === 'pause') {
        prButton.textContent = 'pause';
        sim_status = 'play';
    } else {
        prButton.textContent = 'play';
        sim_status = 'pause';
    }
})


function init() {
    var id = setInterval(() => {
        if (sim_status === 'none') {
            sim_status = 'pause';
        }
        else if (sim_status === 'pause') return;
        n++;
        if (n > dh) {
            n = 1;
            if (p >= dw) {
                clearInterval(id);
                return;
            }    
            p++;
        }
        animate();
    }, 600);
}

init();

// n = 12;
// p = 1;
// animate();