'use strict';
$(document).ready(function () {

    try {
        $('#summernote').summernote();

        $('.js-example-basic').select2();
    } catch (error) {

    }

    $('#dataTable').DataTable({
        dom: 'Bfrtip',
        language: {
            paginate: {
                previous: "<i class='fas fa-angle-left'>",
                next: "<i class='fas fa-angle-right'>"
            }
        },
        buttons: [{
                extend: 'copyHtml5',
                title: new Date().toISOString()
            },
            {
                extend: 'excelHtml5',
                title: new Date().toISOString()
            },
            {
                extend: 'csvHtml5',
                title: new Date().toISOString()
            },
            {
                extend: 'pdfHtml5',
                title: new Date().toISOString()
            },
        ]
    });

    $("#users").select2();
    $("#providers").select2();

    $("#usersSelectAll").click(function () {
        $("#users > option").prop("selected", "selected");
        $("#users").trigger("change");
    });
    $("#usersSelectDeAll").click(function () {
        $("#users > option").prop("selected", '');
        $("#users").trigger("change");

    });

});

function printDiv(divName) {

    Popup($('<div />').append($(divName).clone()).html());

    document.body.innerHTML = originalContents;
}

function Popup(data) {
    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<html><head><title>my div</title>');
    mywindow.document.write('<link type="text/css" href="{{ asset(argon) }}/css/invoice.css" rel="stylesheet" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    setTimeout(() => {
        mywindow.print();

    }, 2000);

}

function copyToClipboard(id) {
    var $body = document.getElementsByTagName('body')[0];
    var secretInfo = document.getElementById(id).innerHTML;
    var $tempInput = document.createElement('INPUT');
    $body.appendChild($tempInput);
    $tempInput.setAttribute('value', secretInfo)
    $tempInput.select();
    document.execCommand('copy');
    $body.removeChild($tempInput);
    alert('tag copy.')
}

function expireChange() {
    $("#expiry_date").toggle();
    $('#max_usage').toggleClass("d-none");
}

function toggleInput(name) {
    var x = document.getElementsByName(name);
    var x = x[0];
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}



$('#country').change(function(){
    var cid = $(this).val();
    console.log("changed detected");
    if(cid){
    $.ajax({
       type:"get",
       url:"http://localhost/linkonz/public/api/user/v1/get-state?country_id="+cid, //Please see the note at the end of the post**
       success:function(res)
       {       
           console.log(res);
            if(res)
            {
                $("#state").empty();
                $("#city").empty();
                $("#state").append('<option>Select State</option>');
                $.each(res,function(key,value){
                    $("#state").append('<option value="'+key+'">'+value+'</option>');
                });
            }
       }

    });
    }
});
$('#state').change(function(){
    var sid = $(this).val();
    if(sid){
    $.ajax({
       type:"get",
       url:"http://localhost/linkonz/public/api/user/v1/get-city?state_id="+sid, //Please see the note at the end of the post**
       success:function(res)
       {       
            if(res)
            {
                $("#city").empty();
                $("#city").append('<option>Select City</option>');
                $.each(res,function(key,value){
                    $("#city").append('<option value="'+key+'">'+value+'</option>');
                });
            }
       }

    });
    }
}); 
