const STUDENTS_LIST = [
    'TAREK',
    'AHLAM',
    'JAWHARA',
    'SAMIRA',
    'MAJDA',
    'HAJAR C',
    'MOSAAB',
    'KHAOULA K',
    'ANOIR',
    'JEHAD',
    'IMANE',
    'KHAWLA B',
    'KHADIJA K',
    'LOUBNA',
    'SAAD',
    'NOUHAILA B',
    'WAFAA',
    'ANAS',
    'IMAD',
    'KHADIJA T',
    'ZAKARIA',
    'NOUHAILA J',
    'WIAM',
    'ZINEB',
    'HAJAR D'
];

const cardContainer = document.getElementById('card-container');

var currentPlayerId = 3;
var selectedAnswer = -1;

const urlParams = new URLSearchParams(window.location.search);

var currentQID = parseInt(urlParams.get('init_qid')) || 0; // use the http get params to set this value

const QA = [
    {
        _qa: [
            'Quelle est la relation entre la variance de la somme de deux variables aléatoires indépendantes et les variances individuelles de ces variables ?',
            'La variance de la somme est la somme des variances individuelles',
            'La variance de la somme est la différence des variances individuelles',
            'La variance de la somme est toujours nulle',
            'La variance de la somme dépend de la covariance entre les variables'
        ],
        _ca: 0
    },
    {
        _qa: [
            'Soit X et Y deux variables aléatoires indépendantes. Quelle est la covariance entre X et Y ?',
            'Toujours nulle',
            'Toujours positive',
            'Toujours négative',
            'Peut être n\'importe quelle valeur'
        ],
        _ca: 0
    },
    {
        _qa: [
            'On effectue deux tirages sans remise dans une urne contenant n boules. X la v.a égale au plus petit n° obtenu, Y la v.a égale au plus grand n° obtenu. \\( P(X = i, Y = j)_{1 \\leq i \\lt j \\leq n} = ? \\)',
            '\\( \\frac{1}{n(n+1)} \\)',
            '\\( \\frac{1}{n(n-1)} \\)',
            '\\( \\frac{2}{n(n+1)} \\)',
            '\\( \\frac{2}{n(n-1)} \\)',
        ],
        _ca: 3
    },
    {
        _qa: [
            'Si \\( X \\) et \\( Y \\) sont deux variables aléatoires définies sur un même univers \\( \\Omega \\), admettant une espérance, alors :',
            '\\( E(X+Y) = E(XY) \\)',
            '\\( E(X+Y) = E(X) + E(Y) \\)',
            '\\( E(X+Y) = E(X) - E(Y) \\)',
            '\\( E(X+Y) = 0 \\)',
        ],
        _ca: 1
    },
    {
        _qa: [
            'On effectue deux tirages sans remise dans une urne contenant n boules. X la v.a égale au plus petit n° obtenu, Y la v.a égale au plus grand n° obtenu. \\( P(Y = j) = ? \\)',
            '\\( \\frac{2(j-1)}{n(n+1)} \\)',
            '\\( \\frac{2(j-1)}{n(n-1)} \\)',
            '\\( \\frac{2(j+1)}{n(n+1)} \\)',
            '\\( \\frac{2(j+1)}{n(n-1)} \\)',
        ],
        _ca: 1
    },
    {
        _qa: [
            'Si \\( X \\) et \\( Y \\) sont deux variables aléatoires indépendantes définies sur un même univers \\( \\Omega \\), alors :',
            '\\( E(XY) = E(X) + E(Y) \\)',
            '\\( E(XY) = E(X) - E(Y) \\)',
            '\\( E(XY) = E(X)E(Y) \\)',
            '\\( E(XY) = 0 \\)',
        ],
        _ca: 2
    },
    {
        _qa: [
            'Soit \\( X \\) un variable aléatoire définie sur un univers \\( \\Omega \\), alors :',
            '\\( Cov(X, X) = Var(X) \\)',
            '\\( Cov(X, X) = Var(X^2) \\)',
            '\\( Cov(X, X) = E(X^2) \\)',
            '\\( Cov(X, X) = E(X) \\)',
        ],
        _ca: 0
    },
    {
        _qa: [
            'Soit \\( X \\) et \\( Y \\) deux variables aléatoires discrètes indépendantes. Quelle est la formule permettant de calculer la probabilité conjointe \\( P(X=x, Y=y) \\)?',
            '\\( P(X=x) + P(Y=y) \\)',
            '\\( P(X=x)P(Y=y) \\)',
            '\\( P(X=x) - P(Y=y) \\)',
            '\\( 1 - (P(X=x) + P(Y=y)) \\)',
        ],
        _ca: 1
    },
    {
        _qa: [
            'Soit \\( X \\) et \\( Y \\) deux variables aléatoires discrètes. Quelle est la condition nécessaire pour que \\( X \\) et \\( Y \\) soient indépendantes ?',
            '\\( Var(X) = Var(Y) \\)',
            '\\( E(X) = E(Y) \\)',
            '\\( Cov(X, Y) = 0 \\)',
            '\\( Corr(X, Y) = 1 \\)',
        ],
        _ca: 2
    },
    {
        _qa: [
            'Soient \\( X \\) et \\( Y \\) deux variables aléatoires discrètes définies sur le même espace probabilisé \\( \\Omega \\). Quelle est la formule pour calculer la variance de la somme \\( X + Y \\) ?',
            '\\( V(X + Y) = V(X) + V(Y) + 2Cov(X, Y) \\)',
            '\\( V(X + Y) = V(X) + V(Y) - 2Cov(X, Y) \\)',
            '\\( V(X + Y) = V(X) + V(Y) + Cov(X, Y) \\)',
            '\\( V(X + Y) = V(X) + V(Y) - Cov(X, Y) \\)',
        ],
        _ca: 0
    },
];

function insertNewCard(cardHolder, cardId) {
    const rootCard = document.getElementById('root-card');
    const newCard = rootCard.cloneNode(true);
    newCard.classList.remove('d-none');
    newCard.setAttribute('data-char-id', cardId);
    newCard.children[0].src = 'ascii3/' + cardHolder[0] + '.png';
    newCard.children[1].textContent = cardHolder;
    cardContainer.appendChild(newCard);
}

function initPlayersMap() {
    STUDENTS_LIST.forEach((name, index) => {
        insertNewCard(name, index);
    })
}

function toggleCard(cardId) {
    const card = document.querySelector('[data-char-id="' + cardId + '"]');
    if (card) {
        card.classList.toggle('i-card-selected')
    }
}

function pickRandomPlayer(callback = undefined) {
    var cardId = 0, prevCardId = -1;
    var counter = 6;

    var id = setInterval(() => {
        if (prevCardId >= 0) {
            toggleCard(prevCardId); // unselect the previous card
        }
        cardId = 3 + Math.floor(Math.random() * (STUDENTS_LIST.length-7));
        while (cardId == prevCardId) {
            cardId = 3 + Math.floor(Math.random() * (STUDENTS_LIST.length-7));
        }

        if (counter == 0) {
            switch (currentQID) {
                case 1: cardId = 1; break;
                case 2: cardId = 22; break;
                case 4: cardId = 21; break;
            }
        }

        toggleCard(cardId);
        prevCardId = cardId;
        if (counter == 0) {
            currentPlayerId = cardId;
            if (typeof callback !== "undefined") callback();
            clearInterval(id);
        }
        counter--;
    }, 500);
}

function timerCountDown(timeout = 120, callback = undefined) {
    const elem = u('#countdown');
    var cdId = setInterval(() => {
        if (timeout < 0) {
            clearInterval(cdId);
            if (typeof callback !== "undefined") callback();
            return;
        }
        elem.text(timeout + ' s');
        timeout--;
    }, 1000);
    return cdId;
}

// timerCountDown();

const qaList = [];

const qaQueue = [];

qaQueue[0] = QA[currentQID]._qa;
qaQueue[1] = QA[currentQID]._ca;
qaQueue[2] = -1;

for (var i=0; i<4; i++) {
    var qa = u('#qa-n' + i);
    qaList[i] = qa;
}

function getRandomImage(result) {
    const set1 = [
        'img/react1.png',
        'img/react2.jfif'
    ];
    const set2 = [
        'img/react3.jpg'
    ]
    if (result == 0) {
        return set1[
            Math.floor(Math.random() * set1.length)
        ]
    }
    return set2[
        Math.floor(Math.random() * set2.length)
    ]
}

qaList.forEach((qa, idx) => {
    // console.log([qa.nodes, idx]);
    qa.on('click', () => {
        // console.log(idx);
        selectedAnswer = idx;
        qa.toggleClass('qa-selected');
        setTimeout(() => {
            if (qaQueue[2] != -1) {
                clearInterval(qaQueue[2]);
                u('#countdown').text(
                    (selectedAnswer == qaQueue[1]) ? '😎 CORRECT 😎': '🤬 WRONG 🤬'
                )

                // u('.countdown-container').addClass('d-none');
                // u('#reaction-image').removeClass('d-none');

                // if (selectedAnswer == qaQueue[1]) {
                //     u('#reaction-image img').attr('src', 
                //         getRandomImage(1)
                //     );
                // } else {
                //     u('#reaction-image img').attr('src', 
                //         getRandomImage(0)
                //     );
                // }
            }
            markCorrectAnswer(qaQueue[1]);
        }, 1000);
    })
})

function updateAnswer(qaId, answer) {
    var qa = qaList[qaId];
    qa.children[1].textContent = answer;
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub, qa.children[1]]);
}

function markCorrectAnswer(qaId) {
    for (var i=0; i<4; i++) {
        var qa = qaList[i];
        if (i == qaId) {
            qa.toggleClass('qa-correct');
        } else {
            qa.toggleClass('qa-wrong');
        }
    }

    u('#action-btn').attr('data-action-name', 'BACK_TO_PLAYERS_MAP');
    u('#action-btn').text('BACK');
}

function clearAnswers(qaId) {
    for (var i=0; i<4; i++) {
        var qa = qaList[i];
        if (qa.hasClass('qa-selected')) {
            qa.toggleClass('qa-selected');
        }
        if (i == qaId) {
            qa.toggleClass('qa-correct');
        } else {
            qa.toggleClass('qa-wrong');
        }
    }
}

function showQABoard() {
    if (currentQID >= QA.length) return;
    u('.qa-container').removeClass('d-none');
    u('.countdown-container').removeClass('d-none');
    // u('#reaction-image').addClass('d-none');

    u('#question').text(qaQueue[0][0]);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,
        u('#question').nodes[0]
    ]);
    for (var idx = 0; idx<4; idx++) {
        u('#qa-n' + idx + ' p:nth-child(2)').text(qaQueue[0][idx + 1]);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,
            u('#qa-n' + idx + ' p:nth-child(2)').nodes[0]
        ]);
    }
    const playerName = STUDENTS_LIST[currentPlayerId];
    u('#s-card img').attr('src', 'ascii3/' + playerName[0] + '.png');
    u('#s-card p').text(playerName);

    qaQueue[2] = timerCountDown(520, () => {
        markCorrectAnswer(qaQueue[1]);
    })
}

function showEndOfQA() {
    u('#card-container').addClass('d-none');
    u('.qa-container').addClass('d-none');
    u('#action-btn').addClass('d-none');
    u('#eof').removeClass('d-none');
}

function updateProgressBar() {
    if (currentQID > QA.length) return;
    var val = Math.floor(100 * currentQID / QA.length);
    var e = u('#progressbar');
    e.attr('aria-valuenow', 50);
    e.nodes[0].style.width = val + '%';
    e.text(currentQID + '/' + QA.length);
}

function hideQABoard() {
    u('.qa-container').addClass('d-none');
    clearAnswers(qaQueue[1]);

    currentQID++; // next qa
    updateProgressBar();
    if (currentQID >= QA.length) {
        showEndOfQA();
        return;
    }
    qaQueue[0] = QA[currentQID]._qa;
    qaQueue[1] = QA[currentQID]._ca;
    qaQueue[2] = -1;
}

function togglePlayersBoard() {
    if (currentQID >= QA.length) return;
    u('#card-container').toggleClass('d-none');
}

initPlayersMap();
updateProgressBar();

// showQABoard();

u('#action-btn').on('click', (evt) => {
    const action = evt.target.getAttribute('data-action-name');
    if (action === 'LOCKED') return;

    // console.log(evt.target);

    switch (action) {
        case 'PICK_RANDOM_PLAYER':
            evt.target.setAttribute('data-action-name', 'LOCKED');
            evt.target.textContent = 'LOCKED';
            pickRandomPlayer(() => {
                console.log('selected player: ', STUDENTS_LIST[currentPlayerId]);

                evt.target.setAttribute('data-action-name', 'SETUP_QA_BOARD');
                evt.target.textContent = 'START';
                console.log(evt.target);
            });
            break;

        case 'SETUP_QA_BOARD':
            evt.target.setAttribute('data-action-name', 'LOCKED');
            toggleCard(currentPlayerId);
            togglePlayersBoard();
            showQABoard();
            evt.target.textContent = 'LOCKED';
            break;
        
        case 'BACK_TO_PLAYERS_MAP':
            evt.target.textContent = 'PICK A PLAYER';
            evt.target.setAttribute('data-action-name', 'PICK_RANDOM_PLAYER');
            hideQABoard();
            togglePlayersBoard();
            break;
    }
})


// showQABoard();

// timerCountDown(10, () => {
//     markCorrectAnswer(0);
// })

// updateAnswer(0, '\\( \\sum_{ext} \\vec{F} = m \\vec{a} \\)');
