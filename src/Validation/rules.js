import * as ErrorMessages from './errorMessages.js';

export const required = (text) => {
  if (text) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const minLength = (length) => {

  return (text) => {
      console.log("length", length, text.length);
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email",re.test(email) );
    return re.test(email) ? null : ErrorMessages.validateEmail(email);
};



export const validateUpperLowerNumeric = (mixedStr) => {
    var re = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
    console.log("mixed",re.test(mixedStr) );
    return re.test(mixedStr) ? null : ErrorMessages.validateUpperLowerNumeric(mixedStr);
};

