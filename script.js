class User {
    constructor(username,password) {
        this.username = username;
        this.password = password;
    }
}
const users = []
const admin = new User('admin','1234');
users.push(admin);
console.log(users)
// Check if the user is logged in and show/hide the login form and dashboard accordingly
let loggedIn = false;
document.getElementById("dashboard").style.display = "none";


function userLogin(event) {
    event.preventDefault();
    console.log('Login Started')
    const usernameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value.trim();
    let title = document.getElementById("title");
    const isValid = users.some(user => user.username === usernameInput && user.password === passInput);

    if(isValid) {
        alert(`Welcome back, ${usernameInput}!`);
        loggedIn = true;
    } else {
        alert(`Invalid username or password!`)
    };
    // Show or hide the login form and dashboard based on the login status
    if (loggedIn === true) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    // Update the title and show the logout button
    title.textContent = "Dashboard - Watudu";
    document.getElementById("logoutButton").classList.remove("d-none");
}   else {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}
}
// Add event listeners for login and get activity buttons
const loginBtn = document.getElementById("loginButton");
if (loginBtn) {
  loginBtn.addEventListener('click', userLogin);
}

const getActBtn = document.getElementById('getAct');
if (getActBtn) {
  getActBtn.addEventListener('click', getAct);
}
// Add event listener for logout button
const logoutBtn = document.getElementById('logoutButton');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Reset login status and show the login form
    loggedIn = false;
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("logoutButton").classList.add("d-none");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("title").textContent = "Login - Watudu";
  });
}


// Saved activities array
const savedActivities = [];
// Function to update the saved activities list in the DOM
function updateSavedList() {
  const savedList = document.getElementById('savedList');
  savedList.innerHTML = '';

  savedActivities.forEach((activity, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.textContent = activity;
//added delete button to each saved activity
    const deleteBtn = document.createElement('button');
    deleteBtn.style.padding = '2px 4px';
    deleteBtn.style.fontSize = '0.7rem';
    deleteBtn.style.lineHeight = '1';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', () => {
      savedActivities.splice(index, 1);
      updateSavedList();
    });

    li.appendChild(deleteBtn);
    savedList.appendChild(li);
  });
}
// Function to fetch a random activity from the API
async function getAct() {
    console.log('Get Activity Started')
  try {
    const response = await fetch('https://random-activity-sigmo.vercel.app/api/random');
    const data = await response.json();
    console.log(data);
    const activityCard = document.getElementById("activity");
    activityCard.classList.remove("d-none");
    // Display the activity details in the card + capitalize the first letter of each word in the activity
    document.getElementById('activity').innerHTML = `
      <h2 class="card-header bg-primary text-white text-start text-capitalize">${data.activity}</h2>
      <div class="card-info text-capitalize text-start" style="padding: 10px;">
      <div class="list-group-item d-flex flex-row align-items-center">
        <img src="https://img.icons8.com/?size=100&id=OgA6xS298O9C&format=png&color=000000" alt="Activity Icon" style="width: 20px; height: 20px; margin-right: 5px;">
        <p style="margin-left: 10px;"><strong>Type:</strong> ${data.type}</p>
      </div>
      <div class="list-group-item d-flex flex-row align-items-center">
        <img src="https://img.icons8.com/?size=100&id=3FGIOtDCfIJI&format=png&color=000000" alt="Participants Icon" style="width: 20px; height: 20px; margin-right: 5px;">
        <p style="margin-left: 10px;"><strong>Participants:</strong> ${data.participants}</p>
      </div>
      <div class="list-group-item d-flex flex-row align-items-center">
        <img src="https://img.icons8.com/?size=100&id=54uPqIDkFzRx&format=png&color=000000" alt="Price Icon" style="width: 20px; height: 20px; margin-right: 5px;">
        <p style="margin-left: 10px;"><strong>Price:</strong> ${data.price}</p>
      </div>
      <div class="list-group-item d-flex flex-row align-items-center">
        <img src="https://img.icons8.com/?size=100&id=EH6XRlqQIHVg&format=png&color=000000" alt="Accessibility Icon" style="width: 20px; height: 20px; margin-right: 5px;">
        <p style="margin-left: 10px;"><strong>Accessibility:</strong> ${data.accessibility}</p>
      </div>
      </div>

      <button id="saveAct" type="button" class="btn btn-success">Save Activity</button>
      
    `;
// Add event listener for saving activity
const saveActBtn = document.getElementById('saveAct');
    saveActBtn.addEventListener('click', () => {
      // Prevent duplicates
      if (!savedActivities.includes(data.activity)) {
        savedActivities.push(data.activity);
        updateSavedList();
      } else {
        alert('Activity already saved!');
      }
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    alert('Failed to fetch activity. Please try again later.');
  }

}











