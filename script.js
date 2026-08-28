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
    const emailInput = document.getElementById("username").value;
    const passInput = document.getElementById("password").value;
    const isValid = users.some(user => user.email === emailInput && user.password === passInput);

    if(isValid) {
        window.location.href = 'dashboard.html';
    } else {
        alert(`Invalid email or password!`)
    }  
}   

async function getAct() {
    console.log('Get Activity Started')
  try {
    const response = await fetch('https://random-activity-sigmo.vercel.app/api/random');
    const data = await response.json();
    console.log(data);
    document.getElementById('activity').innerHTML = `
      <h2>Activity: ${data.activity}</h2>
      <p>Type: ${data.type}</p>
      <p>Participants: ${data.participants}</p>
      <p>Price: ${data.price}</p>
      <p>Link: ${data.link}</p>
      <p>Key: ${data.key}</p>
      <p>Accessibility: ${data.accessibility}</p>
      <p>Kid Friendly: ${data.kid_friendly}</p>
    `;
  } catch (error) {
    console.error('Error fetching activity:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginButton').addEventListener('click', userLogin);
  document.getElementById('getAct').addEventListener('click', getAct);
});

