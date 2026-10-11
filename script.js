const form = document.getElementById("studentForm");
const registerBtn = document.getElementById("registerBtn");
const resetBtn = document.getElementById("resetBtn");

const fields = [
    "firstName", "lastName", "dob", "gender",
    "phone", "email", "address", "password", "course"
];

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

document.getElementById("dob").max = localToday;

function validateForm() {
    const values = {};

    fields.forEach(id => {
        values[id] = document.getElementById(id).value.trim();
    });

    const errors = {
        firstName: values.firstName ? "" : "First name is required.",
        lastName: values.lastName ? "" : "Last name is required.",

        dob: !values.dob
            ? "Date of birth is required."
            : values.dob > localToday
                ? "Date cannot be in the future." : "",

        gender: values.gender ? "" : "Please select gender.",

        phone: /^[6-9]\d{9}$/.test(values.phone)
            ? "" : "Enter a valid 10-digit mobile number.",

        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
            ? "" : "Enter a valid email address.",

        address: values.address ? "" : "Address is required.",

        password: values.password.length >= 6
            ? "" : "Password must be at least 6 characters.",

        course: values.course ? "" : "Please select a course."
    };

    let valid = true;

    fields.forEach(id => {
        document.getElementById(id + "Error").textContent = errors[id];

        if (errors[id]) {
            valid = false;
        }
    });

    registerBtn.disabled = !valid;

    return valid;
}

function clearErrors() {
    fields.forEach(id => {
        document.getElementById(id + "Error").textContent = "";
    });
}

fields.forEach(id => {
    const field = document.getElementById(id);

    field.addEventListener("input", () => {
        document.getElementById("successMessage").style.display = "none";
        validateForm();
    });

    field.addEventListener("change", () => {
        document.getElementById("successMessage").style.display = "none";
        validateForm();
    });
});

// Register student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const student = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        address: document.getElementById("address").value.trim(),
        course: document.getElementById("course").value
    };

    const studentValues = [
        student.firstName + " " + student.lastName,
        student.dob,
        student.gender,
        student.phone,
        student.email,
        student.address,
        student.course
    ];

    const row = document.createElement("tr");

    studentValues.forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    document.getElementById("studentList").appendChild(row);
    document.getElementById("studentTable").hidden = false;
    document.getElementById("emptyMessage").hidden = true;

    const success = document.getElementById("successMessage");
    success.textContent = "Student registered successfully!";
    success.style.display = "block";

    form.reset();
    clearErrors();
    registerBtn.disabled = true;
});

// Reset form
resetBtn.addEventListener("click", function() {
    form.reset();
    clearErrors();

    registerBtn.disabled = true;

    const success = document.getElementById("successMessage");
    success.textContent = "";
    success.style.display = "none";
});