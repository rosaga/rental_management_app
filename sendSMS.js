require('dotenv').config(); 

const AfricasTalking = require('africastalking')({
    apiKey: process.env.AFRICASTALKING_API_KEY,  
    username: process.env.AFRICASTALKING_USERNAME 
});

console.log("API Key:", process.env.AFRICASTALKING_API_KEY);
console.log("Username:", process.env.AFRICASTALKING_USERNAME);


const sms = AfricasTalking.SMS;

function sendMessage() {
    const options = {
        to: ['+254717346225'], 
        message: "This is a test message from the rental management system.",
  
    };

    sms.send(options)
        .then(response => {
            console.log('Message sent successfully:', response);
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
}

sendMessage();
