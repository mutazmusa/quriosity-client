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
       $(this).val('');
   });
   $('.forgot-passwd').blur(function() {
       $(this).val('Enter your e-mail address');
   })
}
