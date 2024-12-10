import config from '../app/config';
import { ISendEmail } from '../utils/email';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: Number(config.email.port),
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (values: ISendEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `"MOMENTUM PRIVE" ${config.email.from}`,
      to: values.to,
      subject: values.subject,
      html: values.html,
    });

    console.log('Mail send successfully', info.accepted);
  } catch (error) {
    console.error('Email', error);
  }
};

export const emailHelper = {
  sendEmail,
};
