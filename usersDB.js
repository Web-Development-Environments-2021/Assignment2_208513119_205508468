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

function logIn() {
    // get input from user
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // validate details
    if(isUserValid(username,password)){
        showSettings();
        
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

function registerUser() {
    let userName = document.getElementById('usernameReg').value;
    let existUserName = isUserExist(userName);
    let psw = document.getElementById('pswReg').value;
    let fullname = document.getElementById('nameReg').value;
    let mail = document.getElementById('emailReg').value;
    let birthdate = document.getElementById('dateofbirthReg').value;
    let validPassword = checkValidPassword(psw);
    let validFullName = checkValidFullName(fullname);
    let validMail = checkValidMail(mail);
    if (existUserName) {
      if (confirm('UserName already exist ! Do you want to login ? ')) {
        // login
        showLogin();
      } else {
        // don't start game!
        showWelcome();
      }
      return;
    }
    if (validPassword && validFullName && validMail) {
      users.push({
        username: userName,
        password: psw,
        fullName: fullname,
        email: mail,
        birthDate: birthdate,
      });
      if (
        confirm('Registration Succeed ! Do you want to start a game right now ?')
      ) {
        // start game
        showGame();
      } else {
        // don't start game!
        showWelcome();
      }
    }
  }