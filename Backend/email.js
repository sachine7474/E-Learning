// Placeholder for email service
exports.sendEmail = async (options) => {
    console.log(Email sent to ${options.email}: ${options.message});
    return { success: true };
};