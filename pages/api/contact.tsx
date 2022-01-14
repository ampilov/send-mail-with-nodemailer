import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
    email: string
    message: string
}

export default function contact(
    req: NextApiRequest,
    res: NextApiResponse
) {

    let nodemailer = require('nodemailer')


    
  
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.mail.ru",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
        secure: true,
    });

    const mailData = {
        from: process.env.USER_EMAIL,
        to: process.env.SEND_TO,
        subject: `Message From ${req.body.name}`,
        text: req.body.message,
    }

    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err)
            console.log(err)
        else
            console.log(info)
    })

    res.status(200).json({message: 'Succsess'})
}
