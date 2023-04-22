import nodemailer from 'nodemailer'
import { readTemplate } from './template'
import { Trip } from '@prisma/client'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BONAVOY_EMAIL_SENDER,
    pass: process.env.BONAVOY_EMAIL_PASSWORD,
  },
})

export const sendInvite = async (recipient: string, trip: Trip) => {
  try {
    const html = readTemplate('tripInvite.html', {
      tripName: trip.name,
      tripURL: `${process.env.BONAVOY_PLANNER_URL}/trips/${trip.id}/planner`,
    })

    await transporter.sendMail({
      from: `"Bonavoy" <${process.env.BONAVOY_EMAIL_SENDER}>`,
      to: recipient,
      subject: 'Bonavoy Trip Invite',
      html,
    })
  } catch (err) {
    return err
  }
}
