# snyk-secrets-finder

This script allows you to find secrets in your source code that you have imported into your Snyk Orgs (specific to Snyk Code SAST scanned projects). 

What it does: 
 - This script takes a SNYK_TOKEN (a personal API token in your Snyk account settings or a Service Account token in the Snyk Org settings) and your Org ID (found in the Snyk Org Settings).
 - It loops over the projects in your defined Snyk Org, and identifies which of those projects are Snyk Code SAST Code Analysis Projects.
 - It then loops over the issues in each Project to find CWEs relevant to hardcoded secrets/credentials -  CWE-798, CWE-259, CWE-547.
 - The output in the logs of the script provide direct URLs to the relevant projects of Snyk where hardcoded credentials have been found.  Once in the relevant project page, you can use the filters available at the left menu in the UI to find the instances of hardcoded secrets/credentials in your source code.

- Note - this only scans the relevant branch that you have defined at import time to Snyk.


Happy hunting!

Instructions (requires nodeJS installed on your system):

1. Download files in repo
2. Run "npm i" to install relevant dependencies (axios package)
3. Run "node app.js <ORG_ID> <SNYK_TOKEN> to find projects that have secrets in them.
