const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total');
const movieSelector = document.getElementById('movie')
let ticketPrice = parseInt(movieSelector.value);

console.log(typeof ticketPrice) // number

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectSeats'))
    console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectMovieIndex !== null) {
        movieSelector.selectedIndex = selectMovieIndex
    }
    console.log(selectMovieIndex)
}
populateUI()

//update seat count and price;
function updateSelectedCount() {
    const selectSeats = document.querySelectorAll('.row .seat.selected')
    const seatsIndex = [...selectSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })
    console.log(seatsIndex)
     
    localStorage.setItem('selectSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectSeats.length;
    console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    //total Price
    total.innerText = selectedSeatsCount * ticketPrice
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

movieSelector.addEventListener('change', function (e) {
    ticketPrice = +e.target.value 
    console.log(ticketPrice)
    updateSelectedCount();

    console.log(e.target.selectedIndex, e.target.value)
    setMovieData(e.target.selectedIndex, e.target.value)
})

container.addEventListener('click', function (e) {
    
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target)
        e.target.classList.toggle('selected');
        
        updateSelectedCount();
    }
})

updateSelectedCount()