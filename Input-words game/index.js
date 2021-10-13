//get DOM Element
const settingBtn = document.getElementById('setting-btn')
const setting = document.getElementById('settings')
const form = document.getElementById('settings-form');
const word = document.getElementById('word')
const timeCon = document.getElementById('time')
const scoreCon = document.getElementById('score')
const gameOverCon = document.getElementById('game-over')
const difficultySelect = document.getElementById('difficulty')
const text = document.getElementById('text')


const words = [
    'superhero',
    'warlike',
    'flicker',
    'grease',
    'ransom',
    'gaoler',
    'skirmish',
    'contentious',
    'patrol',
    'superficial',
    'parishioner',
    'slaughter',
    'blindfold',
    'independent',
    'highfalutin',
    'quince',
    'monstrous',
    'negligence',
    'inconceivable',
    'veritable',
    'stumble',
    'medow',
    'backwater',
    'ascertain',
    'intoxicate',
    'alright',
    'paliamentray'
];

//intial randomWord
let randomWord;

//inital time & socre
let score = 0;
let time = 10;


let difficulty = localStorage.getItem('diffculty') !== null? localStorage.getItem('diffculty'): 'medium' 

scoreCon.innerHTML = score;
timeCon.innerHTML = time + 's';

text.focus()

const timeInterval= setInterval(updateTime, 1000)

difficultySelect.value = localStorage.getItem('diffculty') !== null? localStorage.getItem('diffculty'): 'medium' 

//get randomWord
function getRandomWord() {
    return words[Math.floor(Math.random()* words.length)]
}

//updata words to DOM
function addWordToDOM() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord;
}
addWordToDOM()

//enter word into input
text.addEventListener('input', e => {
    const insertText = e.target.value;
    if (insertText === randomWord) {
        //update Word；
        addWordToDOM()
        
        //Empty input
        e.target.value = '';

        //updatScore
        score++;
        scoreCon.innerHTML = score;

        //input right
        if (difficulty === 'hard') {
           time +=3
        } else if (difficulty === 'medium') {
            time +=5
        } else if (difficulty === 'easy') {
            time +=8
       }
        
        // setting time based on difficulty
        updateTime();
    }
})

//updateTime;
function updateTime() {
    time--;
    timeCon.innerHTML = time + 's';
    if (time ===0 ) {
        clearInterval(timeInterval)
        gameOver()
    }
}

//gameOver
function gameOver() {
    gameOverCon.innerHTML = `
                        <h1>Game Over</h1>
                        <p>Your Score: ${score}</p>
                        <button onclick="location.reload()">Play Again</button>
                    `;
    gameOverCon.style.display = 'flex';
}


settingBtn.addEventListener('click', () => {
    settings.classList.toggle("hide")
})

form.addEventListener('change', e => {
    difficulty = e.target.value
    console.log(difficulty)
    localStorage.setItem('diffculty',difficulty)
})