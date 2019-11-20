let playerO,
    playerTurn = 1,
    animating = false,
    winner,
    playedPieces = [],
    gameOver = false,
    countedPlays = 0,
    playerOneAvatar,
    playerTwoAvatar;

let startGameButton = document.querySelector('#startGame'),
    charSel = document.querySelector('#characterSelection'),
    playerOnePiece = document.querySelector('.one'),
    playerTwoPiece = document.querySelector('.two'),
    pieceBoxes = document.querySelectorAll('.pieceBox'),
    male = document.querySelector('#male'),
    female = document.querySelector('#female');

for (let element of pieceBoxes) {                                   // Pushing all playable fields into an array while also adding the object property 'player' and defining it 'none'.
    let box = element.firstElementChild;                            // Used to check for winner in later logic.
    box.player = 'none';
    playedPieces.push(box);
}                                                                   // <------------------

pieceBoxes[1].style.backgroundPosition = '25% 60%';                 // Fixing background positions of background shown
pieceBoxes[2].style.backgroundPosition = '50% 50%';                 // as the pieces are placed during the 'rotation'-animation.
pieceBoxes[3].style.backgroundPosition = '50% 0%';
pieceBoxes[4].style.backgroundPosition = '50% 20%';
pieceBoxes[5].style.backgroundPosition = '0% 50%';
pieceBoxes[6].style.backgroundPosition = '100% calc(80% + 4px)';
pieceBoxes[7].style.backgroundPosition = '0% calc(80% + 4px)';
pieceBoxes[8].style.backgroundPosition = '25% calc(80% + 4px)';     // <------------------

for (let i = 0; i < pieceBoxes.length; i++) {
    pieceBoxes[i].firstElementChild.addEventListener('click', placePiece);
}

male.addEventListener('click', bringPlayerPieces);
female.addEventListener('click', bringPlayerPieces);

startGameButton.addEventListener('click', () => {                                           //  Starts of the animation bringing in 'character selection'-screen.
    startGameButton.style.animationName = 'startButtonVanish';
    startGameButton.style.animationDuration = '.6s';
    startGameButton.style.background = 'linear-gradient(-135deg, #ffe600, #cce51c)';
    startGameButton.style.textShadow = '-1px -1px yellow';

    setTimeout(() => {
        startGameButton.style.display = 'none';
        startGameButton.style.background = 'linear-gradient(135deg, #ffe600, #cce51c)';
        startGameButton.style.textShadow = '1px 1px yellow';
        startGameButton.style.animationName = '';
        startGameButton.style.animationDuration = '';

        bringCharacterSelection();
    }, 600)
})                                                                                          // <-------------------


function bringCharacterSelection() {                            // Animation bringing in the 'character selection'-screen
    if (animating === true) return;

    animating = true;

    charSel.style.animationName = 'bringCharacterSelection';
    charSel.style.animationDuration = '.6s';
    charSel.style.display = 'block';

    setTimeout(() => {
        male.style.right = '0px';

        setTimeout(() => {
            female.style.left = '0px';

            animating = false;
        }, 200)
    }, 200)
}                                                                // <--------------------

function bringPlayerPieces(e) {                                             // Logic handling choice of character and animation of corresponding piece showing
    if (animating === true) return;

    animating = true;

    if (e.target.id === 'female') {
        playerO = 'female';
        playerOnePiece.firstElementChild.src = 'resources/cross.png';
        playerTwoPiece.firstElementChild.src = 'resources/circle.png';
    } else if (e.target.id === 'male') {
        playerO = 'male';
    }

    playerOnePiece.style.animationName = 'bringPlayerOnePiece';
    playerOnePiece.style.animationDuration = '.8s';
    playerTwoPiece.style.animationName = 'bringPlayerTwoPiece';
    playerTwoPiece.style.animationDuration = '.8s';

    setTimeout(() => {
        playerOnePiece.style.animationName = '';
        playerOnePiece.style.animationDuration = '';
        playerTwoPiece.style.animationName = '';
        playerTwoPiece.style.animationDuration = '';

        playerOnePiece.style.transform = 'translate(20%, 40%) scale(.7)';
        playerTwoPiece.style.transform = 'translate(-20%, 40%) scale(.7)';

        setTimeout(() => {
            animating = false;
            bringPlayingField();
        }, 1000)

    }, 800)
}                                                                           // <--------------------

function bringPlayingField() {                                                              // Animation that brings in the playing field
    if (animating === true) return;

    animating = true;

    male.style.right = '1000px';
    female.style.left = '1000px';
    playerOnePiece.style.animationName = 'sendPlayerOnePiece';
    playerOnePiece.style.animationDuration = '.6s';
    playerTwoPiece.style.animationName = 'sendPlayerTwoPiece';
    playerTwoPiece.style.animationDuration = '.6s';

    setTimeout(() => {
        playerOnePiece.style.animationName = '';
        playerOnePiece.style.animationDuration = '';
        playerTwoPiece.style.animationName = '';
        playerTwoPiece.style.animationDuration = '';

        playerOnePiece.style.transform = 'translate(calc(-1000px + 20%), 40%) scale(.7)';
        playerTwoPiece.style.transform = 'translate(calc(1000px - 20%), 40%) scale(.7)';

        charSel.style.animationName = 'sendCharacterSelection';
        charSel.style.animationDuration = '.6s';

        setTimeout(() => {
            charSel.style.display = 'none';
            charSel.style.opacity = '1';

            let spaceship = document.querySelector('#spaceship');
            spaceship.style.animationName = 'spaceship';
            spaceship.style.animationDuration = '3s';

            setTimeout(() => {
                let space = document.querySelector('#spaceBackdrop');
                space.style.opacity = '1';

                spaceship.style.animationName = '';
                spaceship.style.animationDuration = '';

                setTimeout(() => {
                    let theVoid = document.querySelector('#theVoid');
                    theVoid.style.bottom = '0px';
                    theVoid.style.opacity = '1';

                    setTimeout(() => {
                        let playfield = document.querySelector('#playfield'),
                            playerOneTitle = document.createElement('span'),
                            playerTwoTitle = document.createElement('span');

                        playerOneTitle.textContent = 'Player 1';
                        playerOneTitle.className = 'playerTitle';
                        playerTwoTitle.textContent = 'Player 2';
                        playerTwoTitle.className = 'playerTitle';

                        if (playerO === 'male') {
                            playerOneAvatar = male.cloneNode();
                            playerOneAvatar.style.transform = 'scale(.7)';
                            playerTwoAvatar = female.cloneNode();
                            playerTwoAvatar.style.transform = 'scale(.7)';
                        } else if (playerO === 'female') {
                            playerOneAvatar = female.cloneNode();
                            playerOneAvatar.style.transform = 'scale(-.7, .7)';
                            playerOneAvatar.style.left = "-400px";
                            playerTwoAvatar = male.cloneNode();
                            playerTwoAvatar.style.transform = 'scale(-.7, .7)';
                            playerTwoAvatar.style.right = "-400px";
                        }

                        playfield.appendChild(playerOneAvatar);
                        playfield.appendChild(playerOneTitle);
                        playfield.appendChild(playerTwoAvatar);
                        playfield.appendChild(playerTwoTitle);

                        playfield.style.top = '0px';

                        playerOneAvatar.style.position = 'absolute';
                        playerOneAvatar.style.top = "316px";
                        playerTwoAvatar.style.position = 'absolute';
                        playerTwoAvatar.style.top = "316px";

                        animating = false;
                    }, 4000)

                }, 3000)

            }, 2000)

        }, 600)

    }, 600)
}                                                                                           // <----------------

function placePiece(e) {                                                // Logic checking whose turn it is and animating piece placement accordingly
    let o,
        x;

    if (e.target.classList.contains('played') ||
        e.target.parentElement.classList.contains('played') ||
        gameOver === true) {
        return;
    }
    else e.target.classList.add('played');

    e.target.style.transition = 'transform .3s';
    e.target.style.transform = 'scaleX(-1)';
    e.target.parentElement.style.borderTopColor = '#957f35';
    e.target.parentElement.style.borderLeftColor = '#957f35';
    e.target.parentElement.style.borderRightColor = '#fffd2c';
    e.target.parentElement.style.borderBottomColor = '#fffd2c';

    setTimeout(() => {

        if (playerO === 'female') {
            o = playerTwoPiece.firstElementChild.cloneNode();
            x = playerOnePiece.firstElementChild.cloneNode();
        } else if (playerO === 'male') {
            o = playerOnePiece.firstElementChild.cloneNode();
            x = playerTwoPiece.firstElementChild.cloneNode();
        }

        o.style.transform = 'scale(.65)';
        x.style.transform = 'scale(.65)';

        if (playerTurn === 1) {
            e.target.player = 'o';
            e.target.appendChild(o);
            playerTurn++;
        } else if (playerTurn === 2) {
            e.target.player = 'x';
            e.target.appendChild(x);
            playerTurn--;
        }

        countedPlays++;
    }, 150)

    setTimeout(() => {
        e.target.style.transition = '';
        e.target.style.transform = '';
        e.target.parentElement.style.borderTopColor = '#fffd2c';
        e.target.parentElement.style.borderLeftColor = '#fffd2c';
        e.target.parentElement.style.borderRightColor = '#957f35';
        e.target.parentElement.style.borderBottomColor = '#957f35';

        if (e.target.player === 'o') checkForWin(e.target.player, playerOneAvatar.src);
        else if (e.target.player === 'x') checkForWin(e.target.player, playerTwoAvatar.src);
    }, 300)
}                                                                       // <-------------------

function checkForWin(player, src) {                                                                                                                              // Logic handling win/lose and draw scenarios
    if (playedPieces[0].player === playedPieces[1].player && playedPieces[0].player === playedPieces[2].player && playedPieces[0].player !== 'none' ||
        playedPieces[3].player === playedPieces[4].player && playedPieces[3].player === playedPieces[5].player && playedPieces[3].player !== 'none' ||
        playedPieces[6].player === playedPieces[7].player && playedPieces[6].player === playedPieces[8].player && playedPieces[6].player !== 'none' ||
        playedPieces[0].player === playedPieces[3].player && playedPieces[0].player === playedPieces[6].player && playedPieces[0].player !== 'none' ||
        playedPieces[1].player === playedPieces[4].player && playedPieces[1].player === playedPieces[7].player && playedPieces[1].player !== 'none' ||
        playedPieces[2].player === playedPieces[5].player && playedPieces[2].player === playedPieces[8].player && playedPieces[2].player !== 'none' ||
        playedPieces[0].player === playedPieces[4].player && playedPieces[0].player === playedPieces[8].player && playedPieces[0].player !== 'none' ||
        playedPieces[2].player === playedPieces[4].player && playedPieces[2].player === playedPieces[6].player && playedPieces[2].player !== 'none') {
        gameOver = true;
        showWinner(player, src);
    } else if (countedPlays === 9 && winner === undefined) {
        gameOver = true;
        showDraw();
    }
}                                                                                                                                                           // <-----------------

function showWinner(winner, src) {
    let playfield = document.querySelector('#playfield'),
        body = document.querySelector('body'),
        div = document.createElement('div'),
        winningAvatar = document.createElement('img'),
        title = document.createElement('span'),
        playAgain = document.createElement('span');

    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.className = 'tempDiv';

    playfield.style.top = '-1000px';

    setTimeout(() => {
        winningAvatar.src = src;
        winningAvatar.style.zIndex = '100';
        winningAvatar.style.transition = '2s';
        winningAvatar.style.opacity = '0';

        div.appendChild(winningAvatar);
        body.appendChild(div);


        setTimeout(() => {
            winningAvatar.style.opacity = '1';

            title.textContent = 'WINNER!';
            title.className = 'winnerTitle';

            div.appendChild(title);

            setTimeout(() => {
                title.style.bottom = '300px';

                playAgain.className = 'playAgain';
                playAgain.textContent = 'Click here to play again.';
                playAgain.addEventListener('click', resetPlayfield);

                body.appendChild(playAgain);

                setTimeout(() => {
                    playAgain.style.top = '30px';
                }, 800)
            }, 1300)
        }, 1000)
    }, 500)
}

function showDraw() {
    let playfield = document.querySelector('#playfield'),
        body = document.querySelector('body'),
        title = document.createElement('span'),
        playAgain = document.createElement('span');

    playfield.style.top = '-1000px';

    setTimeout(() => {
        title.textContent = 'DRAW';
        title.className = 'winnerTitle';

        body.appendChild(title);

        setTimeout(() => {
            title.style.bottom = '300px';

            playAgain.className = 'playAgain';
            playAgain.textContent = 'Click here to play again.';
            playAgain.addEventListener('click', resetPlayfield);

            body.appendChild(playAgain);

            setTimeout(() => {
                playAgain.style.top = '30px';
            }, 800)
        }, 1000)
    }, 500)
}

function resetPlayfield() {
    for (box of playedPieces) box.player = 'none';

    if (document.querySelector('.tempDiv') !== null) {
        let div = document.querySelector('.tempDiv'),
            winnerAvatar = div.firstElementChild,
            winnerTitle = div.lastElementChild;

        winnerAvatar.style.opacity = '0';
        winnerTitle.style.bottom = '-200px';
    } else {
        let title = document.querySelector('.winnerTitle');

        title.style.bottom = '-300px';
    }

    let playAgain = document.querySelector('.playAgain'),
        playfield = document.querySelector('#playfield');

    playAgain.style.top = '-100px';

    setTimeout(() => {
        playAgain.parentElement.removeChild(playAgain);

        if (document.querySelector('.tempDiv') !== null) {
            let div = document.querySelector('.tempDiv');
            div.parentElement.removeChild(div);
        } else {
            let title = document.querySelector('.winnerTitle');
            title.parentElement.removeChild(title);
        }

        playfield.style.top = '0px';
        gameOver = false;
        countedPlays = 0;

        for (piece of pieceBoxes) {
            piece.firstElementChild.classList.remove('played');

            if (piece.firstElementChild.firstElementChild !== null) {
                piece.firstElementChild.removeChild(piece.firstElementChild.firstElementChild);
            } else {
                continue;
            }
        }
    }, 2000)
}