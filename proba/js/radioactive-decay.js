const canvas = document.getElementById('radioactive-decay-canvas');
// const canvas = document.querySelector('canvas');
canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext('2d');

class Atom {
    constructor (x, y, radius = 10) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radius = 1 + 9 * Math.random();

        this._x0 = x;
        this._y0 = y;

        this.vib_vector = [
            1.5 * (-0.5 + Math.random()),
            1.5 * (-0.5 + Math.random())
        ];

        this.fillStyle = '#FFF';
    }

    render() {

        this.x += this.vib_vector[0];
        this.y += this.vib_vector[1];

        var dx = this.x - this._x0;
        var dy = this.y - this._y0;

        if (dx*dx + dy*dy > 49) {
            this.vib_vector[0] *= -1;
            this.vib_vector[1] *= -1;
        }

        ctx.beginPath();
        ctx.fillStyle = '#00C4FF';
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}


var atoms = [];
var N = 0, N0 = 200, simId = 0, dt = 200;


function init_atoms() {
    for (var i=0; i<N0; i++) {
        var theta = Math.random() * 2 * Math.PI;
        var radius = 150 * Math.random();
        atoms.push(
            new Atom(200 + radius * Math.cos(theta),
                200 + radius * Math.sin(theta)
            )
        );
    }
}

function radioactive_decay() {
    var x = 0, y = 0;
    for (var i=0; i<atoms.length; i++) {
        if (atoms[i].fillStyle != '#FFF') continue;
        var n = Math.floor(Math.random() * 6) + 1;
        x++;
        if (n == 6) {
            atoms[i].fillStyle = '#00C4FF';
            atoms[i].vib_vector = [
                3 * (-0.5 + Math.random()),
                3 * (-0.5 + Math.random())
            ];
            y++;
        }
    }
    return [x, y];
}

function rotate2d(v, o, theta) {
    /*
        cos -sin
        sin cos
    */
   var _cost = Math.cos(theta);
   var _sint = Math.sin(theta);
   var dx = v[0] - o[0];
   var dy = v[1] - o[1];

   return [
        o[0] + dx * _cost - dy * _sint,
        o[1] + dx * _sint + dy * _cost
   ]
}

// const atom = new Atom(200, 200, 20);

// atom.vib_vector = [
//     2, 2
// ]


function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(3, 0, 28, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    atoms.forEach(atom => atom.render());

    // atom.render();
}


u('#simulate').on('click', evt => {
    if (simId != 0) {
        alert('a simulation is already started!');
        return;
    }
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.update();
    N = 0;
    atoms.forEach(atom => {atom.fillStyle = '#FFF';})
    simId = setInterval(() => {
        var r = radioactive_decay();
        N++;
        chart.data.labels.push(N);
        chart.data.datasets[0].data.push(r[0]);
        chart.update();
        // console.log(chart);

        if (r[0] == 0) {
            clearInterval(simId);
            simId = 0;
        }
    }, dt);
})

u('#dt').on('change', evt => {
    if (simId != 0) {
        alert('a simulation is already started!');
        return;
    }
    dt = evt.target.value;
    u('#dt-val').text(dt);
})

u('#N0').on('change', evt => {
    if (simId != 0) {
        alert('a simulation is already started!');
        return;
    }
    N0 = evt.target.value;
    atoms = [];
    init_atoms();
    u('#N0-val').text(N0);
})

u('#lambda').on('input', evt => {
    if (simId != 0) {
        alert('a simulation is already started!');
        return;
    }
    lambda = parseFloat(evt.target.value);

    chart.data.datasets[1].data = [];
    for (var i=0; i<N; i++) {
        chart.data.datasets[1].data.push(N0 * Math.exp(-lambda * i));
    }
    chart.update();

    u('#lambda-val').text(lambda);
})

init_atoms();

animate();