export const customFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (res.ok) {
      return json;
    } else {
      let msg = '';
      if ('errors' in json && json['errors'].length !== 0) {
        msg = `${json.errors[0].param} ${json.errors[0].msg}`;
      } else {
        msg = json.msg;
      }
      throw new Error(msg || res.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
