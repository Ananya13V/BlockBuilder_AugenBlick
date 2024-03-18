// Fetch data for the pie chart and bar graph from the backend
// Assume fetchData() is a function that fetches data from the backend API
function fetchData() {
  // Fetch data for pie chart
  // Fetch data for bar graph
}

// Render the pie chart using the fetched data
function renderPieChart(data) {
  // Render pie chart using data
}

// Render the bar graph using the fetched data
function renderBarGraph(data) {
  // Render bar graph using data
}

// Display the uploaded image
function displayImage(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const imgElement = document.createElement("img");
    imgElement.src = event.target.result;
    imgElement.style.maxWidth = "100%";
    document.getElementById("imagePreview").innerHTML = ""; // Clear previous image, if any
    document.getElementById("imagePreview").appendChild(imgElement);
  };

  reader.readAsDataURL(file);
}

// Handle image upload and analysis
document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      // Send the image file to the backend for analysis
      // Assume analyzeImage() is a function that sends the image to the backend API for analysis
      analyzeImage(file);
    }
  });


// Handle image upload and display
document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      displayImage(file);
    }
  });

// Handle image analysis
// document.getElementById("analyzeButton").addEventListener("click", function () {
//   const file = document.getElementById("imageUpload").files[0];
//   if (file) {
//     // Send the image file to the backend for analysis
//     // Assume analyzeImage() is a function that sends the image to the backend API for analysis
//     analyzeImage(file);
//   } else {
//     alert("Please select an image to analyze.");
//   }
// });

// Function to send the image file to the backend for analysis
// Function to send the image file to the backend for analysis
function analyzeImage(file) {
    // Create FormData object to send file data
    const formData = new FormData();
    formData.append('file', file);

    // Send POST request to the backend
    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if data contains an error
        if (data.error) {
          alert(data.error); // Display error message
        } else {
          // If no error, render the result
          renderResult(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again."); // Display generic error message
      });
}

// Render the result received from the backend
function renderResult(data) {
  // Update the DOM elements to display the result
  document.getElementById("result").innerHTML = `
    <h2>Result:</h2>
    <p>Predicted Class: ${data.predicted_value}</p>
    <p>Details: ${data.details}</p>
    <p>Videos:</p>
    <div>
      <iframe width="420" height="315" src="${data.video1}"></iframe>
      <iframe width="420" height="315" src="${data.video2}"></iframe>
    </div>
  `;
}



// Initialize the page
function init() {
  fetchData();
}

init();
