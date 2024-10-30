// Display the selected file name on the custom label
function showFileNames() {
    const fileInput = document.getElementById("photo");
    const fileLabel = document.getElementById("fileLabel");
    // if (fileInput.files.length > 0) {
    //   fileLabel.textContent = fileInput.files[0].name; // Show the selected file name
    // } else {
    //   fileLabel.textContent = "Choose a photo"; // Reset label if no file selected
    // }
    const files = Array.from(fileInput.files).map(file => file.name);
    fileLabel.textContent = files.join(", ");
  }
  
  // Upload the photo with loading indicator and result message
  async function uploadPhoto() {
    const fileInput = document.getElementById("photo");
    const loader = document.getElementById("loader");
    const message = document.getElementById("message");
  
    if (fileInput.files.length === 0) {
      alert("Please select a photo!");
      return;
    }
  
    loader.style.display = "block"; // Show the loading spinner
    message.textContent = ""; // Clear any previous message
  
    // const reader = new FileReader();
    // reader.onloadend = async () => {
    // const photoBase64 = reader.result.split(",")[1]; // Base64 encoded image
    const photos = [];
    for (const file of fileInput.files) {
      const reader = new FileReader();
      const photoBase64 = await new Promise((resolve) => { // awaiting the file's reading
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]); // Base64 encoded image
        };
        reader.readAsDataURL(file);
      });
      photos.push(photoBase64);
    }
  
      try {
        const response = await fetch("/.netlify/functions/sendPhoto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ photo: photoBase64 }),
        body: JSON.stringify({ photos }), // Send array of photos
        });
  
        const result = await response.json();
        message.textContent = result.message;
      } catch (error) {
        message.textContent = "Failed to send photos. Try again later.";
      } finally {
        loader.style.display = "none"; // Hide the loading spinner
      }
    };
  
    // reader.readAsDataURL(fileInput.files[0]);

  