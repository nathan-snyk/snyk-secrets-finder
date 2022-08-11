// Script which loops through current/imported Snyk repos to search / find - secrets and passwords in a given org

const axios = require("axios");
const args = process.argv.slice(2);
const ORG_ID = args[0];
const SNYK_AUTH_TOKEN = args[1];

// 1. initial Setup with endpoint and auth
let config = {
  method: "get",
  url: `https://api.snyk.io/rest/orgs/${ORG_ID}/projects?version=2022-04-06~experimental&limit=100`,
  headers: {
    Authorization: `token ${SNYK_AUTH_TOKEN}`,
  },
};

let orgName;
axios({
  method: "get",
  url: `https://api.snyk.io/rest/orgs/${ORG_ID}?version=2022-04-06~experimental`,
  headers: {
    Authorization: `token ${SNYK_AUTH_TOKEN}`,
  },
}).then(function (response) {
  orgName = response.data.data.attributes.slug;
});

axios(config).then(function (response) {
  response.data.data.forEach(function (project) {
    if (project.attributes.type == "sast") {
      let config = {
        method: "get",
        url: `https://api.snyk.io/rest/orgs/${ORG_ID}/issues?version=2022-04-06~experimental&project_id=${project.id}`,
        headers: {
          Authorization: `token ${SNYK_AUTH_TOKEN}`,
        },
      };
      // Checking projects for Hardcoded creds/secrets
      axios(config).then(function (response) {
        response.data.data.forEach(function (issue) {
          if (issue.attributes.cwe.includes("CWE-798" || "CWE-259")) {
            // console.log(issue);
            console.log(`Use of Hardcoded Credentials Found! 
              Link to Project: https://app.snyk.io/org/${orgName}/project/${project.id}`);
          } else if (issue.attributes.cwe.includes("CWE-547")) {
            // console.log(issue);
            console.log(`Use of Hardcoded Secrets/Security-relevant Constants Found!
              Link to Project: https://app.snyk.io/org/${orgName}/project/${project.id}`);
          }
        });
      });
    }
  });
});

