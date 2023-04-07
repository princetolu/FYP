// DOM elements
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const invalid = document.getElementById('invalid');
const showPasswordIcon = document.querySelector('.show-password');
const hidePasswordIcon = document.querySelector('.hide-password');


// Show or Hide Password
showPasswordIcon.addEventListener('click', () => {
    showPasswordIcon.style.display = 'none';
    hidePasswordIcon.style.display = 'block';
    password.setAttribute('type', 'text');
});

hidePasswordIcon.addEventListener('click', () => {
    hidePasswordIcon.style.display = 'none';
    showPasswordIcon.style.display = 'block';
    password.setAttribute('type', 'password');
});



//Show input error messages
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
}



//show success colour
function showSucces(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}



//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Email is not invalid');
    }
}




//check password is valid
function checkPassword(input) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Password should be between 6 - 15 Characters and must contain at least 1 Special Character, 1 Uppercase Letter and 1 Lowercase Letter');
    }
}



//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else {
            showSucces(input);
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    }else {
        showSucces(input);
    }
}


//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([name, email, password]);
    checkLength(name,3,50);
    checkLength(password,6,25);
    checkEmail(email);
    checkPassword(password);
});




// Toast
const button = document.getElementById("submit"),
    toaster = document.querySelector(".toaster")
closeIcon = document.querySelector(".close"),
    progress = document.querySelector(".progress");

let timer1, timer2;

button.addEventListener("click", () => {
    toaster.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toaster.classList.remove("active");
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
});

closeIcon.addEventListener("click", () => {
    toaster.classList.remove("active");

    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});