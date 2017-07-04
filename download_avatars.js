const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// Set github username and access token to values stored in environment variables
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

// gets github repo contributors for declared user/repo combo
// Parses contributor json and passes to callback
function getRepoContributors(repoOwner, repoName, cb) {

  // string literal of url with auto-fill of information
  const requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  // creating headers so github doesn't refuse access
  const requestOptions = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader'
    }
  };

  // gets JSON object containing contributors, passes to callback
  request.get(requestURL, requestOptions, (error, response, body) => {
    try {
      const data = JSON.parse(body);
      cb(data);
    } catch (err) {
      console.log(err);
    }

  });
}

// when given JSON object of contributors, gives user avatar urls
const getAvatar = (data) => {
  data.forEach((user) => {
    console.log(user.avatar_url)
  });
}

getRepoContributors("jquery", "jquery", getAvatar)