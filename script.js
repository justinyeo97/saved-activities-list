class User {
    constructor(email,password) {
        this.email = email;
        this.password = password;
    }
}
const users = []
const admin = new User('yeojiaxing97@mail.com','sigmasigmaboi')
users.push(admin);
console.log(users)

function userLogin() {
    console.log('Login Started')
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;
    const isValid = users.some(user => user.email === emailInput && user.password === passInput);

    if(isValid) {
        window.location.href = 'dashboard.html';
    } else {
        alert(`Invalid email or password!`)
    }  
    
}   

const loginBtn = document.getElementById('loginButton');
if (loginBtn) {
  loginBtn.addEventListener('click', userLogin);
}
// Saved activities array
const savedActivities = [];
// Function to update the saved activities list in the DOM
  function updateSavedList() {
  const savedList = document.getElementById('savedList');
  savedList.innerHTML = ''; // Clear current list
  savedActivities.forEach(activity => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = activity;
    savedList.appendChild(li);
  });
}

async function getAct() {
    console.log('Get Activity Started')
  try {
    const response = await fetch('https://random-activity-sigmo.vercel.app/api/random');
    const data = await response.json();
    console.log(data);
    document.getElementById('activity').innerHTML = `
      <h2 class="card-header">Activity: ${data.activity}</h2>
      <div class="card-body">
        <p>Type: ${data.type}</p>
      </div>
      <div class="card-body">
        <p>Participants: ${data.participants}</p>
      </div>
      <div class="card-body">  
        <p>Price: ${data.price}</p>
      </div>
      <div class="card-body">
        <p>Accessibility: ${data.accessibility}</p>
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
  }

}
const getActBtn = document.getElementById('getAct');
if (getActBtn) {
  getActBtn.addEventListener('click', getAct);
}












