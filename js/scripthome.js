console.log("Welcome to myTunes");

// Toggle profile dropdown visibility
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// document.getElementById("greeting").textContent = "Hi, Rahul";

// Function to check if the user is logged in
function checkLoginStatus() {
  // Fetch the login status and username from the server
  fetch("/check-login")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.loggedIn) {
        // Hide the login and signup buttons
        document.getElementById("signupBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";

        // Show the profile dropdown with user's name
        document.getElementById("profileDropdown").style.display = "block";
        document.getElementById("greeting").textContent = "Hi, " + data.username;
      } else {
        // Show login and signup buttons, hide the profile dropdown
        document.getElementById("signupBtn").style.display = "inline-block";
        document.getElementById("loginBtn").style.display = "inline-block";
        document.getElementById("profileDropdown").style.display = "none";
      }
    })
    .catch((error) => console.log("Error checking login status:", error));
}

// Call the function to check login status when the page loads
window.onload = checkLoginStatus;
