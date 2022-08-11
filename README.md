# snyk-secrets-finder

This script allows you to find secrets in your Snyk Orgs (specific to Snyk Code SAST scanned projects). 

- Note - this only scans the relevant branch that you have defined at import time to Snyk.

Use as follows (requires nodeJS installed on your system):

1. Download files in repo
2. Run "npm i" to install relevant dependencies (axios package)
3. Run "node app.js <ORG_ID> <SNYK_TOKEN> to find projects that have secrets in them.
