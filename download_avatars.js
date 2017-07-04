const request = require('request');
const fs = require('fs')

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
    console.log('Getting data...')
    try {
      const data = JSON.parse(body);
      cb(data);
    } catch (err) {
      console.log(err);
    }

  });
}

// run http get request to download image from a URL
function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", (data) => {

  console.log('Attempting to download images')

  // creates a filepath and url from data, downloads image, saves to avatars file
  data.forEach((user) => {
    let filePath = `avatars/${user.login}.jpg`;
    let url = user.avatar_url;
    downloadImageByURL(url, filePath);
  });

  console.log('Done!')
})



