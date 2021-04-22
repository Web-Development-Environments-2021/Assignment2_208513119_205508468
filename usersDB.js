const users = [
    {
        user_name: "k",
        password: "k",
        full_name: "",
        email: "",
        birth_date: ""
    },
    {
        username: "roy",
        password: "roy123",
        full_name: "",
        email: "",
        birth_date: ""
    },
    {
        username: "dana",
        password: "dana123",
        full_name: "",
        email: "",
        birth_date: ""
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

function checkValidPassword(/*psw*/){
  //dana
	// var letterNumber = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
	// if(psw.match(letterNumber)) 
	//  {
	//   return true;
	//  }
	// alert("password not valid - should include at least 6 characters: letters & numbers only"); 
	// return false; 

  //roy
  // define regex 
  const upperCase = new RegExp('[A-Z]');
  const lowerCase = new RegExp('[a-z]');
  const numbers = new RegExp('[0-9]');

  let pswd = $('#pswReg').val();
  return pswd.length >= 6 &&
   pswd.match(upperCase) &&
    pswd.match(lowerCase) &&
     pswd.match(numbers);
}

function checkValidFullName(){
  return !/\d/.test($('#nameReg').val());
}

function checkValidMail(){
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let email = String($('#emailReg').val()).toLowerCase();
  return re.test(email);
}

function checkRegFieldsNotEmpty() {
  let fieldNotEmpty = true;
  $('#registerForm input').each(function(){
    if($.trim($(this).val()).length == 0){
      fieldNotEmpty = false;
    }
  });
  return fieldNotEmpty;
}

function addUserToDB(userName, psw, fullName, eMail, birthDate) {
  users.push({
    user_name: userName,
    password: psw,
    full_name: fullName,
    email: eMail,
    birth_date: birthDate
  });
}


function registerUser() {
  // get values from html
  let userName = document.getElementById('usernameReg').value;
  let psw = document.getElementById('pswReg').value;
  let fullName = document.getElementById('nameReg').value;
  let eMail = document.getElementById('emailReg').value;
  let birthDate = document.getElementById('dateofbirthReg').value;

  if(!checkRegFieldsNotEmpty()){
    alert('Some fields are empty!')
    return false;
  }

  if(!checkValidPassword()){
    alert("Password is not valid!\nPlease Enter at least 6 characters including 1 UpperCase letter, 1 lowerCase and 1 number!")
    return false;
  }

  if(!checkValidFullName()){
    alert("Full Name is not valid - Should not include numbers");
    return false;
  }

  if(!checkValidMail()) {
    alert("Email is not valid!")
    return false;
  }

  let existUserName = isUserExist(userName);
  if(existUserName) {
    if (confirm('UserName already exist ! Do you want to login ? ')) {
      // login
      showLogin();
    } else {
      // don't start game!
      showWelcome();
    }
    return;
  }

  addUserToDB(userName, psw, fullName, eMail, birthDate);
  
  if (confirm('Registration Succeed ! Lets Play ?')) {
    // start game
    showGame();
  } else {
    // don't start game!
    showWelcome();
  }
}