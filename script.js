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
    const emailInput = document.getElementById("username").value;
    const passInput = document.getElementById("password").value;
    const isValid = users.some(user => user.email === emailInput && user.password === passInput);

    if(isValid) {
        window.location.href = 'dashboard.html'
    }

   
}   
