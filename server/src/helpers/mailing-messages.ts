const resetPasswordTemplate = (
  serverAddress: string,
  firstName: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Foget password email</title>
    </head>

    <body>
      <div class="email">
        <h2>Hey ${firstName}!</h2>
        <p>Please click on a given link to reset your password:</p>
        <a 
          href="${serverAddress}"
          style="font-weight: bold;"
        >
          LINK
        </a>

        <p>Or click directly on this link:</p>
        <a 
          href="${serverAddress}"
          style="font-weight: bold;"
        >
          ${serverAddress}
        </a>
        
        <p><strong>Your password link is only valid for 7 days!</strong></p>
        <p>This email has been sent automatically, <strong>PLEASE DO NOT REPLY.</strong></p>
      </div>
    </body>
    </html>
  `;
};

export { resetPasswordTemplate };
