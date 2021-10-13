//get DOM element
const year = document.getElementById('year');
const countDown = document.getElementById('count-down');
const day = document.getElementById('days')
const hour = document.getElementById('hours');
const minute = document.getElementById('minutes');
const second = document.getElementById('seconds');
const loading = document.getElementById('loading');

//get current year
const date = new Date();
const currentYear = date.getFullYear();
console.log(currentYear)


const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
year.innerHTML = currentYear + 1

//update countDown
function updateCountDown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;
    //console.log(diff)//9375237944毫秒数
    //console.log(date)//Tue Sep 14 2021 12:45:45 GMT-0700

    const d = Math.floor(diff / 1000 / 60 / 60 / 24)   
    const h = Math.floor(diff / 1000 / 60 / 60) % 24
    const m = Math.floor(diff / 1000 / 60) %  60
    const s = Math.floor(diff / 1000) % 60
    
    day.innerHTML = d
    hour.innerHTML = h < 10 ? "0" + h : h;
    minute.innerHTML = m < 10 ? "0" + m : m;
    second.innerHTML = s < 10 ? "0" + s : s;

    console.log(s)
}


setTimeout(() => {
    loading.remove()
    countDown.classList.add('show')
},1500)

//updateCountDown
//every 1 second 
setInterval(updateCountDown, 1000);
