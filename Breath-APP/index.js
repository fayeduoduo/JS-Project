const container = document.getElementById('container');
const text = document.getElementById('text')

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2
const holdTime = totalTime / 5

console.log(breathTime, holdTime)
breathAnimation()
function breathAnimation() {
    text.innerText = 'Breath'
    container.classList.add('grow')
    container.classList.remove('shrink')

    setTimeout(() => {
        text.innerText = 'Keep'

        setTimeout(() => {
            text.innerText = 'Exhale';            
            container.classList.add('shrink')
        }, holdTime)
    },breathTime)
}

setInterval(breathAnimation, totalTime)