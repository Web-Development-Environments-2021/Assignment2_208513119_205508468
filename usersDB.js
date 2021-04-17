const users = [
    {
        username: "k",
        password: "k",
        fullName: "",
        email: "",
        birthDate: ""
    },
    {
        username: "roy",
        password: "roy123",
        fullName: "",
        email: "",
        birthDate: ""
    },
    {
        username: "dana",
        password: "dana123",
        fullName: "",
        email: "",
        birthDate: ""
    }
];

function isUserExist(userName) {
    return users.some((elem) => elem.username === userName);
}


function isUserValid(username, pswrd){
    return users.some((elem) => elem.username === username && elem.password === pswrd);
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
