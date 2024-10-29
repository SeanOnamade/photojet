const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the incoming form data
    const formData = JSON.parse(event.body);
    const { photo } = formData;

    if (!photo) {
      return { statusCode: 400, body: "No photo uploaded" };
    }

    // Create the email with the photo attachment
    const emailContent = {
      to: "your-email@example.com",  // Replace with your email
      from: "your-email@example.com",  // Replace with a verified sender
      subject: "New Photo Upload",
      text: "Here’s the photo you just uploaded.",
      attachments: [
        {
          content: photo,
          filename: "uploaded_photo.jpg",
          type: "image/jpeg",
          disposition: "attachment",
        },
      ],
    };

    await sendgrid.send(emailContent);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Photo sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending photo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send photo" }),
    };
  }
};