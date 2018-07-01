function initPageJS () {
    $('#page-top').masonry({
        itemSelector : '.boxlet',
//        columnWidth : 240
    });
    $('.order-by').click(function(){
        if($(this).is('.selected-filter')) {
            //$(this).removeClass('selected-filter');
            $('#order-by').val($(this).attr('name'));
            return false;
        } else {
            $('.order-by').removeClass('selected-filter');
            $(this).addClass('selected-filter');
            $('#order-by').val($(this).attr('name'));
        }
        return false;
    });
    $('.noq').click(function(){
        if($(this).is('.selected-filter')) {
            //$(this).removeClass('selected-filter');
            $('#noq').val($(this).attr('name'));
            return false;
        } else {
            $('.noq').removeClass('selected-filter');
            $(this).addClass('selected-filter');
            $('#noq').val($(this).attr('name'));
        }
        return false;
    });

    $('.contain').click(function() {
        if($(this).is('.selected-filter')) {
            $(this).removeClass('selected-filter');
            $('#explanations').val(0);
        } else {
            $(this).addClass('selected-filter');
            $('#explanations').val(1);
        }
        return false;
    });
//    $('.category').click(function() {
//        var nextSection = $(this).next('.rel-indent');
//        if(nextSection.is(':visible'))
//            nextSection.fadeOut(200);
//        else
//            nextSection.fadeIn(200);
//    });
//    $('.browse-list').click(function() {
//        var nextSection = $(this).next('.rel-indent');
//        if(nextSection.is(':visible'))
//            nextSection.fadeOut(200);
//        else
//            nextSection.slideDown(200);
//    });
}

function toggleFilters() {
   
    if($('#filter-container').is(':visible')) {
        $('#toggleFilters').html('Show filters');
        $('#filter-container').hide();
    } else {
        $('#toggleFilters').html('Hide filters');
        $('#filter-container').show();
    }
    return false;
}

function Search()
{
    var q = $("#q").val();
    if(q != "")
    {
        $.ajax({
            type: "post",		// Request method: post, get
            url: "search",	// URL to request
            data: "q="+q,		// Form variables
            dataType: "html",	// Expected response type
            success: function(response, status) {
                $("#searchResults").html(response);
            },
            error: function(response, status) {
                $("#searchResults").html(response);
            }
        });
    }
}