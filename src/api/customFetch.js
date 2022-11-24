export const customFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (res.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || res.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
