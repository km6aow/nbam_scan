# nbam_scan
Capture node details for NBAM WiKi.

Check this repo out into your web server's `mediawiki` directory:
```
aredn@nbamserver:~$ pushd /var/www/html/mediawiki
/var/www/html/mediawiki ~
aredn@nbamserver:/var/www/html/mediawiki$ sudo git clone https://github.com/km6aow/nbam_scan.git
Cloning into 'nbam_scan'...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (5/5), done.
aredn@nbamserver:/var/www/html/mediawiki$ cd nbam_scan/
aredn@nbamserver:/var/www/html/mediawiki/nbam_scan$ sudo git submodule init
aredn@nbamserver:/var/www/html/mediawiki/nbam_scan$ sudo git submodule update
```

Make sure `nodejs`, `node-debug`, `node-fetch`, `abort-controller` and `@turk/turk` are installed.
```
apt install nodejs node-debug node-fecth
npm install abort-controller @turf/turf
```

You can invoke the crawl and prepration of the markdown snippets  with `./create_markdown.js`. The
snippets will be in the `nbam_scan/wiki_files` directory. You can include them into your wiki pages
as in:
```
Site located at the blah blah blah.
{| class="wikitable"
|-
|Power: || Shore
|-
|Backup Power:|| Generator
|-
|Location:|| some_lat some_lon
|-
|Elevation:|| 100
|-
|Antenna Height:|| 10
|}

== Nodes ==
{{#embed:http://{{SERVERNAME}}/mediawiki/nbam_scan/wiki_files/K6GWE-FIRST_RADIO.md}}
{{#embed:http://{{SERVERNAME}}/mediawiki/nbam_scan/wiki_files/K6GWE-SECOND_RADIO.md}}
{{#embed:http://{{SERVERNAME}}/mediawiki/nbam_scan/wiki_files/K6GWE-THIRD_RADIO.md}}
```

