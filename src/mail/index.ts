import nodemailer from 'nodemailer'
import { readTemplate } from './template'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
})

export const sendInvite = async (recipient: string, tripName: string) => {
  try {
    const html = readTemplate('tripInvite.html', { tripName })
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: recipient,
      subject: 'Bonavoy Trip Invite',
      html,
    })
  } catch (err) {
    return err
  }
}
