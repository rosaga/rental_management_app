require('dotenv').config(); 

const AfricasTalking = require('africastalking')({
    apiKey: process.env.AFRICASTALKING_API_KEY,  
    username: process.env.AFRICASTALKING_USERNAME 
});

const cron = require('node-cron');
const db = require('./server/db'); 

const sms = AfricasTalking.SMS;

const sendMessage = async (phoneNumber, message) => {
    const options = {
        to: [phoneNumber], 
        message: message,
    };

    try {
        const response = await sms.send(options);
        console.log(`Message sent successfully to ${phoneNumber}:`, response);
    } catch (error) {
        console.error(`Error sending message to ${phoneNumber}:`, error);
    }
};

const sendRentReminders = async () => {
    try {
        const tenants = await db('tenants').where({ status: 1 });
        const message = 'This is a reminder to pay your rent for the current month.';

        for (const tenant of tenants) {
            await sendMessage(tenant.phone_number, message);
        }

        console.log('Rent reminders sent successfully');
    } catch (error) {
        console.error('Error sending rent reminders:', error);
    }
};

// Function to send reminders to tenants who haven't paid for the current period
const sendUnpaidReminders = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });

        // Get the current period
        const period = await db('periods').where({ month: currentMonth, year: currentYear }).first();

        if (!period) {
            console.error('No period found for the current month.');
            return;
        }

        // Get tenants who have not paid for the current period
        const unpaidTenants = await db('tenants')
            .join('invoices', 'tenants.tenantID', 'invoices.tenantID')
            .where({
                'invoices.periodID': period.periodID,
                'invoices.status': 'unpaid',
                'tenants.status': 1,
            });

        const message = `You have an outstanding rent payment for ${currentMonth}. Please pay as soon as possible.`;

        for (const tenant of unpaidTenants) {
            await sendMessage(tenant.phone_number, message);
        }

        console.log('Unpaid reminders sent successfully');
    } catch (error) {
        console.error('Error sending unpaid reminders:', error);
    }
};

// Cron job to run every day from the 1st to the 5th of each month
cron.schedule('0 9 1-5 * *', sendRentReminders); // Runs at 9 AM daily from 1st to 5th

// Cron job to run every day from the 6th to the 30th of each month
cron.schedule('0 9 6-30 * *', sendUnpaidReminders); // Runs at 9 AM daily from 6th to 30th
