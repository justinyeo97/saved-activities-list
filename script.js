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
  } catch (error) {
    console.error('Error fetching activity:', error);
  }
}

document.getElementById('getAct').addEventListener('click', getAct);

function userLogin() {
    console.log('Login Started')
    const emailInput = document.getElementById("username").value;
    const passInput = document.getElementById("password").value;
    const isValid = users.some(user => user.email === emailInput && user.password === passInput);

    if(isValid) {
        window.location.href = 'dashboard.html';
    } else {
        alert(`Invalid email or password!`)
    }  
}   



document.getElementById('loginButton').addEventListener('click', userLogin);



