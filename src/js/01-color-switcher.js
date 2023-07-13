const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyColor: document.querySelector('body'),
}

let idInterval = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtn.addEventListener("click", changeColor);


function changeColor() { 
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false

    idInterval = setInterval(() => {
        refs.bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
}

refs.stopBtn.addEventListener("click", changeColorStop);

function changeColorStop() { 
    
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false

    clearInterval(idInterval);
}