function initPageJS() {
    $('.question-head').click(function() {
       var entryContent = $(this).next('.entry-content');
       if(entryContent.is(':visible')) {
            entryContent.hide();
       } else {
           entryContent.show();
       }
    });
    $('.help-question').click(function () {
        var children = $(this).children('.child');
        children.each(function() {
            if($(this).is(':visible')) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
       return false;
    });
    if(topic != 'undefined') {
            showHelp(topic);
        }
        $('#contact-us-link').click(function() {
           showHelp('contact');
        });
}

function showHelp(topic) {
    switch(topic) {
        case "about":
            $('#about').show();
            break;
        case "privacy":
            $('#other').show();
            $('#privacy').show();
            break;
        case "tos":
            $('#other').show();
            $('#tos').show();
            break;
        case "contact":
            $('#other').show();
            $('#contact').show();
            break;
        default:
    }
}
