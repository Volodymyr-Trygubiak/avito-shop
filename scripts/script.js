'use strict';

const dataBase = [];  

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit =  [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');


// закриття модалки по клікам
const closeModal = function(event) {
  const targer = event.target;
  if(targer.closest('.modal__close') || targer === this) {
    this.classList.add('hide');
    if (this === modalAdd){
      modalSubmit.reset();
    }
  }
};
// закриття модалки по ескейпу
const closeModalEsc = event => {
  if(event.code === 'Escape'){
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModalEsc);
  };
};
// забирає блокування кнопки і надпис
modalSubmit.addEventListener('input', () => {
  const validForm = elementsModalSubmit.every(elem => elem.value)
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault()
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
 });

// відкриття модалки
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModalEsc);
});


catalog.addEventListener('click', event => {
  const target = event.target;

  if(target.closest('.card')){
    modalItem.classList.remove('hide')
    document.addEventListener('keydown', closeModalEsc);

  };
});
 
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
