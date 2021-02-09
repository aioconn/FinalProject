/**************************************
 TITLE: finalRelease.js
 AUTHOR: Aiden O'Connor	(AO)
 CREATE DATE: December 12, 2019
 PURPOSE: Have everything jquery and js related to perform a final release
 LAST MODIFIED ON: 12/12/2019
 LAST MODIFIED BY: Aiden O'Connor (AO)
 MODIFICATION HISTORY:
 11/30/2019: Original Build (AO)
 12/04/2019: simple form validation added to pullingThrough code (AO)
 12/09/2019: custom form validation added to simpleValidation code (AO)
 12/12/2019: Final release
 2/4/2021: Revamping this page, changing Jquery styling, adding pictures.
 ***************************************/


$(document).ready(function(){

    let temp = document.getElementById('photo');
    window.addEventListener('scroll', function(){
        temp.style.backgroundSize = 140 - window.pageYOffset/25 + '%';
        temp.style.opacity = 100 - window.pageYOffset/20 + '%';
    });

    //additional jQuery validation functions for phone number
    /*****
     NAME: Add validator method
     Purpose: Adds a validator method for a US phone number
     Parameters: phone number, element
     Return: A message if the phone number is not validated
     *****/
    jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, '');
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, 'Please enter a valid phone number.');


    //additional jQuery validation functions for slider
    /*****
     NAME: add validator method
     Purpose: Adds a validator method for the range slider
     Parameters: value, element
     Return: a message to tell the user to use the slider
     *****/
    jQuery.validator.addMethod("specific", function(value, element)
    {
        return this.optional(element) || /^[$][0-9\-\s]+/i.test(value);
    }, "Use the slider");


    //Validation Part
    $("#scheduleForm").validate({
        rules: {
            firstName2: "required",
            lastName2: "required",
            time: "required",
            emailAddress2: {
                required: true,
                email: true
            },
            phoneNumber2: {
                required: true,
                phoneUS: true
            },
            schedule2:{
                required: true,
                date: true
            },
            slider:{
                required: true,
                specific: true,
            },
            password: {
                required: true,
            },

        },
        messages:{
            firstName2: "Please enter your first name",
            lastName2: "Please enter your last name",
            password: "Please enter your password",
            schedule2: "Please select a day, you might need to select it twice",
            time:"Please select your preferred time",
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },

        //submit handler
        /*****
         NAME: submit handler
         Purpose: Checks validation part and submits the user input
         Parameters: form
         Return: the user input
         *****/
        submitHandler:function(form){
            getInput();
            form.submitHandler();
        }
    });

    //jquery ui part
    $("input[type='radio']").checkboxradio();
    $("input[type='checkbox']").checkboxradio();
    $("#focus").click(function(){
        $("#firstName2").focus();
    });
    $("#formSubmit").button();
    $("#eventReset").button();
    $("#tabs").tabs();
    $('#schedule').datepicker();
    $('#schedule2').datepicker();
    $("#classSubmit").button();
    $("#reset").button();
    $("#camera").autocomplete({
        source: ["canon", "nikon", "sony", "olympus", "fujifilm", "pentax", "leica"]
    });
    $('#time').autocomplete({
        source: ["day", "night", "morning", "dawn", "dusk", "evening", "none", "golden hours", "no preference"]
    });

    //Price Range slider
    $('#sliderRange').slider({
        range: true,
        min: 0,
        max: 10000,
        values: [ 75, 1000 ],
        slide: function( event, ui ) {
            $( "#slider" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( '#slider' ).val( "$" + $( '#sliderRange' ).slider( "values", 0 ) +
        " - $" + $( "#sliderRange" ).slider( "values", 1 ) );

    //spinner in class tab
    $("#experience").spinner();

    var strMessage = "Thank you for registering for this class! See you Soon!";

    //css jquery
    $("#otherEvent").css("background-color","whitesmoke").css("border","2px solid black");





    //function that gets input elements
    /*****
     NAME: getInput
     Purpose: gets the user's input into variables and scrapes them on to the text area
     Parameters: none
     Return: input data
     *****/
    function getInput() {

        var firstName = String($("#firstName2").val());
        var lastName = String($("#lastName2").val());
        var telephone = String($("#phoneNumber2").val());
        var email = String($("#emailAddress2").val());
        var pass = String($("#password").val());
        var date = String($("#schedule2").val());
        var time = String($("#time").val());
        var photo = document.getElementsByName('radiobutton');
        //for loop that gets the correct value of the radio button that is selected
        for (var i = 0, length = photo.length; i < length; i++) {
            if (photo[i].checked) {
                var photographers = (photo[i].value);
                break;
            }
        }
        //checkbox event
        var event = [];
        $('#checkboxes input:checked').each(function() {
            event += $(this).val() + " ";
        });

        var otherEvent = String($("#otherEvent").val());
        var priceRange = String($("#slider").val());

        //Strings for the user's input
        var line1 = String("Your name is " + firstName + " " + lastName + ".");
        var nameString = String(line1);
        var line2 = String("Your phone number is " + telephone + ".");
        var telString = String(line2);
        var line3 = String("Your email is " + email + ".");
        var emailString = String(line3);
        var line4 = String("Your password is " + pass + ".");
        var passString = String(line4);
        var line5 = String("The date you picked is " + date + ".");
        var dateString = String(line5);
        var line6 = String("Your preferred time is " + time + ".");
        var timeString = String(line6);
        var line7 = String("The number of photographers you picked is " + photographers + ".");
        var photographersString = String(line7);
        var line8 = String("The event you picked is " + event);
        var eventString = String(line8);
        var line9 = String("Other event message box: " + otherEvent);
        var otherEventString = String(line9);
        var line10 = String("Your price range is: " + priceRange + ".");
        var rangeString = String(line10);

        //outputting every string to output area
        //Scrapping part
        $("#outputArea2").append(nameString);
        $("#outputArea2").append("<br/>" + telString);
        $("#outputArea2").append("<br/>" + emailString);
        $("#outputArea2").append("<br/>" + passString);
        $("#outputArea2").append("<br/>" + dateString);
        $("#outputArea2").append("<br/>" + timeString);
        $("#outputArea2").append("<br/>" + photographersString);
        $("#outputArea2").append("<br/>" + eventString);
        $("#outputArea2").append("<br/>" + otherEventString);
        $("#outputArea2").append("<br/>" + rangeString);
    }

});