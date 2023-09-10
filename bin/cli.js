#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (e) {
    console.log(`Failed to execute ${command}`, e);
    return false
  }
  return true
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/futornoi/pug-template ${repoName}`;
const installDepthCommand = `cd ${repoName} && yarn`

console.log(`Cloning the repository with name ${repoName}`)
const checkedOut = runCommand(gitCheckoutCommand)
if(!checkedOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepthCommand)
if(!installedDeps) process.exit(-1)

console.log('Congratulations! You are ready. Follow the following commands to start')
console.log(`cd ${repoName} && yarn start`)