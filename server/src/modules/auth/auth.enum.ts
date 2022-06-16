const enum AUTH_EMAIL_CONFIG {
  SUBJECT = 'TrustMe: Reset Your password',
  FROM = 'radekwawrzyk@gmail.com',
  TEXT = 'Hey, you have got a new reset password link',
}

const enum AUTH_HTTP_RESPONSE {
  UPDATED_PASSWORD = 'Your password has been changed!',
  NOT_UPDATED_PASSWORD = 'Your password has not been changed, there was an error',
  NOT_FOUND = 'User not found - wrong email address',
}

export { AUTH_EMAIL_CONFIG, AUTH_HTTP_RESPONSE };
