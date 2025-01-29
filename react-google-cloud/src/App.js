import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const App = () => {
  const webcamRef = useRef(null); // Reference to the webcam
  const [image, setImage] = useState(null); // Captured image
  const [handwrittenText, setHandwrittenText] = useState(""); // Extracted text
  const [loading, setLoading] = useState(false); // Loading state

  // Function to capture the image
  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot(); // Capture image as Base64
    setImage(capturedImage);
  };

  // Function to process the captured image
  const processImage = async () => {
    if (!image) {
      alert("Please capture an image first!");
      return;
    }

    setLoading(true);

    // Remove Base64 headers from the image
    const base64Image = image.split(",")[1];

    const visionAPIKey = "AIzaSyBXN8BZhwNEV-cDD-SoG-_5MsrEGC-uacE"; // Replace with your API Key

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${visionAPIKey}`,
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION", // For handwritten text
                },
              ],
            },
          ],
        }
      );

      // Extract text from the Vision API response
      const detectedText =
        response.data.responses[0].fullTextAnnotation?.text || "No text detected.";
      setHandwrittenText(detectedText);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process the image. Check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", display:'flex', flexDirection:'row', gap:'60px',     margin: "auto",
      justifyContent: 'center', background:'rgb(237, 230, 226)' }}>
     
      <div style={{display:'flex', flexDirection:'column'}}>

  
      {/* Webcam View */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        style={{ border: "1px solid black", marginBottom: "10px" }}
      />

      <div>
        {/* Button to Capture Image */}
        <button onClick={captureImage} style={{ marginRight: "10px" }}>
          Capture Image
        </button>

        {/* Button to Process Image */}
        <button onClick={processImage} disabled={loading} sx={{background:'rgb(98, 91, 44'}}>
          {loading ? "Processing..." : "Extract Handwritten Text"}
        </button>
      </div>

      {/* Display Captured Image */}
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img
            src={image}
            alt="Captured"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}
</div>
      {/* Display Extracted Text */}
      {handwrittenText && (
        <div>
          <h3>Extracted Text:</h3>
          <textarea
            value={handwrittenText}
            rows="10"
            cols="50"
            readOnly
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
// INR 2.993943749
// /count