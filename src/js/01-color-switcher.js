const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyColor: document.querySelector('body'),
}

const btnState = true;

const NOTOFICATION_DELAY = 1000; // змінна, яка вказує з яким інтервалом виконувати функцію
let idInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtn.addEventListener("click", changeColor);


function changeColor() { 
    
    changeStartStopBtnState(btnState);

    idInterval = setInterval(() => {
        refs.bodyColor.style.backgroundColor = getRandomHexColor();
    }, NOTOFICATION_DELAY);
    
}

refs.stopBtn.addEventListener("click", changeColorStop);

function changeColorStop() { 

    changeStartStopBtnState(!btnState);

    clearInterval(idInterval);
}

// Функція поведінки кнопок старт стоп - активні неактивні
function changeStartStopBtnState(value) { 

    refs.startBtn.disabled = value;
    refs.stopBtn.disabled = !value;
}

