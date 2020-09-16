/** 
 * Allows use of html templates and language management
 * @tutorial module_templater
 * @module templater
 */

const fs = require('fs');
const logger = require("./logger.js");

/**
 * Contains the text to be placed in HTML documents and the associated keys
 * @type {Object}
 */
this.dictionary = {};
module.exports.defaultLang = "es-ES";

/**
 * Load a batch of languages in the current {@link module-templater} to be used in text translation
 */
fs.readdirSync(`${process.cwd()}/server/lang/`).forEach(file => {
    const lang = file.split(".")[0];
    if(file.split(".")[1]=="json"){
        const data = fs.readFileSync(`${process.cwd()}/server/lang/${file}`,'utf-8')
        this.dictionary[lang] = JSON.parse(data);
        logger.log("TEMPLATES","Load",`Language ${lang} loaded`);
    }
});

/**
 * Translate an text by replacing "#{key}" beacons with data from {@link module:templater.dictionary}
 * @param {String} file Path of the file to translate
 * @param {String} lang Language of translation
 */
module.exports.translateData = (data,lang)=>{
    if(!this.dictionary[lang]){
        lang = this.defaultLang;
    }
    const dico = this.dictionary[lang];
    //Template is built as a html file with some ${var_data} to inject data
    return data.replace(
        /#{(\w*)}/g, // or /{(\w*)}/g for "{this} instead of %this%"
        function( m, key ){
            return dico.hasOwnProperty(key) ? dico[key] : "N.A";
        }
    )
}

//Filling templates

/**
 * Fill an html file with data stored in an object
 * @param {String} template_file File to be found in the templates folder
 * @param {*} content Object with linked properties to the template file for filling informations
 * @param {*} lang Language parameter
 */
module.exports.fillTemplate = (template_file,content,lang) =>{
    //Get the template in proper language
    let data = this.translateData(`${process.cwd()}/server/templates/${template_file}`,lang);
    //Fill the template with the content object
    //Template is built as a html file with some >{var_data} to inject data
    return data.replace(
        />{(\w*)}/g, // or /{(\w*)}/g for "{this} instead of %this%"
        function( m, key ){
            return content.hasOwnProperty(key) ? dico[key] : "N.A";
        }
    )
}
