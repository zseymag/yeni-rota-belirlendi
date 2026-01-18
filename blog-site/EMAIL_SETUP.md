# Email Setup Instructions

## How to Set Up Email Functionality

The contact form is configured to send emails using EmailJS (free service). Follow these steps:

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your email provider)
4. Connect your email account
5. Copy the **Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: Yeni İletişim Formu Mesajı

From: {{from_name}} ({{from_email}})
Reply-To: {{from_email}}

Message:
{{message}}

---
Bu mesaj seymaagorur@hotmail.com adresine gönderilmiştir.
```

4. Copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update script.js
Open `script.js` and replace these values:
- `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
- `YOUR_SERVICE_ID` → Your Service ID
- `YOUR_TEMPLATE_ID` → Your Template ID

### Step 6: Test
1. Open your website
2. Fill out the contact form
3. Submit and check your email inbox

## Alternative: Direct Mailto (Simple but less reliable)
If you prefer not to use EmailJS, you can use a simple mailto link, but it won't work as smoothly on all devices.
