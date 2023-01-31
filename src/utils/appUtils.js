import axios from "axios";
// import dayjs from "dayjs";
// import { API_BASENAME, API_BASEURL } from "./constants";

export const regexes = {
  email: /^\S+@\S+\.\S+$/,
  number: /^\d*\.?\d*$/,
  text: /^[a-zA-Z ][a-zA-Z 0-9]*$/, //"hello" "hello123" "Hello World" or hello 4561
  //text:/^[0-9!@#%^&*(),.?":{}|<>]+[!@#%^&*(),.?":{}|<>]*$/;
  matchAnything: /^[\s\S]+$/,
  address: /^[a-zA-Z0-9!@#$()_+:;<>,.* ]+$/, //not allowed  ///[~%^&/?]/
  // address: /[~%^&/?]/,
  //  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, //6 to 16 valid characters
  password: /^[\s\S]+$/,
  name: /^[a-zA-Z ]+$/, //"hello" "hello123" "Hello World" or hello 4561
  // password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, //6 to 16 valid characters
  website: /^(www\.)?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.[a-z]{2,63}$/,
  // ("www.example-site.com");  // true
  // scriptVal: /<(?:script|style)[^>]*>.*?<\/(?:script|style)>|<[^>]*>/g,
  // console.log(clean);  // 'This is a paragraph.'
  htmlRegex: /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
  decimalNo: /^\d+(\.\d+)?$/,
};

export const setItemSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const getItemSession = (key) => {
  let value = JSON.parse(sessionStorage.getItem(key));
  return value;
};

export const validateByRegex = (type, value) => {
  // Return true if there is no validation for the type
  return regexes[type]?.test(value) ?? true;
};
