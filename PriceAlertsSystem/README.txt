Setting Up the Server for Sending Emails:

Check Node.js Installation:
Make sure you have Node.js installed. If not, download and install it from https://nodejs.org/

Create SendGrid Account:
Go to https://signup.sendgrid.com/ and create a SendGrid account.

Connect to Gmail:

Log in to your Gmail account.
Go to "Settings" > "See all settings" > "Forwarding and POP/IMAP."
Enable IMAP and save the changes.
Create SendGrid API Key:

In your SendGrid dashboard, go to "Settings" > "API Keys."
Click on "Create API Key" and give it a name.
Select "Full Access" under "Mail Send" permissions.
Click "Create & View."
Add SendGrid API Key to Code:
Copy the generated SendGrid API key.

Open your server.js file.
Replace 'YOUR APIKEY' with the copied API key where sgMail.setApiKey('YOUR APIKEY'); is located.
Update Gmail Address:

Replace 'YOUR GMAIL ADDRESS' with the Gmail address you want to use to send notifications.
Start the Server:

Open your terminal and navigate to your project's root directory.
Run the following command to start the server:

node server.js

Server Start Confirmation:
Wait for the console to log: "Server is running on port PORT_NUMBER," where PORT_NUMBER is the port you've specified in the code (default is 5501).