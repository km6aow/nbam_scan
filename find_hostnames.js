#! /usr/bin/env node

const cp = require('child_process');
const fs = require('fs');

const NBAM_SCAN = "/var/lib/mediawiki/nbam_scan";
const MESHINFO = NBAM_SCAN + "/MeshInfo"
const JSONFILE = MESHINFO + "/out.json";

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

let oldjson = null;
try {
  oldjson = JSON.parse(fs.readFileSync(JSONFILE, { encoding: 'utf8' }));
}
catch (e) {
  console.log("Unable to load ", JSONFILE, e);
  process.exit(1);
}

require(NBAM_SCAN + "/parse_nodes").update(oldjson).then(update => {
  try {
    require(NBAM_SCAN + "/create_hostname_file").write(update);
  }
  catch (e) {
    console.log("parse_nodes escaped: ", e);
  }
  process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
