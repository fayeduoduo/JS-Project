
const word = document.getElementById('word')
const errorMessage = document.getElementById('error-letters')
const playBtn = document.getElementById('play-btn')
const popUp = document.getElementById('popup-container')
const finalMessage = document.getElementById('final-message')
const note = document.getElementById('notification')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['academy','application', 'program', 'interface', 'wonder','rabbit','wayne','faye'];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    word.innerHTML = `${selectedWord.split("").map(letter => {
        return `<span class='letter'>${correctLetters.includes(letter) ? letter : ''}</span>`
    }).join('')}`;
    console.log(word.innerText)

    const innerWord = word.innerText.replace(/\n/g, "")
    console.log(innerWord) //won 
    if (innerWord === selectedWord) {
        finalMessage.innerHTML = '恭喜你输入正确! <img src="https://img.icons8.com/color/48/000000/happy--v1.png"/>';
        popUp.style.display = 'flex';
    }
}
displayWord()

window.addEventListener('keydown', e => {
    // input value from a between z
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        console.log(letter)
         
        if (selectedWord.includes(letter)) {

            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)

                displayWord()
            } else {
                showNotification()
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateErrorLetters()
            } else {
                showNotification()
            }
        }
    }
})

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    },2000)
}

function updateErrorLetters() {
    errorMessage.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>错误: </p>" : ""}
        ${wrongLetters.map(letter => {
            return `<span>${letter}</span>`
        })}
    `;
  
    figureParts.forEach((part, i) => {

        const errors = wrongLetters.length;
        if (i < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerHTML = '抱歉输入次数用完, 游戏结束!! <img src="https://img.icons8.com/color/48/000000/sad--v1.png"/>';
        popUp.style.display = 'flex';
    }

}


playBtn.onclick = () => {
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]
    displayWord();
    updateErrorLetters();
    popUp.style.display = 'none';

}