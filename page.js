
$("#submit").click(function( event ) {
    event.preventDefault();
     $( "#form" ).hide();
    let name = $("#fname").val();    
    let lname = $("#lname").val();
    var txt1 = $("<p></p>").text(`Hi ${name} ${lname}`);


    $("#hiden").before(txt1);
    $("#hiden").show();
}); 
