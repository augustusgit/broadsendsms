
let reader = new FileReader();

let url = document.getElementById("priceTXT").innerHTML;


// $('#sendBtn').onclick( function(event){
//     event.preventDefault();
//     validateForm();
// });

$(document).on("submit", "#smsform", function(event){
    event.preventDefault();
    validateForm();
});

$('#senderId').onkeyup = function(){
    if(textLength(this.value)) alert(`text is too long!`);
}

function countChars(obj){
    let page= 0;
    if(obj.value.length <= 160)
    {
        page = 1;
        document.getElementById("charNum").innerHTML = 'You have '+(160 - obj.value.length)+' characters left on this page';
        document.getElementById("pageNum").innerHTML = 'Page '+(page);
    }else if(obj.value.length > 160 && obj.value.length <= 314){
        page = 2;
        let remainingPageCharacter = obj.value.length - 160;
        // let newPageCount = remainingPageCharacter % 154;
        document.getElementById("charNum").innerHTML = 'You have '+(154 - remainingPageCharacter)+' characters left on this page';
        document.getElementById("pageNum").innerHTML = 'Page '+(page);
    }else if(obj.value.length > 314 && obj.value.length <= 468){
        page = 3;
        let remainingPageCharacter = obj.value.length - 314;
        // let newPageCount = remainingPageCharacter % 154;
        document.getElementById("charNum").innerHTML = 'You have '+(154 - remainingPageCharacter)+' characters left on this page';
        document.getElementById("pageNum").innerHTML = 'Page '+(page);
    }else if(obj.value.length > 468 && obj.value.length <= 622){
        page = 4;
        let remainingPageCharacter = obj.value.length - 468;
        // let newPageCount = remainingPageCharacter % 154;
        document.getElementById("charNum").innerHTML = 'You have '+(154 - remainingPageCharacter)+' characters left on this page';
        document.getElementById("pageNum").innerHTML = 'Page '+(page);
    }else if(obj.value.length > 622 && obj.value.length <= 776){
        page = 5;
        let remainingPageCharacter = obj.value.length - 622;
        // let newPageCount = remainingPageCharacter % 154;
        document.getElementById("charNum").innerHTML = 'You have '+(154 - remainingPageCharacter)+' characters left on this page';
        document.getElementById("pageNum").innerHTML = 'Page '+(page);
    }

}

function textLength(value){
    var maxLength = 11;
    if(value.length > maxLength) return false;
    return true;
}


function validateForm() {

    var senderIdValue = document.getElementById('senderId').value;
    var phoneValue = document.getElementById('phone').value;
    var messageValue = document.getElementById('message').value;

    const url = 'http://127.0.0.1:8000/api/postsms';
    const data = {senderId:senderIdValue,phone:phoneValue,message:messageValue};
    let responseResult = {};
    // console.log(data);
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        // dataType: JSON,
        success: function (response) {
            responseResult = response;
            console.log(response);
            var result = confirm(`You are attempting to message to ${responseResult['data']['no-of-recipient']} phone numbers and total cost of this sms is ${Math.floor(responseResult['data']['total-amount'] * responseResult['data']['no-of-recipient']) }. If you want to send, click OK. If not, click Cancel.`);
            if (result) {
                return true;
            }
            else {
                return false;
            }
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });


}

// var str = "Hello, world 123!";
//
// var regex = /[a-zA-Z0-9]/g; // only count letters and numbers
//
// console.log(str.match(regex).length); // prints 13 to the console
