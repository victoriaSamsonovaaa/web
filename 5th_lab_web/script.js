var FormA = [
    { label: 'Name:', elemtype: 'text', name: 'username' },
    { label: 'Email:', elemtype: 'email', name: 'email' },
    { label: 'Password:', elemtype: 'password', name: 'password' },
    { label: 'Gender:', elemtype: 'select', name: 'gender', options: ['Male', 'Female'] },
    { label: 'Date of birth:', elemtype: 'date', name: 'birthdate' },
    { label: 'I agree with the terms of use:', elemtype: 'checkbox', name: 'agreement' },
    { label: '', elemtype: 'button', value: 'Send form' }
];

function createForm(formArray, formName) {
    var form = document.createElement('form');
    form.setAttribute('name', formName);

    formArray.forEach(function (item) {
        var label = document.createElement('label');
        label.textContent = item.label;

        var input;
        if (item.elemtype === 'checkbox') {
            input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
        } 
        else if (item.elemtype === 'button') {
            input = document.createElement('input');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', item.value);
        } 
        else if (item.elemtype === 'select') {
            input = document.createElement('select');
            item.options.forEach(function (optionText) {
                var option = document.createElement('option');
                option.textContent = optionText;
                input.appendChild(option);
            });
        } 
        else {
            input = document.createElement('input');
            input.setAttribute('type', item.elemtype);
            input.setAttribute('name', item.name);
            input.addEventListener('input', function () {
                validateField(input);
            });
        }

        form.appendChild(label);
        form.appendChild(input);
    });

    document.getElementById('formContainer').appendChild(form);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var errors = validateForm(form);

        if (errors.length > 0) {
            displayErrors(errors);
        } 
        else {
            alert('Form is filled correctly!');
            form.reset();
            var errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = '';
        }
    });
}

createForm(FormA, 'registrationForm');

function validateField(input) {
    var errorContainer = input.nextElementSibling;
    if (!errorContainer || errorContainer.className !== 'error') {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error';
        input.parentNode.insertBefore(errorContainer, input.nextSibling);
    }

    var errorMessage = '';
    var inputValue = input.value.trim();

    switch (input.type) {
        case 'text':
            if (inputValue.length === 0) {
                errorMessage = 'Field can not be empty!';
            }
            break;
        case 'email':
            if (!validateEmail(inputValue)) {
                errorMessage = 'Input correct email';
            }
            break;
        case 'password':
            if (inputValue.length < 8) {
                errorMessage = 'Password should contain at least 8 symbols!';
            }
            break;
        case 'date':
            var currentDate = new Date();
            var selectedDate = new Date(inputValue);
            if (selectedDate >= currentDate) {
                errorMessage = 'Input correct date of birth!';
            }
            break;
        case 'checkbox':
            if (input.checked == 0) {
                errorMessage = 'You should agree with terms of using!';
            }
            break;
    }

    errorContainer.textContent = errorMessage;
    input.setCustomValidity(errorMessage);
}

function validateForm(form) {
    var errors = [];
    var inputs = form.querySelectorAll('input:not([type="submit"]), select');

    inputs.forEach(function (input) {
        validateField(input);
        if (input.validity.valid === false) {
            errors.push(input.nextElementSibling.textContent);
        }
    });

    return errors;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function displayErrors(errors) {
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';

    errors.forEach(function (error) {
        var errorMessage = document.createElement('p');
        errorMessage.textContent = error;
        errorMessage.classList.add('error');
        errorContainer.appendChild(errorMessage);
    });
}


   