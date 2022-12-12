// Regex
const EMAIL_REGEX = /\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u;
const NAME_REGEX = /^[a-zA-ZäöüÄÖÜß ,.'-]+$/i;

// API URLs
const BASE_URL = 'https://0444-91-152-183-8.eu.ngrok.io/';
const PROFILE_IMG_URL = 'https://0444-91-152-183-8.eu.ngrok.io/static/';

// Access token key
const ACCESS_TOKEN = 'access_token';

// Idea query strings
const MOST_LIKED_IDEAS = '?desc=likes';
const MOST_COMMENTED_IDEAS = '?desc=comments';
const NEWEST_IDEAS = '?desc=date';
const OLDEST_IDEAS = '?asc=date';
const SUBSCRIBED_TAGS = '?tags=';

export {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  BASE_URL,
  PROFILE_IMG_URL,
  ACCESS_TOKEN,
  MOST_LIKED_IDEAS,
  MOST_COMMENTED_IDEAS,
  NEWEST_IDEAS,
  OLDEST_IDEAS,
  SUBSCRIBED_TAGS,
};
