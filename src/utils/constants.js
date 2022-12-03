// Regex
const EMAIL_REGEX = /\S+@\S+\.\S+$/;
const USERNAME_REGEX = /^\w{2,15}$/;
const PASSWORD_REGEX = /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u;

// API URL (local)
const BASE_URL = 'https://4ffd-91-152-183-8.eu.ngrok.io/';
const PROFILE_IMG_URL = 'https://4ffd-91-152-183-8.eu.ngrok.io/static/';

export {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  BASE_URL,
  PROFILE_IMG_URL,
};
