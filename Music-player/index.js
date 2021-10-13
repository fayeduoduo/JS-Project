//获取节点
const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const title = document.getElementById('title')

const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

//set music name
const songs = ['hey', 'summer', 'ukulele'];


let songIndex = 2;


loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}


playBtn.onclick = () => {
    
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
}


function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
     playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')  
    audio.pause()
}


prevBtn.onclick = () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}


nextBtn.addEventListener('click',nextSong)
function nextSong(){
    songIndex++;

    if (songIndex > 2 ) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

//progress setting
//use timeUpdata()
audio.addEventListener('timeupdate', updateProgress)
function updateProgress(e) {
    //console.log(e.srcElement)// get audio tag
    const { duration, currentTime } = e.srcElement
    //console.log(duration, currentTime)
    
    const progressPercent = currentTime / duration * 100
    progress.style.width = `${progressPercent}%`
}


progressContainer.onclick = function(e){
    const width = this.clientWidth;
    const clickX = e.offsetX; 
    console.log(width, clickX)
    const duration = audio.duration;
    audio.currentTime = clickX / width * duration;
}


audio.addEventListener('ended',nextSong)
