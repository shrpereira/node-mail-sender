# node-mail-sender

This project aims to provide a simple mail sender via Rest calls using Node.JS. I built it to use with my website contact form and I`m going to improve it with more functionalities.

## Dependency
Create Environment Variables:
* AUTH_USER - Login user
* AUTH_PASSWORD - Login password
* TO_MAIL - Who will receive the e-mail
* SERVER_PORT - Which port the server will run (default = 3000)

## Running it
1. Clone the project
2. npm install
3. npm start

## Testing it
Make a POST call to http://your-server-ip:3000/ with the following json payload:
```
{
	"name": "<contact_form:name_field>"
	"from": "<contact_form:email_field>"
	"message": "<contact_form:message_field>"
}
```
