function validateForm() {
  // Get form inputs
  var name = document.getElementById("name");
  var employeeid = document.getElementById("employeeid");
  var gender = document.getElementById("gender");
  var dob = document.getElementById("dob");
  var designation = document.getElementById("designation");
  var department = document.getElementById("department");
  var appointmentdate = document.getElementById("appointmentdate");
  var password = document.getElementById("password");

  // Reset error messages and field colors
  var errorMessages = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
  name.style.borderColor = "";
  employeeid.style.borderColor = "";
  gender.style.borderColor = "";
  dob.style.borderColor = "";
  designation.style.borderColor = "";
  department.style.borderColor = "";
  appointmentdate.style.borderColor = "";
  password.style.borderColor = "";

  // Check if required fields are empty
  var isValid = true;
  if (name.value === "") {
    name.style.borderColor = "red";
    document.getElementById("name-error").textContent =
      "Please enter your full name.";
    isValid = false;
  } else if (name.value.length < 2 || name.value.length > 40) {
    name.style.borderColor = "red";
    document.getElementById("name-error").textContent =
      "Name must be between 2 and 40 characters.";
    isValid = false;
  } else {
    // Validate name format using a regular expression
    var namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name.value)) {
      name.style.borderColor = "red";
      document.getElementById("name-error").textContent =
        "Invalid name format. Please use only letters and spaces.";
      isValid = false;
    }
  }

  if (employeeid.value === "") {
    employeeid.style.borderColor = "red";
    document.getElementById("employeeid-error").textContent =
      "Please enter your employee id.";
    isValid = false;
  }

  if (gender.value === "") {
    gender.style.borderColor = "red";
    document.getElementById("gender-error").textContent =
      "Please select your gender.";
    isValid = false;
  }

  if (dob.value === "") {
    dob.style.borderColor = "red";
    document.getElementById("dob-error").textContent = "Please select your date of birth.";
    isValid = false;
  }

  if (designation.value === "") {
    designation.style.borderColor = "red";
    document.getElementById("designation-error").textContent =
      "Please enter your designation.";
    isValid = false;
  }

  if (department.value === "") {
    department.style.borderColor = "red";
    document.getElementById("department-error").textContent =
      "Please enter your department.";
    isValid = false;
  }

  if (appointmentdate.value === "") {
    appointmentdate.style.borderColor = "red";
    document.getElementById("appointmentdate-error").textContent =
      "Please select your appointment date.";
    isValid = false;
  }

  if (password.value === "") {
    password.style.borderColor = "red";
    document.getElementById("password-error").textContent =
      "Please enter your password.";
    isValid = false;
  } else if (password.value.length < 8) {
    password.style.borderColor = "red";
    document.getElementById("password-error").textContent =
      "Password must be at least 8 characters long.";
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    password.style.borderColor = "red";
    document.getElementById("password-error").textContent =
      "Password must contain at least one special character.";
    isValid = false;
  } else if (!/[A-Z]/.test(password.value)) {
    password.style.borderColor = "red";
    document.getElementById("password-error").textContent =
      "Password must contain at least one uppercase letter.";
    isValid = false;
  }

  // Remove error messages after 3 seconds
  if (!isValid) {
    setTimeout(function () {
      for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
      }

      name.style.borderColor = "";
      employeeid.style.borderColor = "";
      gender.style.borderColor = "";
      dob.style.borderColor = "";
      designation.style.borderColor = "";
      department.style.borderColor = "";
      appointmentdate.style.borderColor = "";
      password.style.borderColor = "";
    }, 5000);
  }

  return isValid;
}
