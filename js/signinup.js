function initPageJS() {
    $('#flashMessage').click(function() {
        $(this).fadeOut();
    })
    $('#forgot-passwd-anch').click(function() {
        if($('#forgot-passwd').is(':visible')) $('#forgot-passwd').fadeOut(500);
        else $('#forgot-passwd').fadeIn(500);
        return false;
    });
    $('.forgot-passwd').click(function() {
        if($(this).val() == 'Enter your e-mail address') {
            $(this).val('');
        }
    });
    $('.forgot-passwd').blur(function() {
        if($(this).val() == '') {
            $(this).val('Enter your e-mail address');
        }
    })
    $('#mailing-list').click(function() {
        if($('#mailing-list').val() == 'Enter your email address') {
            $('#mailing-list').val('');
        }
    });
    $('#mailing-list').blur(function() {
        if($('#mailing-list').val() == '') {
            $('#mailing-list').val('Enter your email address');
        }
    });
    $('#gomail').hover(function () {
        $(this).animate({"margin-left": '-15px'}, 100);
    }, function() {
        $(this).animate({"margin-left": '-30px'}, 100);
    });
    $('#UserUsername').focus();
}
