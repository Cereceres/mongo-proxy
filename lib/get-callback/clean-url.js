const cleanUrl = require('clean-base-url');


module.exports = (baseUrl, url) => {
  const baseUrlCleaned = cleanUrl(baseUrl);
  const urlCleaned = cleanUrl(url);
  const regexToMathBaseUrl = RegExp(`${baseUrlCleaned}(.*)`);

  const match = regexToMathBaseUrl.exec(urlCleaned);

  if (!match) return '';

  return match[1] || '';
};
