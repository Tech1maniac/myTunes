console.log("Welcome to myTunes");
async function fetchUserData() {
    try {
      const response = await fetch("/api/user"); // Fetch user data from the server
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const user = await response.json();
  
      // Populate the input fields and profile details with the fetched data
    //   document.getElementById("user-name").textContent = user.name;
      document.getElementById("first-name").value = user.name; // Set input value
      document.getElementById("email").value = user.email; // Set input value
    //   document.getElementById("bio").value = user.bio; // Set textarea value
      document.getElementById("profile-photo").src = user.profilePhoto || "/photos/logo.jpg"; // Set profile photo
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to load profile data. Please try again.");
    }
  }
  
  // Call the function when the page loads
  window.onload = fetchUserData;
  
