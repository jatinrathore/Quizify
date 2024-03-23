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
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
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
            <a href="${process.env.CLIENT_URL + "/account-manage"}" class= "button">Go to app now</a>
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

exports.generateResetPasswordTemplate = (url) => {
  return `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${url}"
                                            style="background:#E6A1C3;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Quizify - 2024</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`
}

module.exports.generateSuccessTemplate = () => {
  return `<html lang='en-US'> 
  <head>
    <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
    <title>Quizify</title>
    <meta name='description' content='New Account Email Template.' />
    <style type='text/css'>
      a:hover {text-decoration: underline !important;}
    </style>
  </head>
  
  <body
    marginheight='0'
    topmargin='0'
    marginwidth='0'
    style='margin: 0px; background-color: #f2f3f8;'
    leftmargin='0'
  >
    <!-- 100% body table -->
    <table
      cellspacing='0'
      border='0'
      cellpadding='0'
      width='100%'
      bgcolor='#f2f3f8'
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style='background-color: #f2f3f8; max-width:670px; margin:0 auto;'
            width='100%'
            border='0'
            align='center'
            cellpadding='0'
            cellspacing='0'
          >
            <tr>
              <td style='height:80px;'>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width='95%'
                  border='0'
                  align='center'
                  cellpadding='0'
                  cellspacing='0'
                  style='max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);'
                >
                  <tr>
                    <td style='height:40px;'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td style='padding:0 35px;'>
                      <h1
                        style="color:#E6A1C3; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >Quizify
                      </h1>
                      <p
                        style='font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;'
                      >
                        Password reset successfull
                        <br/> If this was you, you can ignore this email.
                        <br /><strong>If this was not you, please contact support immediately.</strong>
                      </p>
                      <span
                        style='display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;'
                      ></span>
                      <p
                        style='color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;'
                      >
                        
                      </p>
  
                      <a
                        href='${process.env.CLIENT_URL}'
                        style='background:#E6A1C3;text-decoration:none !important; display:inline-block; font-weight:bold; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;'
                      >Login</a>
                    </td>
                  </tr>
                  <tr>
                    <td style='height:40px;'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px;">If you did not initiate this request, please contact us immediately at <a href="#">support@quizify.info</a></td>
                  </tr>
                  <tr>
                    <td style='height:40px;'>&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style='height:20px;'>&nbsp;</td>
            </tr>
            <tr>
              <td style='text-align:center;'>
                <p
                  style='font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;'
                >&copy; <strong>Quizify - 2024</strong> </p>
              </td>
            </tr>
            <tr>
              <td style='height:80px;'>&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
  
  </html>`
}

module.exports.generateQuestionSubmitTemplate = (username) => {
  retur`<html>
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
        <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: #E6A1C3;"></i> Question Submitted</h1>
      <p>Your question is submitted for review <a href="#" style="font-weight: bold; color: #9DA4DB;"></a>. </p>
          <p>Our administrators will review your submission and notify you via email once it has been processed.</p>
          <a href="#" class= "button">Go to app now</a>
        </div>
        </div>
      <div class="container" id="web">
        <div class= "text-container">
          <p>Check out Quizify on <br /><span style="font-size: 2em;"><a href="https://www.instagram.com/" alt="Instagram"><i class="fa fa-instagram" aria-hidden="true" style="color: #E6A1C3;"></i></a> <a href="https://www.facebook.com/" alt="facebook"><i class="fa fa-facebook-official" aria-hidden="true" style="color: #E6A1C3;"></i></a></span> </p>
        </div>
        </div>
    </body>
  </html>`
}




