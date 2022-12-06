// Regex
const EMAIL_REGEX = /\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u;
const NAME_REGEX = /^[a-zA-ZäöüÄÖÜß ,.'-]+$/i;

// API URLs
const BASE_URL = 'https://2fb1-91-152-183-8.eu.ngrok.io/';
const PROFILE_IMG_URL = 'https://2fb1-91-152-183-8.eu.ngrok.io/static/';

// Access token key
const ACCESS_TOKEN = 'access_token';

export {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  BASE_URL,
  PROFILE_IMG_URL,
  ACCESS_TOKEN,
};
