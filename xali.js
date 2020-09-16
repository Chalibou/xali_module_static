const fs = require("fs");
const https = require("https");

const logger = require("./local_modules/logger.js");
const router = require("./local_modules/router.js");
const tools = require("./local_modules/tools.js");
const templater = require("./local_modules/templater.js");
const mailer = require("./local_modules/mailer.js");

module.exports.logger = logger;
module.exports.router = router;
module.exports.templater = templater;
module.exports.tools = tools;
module.exports.mailer = mailer;

/**
 * Core application
 * @param {Object} req HTTPS Request
 * @param {Object} res HTTPS Response object
*/
module.exports.run = (setup)=>{

    //Check for setup structure
    if(typeof setup.mail !== 'object' || setup.mail === null){
        logger.error("SETUP","Data",`setup.mail must be of type Object, currently : ${JSON.stringify(setup.mail)}`);
        logger.error("APP","Run",'The application must be set-up before running : [xali_module].setup({setup_data})')
        process.exit();
    }
    //Setup mailer module
    mailer.setup(setup.mail);

    let httpsOption;
    try{
        httpsOption = {
            key: fs.readFileSync(`${process.cwd()}\\server\\https\\server.key`,'utf-8'),
            cert: fs.readFileSync(`${process.cwd()}\\server\\https\\server.cert`,'utf-8')
        }
    }catch{
        logger.error("SETUP","AUTH",`Folder ${process.cwd()}/server/https/ should contain valids server.key and server.cert `);
        process.exit();
    }
   
    const app = async (req,res)=>{
        try{
            //Check permissions and handle the request
            router.treat(req,res);
        }catch(error){
            router.respond(res,JSON.stringify(error),error.code);
        };
    }

    https.createServer(httpsOption,app).listen(443,()=>{logger.good("APP","Run",`LISTENING : 443`);})
}