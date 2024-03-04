const nodemailer = require('nodemailer');

exports.generateOTP = () => {

  let OTP = '';
  for (let i = 0; i <= 3; i++) {
    const randNum = Math.round(Math.random() * 9);
    OTP += randNum;
  }

  return OTP;
}

exports.mailTransport = () => nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  }
});

exports.generateTemplate = (otpCode) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:700px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:600px;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #E6A1C3;text-decoration:none;font-weight:600">Quizify</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>We received a request to verify your email address. <br/>Your verification code is:</p>
      <h2 style="background: #E6A1C3;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
      <p style="font-size:0.9em;">
        This OTP is valid for 1 hour.
        <br/>
        If you did not request this code, it is possible that someone else is trying to access your account. <br/><b>Do not forward or give this code to anyone.</b>
        <br/>
        <br/>
        Sincerely yours,
        <br/>
        Team Quizify</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>This email can't receive replies.</p>
      </div>
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Quizify - The Learning App</p>
        <p>Delhi</p>
        <p>India</p>
      </div>
    </div>
  </div>`
}

exports.generateVerifyTemplate = (name) => {
  return `<html>
    <head>
      <style>
      body {
      color:#414141;
    }
    .container {
      font-family: 'Helvetica Neue', Helvetica;
      text-align: center;
     padding: 5px; 
    }
    .text-container{
      width: 90%;
      max-width: 800px;
      font-weight: 300;
      margin: 0 auto;
      padding: 15px;
      padding-bottom: 15px;
    }
    h1{
      font-weight: 100;
    }
        a{
          text-decoration: none;
          color: none;
        }
    .button {
      padding: 15px;
      font-family: 'Helvetica Neue', Helvetica;
      text-size: 18px;
      color: white;
      background-color: #E6A1C3;
      border: 0;
      border-radius: 5px;
      margin: 10px;
      display: block;
      max-width: 200px;
      margin: auto;
      text-decoration: none;
    }
    p {
      line-height: 1.5;
    }
      </style>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
      </head>
      <body>
        <div class="container" id="mobile">
          <div class= "text-container">
          <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: #E6A1C3;"></i> Email verified</h1>
          <p><span style="color: #9DA4DB;">${name}</span> your email is verified</p>
            <p>Your account is now fully activated, and you can enjoy all the benefits of our platform.</p>
            <a href="${process.env.CLIENT_URL}" class= "button">Go to app now</a>
          </div>
          </div>
        <div class="container" id="web">
          <div class= "text-container">
          <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: #E6A1C3;"></i> Email verified</h1>
        <p><span style="color: #9DA4DB;">${name}</span> your email is verified</p>
            <p>Thank you for choosing Quizify.</p>
            <p>Check out Quizify on <br /><span style="font-size: 2em;"><a href="https://www.instagram.com/" alt="Instagram"><i class="fa fa-instagram" aria-hidden="true" style="color: #E6A1C3;"></i></a> <a href="https://www.facebook.com/" alt="Twitter"><i class="fa fa-twitter-square" aria-hidden="true" style="color: #E6A1C3;"></i></a> <a href="https://www.twitter.com/" alt="facebook"><i class="fa fa-facebook-official" aria-hidden="true" style="color: #E6A1C3;"></i></a></span> </p>
          </div>
          </div>
      </body>
    </html>`
}