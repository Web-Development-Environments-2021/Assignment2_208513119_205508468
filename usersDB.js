const users = [
    {
        username: "k",
        password: "k"
    },
    {
        username: "roy",
        password: "roy123"
    },
    {
        username: "dana",
        password: "dana123"
    }
];

function isUserValid(username, pswrd){
    // use some
    for (let i = 0; i < users.length; i++) {
        if(users[i].username === username && users[i].password === pswrd){
            return true;
        }
    }
    return false;
}

function signIn() {
    // get input from user
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    // validate details
    
    // check if in DB
    if(isUserValid(username,password)){
        showGame();
    }
    else {
        alert("Username or Password is not correct!\nPlease Try Again!")
    }
}
