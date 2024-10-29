async function uploadPhoto() {
    const fileInput = document.getElementById("photo");
  
    if (fileInput.files.length === 0) {
      alert("Please select a photo!");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const photoBase64 = reader.result.split(",")[1]; // Base64 encoded image
  
      try {
        const response = await fetch("/.netlify/functions/sendPhoto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo: photoBase64 }),
        });
  
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        alert("Failed to send photo. Try again later.");
      }
    };
  
    reader.readAsDataURL(fileInput.files[0]);
  }
  