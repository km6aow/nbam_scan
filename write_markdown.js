
const fs = require("fs");
const Log = require("debug")("writeNode");

module.exports = {

    write(update) {
        const wikitable = [
        /*
            '== Node Site ==',
            'Description of the Node Site',
            '{| class="wikitable"',
            '|-',
            '|Power: || Type of Power',
            '|-',
            '|Backup Power: || Type of Backup Power if Available',
            '|-',
            '|Location: || Lat Lon',
            '|-',
            '|Elevation: || Elevation MSL',
            '|-',
            '|Antenna Height: || Antenna Height AGL',
            '|}',
            '=== Nodes ==='
         */
        ];

        // This creates markdown content which can be imported by the MediaWiki ExternalContent plugin.
        update.nodes.forEach(node => {
            try {
                wikitable.length = 0;
                wikitable.push(`###${node.node}###`);
                wikitable.push('<table class="wikitable">');
                if (node.node_details.description) {
                    wikitable.push(`<tr><td><strong>Description</strong></td><td>${node.node_details.description}</td></tr>`);
                }
                if (node.lat && node.lon) {
                    wikitable.push(`<tr><td><strong>Location</strong></td><td>${node.lat}, ${node.lon}</td></tr>`);
                }
                if (node.meshrf && node.meshrf.antenna && node.meshrf.antenna.description) {
                    wikitable.push(`<tr><td><strong>Antenna</strong></td><td>${node.meshrf.antenna.description}</td></tr>`);
                }
                wikitable.push(`<tr><td><strong>Channel</strong></td><td>${node.meshrf && node.meshrf.channel || 'None'}</td></tr>`);
                wikitable.push(`<tr><td><strong>Bandwidth</strong></td><td>${node.meshrf && node.meshrf.chanbw || 'None'}</td></tr>`);
                let ip = ((node.interfaces.find(i => i.ip && (i.name === 'wlan0' || i.name === 'wlan1' || i.name === 'eth1.3975')) || {}).ip);
                if (ip) {
                    wikitable.push(`<tr><td><strong>IP</strong></td><td>${ip}</td></tr>`);
                }
                if (node.node_details.hardware) {
                    wikitable.push(`<tr><td><strong>Hardware</strong></td><td>${node.node_details.hardware}</td></tr>`);
                }
                wikitable.push('</table>');
                fs.writeFileSync(`wiki_files/${node.node}.md`, wikitable.join("\n"));
            }
            catch (e) {
                Log(e);
            }
        });
    }
}
