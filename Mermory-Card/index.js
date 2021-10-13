//get DOM element
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const addBtn = document.getElementById('add-btn')
const clearBtn = document.getElementById('clear')
const closeBtn = document.getElementById('close')
const addContainer = document.getElementById('add-container')
const addCard = document.getElementById('add-card')
const questionEl = document.getElementById('question')
const answerEl =document.getElementById('answer')

//set current card index
let currentCardIndex = 0;

//set empty array of card
const cardsEl = []

const cardsData = getCardsData()

function createCards() {
    cardsData.forEach((data, index) => createCard(data,index))
}


function createCard(data,index) {
    const card = document.createElement('div')
    card.classList.add('card');
   
    if (index === 0) {
        card.classList.add('active');
    }
        card.innerHTML = `
                        <div class="inner-card">
                            <div class="inner-card-front">
                                <p>${data.question}</p>
                            </div>
                            <div class="inner-card-back">
                                <p>${data.answer}</p>
                            </div>
                        </div>
                         `;
    cardsContainer.appendChild(card)
    cardsEl.push(card)

    card.addEventListener('click', () => {
        card.classList.toggle('show-answer')
    })

    updateCurrentPage()
}


function updateCurrentPage() {
    currentEl.innerText = `${currentCardIndex +1} / ${cardsEl.length}`
}

//Switch prev & next
nextBtn.addEventListener('click',() => {
    cardsEl[currentCardIndex].className = 'card left'
    currentCardIndex = currentCardIndex + 1;

    if (currentCardIndex > cardsEl.length -1) {
        currentCardIndex = 0;
    }
    cardsEl[currentCardIndex].className = 'card active';
    updateCurrentPage()
})

prevBtn.onclick = () => {
    cardsEl[currentCardIndex].className = 'card right';
    currentCardIndex--;

    if (currentCardIndex < 0) {
        currentCardIndex = cardsEl.length -1;
    }
    cardsEl[currentCardIndex].classList.add('active');
    updateCurrentPage()
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}
createCards()

addBtn.addEventListener('click', () => {
    addContainer.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    addContainer.classList.remove('show')
})

addCard.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }
        
        createCard(newCard);
        question.value = '';
        answer.value = '';

        addContainer.classList.remove('show')
        cardsData.push(newCard)

        setCardsData(cardsData)
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload()
})