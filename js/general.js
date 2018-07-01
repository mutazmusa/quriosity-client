$(document).ready(function() {
    $('#flashMessage').click(function() {
        $(this).fadeOut();
    });
    if(initPageJS !== "undefined" && jQuery.isFunction(initPageJS)) {
        initPageJS();
    }
    if(typeof initPageJS2 !== "undefined" && jQuery.isFunction(initPageJS2)) {
	initPageJS2();
    }
});
