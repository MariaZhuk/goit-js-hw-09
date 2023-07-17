import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}


let userDate = null;
let currentDate = new Date()

const options = {
    enableTime: true, // можливість вибору часу
    time_24hr: true, // формат годин
    defaultDate: currentDate , // дата по замовченню - сьогодні
    minuteIncrement: 1,
    //деструктуризували масив обраної дати
    onClose([selectedDates]) {
        
        userDate = selectedDates;
       
        if ( currentDate > userDate)  {
            refs.startBtn.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
             
        } else { 
            refs.startBtn.disabled = false;
        }
    
    },
};

flatpickr("#datetime-picker", options); // створили екземпляр - календар

refs.startBtn.addEventListener("click", startTimer); //прослуховуємо подію кліку на кнопку старт

function startTimer() { 
    const idInterval = setInterval(() => {
        
        const currentDate = new Date();

       //timerTime - обєкт
        const timerTime = convertMs(userDate - currentDate);
       
        const { days, hours, minutes, seconds } = timerTime;
        
        if (seconds >= 0) {
            showTimer(timerTime);

            // refs.days.textContent = timerTime.days;
            // refs.hours.textContent = timerTime.hours;
            // refs.minutes.textContent = timerTime.minutes;
            // refs.seconds.textContent = timerTime.seconds;
        
            //очистили таймер при вибору невірної дати(у минулому)б якщо спочатку була обрана коректна дата


        } else {
            clearInterval(idInterval);
            Notiflix.Notify.success('The event will start');
    
        }
        
    }, 1000)
}
//функція відображення таймеру
function showTimer({ days, hours, minutes, seconds }) { 
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;

}
//функція очищення таймеру


function addLeadingZero(value) { 
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}





