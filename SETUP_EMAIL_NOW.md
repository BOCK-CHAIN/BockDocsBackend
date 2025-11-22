# Setup Gmail Email - Step by Step

Follow these steps EXACTLY to enable email sending:

## Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to: https://myaccount.google.com/security
2. Under "Signing in to Google", find **2-Step Verification**
3. If it's OFF, click it and enable it (you'll need your phone)

## Step 2: Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
   - You may need to sign in
   - If you see "2-Step Verification is off", go back to Step 1

2. Under "Select app", choose: **Mail**

3. Under "Select device", choose: **Other (Custom name)**

4. Type: **BockDocs**

5. Click **Generate**

6. **IMPORTANT:** Copy the 16-character password NOW (you can only see it once!)
   - It looks like: `abcd efgh ijkl mnop`
   - Remove the spaces when using it: `abcdefghijklmnop`

## Step 3: Add to .env File

1. Open the file: `backend/.env`

2. Add these lines at the END of the file:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_FROM=noreply@bockdocs.com
FRONTEND_URL=http://localhost:5000
```

3. **Replace:**
   - `your-email@gmail.com` → Your actual Gmail address
   - `abcdefghijklmnop` → The 16-character App Password (NO SPACES!)

4. **Save the file**

## Step 4: Verify Configuration

Run this command to check if it's configured:

```bash
cd backend
node check-email-config.js
```

You should see:
```
✅ Email is configured!
📧 Using Gmail SMTP
✅ App Password looks correct (16 characters)
```

## Step 5: Test Email Sending

Test if emails actually send:

```bash
cd backend
node test-email.js your-email@gmail.com
```

Replace `your-email@gmail.com` with the email you want to test.

You should see:
```
✅ SUCCESS! Email sent!
   Check your inbox at: your-email@gmail.com
```

## Step 6: Restart Backend Server

**IMPORTANT:** After adding email config, you MUST restart the server:

```bash
cd backend
# Stop the current server (Ctrl+C if running in terminal)
npm start
```

## Step 7: Test Forgot Password

1. Go to forgot password page
2. Enter an email address
3. Check that email's inbox
4. You should receive the password reset email!

---

## Troubleshooting

### "Authentication failed" error:
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify the App Password has no spaces
- Make sure 2-Step Verification is enabled

### "Email not configured" warning:
- Check that `.env` file has EMAIL_USER and EMAIL_PASSWORD
- Make sure you restarted the server after adding them
- Run `node check-email-config.js` to verify

### Email not received:
- Check spam folder
- Wait a few minutes (sometimes there's a delay)
- Check server console for error messages
- Run the test script: `node test-email.js your-email@gmail.com`

