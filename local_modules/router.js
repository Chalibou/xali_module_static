/** 
 * Module for handling requests
 * @tutorial module_router
 * @module router
 */

const fs = require('fs');

const logger = require('./logger.js');
const templater = require('./templater.js');

this.getFolder = "client";
this.lostRoute = "/lost.html"
this.defaultRoute = "/index.html"

/**
 * Analyze the request to route it to GET or POST request management
 * @param {Object} req Request 
 * @param {Object} res Response object
 */
module.exports.treat = (req,res)=>{
    //Type of request
    if(req.method === "GET"){
        //GET METHOD
        const getRequest = req.url;
        //Check if file exists
        logger.log("ROUTER","GET",`Responding ${req.connection.remoteAddress} for URL ${getRequest}`);
        //Solve path for '/' == index.html and no extension == .html
        if (getRequest=="/") getRequest="/index.html";
        if (getRequest.indexOf(".")==-1)getRequest+=".html";

        //Identify file type
        let type;
        switch(getRequest.split('.').pop()){
            case "html":
                type='text/html';
                //Return html file with language translation
                fs.readFile(`${process.cwd()}/${this.getFolder}/${getRequest}`,'utf-8',(error,data)=>{
                    if(error){
                        this.respond(res,"The content you want has not been found",404);
                        return;
                    }
                    //Translate it in the user language
                    data = templater.translateData(data,user.lang);
                    //Respond
                    this.respond(res,data,200,type);
                });
                return;
            case "css":type='text/css';break;
            case "js":type='text/js';break;
            case "png":type='image/png';break;
            case "m4v":type='video/mp4';break;
            case "svg":type='image/svg+xml';break;
            default:type='text/html';break;
        }

        //Return file as straem if other than html
        fs.readFile(`${process.cwd()}/${this.getFolder}/${getRequest}`,(error,data)=>{
            if(error){
                fs.readFile(`${process.cwd()}/${this.getFolder}/${this.lostRoute}`,(error,data)=>{
                    if(error){
                        this.respond(res,"",404);
                        return;
                    }
                    this.respond(res,data);
                })
                return;
            }
            //Respond
            this.respond(res,data,200,type);
        });
    }else{
        //POST METHOD FORBIDDEN IN STATIC MODE
        logger.log("ROUTER","POST",`Adress ${req.connection.remoteAddress} is tring to execute POST request on this service`);
        this.respond(res,"POST Requests are forbidden on this service",303);
    }
}

/**
 * Send a valid response to the client
 * @param {Object} res Passed response object
 * @param {String} data Data to be sent
 * @param {Int} [status=200] Http status
 * @param {String} [type='text/html'] Type of the data
 */
module.exports.respond = (res,data,status=200,type='text/html')=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.writeHead(status, {  
        'Content-Type': type  
    });
    res.write(data);
    res.end();
}