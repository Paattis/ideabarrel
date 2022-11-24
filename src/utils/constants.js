// Regex
const EMAIL_REGEX = /\S+@\S+\.\S+$/;
const USERNAME_REGEX = /^\w{2,15}$/;
const PASSWORD_REGEX = /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u;

// API URL (local)
const BASE_URL = 'http://localhost:3001/';

export { EMAIL_REGEX, USERNAME_REGEX, PASSWORD_REGEX, BASE_URL };
