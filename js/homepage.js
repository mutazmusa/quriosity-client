    Array.max = function( array ){
    return Math.max.apply( Math, array );
};
function initPageJS2 () {
    waterfall.nextActivity = 28;
    setInterval("waterfall()", 1500);
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
    $('#demo').hover(function() {
        $('#side-tools').fadeIn();
    }, function() {
        $('#side-tools').fadeOut();
    })
    clockIt.secs = clockIt.mins = 0;
    initPageJS2.clock = setInterval("clockIt()", 1000);
    $('#img-social').click(function () {
        var highestZ = Array.max([$('#leaf1').css('z-index'),$('#leaf2').css('z-index'),$('#leaf3').css('z-index')]);
        $('#leaf1').css('z-index', 0);
        $('#leaf2').css('z-index', 0);
        $('#leaf3').css('z-index', 1);
    });
    $('#img-analytics').click(function () {
        var highestZ = Array.max([$('#leaf1').css('z-index'),$('#leaf2').css('z-index'),$('#leaf3').css('z-index')]);
        $('#leaf1').css('z-index', 0);
        $('#leaf2').css('z-index', 1);
        $('#leaf3').css('z-index', 0);
    });
    $('#img-qbank').click(function () {
        var highestZ = Array.max([$('#leaf1').css('z-index'),$('#leaf2').css('z-index'),$('#leaf3').css('z-index')]);
        $('#leaf1').css('z-index', 1);
        $('#leaf2').css('z-index', 0);
        $('#leaf3').css('z-index', 0);
    });
    $('#content-block').click(function () {
        if($(this).css('height') == '40px')
            $(this).animate({
                height: '490px'
            }, 500);
        else
            $(this).animate({
                height: '40px'
            }, 500);
    });
    $('#content-block').hover(function () {
        $('#meanwhile').animate({opacity: 0.6}, 1000);
    }, function () {
        $('#meanwhile').animate({opacity: 0}, 1000);
    });
    $('#leaf3').click(function() {
        $(this).css('z-index', 1);
        $('#leaf2').css('z-index', 0);
        $('#leaf1').css('z-index', 0);
        slideLeaf();
    });
    $('#leaf2').click(function() {
        $('#leaf3').css('z-index', 0);
        $(this).css('z-index', 1);
        $('#leaf1').css('z-index', 0);
        slideLeaf();
    });
    $('#leaf1').click(function() {
        $('#leaf3').css('z-index', 0);
        $('#leaf2').css('z-index', 0);
        $(this).css('z-index', 1);
        slideLeaf();
    });
    function slideLeaf() {
        if($('.slides').css('margin-top') == '120px')
            $('.slides').animate({
                'margin-top': '5px'
            }, 500);
        else
            $('.slides').animate({
                'margin-top': '120px'
            }, 500);

    }
    $('#tinysearch').click(function() {
        if($("#blurb-searchbox").val() == "Find questions...")
            $('#blurb-searchbox').val('');
       $('#quickSearch').submit();
    });
//    $('#blurb-searchbox').focus(function () {
//       $(this).animate({width: '240px'}, 250);
//    });
//    $('#blurb-searchbox').blur(function () {
//       $(this).animate({width: '140px'}, 250);
//    });
}

function clockIt() {
    if(clockIt.secs == 60) {
        clockIt.mins++;
        clockIt.secs = 0;
    }
    var secsText = clockIt.secs.toString();
    var minsText = clockIt.mins.toString();
    if(clockIt.secs < 10) secsText = "0" + secsText;
    if(clockIt.mins < 10) minsText = "0" + minsText;
    $('#clock-text').html(minsText + ":" + secsText);
    clockIt.secs++;
}

function waterfall () {
    if(waterfall.nextActivity == 0) waterfall.nextActivity = 40;
    $('#activity-'+waterfall.nextActivity).slideDown();
    $('.set-entry:last').hide().prependTo($('#recent-activity-container'));
    --waterfall.nextActivity;
}
    
