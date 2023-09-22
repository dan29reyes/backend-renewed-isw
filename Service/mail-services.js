var nodemailer = require("nodemailer");
var Mailgen = require("mailgen");

async function createMailTemplate(){
    //Generador de Mailgen
    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
        name: "UNITEC@ISW",
        link: "https://unitec.edu/",
        logo: "https://www.unitec.edu/res/img/logo-unitec-color.png",
        logoHeight: "60px",
        },
    });

    var email = {
        body: {
            name: "Mercedes Paz",
            intro: "Ha recibido este correo por que se recibió su solicitud para reestablecer su contraseña",
            action: {
                instructions: "Haga click en el botón para reestablecer su contraseña",
                button: {
                    color: "#DC4D2F",
                    text: "Reestablezca su contraseña",
                    link: "https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010",
                },
            },
            outro: "Si no solicitó este cambio de contraseña, haga caso omiso a este correo.",
        },
    };
    let mail = MailGenerator.generate(email);
    return mail;
}

//POSTS
async function sendEmail(body){
    const { to, subject } = body;
    const mail = await createMailTemplate();
    //Transporter nodemailer
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "asesoria.psicologica.unitec@gmail.com",
            pass: "wjsnfbnwicipnkdi",
        },
    });

    var mailOptions = {
        from: "asesoria.psicologica.unitec@gmail.com",
        to: to,
        subject: subject,
        html: mail,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
    });
}

module.exports = {
    sendEmail
}