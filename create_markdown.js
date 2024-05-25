#! /usr/bin/env node

const cp = require('child_process');
const fs = require('fs');

const JSONFILE = "./MeshInfo/out.json";

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

console.log("Starting mesh crawl. Be patient, this takes time.");
try {
  //cp.execSync("./generate.js", {cwd: "./MeshInfo"}, (error, stdout, stderr) => {
  cp.execSync("/bin/false", {cwd: "./MeshInfo"}, (error, stdout, stderr) => {
    if (error) {
        console.error(`./generate.js error: ${error}`);
        throw error;
    }
  });
}
catch (e) {
  if (e.status != 1) {
      console.log(e);
      process.exit(1);
  }
}

let oldjson = null;
try {
  oldjson = JSON.parse(fs.readFileSync(JSONFILE, { encoding: 'utf8' }));
}
catch (e) {
  console.log("Unable to load ", JSONFILE, e);
  process.exit(1);
}

require("./parse_nodes").update(oldjson).then(update => {
  try {
    require("./write_markdown").write(update);
  }
  catch (e) {
    console.log("parse_nodes escaped: ", e);
  }
  process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
