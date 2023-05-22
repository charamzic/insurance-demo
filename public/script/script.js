const logout = document.querySelector('.logout');

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("open");
}

let formSubmitted = false;

function toggleInsuranceEdit() {
    const editButton = document.getElementById("editButton");
    const cancelButton = document.getElementById("cancelButton");
    const submitButton = document.getElementById("submitButton");
    const insuranceForm = document.getElementById("insuranceForm");

    if (editButton.innerHTML === "Upravit") {
        enableInsuranceInputs();
        editButton.style.display = "none";
        submitButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    } else {
        editButton.style.display = "inline-block";
        submitButton.style.display = "none";
        cancelButton.style.display = "none";
        disableInsuranceInputs();
        insuranceForm.reset();
    }
}

function toggleInsuredEdit() {
    const editButton = document.getElementById("editButton");
    const cancelButton = document.getElementById("cancelButton");
    const submitButton = document.getElementById("submitButton");
    const insuranceForm = document.getElementById("insuranceForm");

    if (editButton.innerHTML === "Upravit") {
        enableInsuredInputs();
        editButton.style.display = "none";
        submitButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    } else {
        editButton.style.display = "inline-block";
        submitButton.style.display = "none";
        cancelButton.style.display = "none";
        disableInsuredInputs();
        insuranceForm.reset();
    }
}

function cancelInsuranceEdit() {
    const editButton = document.getElementById("editButton");
    const submitButton = document.getElementById("submitButton");
    const cancelButton = document.getElementById("cancelButton");
    const inputs = document.querySelectorAll("input[type='text']");
    const datePickers = document.querySelectorAll("input[type='date']");
    const detailsTextarea = document.getElementById("details");


    editButton.style.display = "inline-block";
    submitButton.style.display = "none";
    cancelButton.style.display = "none";
    disableInsuranceInputs();

    inputs.forEach((input) => {
        input.value = input.getAttribute("data-original-value");
    });

    datePickers.forEach((datePicker) => {
        datePicker.value = datePicker.getAttribute("data-original-value");
    });

    detailsTextarea.value = detailsTextarea.getAttribute("data-original-value");

    formSubmitted = false;
}

function cancelInsuredEdit() {
    const editButton = document.getElementById("editButton");
    const submitButton = document.getElementById("submitButton");
    const cancelButton = document.getElementById("cancelButton");
    const inputs = document.querySelectorAll("input[type='text']");
    const datePickers = document.querySelectorAll("input[type='email']");
    const selectType = document.getElementById("type");

    editButton.style.display = "inline-block";
    submitButton.style.display = "none";
    cancelButton.style.display = "none";
    disableInsuredInputs();

    inputs.forEach((input) => {
        input.value = input.getAttribute("data-original-value");
    });

    datePickers.forEach((datePicker) => {
        datePicker.value = datePicker.getAttribute("data-original-value");
    });


    const originalSelectedValue = selectType.getAttribute("data-original-value");
    Array.from(selectType.options).forEach((option) => {
        option.selected = option.value === originalSelectedValue;
    });

    formSubmitted = false;
}

function enableInsuranceInputs() {
    document.getElementById("starts").disabled = false;
    document.getElementById("ends").disabled = false;
    document.getElementById("amount").disabled = false;
    document.getElementById("details").disabled = false;
    formSubmitted = false;
}

function disableInsuranceInputs() {
    document.getElementById("starts").disabled = true;
    document.getElementById("ends").disabled = true;
    document.getElementById("amount").disabled = true;
    document.getElementById("details").disabled = true;
    formSubmitted = false;
}

function enableInsuredInputs() {
    document.getElementById("name").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("type").disabled = false;
    formSubmitted = false;
}

function disableInsuredInputs() {
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("type").disabled = true;
    formSubmitted = false;
}

function submitForm() {
    const form = document.getElementById('insurance-form');
    form.submit();
}

function removeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('fade-out');
        setTimeout(function () {
            successMessage.remove();
        }, 5000);
    }
}

window.addEventListener('load', removeSuccessMessage);

function deleteInsurance(event) {
    const trash = event.currentTarget;
    const endpoint = `/insurances/${trash.dataset.del}`;

    fetch(endpoint, {
        method: 'DELETE'
    }).then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch(err => console.error(err));
}

function deleteInsured(event) {
    const trash = event.currentTarget;
    const endpoint = `/insureds/${trash.dataset.del}`;

    fetch(endpoint, {
        method: 'DELETE'
    }).then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch(err => console.error(err));
}

const login = async name => {

    const profilePic = document.querySelector('.profile-picture');
    const profileNameText = document.querySelector('.user-name');

    fetch(`/login/${name}`)
        .then(async response => {
            // Handle the response
            profilePic.setAttribute('src', `../../image/${name.toLowerCase()}.png`);
            profileNameText.textContent = 'Logout';
            const data = await response.json();
        })
        .catch(error => {
            // Handle the error
            console.error(error);
        });
};
