$(document).ready(function() {
    $("input:radio").click(function() {
        if ($(this).val() === "individual") {
            $("#joint-account-options").addClass("disabledbutton");

        } else if ($(this).val() === "joint") {
            $("#joint-account-options").removeClass("disabledbutton");
        }
    });


    $('td span').click(function() {
        //  alert('hit');
        // $('.info').hide()
        $(this).parent().next().show();
    });




    $('.icon-plus, .icon-minus').click(function() {
        if ($(this).hasClass('icon-plus')) {
            $(this).removeClass('icon-plus');
            $(this).addClass('icon-minus');
        } else {
            $(this).removeClass('icon-minus');
            $(this).addClass('icon-plus');
        }
        if ($(this).next().hasClass("show-faq-text")) {
            $(this).next().removeClass("show-faq-text");
        } else {
            $(this).next().addClass("show-faq-text");
        }
    });




});
