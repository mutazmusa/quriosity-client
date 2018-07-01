$(document).ready(function(){
    initPagination();
    $(":input").attr('disabled', false);
});

$(function() {
    $('#submit-button').click(function(){
        $("#loadingDiv").show();
        score();
        return false;
    });
    $('#overlay').click(function(){
        $("#overlay").fadeOut();
        $('#stats-strip').fadeOut();
    });
    $("#summary-button").click(toggleStatStrip);
    $("#summary-button").mouseover(function() {
        $("#summary-button").attr("src", "img/summary-on.png");
    });
    $("#submit-button").mouseover(function() {
        $("#submit-button").attr("src", "img/submit-on.png");
    });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        });
});

function toggleStatStrip() {
    if($("#stats-strip").attr('display') == 'block') {
        $("#stats-strip").fadeOut();
        $("#overlay").fadeOut();
    } else {
        $("#stats-strip").fadeIn();
        $("#overlay").fadeIn();
    }
        
}

function pageselectCallback(page_index){
    if ( typeof pageselectCallback.old_index == 'undefined' ) {
        pageselectCallback.old_index = page_index;
    } else {
        $('#demo-content div.question:eq('+pageselectCallback.old_index+')').hide();
        pageselectCallback.old_index = page_index;
    }
    if (page_index+1 == initPagination.num_entries) {
        $('#submit').fadeIn();
    } else {
        $('#submit').hide();
    }
    $('#demo-content div.question:eq('+page_index+')').fadeIn();
    return false;
}

function initPagination(filter) {
    alert('yo');
    if(typeof filter == 'undefined') filter = 'question';
    var num_entries = jQuery('#questions div.'+filter).length;
    initPagination.num_entries = num_entries;
    $("#pagination-nav").pagination(num_entries, {
        callback: pageselectCallback,
        items_per_page:1, // Show only one item per page
        prev_text: "◄",
        next_text: "►",
        num_display_entries: 10,
        prev_show_always: false,
        num_edge_entries: 1,
        num_display_entries: 10
    });
}
