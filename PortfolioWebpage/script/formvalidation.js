function validate() {
    var personName = document.myForm.fullname.value.trim();
    var personEmail = document.myForm.email.value;
    var personNumber = document.myForm.phonenum.value;

    var positionat = personEmail.indexOf("@");  
    var positiondot = personEmail.indexOf(".");
    var letters = personName.match(/^[A-Za-z]+$/);

    if (document.getElementById("nameerror").style.display == "inline-block" && !(personName == null) && !(personName == "") && letters) {
        document.getElementById("nameerror").style.display = "none";
    }

    if (document.getElementById("emailerror").style.display == "inline-block" && !(positionat < 1) && !(positiondot < positionat + 2) && !(positiondot + 2 >= personEmail.length)) {
        document.getElementById("emailerror").style.display = "none";
    }

    if (document.getElementById("numerror").style.display == "inline-block" && !isNaN(personNumber)) {
        document.getElementById("numerror").style.display = "none";
    }



    if (personName == null || personName == "") {
        document.getElementById("nameerror").style.display = "inline-block";
        document.getElementById("nameerror").innerHTML = "Error: Name cannot be left blank!"
        return false;
    } else if (!letters) {
        document.getElementById("nameerror").style.display = "inline-block";
        document.getElementById("nameerror").innerHTML = "Error: Enter alphabetical values only!"
        return false;
    } else if (positionat < 1 || positiondot < positionat + 2 || positiondot + 2 >= personEmail.length){
        document.getElementById("emailerror").style.display = "inline-block";
        document.getElementById("emailerror").innerHTML = "Error: Please enter a valid e-mail address!";  
        return false;  
    } else if (isNaN(personNumber)) {
        document.getElementById("numerror").style.display = "inline-block";
        document.getElementById("numerror").innerHTML = "Error: Enter numeric values only!";  
        return false;
    } else if (personNumber.toString().trim().length != 10) {
        document.getElementById("numerror").style.display = "inline-block";
        document.getElementById("numerror").innerHTML = "Error: Enter 10 digit phone number!";
        return false;
    } else {
        document.getElementById("nameerror").style.display = "none";
        document.getElementById("numerror").style.display = "none";
        return true;
    }
}
