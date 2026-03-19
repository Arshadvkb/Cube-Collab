import transporter from "../config/nodemailer.js";

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error in sending email: " + error.message);
    }
}

export default sendMail