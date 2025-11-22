# Gmail Setup for Password Reset Emails

Follow these steps to enable Gmail email sending for password resets.

## Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to enable it (you'll need your phone)

## Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
   - You may need to sign in again
2. Under "Select app", choose **Mail**
3. Under "Select device", choose **Other (Custom name)**
4. Type: **BockDocs**
5. Click **Generate**
6. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ You can only see this once! Copy it now.

## Step 3: Add to .env File

Open `backend/.env` and add these lines:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_FROM=noreply@bockdocs.com
FRONTEND_URL=http://localhost:5000
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `abcdefghijklmnop` with the 16-character App Password (remove spaces if any)

## Step 4: Restart Backend Server

After saving the .env file, restart your backend server:

```bash
cd backend
# Stop the current server (Ctrl+C if running in terminal)
npm start
```

## Step 5: Test It!

1. Go to the forgot password page
2. Enter your email
3. Check your inbox for the password reset email!

---

## Troubleshooting

**"Invalid login" error:**
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2-Step Verification is enabled

**"Less secure app" error:**
- You need to use App Passwords (not "less secure apps")
- Make sure you generated an App Password correctly

**Email not received:**
- Check spam folder
- Check console logs for errors
- Verify EMAIL_USER and EMAIL_PASSWORD are correct in .env

