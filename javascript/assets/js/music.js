const allMusic = [
    {
        name: "1. Cattle",
        artist: "Telecasted",
        img: "music_view01",
        audio: "music_audio01",
    },
    {
        name: "2. Fat Man",
        artist: "Yung Logos",
        img: "music_view02",
        audio: "music_audio02",
    },
    {
        name: "3. Faultlines",
        artist: "Asher Fulero",
        img: "music_view03",
        audio: "music_audio03",
    },
    {
        name: "4. Keep On Movin'",
        artist: "King Canyon",
        img: "music_view04",
        audio: "music_audio04",
    },
    {
        name: "5. Next Steps",
        artist: "half.cool",
        img: "music_view05",
        audio: "music_audio05",
    },
    {
        name: "6. Swimming Lessons",
        artist: "Bail Bonds",
        img: "music_view06",
        audio: "music_audio06",
    },
    {
        name: "7. Switched on Carcassi",
        artist: "Brian Bolger",
        img: "music_view07",
        audio: "music_audio07",
    },
    {
        name: "8. Warzone",
        artist: "Anno Domini Beats",
        img: "music_view08",
        audio: "music_audio08",
    },
    {
        name: "9. When You're Not Looking",
        artist: "Nathan Moore",
        img: "music_view09",
        audio: "music_audio09",
    },
    {
        name: "10. Winning",
        artist: "NEFFEX",
        img: "music_view10",
        audio: "music_audio10",
    },
];

// 아티스트, 음악, 타이틀 선택자
const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
// 컨트롤 버튼 선택자
const musicPlay = musicWrap.querySelector("#control-play");
const musicPause = musicWrap.querySelector("#control-stop");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
// 진행바, 시간 선택자
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");

let musicIndex = 1; // 현재 뮤직 인덱스

// 음악 재생
function loadMusic(num) {
    musicName.innerText = allMusic[num - 1].name; // 뮤직 이름 로드
    musicArtist.innerText = allMusic[num - 1].artist; // 뮤직 아티스트 로드
    musicView.src = `../assets/img/${allMusic[num - 1].img}.png`; // 뮤직 이미지 로드
    musicView.alt = allMusic[num - 1].name; // 뮤직 이미지 alt 로드
    musicAudio.src = `../assets/music/${allMusic[num - 1].audio}.mp3`; // 뮤직 로드
    playMusic();
}

// 재생 버튼
function playMusic() {
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
}

// 정지 버튼
function pauseMusic() {
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
}

// 이전곡 듣기 버튼
function prevMusic() {
    musicIndex == 1 ? (musicIndex = allMusic.length) : musicIndex--; // 뮤직인덱스 값 위치가 첫 곡 일때
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 다음곡 듣기 버튼
function nextMusic() {
    musicIndex == allMusic.length ? (musicIndex = 1) : musicIndex++; // 뮤직인덱스 값 위치가 마지막 곡 일때
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 뮤직 진행바
musicAudio.addEventListener("timeupdate", (e) => {
    // console.log(e);

    const currentTime = e.target.currentTime; // 현재 재생 시간
    const duration = e.target.duration; // 오디오의 총 길이

    let progressWidth = (currentTime / duration) * 100; // 전체 길이에서 현재 진행되는 시간을 백분위로 나눔

    musicProgressBar.style.width = `${progressWidth}%`;

    // 전체시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); // 전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60); // 남은 초를 저장
        if (totalSec < 10) totalSec = `0${totalSec}`; // 초가 한 자릿수 일때 앞에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`; // 완성된 시간 문자열을 출력
    });

    // 진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

// 진행 버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth; // 진행바 전체 길이
    let clickedOffsetX = e.offsetX; // 진행바 기준으로 측정되는 X 좌표값
    let songDuration = musicAudio.duration; // 오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; // 백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
});

// 반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch (getAttr) {
        case "repeat":
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
            break;

        case "repeat_one":
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
            break;

        case "shuffle":
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
            break;
    }
});

// 오디오가 끝나면
musicAudio.addEventListener("ended", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch (getAttr) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            playMusic();
            break;

        case "shuffle":
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex);
            musicIndex = randomIndex; // 현재 인덱스를 랜덤 인덱스로 변경
            loadMusic(musicIndex); // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic(); // 로드한 음악을 재생
            break;
    }
    playListMusic(); // 재생목록 업데이트

    // while, do while문 차이
    // while = 조건이 맞지 않으면 한번도 실행하지 않음(선평가 후실행)
    // do while = 조건이 맞지 않아도 한번은 실행 됨(선실행 후평가)
});

// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
    const isMusicPause = musicWrap.classList.contains("paused"); // 음악이 재생중
    isMusicPause ? pauseMusic() : playMusic();
});

// 이전곡 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
    prevMusic();
});

// 다음곡 버튼 클릭
musicNextBtn.addEventListener("click", (e) => {
    nextMusic();
});

// 뮤직 리스트 버튼
musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

// 뮤직 리스트 구현하기
for (let i = 0; i < allMusic.length; i++) {
    let li = `
    <li data-index="${i + 1}">
        <strong>${allMusic[i].name}</strong>
        <em>${allMusic[i].artist}</em>
        <audio class="${allMusic[i].audio}" src="../assets/music/${allMusic[i].audio}.mp3"></audio>
        <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
    </li>
    `;

    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li);

    //리스트에 음악 시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`); //리스트에서 시간을 표시할 선택자를 가져옴
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`); //리스트에서 오디오를 가져옴
    liAudio.addEventListener("loadeddata", () => {
        let audioDuration = liAudio.duration; //오디오 전체 길이
        let totalMin = Math.floor(audioDuration / 60); //전체 길이를 분 단위 쪼갬
        let totalSec = Math.floor(audioDuration % 60); //초 계산
        if (totalSec < 10) totalSec = `0${totalSec}`; //앞 자리에 0 추가
        liAudioDuration.innerText = `${totalMin}:${totalSec}`; //문자열 출력
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`); //속성에 오디오 길이 기록
    });
}

// 뮤직 리스트를 클릭하면 재생
function playListMusic() {
    const musicListAll = musicListUl.querySelectorAll("li"); // 뮤직 리스트 목록
    for (let i = 0; i < musicListAll.length; i++) {
        let audioTag = musicListAll[i].querySelector(".audio-duration");

        if (musicListAll[i].classList.contains("playing")) {
            musicListAll[i].classList.remove("playing"); // 클래스가 존재하면 삭제
            let adDuration = audioTag.getAttribute("data-duration"); // 오디오 길이 값 가져오기
            audioTag.innerText = adDuration; // 오디오 길이 값 출력
        }
        if (musicListAll[i].getAttribute("data-index") == musicIndex) {
            // 현재 뮤직 인덱스랑 리스트 인덱스 값이 같으면
            musicListAll[i].classList.add("playing"); // 클래스 playing 추가
            audioTag.innerText = "재생중"; // 재생중일 경우 재생중 멘트 추가
        }

        musicListAll[i].setAttribute("onclick", "clicked(this)");
    }
    playMusic();
}

// 뮤직 리스트를 클릭하면
function clicked(el) {
    let getLiindex = el.getAttribute("data-index"); // 클릭한 리스트의 인덱스값을 저장
    musicIndex = getLiindex; // 클릭한 인데스 값을 뮤직 인덱스 저장
    loadMusic(musicIndex); // 해당 인덱스 뮤직 로드
    pauseMusic(); // 음악 재생
    playListMusic(); // 음악 리스트 업데이트
}

// 뮤직 리스트 열기, 닫기
const musicFooter = document.querySelector(".music__footer");
const List = document.querySelector(".list");
const Close = document.querySelector(".close");
const MusicFolder = document.querySelector(".icon1");
const Music = document.querySelector(".music__inner");

List.addEventListener("click", () => {
    musicFooter.classList.toggle("hide");
});
Close.addEventListener("click", () => {
    musicFooter.classList.add("hide");
});
MusicFolder.addEventListener("click", () => {
    Music.classList.toggle("show");
    $(".memory__wrap").css("z-index", "0");
    $(".music__wrap").css("z-index", "1000");
    $(".search__wrap").css("z-index", "0");
});

window.addEventListener("load", () => {
    loadMusic(musicIndex); // 음악 재생
    playListMusic(); // 리스트 초기화
});

// 볼륨 조절
const audio = document.getElementById("main-audio");
const audioVolume = document.getElementById("volume-control");
const volumeIcon = document.querySelector(".volume_icon");
const volumeOffIcon = document.querySelector(".volumeOff_icon");

audioVolume.addEventListener("change", function (e) {
    audio.volume = this.value / 10;
    if (this.value == 0) {
        volumeIcon.classList.add("hide");
        volumeOffIcon.classList.add("show");
    } else {
        volumeIcon.classList.remove("hide");
        volumeOffIcon.classList.remove("show");
    }
});
