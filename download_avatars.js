const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;


function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  const requestOptions = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader'
    }
  };
  request.get(requestURL, requestOptions, (err, resp, body) => {
    console.log(body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});