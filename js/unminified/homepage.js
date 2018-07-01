function initPageJS () {
    waterfall.x = 10;
    setInterval("waterfall()", 4500);
    $('#blurb-searchbox').click(function() {
        if($('#blurb-searchbox').val() == 'Find questions...') {
            $('#blurb-searchbox').val('');
        }
    });
    $('#blurb-searchbox').blur(function() {
        if($('#blurb-searchbox').val() == '') {
            $('#blurb-searchbox').val('Find questions...');
        }
    });
}

function waterfall () {
    if(waterfall.x == 0) waterfall.x = 20;
    $('#activity-'+waterfall.x).slideDown();
    if(waterfall.x < 9) $('.set-entry:last').hide().prependTo($('#recent-activity-container'));
    --waterfall.x;
}
    