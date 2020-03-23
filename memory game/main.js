const cardsImg = ["img1", "img1", "img2", "img2", "img3", "img3", "img4", "img4", "img5", "img5", "img6", "img6", "img7", "img7", "img8", "img8", "img9", "img9", "img10", "img10"];


let h2 = document.querySelector("h2");
let btn = document.querySelector("button");

let cards = document.querySelectorAll("div");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;


const clickCard = function () {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    // first click
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }

    // second click
    else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard);
            activeCards[1] = activeCard;

            setTimeout(function () {
                if (activeCards[0].className === activeCards[1].className) {

                    activeCards.forEach(card => card.classList.add("off"))
                    gameResult++;

                    cards = cards.filter(card => !card.classList.contains("off"))

                    if (gameResult == gamePairs) {
                        const endTime = new Date().getTime();
                        const gameTime = Math.floor((endTime - startTime) / 1000);

                        setTimeout(function () {
                                h2.innerHTML = `Well done, Your time is: ${gameTime} seconds`
                            },
                            500);
                    }
                } else {

                    activeCards.forEach(card => card.classList.add("hidden"))
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard))

            }, 1000)

        })
    }


};

const init = function () {
    cards.forEach(function (card) {
        const position = Math.floor(Math.random() * cardsImg.length);
        card.classList.add(cardsImg[position]);
        cardsImg.splice(position, 1);

    })

    setTimeout(function () {
        cards.forEach(function (card) {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)

        })
    }, 2000)

}

let startGame = function () {


    location.reload();


}
btn.addEventListener("click", startGame)

init();