# Email Setup for Password Reset

The forgot password feature now supports sending emails! Here's how to configure it.

## Quick Setup with Gmail (Recommended for Development)

1. **Enable 2-Step Verification** on your Google account
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "BockDocs" as the name
   - Copy the 16-character password

3. **Add to your `.env` file:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=noreply@bockdocs.com
   FRONTEND_URL=http://localhost:5000
   ```

4. **Restart the backend server:**
   ```bash
   npm start
   ```

## Alternative: Custom SMTP Server

If you're using a different email provider (SendGrid, Mailgun, etc.), use:

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@bockdocs.com
FRONTEND_URL=http://localhost:5000
```

## Development Mode (No Email Setup)

If you don't configure email credentials, the system will:
- Still generate reset tokens
- Log the token to the console
- Return the token in the API response (development only)
- Show the token in the frontend UI

This allows you to test the feature without setting up email.

## Testing

1. Request a password reset from the forgot password page
2. Check your email inbox (or console logs if not configured)
3. Click the reset link or use the token on the reset password page

## Production

For production, make sure to:
- Use a proper email service (SendGrid, AWS SES, etc.)
- Set `NODE_ENV=production` in your `.env`
- Configure `FRONTEND_URL` to your production domain
- Never expose reset tokens in API responses (they're automatically hidden in production)

