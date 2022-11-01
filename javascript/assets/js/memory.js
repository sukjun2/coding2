// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집기(첫번째, 두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = document.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let Mpoint = 0, // 점수
    Mcount = 0; // 정답 갯수
let MtimeReamining = 40; // 남은시간

let sound = ["../assets/music/Success 2.mp3", "../assets/music/fail.mp3", "../assets/music/up.mp3"];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e) {
    let clickedCard = e.target;

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

// 카드 확인(두개의 이미지 비교)
function matchCards(img1, img2) {
    if (img1 == img2) {
        // 같을 경우
        matchedCard++;

        if (matchedCard == 8) {
            endMemory();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;

        Mcount++;
        memoCount.textContent = Mcount;
        soundMatch.play();
    } else {
        // 일치하지 않는 경우(오답 사운드, 이미지가 좌우로 흔들림)
        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 500);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1600);

        soundUnMatch.play();
    }
}

// 카드 섞기
function shuffledCard() {
    cardOne = cardTwo = "";
    matchedCard = 0;
    disableDeck = true;
    setTimeout(() => {
        disableDeck = false;
    }, 3000);

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    memoryCards.forEach((card, index) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            card.classList.remove("flip");
        }, 4000);

        card.addEventListener("click", flipCard);
        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/card0${arr[index]}.png`;
    });
}

// 카드 클릭
const memoToggle = document.querySelector(".icon2");
const memoWrap = document.querySelector(".memory__wrap");
const memoryTime = document.querySelector(".memory__time span");

const startbtnWrap = document.querySelector(".memory__start");
const startbtn = document.querySelector(".memory_button");

const memoResultWrap = document.querySelector(".memory__result");
const memoResult = document.querySelector(".memory__result .memory_result");
const memoRestart = document.querySelector(".memory_restart");
const memoCount = document.querySelector(".memory__info .memory_point");

// 게임 시작하기
function startMemory() {
    // 시작 버튼 없애기
    startbtnWrap.style.display = "none";

    // 시간 설정
    timeInterval = setInterval(reduceTime, 1000);

    // 카드 섞기
    shuffledCard();
}

// 시간 설정하기
function reduceTime() {
    setTimeout(() => {
        MtimeReamining--;
    }, 2000);

    if (MtimeReamining == 0)
        setTimeout(() => {
            endMemory();
        }, 500);

    memoryTime.innerText = displayTime();
}

// 시간 표시하기
function displayTime() {
    if (MtimeReamining <= 0) {
        return "0:00";
    } else {
        let minutes = Math.floor(MtimeReamining / 60);
        let seconds = MtimeReamining % 60;

        // 초 단위가 한자리수 일 때 0을 추가
        if (seconds < 10) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    }
}

// 게임 끝났을 때
function endMemory() {
    // 시작 버튼 만들기
    startbtnWrap.style.display = "block";
    startbtn.style.display = "none";

    // 시간 정지
    clearInterval(timeInterval);

    // 메시지 출력
    memoResultWrap.classList.add("show");
    let Mpoint = Math.round((Mcount / 8) * 100);
    if (matchedCard == 8) {
        memoResult.innerHTML = `당신은 ${8}개중에 ${Mcount + 1}개를 맞추었습니다.<br>당신의 점수는 100점 입니다.`;
    } else {
        memoResult.innerHTML = `당신은 ${8}개중에 ${Mcount + 1}개를 맞추었습니다.<br>당신의 점수는 ${Mpoint}점 입니다.`;
    }
}

// 다시 시작하기
function restart() {
    memoResultWrap.classList.remove("show");

    startMemory();
    MtimeReamining = 40;
    Mcount = 0;
    memoCount.innerText = "0";
}

startbtn.addEventListener("click", startMemory);
memoRestart.addEventListener("click", restart);

// 게임 ON / OFF
memoToggle.addEventListener("click", () => {
    memoWrap.classList.toggle("show");
    $(".memory__wrap").css("z-index", "1000");
    $(".music__wrap").css("z-index", "0");
    $(".search__wrap").css("z-index", "0");
});
