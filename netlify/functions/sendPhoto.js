const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the incoming form data
    const formData = JSON.parse(event.body);
    // const { photo } = formData;
    const { photos } = formData;

    // if (!photo) {
    //   return { statusCode: 400, body: "No photo uploaded" };
    // }
    if (!photos || photos.length === 0) {
        return { statusCode: 400, body: "No photos uploaded" };
    }

    // Create the email with the photo attachment
    const emailContent = {
      to: "sean.d.onamade@vanderbilt.edu",  // Replace with your email
      from: "seanonamade1@gmail.com",  // Replace with a verified sender
      subject: "New Photo Upload",
      text: "Here are your photos.",
    //   attachments: [
    //     {
    //       content: photo,
    //       filename: "uploaded_photo.jpg",
    //       type: "image/jpeg",
    //       disposition: "attachment",
    //     },
    //   ],
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
