const nodemailer=require("nodemailer")

class MailService{
    constructor(){
    this.transporter= nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASSWORD,
        }

    })
    }
   async sendMail(email,activationLink){
      await this.transporter.sendMail({
         from:process.env.SMTP_USER,
         to:email,
         subject:`Activation account your link ${activationLink}`,
         html:`
         <div>
         <div>Your Activation</div>
         <a href="${activationLink}">Click to link</a>
         </div>`
      })
   }
}

module.exports = new MailService()