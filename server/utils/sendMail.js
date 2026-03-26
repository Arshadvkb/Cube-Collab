import transporter from "../config/nodemailer.js";

const sendMail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error in sending email: " + error.message);
    }
}

export default sendMail