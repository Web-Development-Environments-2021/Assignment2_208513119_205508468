const users = [
    {
        username: "k",
        password: "k",
        fullName: "",
        email: "",
        birthDate:""
    },
    {
        username: "roy",
        password: "roy123",
        fullName: "",
        email: "",
        birthDate:""
    },
    {
        username: "dana",
        password: "dana123",
        fullName: "",
        email: "",
        birthDate:""
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

function checkValidPassword(psw){
	// if(psw.length < 6){
	// 	alert("password not valid - should include at least 6 characters: letters & numbers only"); 
	// 	return false; 
	// }
	var letterNumber = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
	if(psw.match(letterNumber)) 
	 {
	  return true;
	 }
	alert("password not valid - should include at least 6 characters: letters & numbers only"); 
	return false; 
	 
}

function checkValidFullName(fullname){
	let ans = /\d/.test(fullname);
	if (ans===true){
		alert("Full Name not valid - should not include numbers"); 
		return false; 
	}
	return true;
}

function checkValidMail(email){
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let ans = re.test(String(email).toLowerCase());
	if (ans === false){
		alert("Mail not Valid - try Again"); 
		return false; 
	}
	return true;
}