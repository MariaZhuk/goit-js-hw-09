import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector("input[data-delay]"),
  stepEl: document.querySelector("input[data-step]"),
  amountEl: document.querySelector("input[data-amount]"),
  formEl: document.querySelector(".form"),
}

refs.formEl.addEventListener("submit", handlerSubmit);

function handlerSubmit(event) { 
  event.preventDefault();
  let delay = Number(refs.delayEl.value);
  let step = Number(refs.stepEl.value);
  let amount = Number(refs.amountEl.value);

  
  for (let position = 1; position <= amount; position += 1) { 
    if (position === 1) { 
       setTimeout(() => {
        createPromise(position, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }, delay)
    }
    if (position > 1) {
      setTimeout(() => {
        delay += step;
        createPromise(position, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }, delay)
    } 
    }
  }
 function createPromise(position, delay) {
   
    const shouldResolve = Math.random() > 0.3;
   
    const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
   }, delay);
  return promise;
    
   }
   
  



