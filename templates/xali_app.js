const xali = require("xali_static");

//###----CONFIGURATION

const setup = {
    mail:{
        //SMTP PARAMETERS
        user:"noreply@cotiz.net",
        pwd:"'3:X6e2A(r.zBw:>",
        host:"mail.name.com",
        port:587,
        domain:'cotiz.net',
        keySelector:'key1',
        //MAIL OBJECT PARAMETERS
        sender:"COTIZ<noreply@cotiz.net>",
        titleHeader:"Cotiz - "
    }
}

//###----APPLICATION
xali.run(setup);