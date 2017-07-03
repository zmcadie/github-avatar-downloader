const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = 'zmcadie';
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;


function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  console.log(requestURL)
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});