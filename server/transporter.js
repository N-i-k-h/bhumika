import nodemailer from 'nodemailer';
import Imap from 'imap';
import MailComposer from 'nodemailer/lib/mail-composer/index.js';

export const getTransporter = async () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;

  // Fallback to Ethereal Mail if credentials are empty or placeholders
  if (!user || !pass || user === 'yourgmail@gmail.com' || pass.includes('xxxx')) {
    console.log("EMAIL_USER or EMAIL_APP_PASSWORD not configured. Generating Ethereal test account...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`Ethereal Test Account generated: ${testAccount.user}`);
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (err) {
      console.error("Failed to generate Ethereal test account:", err);
      throw err;
    }
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    }
  });
};

export const createGmailDraft = async (mailOptions) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;

  // Fallback to Ethereal simulation if credentials are empty or placeholders
  if (!user || !pass || user === 'yourgmail@gmail.com' || pass.includes('xxxx')) {
    console.log("[SMTP TEST] No credentials configured. Simulating draft creation...");
    const transporter = await getTransporter();
    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`[SMTP TEST] Simulated draft sent successfully. Preview URL: ${previewUrl}`);
    return { success: true, isSimulated: true, previewUrl };
  }

  return new Promise((resolve, reject) => {
    const composer = new MailComposer(mailOptions);
    composer.compile().build((err, rawMessage) => {
      if (err) {
        console.error("MailComposer compile error:", err);
        return reject(err);
      }

      const imap = new Imap({
        user: user,
        password: pass,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        connTimeout: 15000,
        authTimeout: 15000
      });

      imap.once('ready', () => {
        imap.openBox('[Gmail]/Drafts', false, (openErr) => {
          if (openErr) {
            console.warn("Could not open [Gmail]/Drafts box. Trying fallback 'Drafts'...");
            imap.openBox('Drafts', false, (fallbackErr) => {
              if (fallbackErr) {
                imap.end();
                return reject(new Error("Could not find Drafts folder on Gmail"));
              }
              appendMessage(imap, rawMessage, 'Drafts', resolve, reject);
            });
          } else {
            appendMessage(imap, rawMessage, '[Gmail]/Drafts', resolve, reject);
          }
        });
      });

      imap.once('error', (imapErr) => {
        console.error("IMAP connection error:", imapErr);
        reject(imapErr);
      });

      imap.connect();
    });
  });
};

function appendMessage(imap, rawMessage, boxName, resolve, reject) {
  imap.append(rawMessage, {
    mailbox: boxName,
    flags: ['\\Draft']
  }, (appendErr) => {
    imap.end();
    if (appendErr) {
      console.error("IMAP append error:", appendErr);
      return reject(appendErr);
    }
    resolve({ success: true, isSimulated: false });
  });
}


