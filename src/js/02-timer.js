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

refs.startBtn.disabled = true;

let userDate = null;
const currentDate = new Date();

const options = {
    enableTime: true, // можливість вибору часу
    time_24hr: true, // формат годин
    defaultDate: currentDate, // дата по замовченню - сьогодні
    minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];
        if (currentDate > userDate) {
            Notiflix.Notify.failure("Please choose a date in the future")
        } else { 
            refs.startBtn.disabled = false;
        }
        //  console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options); // створили екземпляр - календар

refs.startBtn.addEventListener("click", startTimer);

function startTimer() { 
    const idInterval = setInterval(() => {
        
        const current = new Date();
        const timerTime = convertMs(userDate - current);
        
        if (timerTime.seconds >= 0) {
            refs.days.textContent = timerTime.days.toString().padStart(2, "0")
            refs.hours.textContent = timerTime.hours.toString().padStart(2, "0")
            refs.minutes.textContent = timerTime.minutes.toString().padStart(2, "0")
            refs.seconds.textContent = timerTime.seconds.toString().padStart(2, "0")
           
        } else { 
            clearInterval(idInterval);
            Notiflix.Notify.success('The event will start');
        }
       
     }, 1000)
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





