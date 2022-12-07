//랜덤번호 지정
//유저가 번호를 입력 후 go라는 버튼을 누름
//랜덤번호가 = 유저번호 '맞췄습니다!'
//랜덤번호가 < 유저번호 'Down!'
//랜덤번호가 > 유저번호 'Up!'
//Reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, go버튼이 disabled)
//유저가 1~50 밖에 숫자를 입력하면 알려준다. (기회는 줄지 않는다)
//유저가 이미 입력한 숫자를 입력하면 알려준다. (기회는 줄지 않는다)


//랜덤번호 지정
const $resultText = document.querySelector('#result-text');
const $goButton = document.querySelector('#btn-go');
const $resetButton = document.querySelector('#btn-reset');
const $inputNum = document.querySelector("input[name=number]");
let inputNum_val = "";
let gameOver = false;
let inputNum_log = [];
let randomNum = 0;
let result = "";
let chance = 5;

function setRandom() {
  return Math.floor(Math.random() * 50) + 1;
}

function gamePlay() {
  inputNum_val = $inputNum.value;

  if(inputNum_val <=0 || inputNum_val > 50){
    $resultText.innerText = '1에서 50사이 숫자를 입력해주세요. (기회: '+chance+')';
    return;
  }
  
  if(inputNum_log.includes(inputNum_val)) {
    $resultText.innerText = '이미 입력하신 숫자입니다. (기회: '+chance+')';
    return;
  }

  chance --;

  inputNum_log.push(inputNum_val);

  if(chance == 0) gameOver = true;

  if(randomNum == inputNum_val) {
    $resultText.innerText = '맞췄습니다. (기회: '+chance+')';
    gameOver = true;
  } else if(randomNum < inputNum_val) {
    $resultText.innerText = 'Down (기회: '+chance+')';
  } else if(randomNum > inputNum_val) {
    $resultText.innerText = 'Up (기회: '+chance+')';
  }

  if(gameOver == true) $goButton.disabled = true;
}

function gameReset() {
  randomNum = setRandom();
  gameOver = false;
  $goButton.disabled = false;
  $inputNum.value = "";
  chance = 5;
  $resultText.innerText = '1~50 범위 내 숫자를 입력해주세요 (기회: '+chance+')';
  console.log('reset', chance);
}

function inputReset() {
  $inputNum.value = "";
}

$goButton.addEventListener('click', gamePlay);
$resetButton.addEventListener('click', gameReset);
$inputNum.addEventListener('click', inputReset);

randomNum = setRandom();