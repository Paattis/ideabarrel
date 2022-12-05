// Regex
const EMAIL_REGEX = /\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u;
const NAME_REGEX = /^[a-zA-ZäöüÄÖÜß ,.'-]+$/i;

// API URLs (local)
const BASE_URL = 'https://6ff6-91-152-183-8.eu.ngrok.io/';
const PROFILE_IMG_URL = 'https://6ff6-91-152-183-8.eu.ngrok.io/static/';

export {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  BASE_URL,
  PROFILE_IMG_URL,
};