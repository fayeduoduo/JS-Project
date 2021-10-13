//get DOM ELement;
const dragList = document.getElementById('drag-list')
const btn = document.getElementById('check')

//set up variables
const riches = [
    'Jeff Bezos',
    'Bill Gates',
    'Benard Arnault',
    'Warren Buffett',
    'Mark Zuckerberg',
    'Amancio Ortega',
    'Larry Ellison',
    'Larry Page',
    'Steve Ballmer',
    'Carlos Slim Helu'
]

//storage list
const listItems = []

let dragStartIndex;

createList();

//set up creatList function
function createList() {
    [...riches]
        .map(a => ({ value: a, sort: Math.random().toFixed(2) }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
        console.log(person)
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
                                <span class="number">${index + 1}</span>
                                <div class="draggable" draggable="true">
                                    <p class="person-name">${person}</p>
                                    <i class="fas fa-grip-lines"></i>
                                </div>
                            `;
        
        listItems.push(listItem);
        dragList.appendChild(listItem)
    })
    addEventListeners()
}

function addEventListeners() {
    const drags = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.drag-list li')

    drags.forEach(drag => {
        drag.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragover', dragOver)
        item.addEventListener('dragleave', dragLeave)
        item.addEventListener('drop', dragDrop)
    })
}


function dragStart() {
    //console.log('event:', 'dragStart')
    dragStartIndex = this.closest("li").getAttribute("data-index");
     console.log(dragStartIndex)

}

function dragEnter() {
    //console.log('event:', 'dragEnter')
    this.style.backgroundColor = '#eaeaea'
}

function dragOver(e) {
    //console.log('event:', 'dragOver')
    e.preventDefault();
}

function dragLeave() {
    this.style.backgroundColor = '#fff'
}

function dragDrop() {
    //console.log('event:', 'drop')
    const dragEndIndex = this.getAttribute('data-index')
    console.log(dragEndIndex)
    swapItem(dragStartIndex, dragEndIndex)

    
    this.style.backgroundColor = '#fff'
}

function swapItem(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')
    //console.log(itemOne, itemTwo)
    

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}


btn.addEventListener('click', checkOrder);

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const person_name = listItem.querySelector('.draggable').innerText.trim()
        if (person_name !== riches[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}