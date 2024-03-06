import { has } from "lodash";

export function validateEmail(email) {
  // const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function validateMobile(mobile) {
  const mob = /^[6-9]\d{9}$/;
  return mob.test(mobile);
}
export function validateAlphaNumeric(textInput) {
  const re = /^[a-zA-Z0-9_-]*$/;
  return re.test(textInput);
}

export function validateAlphabets(textInput) {
  const re = /^[a-zA-Z]*$/;
  return re.test(textInput);
}

export function validateNonSpecialCharacters(textInput) {
  const re = /^[a-zA-Z0-9]*$/;
  return re.test(textInput);
}
export function isNumeric(num) {
  return !isNaN(num);
}

export function validatePassword(inputValue) {
  let re = new RegExp(/^.{6,255}$/);
  return re.test(inputValue);
}

export function validatePanCard(inputValue) {
  let re = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
  return re.test(inputValue);
}

export function validateAadhaarNumber(inputValue) {
  let re = /^\d{12}$/;
  return re.test(inputValue);
}

export function validateBankAccountNumber(inputValue) {
  let re = /^\d{9,18}$/;
  return re.test(inputValue);
}

export function validateIfscCode(inputValue) {
  let re = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
  return re.test(inputValue);
}

export function validateDate(inputValue) {
  let re = /^(0[1-9]|[12]\d|3[01])$/;
  return re.test(inputValue);
}

export function validateMonth(inputValue) {
  let re = /^(0?[1-9]|1[012])$/;
  return re.test(inputValue);
}

export function validateYear(inputValue) {
  let re = /^(19|20)\d{2}$/;
  return re.test(inputValue);
}

export function validateUPI(inputValue) {
  let re = /[a-zA-Z0-9_-]{3,}@[a-zA-Z]{3,}/;
  return re.test(inputValue);
}

export function validateType(inputValue, validationType) {
  switch (validationType) {
    case "validateNonSpecialCharacters": {
      return validateNonSpecialCharacters(inputValue);
    }
    default: {
      return true;
    }
  }
}

export const validateNameRegex = (value) => {
  const match = /^[a-zA-Z ]+$/;
  return match.test(value);
};

export const validateUserNameRegex = (value) => {
  const match = /^[a-zA-Z0-9 ]+$/;
  return match.test(value);
};

export const emptySpaceRegex = (value) => {
  const match = /^[a-zA-Z0-9]*$/;
  return match.test(value);
};

export const validateNumberRegex = (value) => {
  const match = /^[0-9]+$/;
  return match.test(value);
};

export const validateAlphaNumericRegex = (value) => {
  const match = /^[a-zA-Z0-9]+$/;
  return match.test(value);
};

export const leadingSpaceRegex = (value) => {
  const match = /^[^\s].*/;
  return match.test(value);
};
