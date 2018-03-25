function validate_email(email) 
{
	// Define a pattern for email
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


function email_validated()
{
    if( validate_email(document.getElementById('user_email').value) )
    {
        document.getElementById("error_email").innerHTML = "Email valid.";
        return true;
    }
    else
    {
    	document.getElementById("error_email").innerHTML = "Email not valid. Please re-enter your email.";
    	return false;
    }
}

function validate_phone(phone_number)
{
	// Define a pattern for phone number
	// var re = /^\d{10}$/;
	// return re.test(phone_number);

	return phone_number.value.match(/\d/g).length === 10 || phone_number.value.match(/\d/g).length === 11;
}

function phone_validated()
{
	if ( validate_phone(document.getElementById("user_phone")) )
	{
		document.getElementById("error_phone").innerHTML = "Phone number valid.";
		return true;
	}
	else
	{
		document.getElementById("error_phone").innerHTML = "Phone number invalid. Please re-enter your phone number.";
		return false;
	}

}
