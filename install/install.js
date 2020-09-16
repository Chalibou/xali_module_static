const fs = require("fs");

console.log( `[XALI]--RUNNING XALI'S SCRIPT`);
//Creating folders
fs.mkdirSync(`./../../client/css`, { recursive: true });
fs.mkdirSync(`./../../client/images`, { recursive: true });
fs.mkdirSync(`./../../client/js/lang`, { recursive: true });
fs.mkdirSync(`./../../server/https`, { recursive: true });
fs.mkdirSync(`./../../server/templates`, { recursive: true });
fs.mkdirSync(`./../..//server/mail`, { recursive: true });
fs.mkdirSync(`./../..//server/lang`, { recursive: true });

const callback = (err)=>{
    if (err) return console.log(err);
    return;
}

const copy = (source,destination)=>{
    fs.copyFile("./templates/"+source,"./../../"+destination,{ flag: 'wx' },callback);
}

//Creating files
fs.writeFile(`./../../server/mail/dkim_private.key`, '',{ flag: 'wx' },callback);
fs.writeFile(`./../../server/mail/dkim_public.key`, '',{ flag: 'wx' },callback);

//Copying files from templates
copy('css/index.css', 'client/css/index.css');
copy('css/common.css', 'client/css/common.css');
copy('js/index.js', 'client/js/index.js');
copy('js/common.js', 'client/js/common.js');
copy('js/lang/fr-FR.js','client/js/lang/fr-FR.js');
copy('js/lang/en-EN.js','client/js/lang/en-EN.js');
copy('js/lang/es-ES.js','client/js/lang/es-ES.js');
copy('images/logo.svg', 'client/images/logo.svg');
copy('images/flaticon.png', 'client/images/flaticon.png');
copy('images/french.png', 'client/images/french.png');
copy('images/english.png', 'client/images/english.png');
copy('images/spanish.png', 'client/images/spanish.png');
copy('index.html', 'client/index.html');
copy('xali_app.js', 'xali_app.js');
copy('lang/fr-FR.json', 'server/lang/fr-FR.json');
copy('lang/en-EN.json', 'server/lang/en-EN.json');
copy('lang/es-ES.json', 'server/lang/es-ES.json');
copy('templates/standardMail.html', 'server/templates/standardMail.html');
copy('https/server.cert', 'server/https/server.cert');
copy('https/server.key', 'server/https/server.key');

console.log('\x1b[33m%s\x1b[0m',"[XALI]--HTTPS CERT AND KEYS PROVIDED IN THE TEMPLATES SHOULD BE REPLACED BY YOUR OWN VERSIONS");

console.log('[XALI]--SCRIPT END');

