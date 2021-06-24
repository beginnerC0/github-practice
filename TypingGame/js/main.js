// 사용변수
const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();//사용하는 변수들을 화면에 랜더링 됐을 때 선언?

function init() {
    buttonchange('게임로딩중...');
    getWords()
    wordInput.addEventListener('input',checkmatch)
}

//게임 실행
function run() {
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countdown,1000);
    checkInterval = setInterval(checkstatus, 50);
    buttonchange('게임중')
    //setInterval(countdown,1000);
    //카운트다운을 1초마다 실행하도록 설정
}

function checkstatus() {
    if(!isPlaying && time === 0){
        buttonchange("게임시작")
        clearInterval(checkInterval)
    }
}

//단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            // handle success
            response.data.forEach((word)=>{
                if(word.length < 10){
                    words.push(word);
                }
            })
            buttonchange('게임시작');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}


//단어 일치 체크
    function checkmatch (){
        if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
            wordInput.value = "";
            if(!isPlaying) {
                return;//게임중이 아닐 때 작성하면 점수를 올려주지 않게 설정
            }
            score++;
            //내가 입력한 글자(소문자형식) === 화면에 떠있는 글자(소문자형식) 같으면
            //점수+1 
            scoreDisplay.innerText = score;
            wordInput.value = "";
            time = GAME_TIME;
            const randomIndex = Math.floor(Math.random() * words.length);
            wordDisplay.innerText = words[randomIndex]
            //이 부분은 내가 데이터를 입력후 엔터를 치지 않았는데 내용만 같으면 알아서 넘김
        }   
    }


function countdown() {
    //삼항 연산자/
    //(조건) ? 참일 경우 : 거짓일 경우
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;

}
function buttonchange(text) {
    button.innerText = text;
    //java cardLayout 기능
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}