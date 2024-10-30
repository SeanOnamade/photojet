const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the incoming form data
    const formData = JSON.parse(event.body);
    const { photos } = formData;

    if (!photos || photos.length === 0) {
      return { statusCode: 400, body: "No photos uploaded" };
    }

    // Create the email with multiple photo attachments
    const emailContent = {
      to: "sean.d.onamade@vanderbilt.edu",  // Replace with your email
      from: "seanonamade1@gmail.com",  // Replace with a verified sender
      subject: "New Photo Upload",
      text: "Here are the photos you just uploaded.",
      attachments: photos.map((photo, index) => ({
        content: photo,
        filename: `uploaded_photo_${index + 1}.jpg`,
        type: "image/jpeg",
        disposition: "attachment",
      })),
    };

    await sendgrid.send(emailContent);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Photos sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending photos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send photos" }),
    };
  }
};
