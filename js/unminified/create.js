/**
 * @author Mutaz Musa
 */
var a_id = 2;

function initPageJS() {
    var createBoxOffset = $('#create-box').offset();
    $('#control-panel').css({
        'left': createBoxOffset.left+945,
        'top': $(window).scrollTop()+280+"px",
        'position': 'absolute'
    });
    $('#reset-set').click(function () {
        var reset = confirm("Are you sure you want to clear the set and start over?");
        if(reset){
            $('textarea').val('');
            $('.correct-answer').removeClass('correct-answer');
            $('#QuestionSetTitle').val('');
        }
    });
    addQuestion.maxQuestions = 20;
    //    $('#question-space').sortable({
    //        cursor: 'move'
    //    });
    //$('textarea').autoGrow();
	$('textarea').elastic();
    //    $('#submitreset').css({
    //        'top':($(window).scrollTop()+$(window).height()-$('#submitreset').outerHeight())+"px"
    //    },{
    //        queue: false,
    //        duration: 350
    //    });
    refreshQuestionNumbers();
    initAnswerLetters();
    initQuestionContainer($('.question-container')); //initializing all question-containers
    //    $("#tags").fcbkcomplete({
    //        json_url: "/cakephp-1.3.7/Qiurio/tags/fetch",
    //        cache: true,
    //        filter_case: true,
    //        filter_hide: true,
    //        firstselected: true,
    //        filter_selected: true,
    //        maxitems: 5,
    //        newel: true
    //    });
    initAnswerRow($('.answer-row'));
    $('#nav-basics').click(function(){
        $('#questions-page').hide();
        $('#options-page').hide();
        $('#basics-page').fadeIn();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#basics-number').addClass('selected');
        return false;
    });
    $('#nav-questions').click(function(){
        $('#questions-page').fadeIn();
        $('#options-page').hide();
        $('#basics-page').hide();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#questions-number').addClass('selected');
        return false;
    });
    $('#nav-options').click(function(){
        $('#questions-page').hide();
        $('#options-page').fadeIn();
        $('#basics-page').hide();
        $('.selected').removeClass('selected');
        $('#nav-options').addClass('selected');
        $('#options-number').addClass('selected');
        return false;
    });
    $('#add-question').click(function(){
        addQuestion();
    });
    $('#next-button-1').click(function() {
        $('#nav-questions').click();
    });
    $('#save-set').click(function(){
        $('#QuestionSetPublished').val(0);
        $('#createSetForm').submit();
        
    });
    $('#publish-set').click(function(){
        var publish = confirm("Are you sure you want to publish this set.\nOnce the set is published it cannot be edited.");
        if(publish) {
            $('#QuestionSetPublished').val(1);
            $('#createSetForm').submit();
        }
        return false;
    });
    $('#createSetForm').submit(function(){
        $("#loading-img").show();
        $.post('question_sets/save',
            $(this).serializeArray(),
            afterValidate,
            "json"
            );
        return false;
    });
    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        });
    initInput();
//$('#elastico').elastic();
//$('.elastico2').elastic();
    //scroll the message box to the top offset of browser's scrool bar
    $(window).resize(function() {
        $(window) .scroll();
    });
    $(window).scroll(function() {
        var createBoxOffset = $('#create-box').offset();
        $('#control-panel').css('left',$('#create-box').width() + createBoxOffset.left - 5);
        //alert('resize: '+ $('#create-box').css('width')+createBoxOffset.left);
        if($(window).scrollTop()+169 < (createBoxOffset.top + 80)) return false; //not too high
        if(parseInt($('#control-panel').css('top')) > createBoxOffset.top + parseInt($('#create-box').css('height')) - 20 - parseInt($('#control-panel').css('height'))) {
            $('#control-panel').css('top', createBoxOffset.top + parseInt($('#create-box').css('height')) - 20 - parseInt($('#control-panel').css('height')) + "px"); //not too low
            return false;
        }
        if($(window).scrollTop()+169 >
            createBoxOffset.top + parseInt($('#create-box').css('height'))
            - 20 - parseInt($('#control-panel').css('height'))) return false;
        $('#control-panel').css({
            'left': createBoxOffset.left+945,
            'position': 'absolute'
        })
        $('#control-panel').animate({
            'top':$(window).scrollTop()+169+"px",
        },{
            queue: false,
            duration: 600
        });
    });
    /*Autocomplete Remote and Multiple*/
    function split( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        return split( term ).pop();
    }
    $( "#tags" ).bind( "keydown", function( event ) {
				if ( event.keyCode === $.ui.keyCode.TAB &&
						$( this ).data( "autocomplete" ).menu.active ) {
					event.preventDefault();
				}
			})
			.autocomplete({
				minLength: 0,
				source: function( request, response ) {
					$.getJSON( 'tags/fetch', {
						term: extractLast( request.term )
					}, response );
				},
                                minLength: 2,
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( ", " );
					return false;
				}
			});
//    $( "#tags" ).bind( "keydown", function( event ) {
//				if ( event.keyCode === $.ui.keyCode.TAB &&
//						$( this ).data( "autocomplete" ).menu.active ) {
//					event.preventDefault();
//				}
//			})
//			.autocomplete({
//				minLength: 0,
//				source: function( request, response ) {
//					// delegate back to autocomplete, but extract the last term
//					response( $.ui.autocomplete.filter(
//						availableTags, extractLast( request.term ) ) );
//				},
//				focus: function() {
//					// prevent value inserted on focus
//					return false;
//				},
//				select: function( event, ui ) {
//					var terms = split( this.value );
//					// remove the current input
//					terms.pop();
//					// add the selected item
//					terms.push( ui.item.value );
//					// add placeholder to get the comma-and-space at the end
//					terms.push( "" );
//					this.value = terms.join( ", " );
//					return false;
//				}
//			});
}

//CREATE LIBRARY
function initAnswerLetters() {
    var last = $("div[id^='explanation-']").last();
    for(var i=0;i<=parseInt(last.attr('id').substr(12, 1));i++) {
        refreshAnswerLetters(i);
    }
}

function addQuestion()
{
    if($('#question-space').children().length == addQuestion.maxQuestions) {
        flashQuestionCounter();
        return false;
    }
    //Initialize the static variable that will keep track of the NUMBER of questions
    if ( typeof addQuestion.q_number == 'undefined' ) {
        addQuestion.q_number = 10;
    } else if (addQuestion.q_number == 50)  {
        flashMessage("Maximum of 50 questions");
    }

    //Initialize the static variable that will keep track of the INDEX of the next question
    if ( typeof addQuestion.nextQIndex == 'undefined' ) {
        addQuestion.nextQIndex = 10;
    }
    var id = addQuestion.nextQIndex;
    var question = "<div class='full-question question-container' id='question-"+(id)+"'>\
    <div class='question-head'>\
        <span class='question-label'></span>\
        <div class='question-toolbar'>\
            <div class='delete-question' id='delete-question-index-"+(id)+"'></div>\
            <div class='add-answer'></div>\
            <div class='toggle-explanation toggle-explanation-on'></div>\
        </div>\
    </div>\
    <div class='question-body'>\
        <div class='question-prompt form-row'>\
            <textarea id='Question"+(id)+"Prompt' cols='30' rows='1' class='input-inside prompt' name='data[Question]["+(id)+"][prompt]'></textarea><input type='hidden' id='Question"+(id)+"QuestionId' value='0' name='data[Question]["+(id)+"][question_id]'><input type='hidden' value='' name='data[Question]["+(id)+"][Answer][correct]' id='hidden-correct-"+(id)+"'>\
        </div>\
        <div id='answer-space-"+(id)+"'>\
        </div>\
        <div id='explanation-"+(id)+"' class='explanation-space'>\
            <div class='form-row'>\
                <span class='explanation-label'>Explanation</span>\
                <span class='input'><textarea id='Question"+(id)+"Explanation' cols='30' rows='1' class='input-inside prompt' name='data[Question]["+(id)+"][explanation]'></textarea></span>\
            </div>\
        </div>\
    </div>\
</div>";
    $('#question-space').append(question);
    $('#question'+id).fadeIn('slow');
    //alert(id);
    addAnswer(id, 2, false);
    addQuestion.q_number++;
    addQuestion.nextQIndex++;
    initQuestionContainer($('.question-container:last'));
    refreshQuestionNumbers();
    return false;
}

function addAnswer(id, number, deletable) {
    if(typeof number == 'undefined') number = 1;
    if(typeof deletable == 'undefined') deletable = true;
    var deleteButton = '';
    if(deletable) deleteButton = "<div class='delete-answer' name='delete-question-index-"+(id)+"' id='delete-answer-index-"+(a_id)+"'></div>";
    for(var i=0;i<number;i++) {
        var answer = "<div class='form-row answer-row' id='answer-"+(a_id)+"'>\n\
          <span class='form-label answer-label'></span>\
          <span class='answer-toolbar'>\
          <div class='correct-toggle' name='correct-toggle-question-index-"+(id)+"' id='correct-toggle-answer-index-"+(a_id)+"'></div>\
          " + deleteButton + "\
          </span>\
          <span class='input'><textarea id='Question"+(id)+"Answer"+(a_id)+"Prompt' cols='30' rows='1' class='input-inside answer-prompt' name='data[Question]["+(id)+"][Answer]["+(a_id)+"][prompt]'></textarea>\
          <input type='hidden' id='Question"+(id)+"Answer"+(a_id)+"AnswerId' value='0' name='data[Question]["+(id)+"][Answer]["+(a_id)+"][answer_id]'></span>\
          </div>";
        $("#answer-space-"+(id)).append(answer);
        initAnswerRow($('#question-'+id).find('.answer-row').last());
        a_id++;
    }
    markUnsavedQuestion(id);
    initInput();
    refreshAnswerLetters(id);
    return false;
}

function removeQuestion(id)
{
    addQuestion.q_number--;
    $('#question-'+id).slideUp('fast', function() {
        $(this).remove();
        refreshQuestionNumbers();
    });
    return false;
}

function removeAnswer(a_id, id) {
    $("#answer-"+a_id).remove();
    refreshAnswerLetters(id);
}

function refreshQuestionNumbers() {
    var number = 1;
    $('.question-label').each(function () {
        $(this).html('Question ' + number++);
    });
    flashQuestionCounter();
}

function refreshAnswerLetters(id) {
    var letterAscii = 65;
    var labels = $("#question-"+id).find('.answer-label');
    for(var c=0;c<labels.length;c++) {
        $(labels[c]).html(itoc(letterAscii++));
    }
    return false;
}

//function SaveQuiz(publish)
//{
//    alert('yo');
//    if(typeof publish == 'undefined') publish = false;
//    $("#loading-img").show();
//    $.ajax({
//        type: "post",		// Request method: post, get
//        url: "../question_sets/sav22e",	// URL to request
//        data: $("#createSetForm").serialize(),		// Form variables
//        dataType: "json",	// Expected response type
//        success: function(data, status) {
//            afterValidate(data, status, publish);
//        },
//        error: function(data, status) {
//            alert('error');
//            //$("#messageBox").html(response);
//            return false;
//        }
//    });
//    return false;
//}

function itoc(i) {
    return String.fromCharCode(i);
}
function styleAsSaved() {
    $('textarea').addClass('saved-input');
    $('#basics-page').find('input').addClass('saved-input');
    $('#basics-page').find('select').addClass('saved-input');
    $('.question-container').addClass('saved-question-container');
    $('.question-head').addClass('saved-question-head');
    $("#loading-img").hide();
}
function afterValidate(data, status) {
    $(".message").remove();
    $(".error-message").remove();
    if (data.errors) {
        onError(data.errors);
    } else if (data.success) {
        onSuccess(data.success);
    }
}
function onSuccess(data) {
    //console.log(data);
    flashMessage(data.message);
    if(data.published) disableForm();
    $("#QuestionSetSetId").val(data.ids.setId);
    $.each(data.ids.questionIds, function(qIndex, qId) {
        $("#Question"+qIndex+"QuestionId").val(qId);
        $.each(data.ids.answerIds[qIndex], function(aIndex, aId) {
            $("#Question"+qIndex+"Answer"+aIndex+"AnswerId").val(aId);
        });
    });
    if(data.guest) {
        $('#cb-span').html("<form id='signinupToSaveForm' method='post'><input type='hidden' name='cb' value='ss'></form>");
        $('#sign-in-to-save-link').click(function () {
            $("#signinupToSaveForm").attr('action', 'signin').submit();
        });
        $('#sign-up-to-save-link').click(function () {
            $("#signinupToSaveForm").attr('action', 'signup').submit();
        });
    }
    styleAsSaved();
    $("#loading-img").hide();
}

function onError(data) {
    var element = '';
    var _insert = '';
    flashMessage(data.message);
    console.log(data.data);
    $.each(data.data, function(model, errors) {
        if(model == 'published') {
            disableForm();
            $("#loading-img").hide();
            return false;
        }
        if(model == 'failure') {
            $("#loading-img").hide();
            return false;
        }
        if((model == 'Question') || (model == 'Answer')) {
            for (index in this) {
                for (fieldName in this[index]) {
                    if(model == 'Answer') {
                        var twoIndices = index.split(":"); //First is qIndex second is aIndex
                        element = $("#" + camelize('Question' + twoIndices[0] + 'Answer' + twoIndices[1] + '_' + fieldName));
                    } else
                        element = $("#" + camelize(model + index + '_' + fieldName));
                    _insert = $(document.createElement('div')).insertAfter(element);
                    _insert.addClass('error-message').text(this[index][fieldName]);
                }
            }
        } else {
            for (fieldName in this) {
                element = $("#" + camelize(model + '_' + fieldName));
                _insert = $(document.createElement('div')).insertAfter(element);
                _insert.addClass('error-message').text(this[fieldName])
            }
        }
        $("#loading-img").hide();
    });
}
function disableForm() {
    $('#basics-page').find('input').attr('disabled', 'disabled');
    $('textarea').attr('disabled', 'disabled');
    $('.correct-toggle').unbind('click');
    $('.toggle-explanation').unbind('click');
    $('.add-answer').unbind('click');
    $('.delete-question').unbind('click');
    $('.question-container').unbind('mouseover');
    $('.answer-row').unbind('mouseover');
    $('#add-question').unbind('click');

    //If the set has been published, hide the control panel
    $('#control-panel').hide();

}
//$this is a JQuery object that refers to a particular question container
function initQuestionContainer($this) {
    $this.find('.delete-question').click(function() {
        if($('.question-container').length == 1)
            return false;
        $(this).parents('.question-container').remove();
        refreshQuestionNumbers();
    });
    $this.find('.toggle-explanation').click(function() {
        var explanationSpace = $(this).parents('.question-container').find('.explanation-space');
        if(explanationSpace.is(':visible')) {
            explanationSpace.hide();
            explanationSpace.find('textarea').val('');
            $(this).removeClass('toggle-explanation-on');
        }
        else {
            explanationSpace.show();
            $(this).addClass('toggle-explanation-on');
        }
    });
    $this.find('.add-answer').click(function() {
        var qIndex = $(this).parents('.question-container').attr('id').substr(9);
        //alert(qIndex);
        if($('#answer-space-'+qIndex).children().length > 5) {
            return false;
        }
        addAnswer(qIndex, 1, true);
    });
    $this.hover(function() {
        $(this).find('.question-toolbar').show();
    }, function() {
        $(this).find('.question-toolbar').hide();
    });

    //ACTIVATE AUTOGROW
    $this.find('textarea').elastic();

//console.log($this);
}
function initAnswerRow($this) {
    //HOVER ANSWER ROW
    $this.hover(function() {
        $(this).find('.answer-toolbar').show();
    }, function() {
        $(this).find('.answer-toolbar').hide();
    });
        
    //TOGGLE CORRECT CLICK
    $this.find('.correct-toggle').click(function() {
        //If this question is already correct: return false
        if($(this).parents('.answer-row').is('.correct-answer'))
            return false;
        //I've saved the qindex under the name and the aindex under the id
        var qIndex = $(this).attr('name').substr(30);
        var aIndex = $(this).attr('id').substr(28);
        //Use the qindex to toggle off all choices
        $('[name='+$(this).attr('name')+']').each(function() {
            $(this).removeClass('correct-toggle-on');
            $(this).parents('.answer-row').removeClass('correct-answer');
        });
        //use the 'this' selector to toggle on this choice
        $('#hidden-correct-'+qIndex).val(aIndex);
        $(this).parents('.answer-row').addClass('correct-answer');
        $(this).addClass('correct-toggle-on');
        //Mark this question as unsaved
        markUnsavedQuestion(qIndex);
    });

    //DELETE ANSWER CLICK
    $this.find('.delete-answer').click(function() {
        var qIndex = $(this).attr('name').substr(22);
        $(this).parents('.answer-row').remove();
        markUnsavedQuestion(qIndex);
        refreshAnswerLetters(qIndex);
    });

    //ACTIVATE AUTOGROW
    //$('textarea').autoGrow();
    $this.find('textarea').elastic();
}
function flashMessage(message, messageOnly) {
    $('#message').html(message).fadeIn();
    $('#message-box').fadeIn();
    $('html, body').animate({
        scrollTop: $("#create-box").offset().top
    }, 1000);
    if(messageOnly) return false;
    var _insert = $(document.createElement('div')).css('display', 'none');
    _insert.attr('id', 'flashMessage').addClass('message').text(message);
    _insert.insertBefore($("#mid")).fadeIn();
}

function camelize(string) {
    var a = string.split('_'), i;
    s = [];
    for (i=0; i<a.length; i++){
        s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
    }
    s = s.join('');
    return s;
}
function initInput() {
    $(':input').change(function() {
        $(this).removeClass('saved-input');
        $(this).parents('.question-container').removeClass('saved-question-container');
        $(this).parents('.question-container').find('.question-head').removeClass('saved-question-head');
    });
}
function markUnsavedQuestion(qIndex) {
    $('#question-'+qIndex).removeClass('saved-question-container');
    $('#question-'+qIndex).children('.question-head').removeClass('saved-question-head');
    markUnsavedQuestion.unsaved = true;
}

function flashQuestionCounter() {
    var number = $('.question-container').length;
    if((number == addQuestion.maxQuestions || number == 1) && !($('#question-counter').css('color') == '#F6402D')) {
        $('#question-counter').css('color', '#F6402D');
    } else
        $('#question-counter').css('color', '#D9D9D9');
    $('#question-counter').html(number).fadeIn(100).delay(500).fadeOut(100);
}
