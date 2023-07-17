import Notiflix from 'notiflix';

 
const formEl = document.querySelector(".form");

formEl.addEventListener("submit", handlerSubmit);

// функція зчитування внесенних значень у інпути та відображення по дії сабміту результатів промісу
function handlerSubmit(event) {
  event.preventDefault(); // відмінили дію по замовченню - перезавантаження сторінки
  
  // збираємо джанні з інпутів(звертаємося до псевдомасиву який створюється по дії відправлення данних внесенних у інпути )
  //event.target - те що внесли у інпути
  //elements - псевдомасив(який зберігає данні які є у інпуті у вигляді масиву)
  
  let delay = Number(event.target.elements.delay.value);
 
  let step = Number(event.target.elements.step.value);
  let amount = Number(event.target.elements.amount.value)
  
  for (let position = 1; position <= amount; position += 1) {
   //виклик функції створення функції у циклу
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

// Функція створення промісу
  function createPromise(position, delay) {
   
    const shouldResolve = Math.random() > 0.3;
   
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
    return promise;//повернення промису
  }
   




