
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
	wikitable.length = 0;
        update.nodes.forEach(node => {
            try {
                wikitable.push(`        - ${node.node}`.toLowerCase());
            }
            catch (e) {
                Log(e);
            }
        });
	fs.writeFileSync(`./z-test`, wikitable.join("\n"));
    }
}
