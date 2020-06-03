'use strict';

var buttonsBuy = document.querySelectorAll('.button--buy');
var buttonsClose = document.querySelectorAll('.buy-form__close');
var buyForm = document.querySelector('.buy-form__container');
var buyFormSection = document.querySelector('.buy-form');
var buyFormInputPhone = buyFormSection.querySelector('.buy-form__input-tel');
var buyFormInputEmail = buyFormSection.querySelector('.buy-form__input-email');
var modalWrapper = document.querySelector('.modal-wrapper');
var modalSuccess = document.querySelector('.buy-form--success');
var modalError = document.querySelector('.buy-form--error');
var successHandler = window.backend.send;
var isStorageSupport = true;
var storageEmail = '';
try {
  storageEmail = localStorage.getItem('buyFormInputEmail');
} catch (err) {
  isStorageSupport = false;
}

var hideForm = function () {
  buyFormSection.classList.add('hidden');
  modalWrapper.classList.add('hidden');
};

var showForm = function () {
  buyFormSection.classList.remove('hidden');
  modalWrapper.classList.remove('hidden');
};

var buyFormValidatePhone = function () {
  if (buyFormInputPhone.validity.valueMissing) {
    buyFormInputPhone.setCustomValidity('Обязательное поле');
  } else {
    buyFormInputPhone.setCustomValidity('');
  }
};

var buyFormValidateEmail = function () {
  if (buyFormInputEmail.validity.valueMissing) {
    buyFormInputEmail.setCustomValidity('Обязательное поле');
  } else {
    buyFormInputEmail.setCustomValidity('');
  }
};

var phoneMask = IMask (
  buyFormInputPhone, {
    mask: '+{7}(000)000-00-00'
});

var buyFormInputPhoneInputHandler = function () {
  buyFormValidatePhone();
};

var buyFormInputEmailInputHandler = function () {
  buyFormValidateEmail();
};

buyFormValidatePhone();
buyFormValidateEmail();

var openForm = function () {
  for (var i = 0; i < buttonsBuy.length; i++) {
    (function (button) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        showForm();
        buyFormInputPhone.focus();
        document.addEventListener('keydown', escapeKeydownHandler);
        if (storageEmail) {
          buyFormInputEmail.value = storageEmail;
        }
      });
    })(buttonsBuy[i]);
  };
};

var closeForm = function () {
  for (var i = 0; i < buttonsClose.length; i++) {
    (function (buttonClose) {
      buttonClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        hideForm();
        modalSuccess.classList.add('hidden');
        modalError.classList.add('hidden');
      });
    })(buttonsClose[i]);
  };
};

var escapeKeydownHandler = function (evt) {
  if (evt.key == 'Escape') {
    hideForm();
    modalSuccess.classList.add('hidden');
    modalError.classList.add('hidden');
  }
};

var sendFormData = function (evt) {
  successHandler(new FormData(buyForm), function () {
    if (isStorageSupport) {
      localStorage.setItem('buyFormInputEmail', buyFormInputEmail.value);
    }
    buyForm.reset();
    buyFormSection.classList.add('hidden');
    modalSuccess.classList.remove('hidden');
  }, errorHandler);
  evt.preventDefault();
};

var errorHandler = function () {
  buyFormSection.classList.add('hidden');
  modalError.classList.remove('hidden');
};

var buyFormSubmitHandler = function (evt) {
  sendFormData(evt);
};

openForm();
closeForm();
document.removeEventListener('keydown', escapeKeydownHandler);
buyFormInputPhone.addEventListener('input', buyFormInputPhoneInputHandler);
buyFormInputEmail.addEventListener('input', buyFormInputEmailInputHandler);
buyForm.addEventListener('submit', buyFormSubmitHandler);

window.onclick = function (evt) {
  if (evt.target.classList.contains('modal-wrapper')) {
    hideForm();
    modalSuccess.classList.add('hidden');
    modalError.classList.add('hidden');
  }
};

svg4everybody();
