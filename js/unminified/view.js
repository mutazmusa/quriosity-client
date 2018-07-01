/**
 * @author Mutaz Musa
 */
function initPageJS() {
    if(typeof initPagination.express == 'undefined') {
        $(window).resize(function() {
            adjustLeftRightFloat();
            $(window) .scroll();
        });
        $(window).scroll(function() {
            var viewBoxOffset = $('#view-box').offset();
            $('#control-panel').css('left',$('#view-box').width() + viewBoxOffset.left - 5);
            if($(window).scrollTop()+169 < (viewBoxOffset.top + 80)) return false; //not too high
            if(parseInt($('#control-panel').css('top')) > viewBoxOffset.top + parseInt($('#view-box').css('height')) - 20 - parseInt($('#control-panel').css('height'))) {
                $('#control-panel').css('top', viewBoxOffset.top + parseInt($('#view-box').css('height')) - 20 - parseInt($('#control-panel').css('height')) + "px"); //not too low
                return false;
            }
            if($(window).scrollTop()+169 >
                viewBoxOffset.top + parseInt($('#view-box').css('height'))
                - 20 - parseInt($('#control-panel').css('height'))) return false;
            $('#control-panel').css({
                'left': viewBoxOffset.left+945,
                'position': 'absolute'
            })
            $('#control-panel').animate({
                'top':$(window).scrollTop()+169+"px",
            },{
                queue: false,
                duration: 600
            });
        });

        $('#next-question').click(function() {
            $('.next').click();
        });
        $('#prev-question').click(function() {
            $('.prev').click();
        });
    } else {
    }
    initPagination();
    if(typeof isHistory != 'undefined') {
        $(":radio").attr('disabled', true);
    } else {
        $(":input").attr('disabled', false);
    }
    var metaHoverMind = {
        off: function() {
            this.cancel();
            $('#meta').slideUp(200);
        },

        on: function() {
            this.cancel();
            var self = this;
            this.timeoutID = window.setTimeout(function() {
                $('#meta').slideDown(200);
            }, 1000);
        },

        cancel: function() {
            if(typeof this.timeoutID == "number") {
                window.clearTimeout(this.timeoutID);
                delete this.timeoutID;
            }
        }
    };
    $("#meta-description").hover(function() {
        metaHoverMind.on();
    }, function() {
        metaHoverMind.off();
    });
    /**************/
    $('#toggleMeta').click(function( ){
        $('#meta').toggle();
        ($('#meta').is(':visible')) ? $('#toggleMeta').html('Hide details') : $('#toggleMeta').html('Show details');
        return false;
    });
    $('.flag').click(function() {
        if(score.submitted) return false;
        if($(this).is('.flagged')) {
            $(this).removeClass('flagged');
            $('[name="'+($(this).attr('id'))+'"]').val(0);
        }
        else {
            $(this).addClass('flagged');
            //alert($(this).attr('id'));
            $('[name="'+($(this).attr('id'))+'"]').val(1);
        }
    });

    $('.flag').hover(function() {
        if(score.submitted) return false;
        $(this).addClass('flag-hover');
        return true;
    }, function() {
        if(score.submitted) return false;
        $(this).removeClass('flag-hover');
        return true;
    });
    $('#hide-stats').click(function(){
        $('#stats-strip').hide();
    });
    $('#hide-explanations').click(function(){
        $('.explanations-button').removeClass('explanations-button-selected');
        $('#explanation-bar').hide();
        return false;
    });
    $('.explanations-button').click(function(){
        if($('#explanation-bar').is(':visible')) {
            $(this).removeClass('explanations-button-selected');
            $('#explanation-bar').hide();
        } else {
            $(this).addClass('explanations-button-selected');
            $('#explanation-bar').show();
        }
        var numberOfLines = parseInt(parseInt($('#explanation-body').css('height')) / parseInt($('#explanation-body').css('line-height')));
        if(numberOfLines > 2) {
            $('#min-max-explanations').show();
        } 
        return false;
    });
    $('#stats-button').click(function(){
        $('#stats-strip').show();
    });
    $('#submit-button').click(function(){
        $("#loadingDiv").show();
        score();
        return false;
    });
    $('#more-stats').click(function() {
        if($(this).html() == "+") {
            $(this).html('-');
            $('#more-stats-label').html('Less');
            $('#stats-advanced').slideDown();
        }
        else {
            $(this).html('+');
            $('#more-stats-label').html('More');
            $('#stats-advanced').slideUp();
        }
    });
    $('#overlay').click(function(){
        $("#overlay").fadeOut();
        $('#stats-strip').fadeOut();
    });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        });

    adjustLeftRightFloat();
    $(window).jkey('right',function(){
        $('#next-question').click();
    });
    $(window).jkey('left',function(){
        $('#prev-question').click();
    });

}

function adjustLeftRightFloat() {
    if(typeof initPagination.express != 'undefined') return false;
    var leftOffset = $('#page-left').offset();
    var leftHeight = parseInt($('#page-left').css('height'));
    var leftBottom = parseInt(parseInt(leftOffset.top)+leftHeight);
    var rightOffset = $('#page-right').offset();
    var rightHeight = parseInt($('#page-right').css('height'));
    var rightBottom = parseInt(parseInt(rightOffset.top)+rightHeight);
    alert(rightBottom);
    if(leftBottom > rightBottom) { //float right
        $('#page-left').css('float', 'none');
        $('#page-right').css('float', 'right');
    }
    else { //float left
        $('#page-left').css('float', 'left');
        $('#page-right').css('float', 'none');
    }
    //if(!$('#page-right').is(':visible')) $('#page-left').css('float', 'none');
}


function googleVisualizationInit () {
    google.load("visualization", "1", {
        packages:["corechart"]
    });
    google.setOnLoadCallback(drawChart);
}

function drawChart() {
    if(!score.submitted) return false;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'User');
    data.addColumn('number', 'Score');
    data.addRows(5);
    data.setValue(0, 0, 'Mutaz');
    data.setValue(0, 1, 100);
    data.setValue(1, 0, 'Steve');
    data.setValue(1, 1, 70);
    data.setValue(2, 0, 'Person');
    data.setValue(2, 1, 60);
    data.setValue(3, 0, 'Hanson21');
    data.setValue(3, 1, 30);
    data.setValue(4, 0, 'GreenEyes');
    data.setValue(4, 1, 10);

    var chart = new google.visualization.BarChart(document.getElementById('chart-performers'));
    chart.draw(data, {
        width: 890,
        height: 200,
        chartArea: {
            top: 0
        },
        enableToolTips: false, 
        backgroundColor: '#FAFAFA',
        colors:['#1074B4'],
        legend: 'none',
        title: ''
    });

    // Add our selection handler.
    google.visualization.events.addListener(chart, 'onmouseover', selectHandler);

    data = new google.visualization.DataTable();
    data.addColumn('string', 'Question');
    data.addColumn('number', 'Answered Incorrectly');
    data.addRows(5);
    data.setValue(0, 0, 'Q17');
    data.setValue(0, 1, 1430);
    data.setValue(1, 0, 'Q34');
    data.setValue(1, 1, 730);
    data.setValue(2, 0, 'Q22');
    data.setValue(2, 1, 620);
    data.setValue(3, 0, 'Q11');
    data.setValue(3, 1, 310);
    data.setValue(4, 0, 'Q25');
    data.setValue(4, 1, 110);
    var chart = new google.visualization.BarChart(document.getElementById('chart-hard-questions'));
    chart.draw(data, {
        width: 890,
        height: 200,
        chartArea: {
            top: 0
        },
        enableToolTips: false,
        backgroundColor: '#FAFAFA',
        colors:['#1074B4'],
        legend: 'none',
        title: '',
        hAxis: {
            title: 'Times Answered Incorrectly'
        }
    });
}

function selectHandler() {
    return false;
}

$(function() {
    });

function score()
{
    if (score.submitted) {
        alert('This set has already been submitted');
        return false;
    }
    $('#loading-img').show();
    var serializedFormData = $("#questionSetForm").serialize();
    if(!validate($("#questionSetForm").serializeArray())) {
        $('#loading-img').hide();
        return false;
    }
    $.ajax({
        type: "post",		// Request method: post, get
        url: BASE+"/score",	// URL to request
        data: serializedFormData,		// Form variables
        dataType: "json",	// Expected response type
        success: function(response, status) {
            afterValidate(response);
            score.submitted = true;
        },
        error: function(response, status) {
            alert(response + " " + status);
            $('.loading-img').hide();
            return false;
        }
    });

    return true;
}

function validate(data) {
    var radioGroups = {};
    var questionNumber = 1;
    $('.radio-group').each(function() {
        radioGroups[questionNumber] = this.id;
        questionNumber++;
    });
    var missed = [];
    var atLeastOne = false;
    for(group in radioGroups) {
        checked = !!$(":radio[name=answers\\["+radioGroups[group]+"\\]]:checked").length;
        if(!checked) missed.push(group);
        else atLeastOne = true;
        $(":radio[name=answers\\["+radioGroups[group]+"\\]]").attr("disabled", true);
    }
    if(!atLeastOne) {
        alert('There are no questions to score');
        $(":radio").attr("disabled", false);
        return false
    }
    if(missed.length > 0) {
        var missedString = '';
        for(questionNumber in missed) {
            missedString = missedString + "\nQuestion "+missed[questionNumber];
        }
        var ignore = confirm("You missed the following questions: "+missedString+".\nWould you like to continue anyway?");
        if(ignore) {
            markMissed(missed, radioGroups);
            return true;
        }
        else {
            $(":radio").attr("disabled", false);
            return false;
        }
    }
    else return true;
}

function markMissed(missed, radioGroups) {
    for (questionNumber in missed) {
        var questionPrompt =$('#question-'+radioGroups[missed[questionNumber]]+" .prompt").first();
        var missedMsg = $(document.createElement('div')).insertBefore(questionPrompt);
        missedMsg.addClass('missed-message').text('missed');
    }
}

function afterValidate(response) {
    if(response.errors) {
        onError(response);
    } else {
        markupQuestionSet(response);
    }
    return false
}
function markupQuestionSet(response)
{
    var explanations = response['explanations'];
    var correctAnswers = response['correctAnswers'];
    var userAnswers = response['userAnswers'];
    var stats = response['stats'];
    var correct = 0;
    var incorrect = 0;
    var percentCorrectSum = 0;
    var numberQuestions = 0;
    var username = response['username'];

    /*Go through each question and:
     *1. Show explanations if any
     *2. Highlight questions/answers according to correct/incorrect
     *3. Show stats
     *4. Disable input
     */

    //    var blankQ = 'wrong';
    //    if(blankQ != 'ignore') {
    //        var temp = userAnswers;
    //        userAnswers = correctAnswers;
    //        correctAnswers = temp;
    //    }
    for(var questionId in correctAnswers)
    {
        //Show explanations if any
        populateExplanations(questionId, explanations);

        //Highlight in/correct questions and answers
        $("#result-img-"+correctAnswers[questionId]).addClass('correct-img').show();
        if(userAnswers[questionId] == correctAnswers[questionId]) {
            $("#question"+questionId).addClass('question-correct').removeClass('question-incorrect');
            $("input[@name='answers['+questionId+']']:checked").addClass('answer-correct').removeClass('answer-incorrect');
            correct++;
        }
        else {
            $("#result-img-"+userAnswers[questionId]).addClass('incorrect-img').show();
            $("#question"+questionId).addClass('question-incorrect').removeClass('question-correct');
            incorrect++;
        }

        var answeredCorrectly = parseInt(stats[questionId]["answered_correctly"]);
        var answeredIncorrectly = parseInt(stats[questionId]["answered_incorrectly"]);
        var answeredTotal = answeredCorrectly + answeredIncorrectly;
        var percentCorrect = Math.round(100*answeredCorrectly/answeredTotal);
        for (var answerId in stats[questionId]['answers']) {
            var answerTimesChosen = stats[questionId]['answers'][answerId]['times_chosen'];
            var percentChosen = Math.round(100*answerTimesChosen/answeredTotal);
            $("#aPercentChosen"+answerId).html(' - '+percentChosen+' ('+answerTimesChosen+')');
        }
        $("#qPercentCorrect"+questionId).html('Percent correct: '+percentCorrect);
        numberQuestions++;
        percentCorrectSum = percentCorrectSum + percentCorrect;
    }
    var missed = (correct+incorrect) - countJSON(userAnswers);
    var average = Math.round(percentCorrectSum/numberQuestions);
    var score = Math.round(100*correct/(correct+incorrect));
    if(average.toString() == 'NaN') average = score;
    $("#average-stat").html((average).toString()); //Average score of all test-takers
    $("#flagged-stat").html($('.flagged').size()); //Number of flagged items
    $("#score-stat").html((score).toString()); //User's score'
    $('#correct-stat').html(correct);
    $('#incorrect-stat').html(incorrect - missed);
    $('#missed-stat').html(missed);
    $("#demo-content :input").attr('disabled', true);
    var grade = '';
    if(score >= 90) grade = 'A+';
    if((score >= 80) && (score < 90)) grade = 'A';
    if((score >= 70) && (score < 80)) grade = 'B';
    if((score >= 60) && (score < 70)) grade = 'C';
    if((score >= 50) && (score < 60)) grade = 'D';
    if((score < 50)) grade = 'F';
    $("#grade").html(grade);
    $('#setHistoryId').val(response['historyId']);
    toggleStatStrip();
    populateExplanationBar(pageselectCallback.old_index);
    $('#loading-img').hide();
    $('.explanations-button').show();
    $('#stats-button').show()
    $('#submit-button').remove();
    $('#reset-set').remove();
    $('#details-bar').show();
    markCorrect(correctAnswers);
    if(typeof initPagination.express == 'undefined') {
        $('.explanation').show();
        adjustLeftRightFloat();
        drawChart();
    }
    if(username == '') {
        $('#more-label').html("<form id='signinupToSaveForm' method='post'><span class='smaller-label-more'><input type='hidden' name='cb' value='sp'><a href='#' id='sign-in-to-save-link'>Sign-in</a> or <a href='#' id='sign-up-to-save-link'>Register</a> to save and track your performance</span></form>");
        $('#sign-in-to-save-link').click(function () {
            $("#signinupToSaveForm").attr('action', BASE+'/signin').submit();
            console.log($("#signinupToSaveForm").serialize());
            return false; 
        });
        $('#sign-up-to-save-link').click(function () {
            $("#signinupToSaveForm").attr('action', BASE+'/signup').submit();
            return false;
        });
        if(typeof initPagination.express == 'undefined') {
            $('#more-label').show();
        }
    } else {
        if(typeof initPagination.express != 'undefined') {
            $('#more-label').html("<a href="+BASE+"/users/history/"+(response['historyId'])+ "'>more ⇒</a>");
        }
    }
    $('#min-max-explanations').click(function () {
        if(parseInt($('#explanation-bar').css('margin-top')) == 0) {
            $('#explanation-bar').css('margin-top', 128);
            $('#explanation-bar').css('height', 58);
            $('#explanation-screen').addClass('min').removeClass('max');
            $('#min-max-explanations').addClass('max-button').removeClass('min-button');
        } else {
            $('#explanation-bar').css('margin-top', 0);
            $('#explanation-bar').css('height', 186);
            $('#explanation-screen').addClass('max').removeClass('min');
            $('#min-max-explanations').addClass('min-button').removeClass('max-button');
        }

    })
    return true;
}

function markCorrect(correctAnswers) {
    for(var answer in correctAnswers) {
        //alert(answer);
        $('#answer-container-'+correctAnswers[answer]).addClass('correct-answer');
    }
}
function toggleExplanations(id) {
    if($('#explanation-bar').is(':visible')) $('#explanation-bar').hide();
    else $('#explanation-bar').show();
    if($('#explanation-'+id).is(':visible')) {
        $('#explanation-'+id).hide();
    } else {
        $('#explanation-'+id).show();
    }
    var numberOfLines = parseInt(parseInt($('#explanation-body').css('height')) / parseInt($('#explanation-body').css('line-height')));
    if(numberOfLines > 2) {
        $('#min-max-explanations').show();
    } 
    return false;
}

function populateExplanations(id, explanations) {
    if(explanations[id].length == 0)
        $('#explanation-'+id).html('No explanation provided.');
    else {
        $('#explanation-'+id).html(explanations[id]);
    //$('#explanation-'+id).show();
    }
}

function onError(errors) {
    alert('There was a problem processing your request: ' + errors['message']);
    $('#loading-img').hide();
}

function stats(data)
{
    var deviation = new Array();
    var sum = 0;
    var devnsum = 0;
    var stddevn = 0;
    var len = data.length;
    for (var i=0; i<len; i++)
    {
        sum = sum + (parseFloat(data[i],10)); // ensure number to base 10
    }
	
    var mean = (sum/len).toFixed(2); // 6 decimal places
    for (i=0; i<len; i++)
    {
        deviation[i] = data[i] - mean;
        deviation[i] = deviation[i] * deviation[i];
        devnsum = devnsum + deviation[i];
    }
    stddevn = Math.sqrt(devnsum/(len-1)).toFixed(2); // 6 decimal places
    var results = [];
    results["mean"] = mean
    results['stddev'] = stddevn
    return results;
}

function toggleStatStrip() {
    if($("#stats-strip").attr('display') == 'block') {
        $("#stats-strip").fadeOut();
    } else {
        $("#stats-strip").fadeIn();
    }

}

function pageselectCallback(page_index){
    var items_per_page = initPagination.items_per_page;
    var page = page_index + 1;
    var qStart = items_per_page *(page-1);
    var qStop = (items_per_page * page) - 1;
    if(initPagination.express == 'undefined') initPagination.express = 0;
    $('#questions div.question').hide();
    for(var i = qStart;i<qStop+1;i++) {
        if(initPagination.express == 1)
            populateExplanationBar(i);
        $('#questions div.question:eq('+i+')').fadeIn();
        adjustLeftRightFloat();
    }
    if ( typeof pageselectCallback.old_index == 'undefined' ) {
        pageselectCallback.old_index = page_index;
    } else {
        $('#questions div.question:eq('+pageselectCallback.old_index+')').hide();
        pageselectCallback.old_index = page_index;
    }
    var numberOfLines = parseInt(parseInt($('#explanation-body').css('height')) / parseInt($('#explanation-body').css('line-height')));
    if(numberOfLines > 2) {
        $('#min-max-explanations').show();
    } else {
        $('#min-max-explanations').hide();
    }
//    if(initPagination.express == 0) adjustLeftRightFloat();
    return false;
}

function populateExplanationBar(i) {
    if($('#questions div.explanation:eq('+i+')').html() != '') {
        $('#explanation-body').html($('#questions div.explanation:eq('+i+')').html()).fadeIn();
    }
}

function initPagination() {
    var num_entries = jQuery('#questions div.question').length;
    initPagination.items_per_page = 1;
    initPagination.num_entries = num_entries;
    $("#pagination-nav").pagination(num_entries, {
        callback: pageselectCallback,
        items_per_page:initPagination.items_per_page, // Show only one item per page
        prev_text: "◄",
        next_text: "►",
        num_display_entries: 10,
        prev_show_always: false,
        num_edge_entries: 1,
        num_display_entries: 10
    });
}

function countJSON (obj) {
    var i;
    var c = 0;
    for(i in obj)
        c++;
    return c;
}
