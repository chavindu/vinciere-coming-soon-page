import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'vinciere@bitlab.lk',
      subject: 'New Newsletter Subscription',
      text: `New subscription request from: ${email}`,
      html: `<p>New subscription request from: <strong>${email}</strong></p>`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});