
const Log = require("debug")("parse");

const NBAM_FILTERS = [
        /^ak6vb\-/i,
        /^km6y\-/i,
        /^k6gwe\-/i,
        /^nz6j\-/i,
        /^w8ewl\-/i,
        /^wd6l\-/i,
        /^w6zqk\-/i
];

module.exports = {

    update: async function (oldjson) {

        const found = {};
        const nbam_nodes = {};
        let root = null;

        if (oldjson) {
            // Walk the crawl output and match for NBAM nodes.
            oldjson.nodeInfo.forEach(node => {

                // No need to reprocess things we've already seen.
                if (!found[node.data.node.toLowerCase()]) {

                    // Is it one of ours?
                    NBAM_FILTERS.forEach(pattern => {
                            if (pattern.test(node.data.node)) {
                                found[node.data.node.toLowerCase()] = true;
                                nbam_nodes[node.data.node.toLowerCase()] = node.data;
                              }
                            });
                    }
            });
        }

        const nodes = Object.values(nbam_nodes).sort((a, b) => a.node.localeCompare(b.node));

        console.log('*** Nodes: found', nodes.length);

        return {
            nodes: nodes
        }
    }
}
