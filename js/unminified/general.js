$(document).ready(function() {
    $('#flashMessage').click(function() {
        $(this).fadeOut();
    });
    if(jQuery.isFunction(initPageJS)) {
        initPageJS();
    }
});