let name = $('#name');
let phone = $('#phone');
let loader = $('.loader');
let hasError = false;

$('#submit').click(function (e) {
    e.preventDefault();

    $('.error-input').hide();

    if(!name.val()){
        name.prev().show();
        name.css({
            border: '2px solid red'
        });
        hasError = true;
    }else{
        name.css('border', "1px solid rgb(130, 19, 40)");
    }

    if (!phone.val()){
        phone.prev().show();
        phone.css({
            border: '2px solid red'
        });
        hasError = true;
    }else{
        phone.css('border', "1px solid rgb(130, 19, 40)");
    }

    if (!hasError) {
        loader.css('display', 'flex');

    }

    $('#form')[0].reset();
})


