/**
 * @author Mutaz Musa
 */
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
};
var myArray = [1,2,3];
var tags = {
    set: [], 
    questions: []
};
function removeTag (tagId, tagText) {
    $("#chain-"+tagId+"-"+tagText).remove(); 
    $.each(tags['set'], function() {
        if(this.id == tagId && this.text == tagText)
            tags['set'].splice(tags['set'].indexOf(this),1);
    });
    var cleanText = tagText.replace(/[^A-Za-z0-9]/g,"");
    $('#tag-'+tagId+'-'+cleanText).remove();
    return false;
}
function initPageJS() {
    $('#save-tag-tree').click(function() {
        $.post('tags/newTagTree',
            $('#tagTreeForm').serializeArray(),
            afterValidate,
            "json"
            );
        $('#overlay').click();
        return false;
    });
    $('#new-tree, #overlay').click(function() {
        $('#overlay').toggle();
       $('#tag-tree-ctr').center().toggle();
    });
    $('#tags-q-0').autocomplete({
        minLength: 0,
        source: function( request, response ) {
            $.getJSON( 'tags/fetch', {
                term: extractLast( request.term )
            }, response );
        },
        minLength: 2,
        focus: function(event, ui) {
            // prevent value inserted on focus
            return false;
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            //Before doing all this should check to make sure not already present
            terms.push( ui.item.root );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = "";
            var cleanText = ui.item.root.replace(/[^A-Za-z0-9]/g,"");
            if($.inArray(ui.item.value, tags['set']) == -1) {
                tags['questions'].push({
                    id: ui.item.value.toString(), 
                    text: ui.item.root
                });
                $("#chain-container").append("<div id='chain-"+ui.item.value+"-"+cleanText+"'><a href='#' class='del-tag' onClick='removeTag("+ui.item.value+",\""+ui.item.root+"\"); return false;'>✘</a>"+ui.item.label+"</div>")
            } else {
                $("#chain-"+ui.item.value+"-"+cleanText).show('pulsate', 200);
            }
            console.log("Tags at end of Select: ", tags['set']);
            return false;
        }
    });
    
    $('#control-panel').css({
        'left': $('#create-box').offset().left+945,
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
    $('#QuestionSetDescription').elastic();
    refreshQuestionNumbers();
    initQuestionContainer($('.question-container')); //initializing all question-containers
    initAnswerRow($('.answer-row'));
    $('#nav-basics').click(function(){
        $('#questions-page').hide();
        $('#options-page').hide();
        $('#basics-page').fadeIn();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#basics-number').addClass('selected');
        $('#control-panel').css({
            'left': $('#create-box').offset().left+945
        });
        return false;
    });
    $('#nav-questions').click(function(){
        $('#questions-page').fadeIn();
        $('#options-page').hide();
        $('#basics-page').hide();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#questions-number').addClass('selected');
        $('#control-panel').css({
            'left': $('#create-box').offset().left+915
        });
        $(window).scroll();
        if(editing) {
            $('textarea').change(); //makes sure we autogrow the textarea
        }
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
    function createTagElements() {
        $.each(tags['set'], function (){
            var cleanText = this.text.replace(/[^A-Za-z0-9]/g,"");
            if($("input[value='"+this.text+"']").length == 0)
                $('#createSetForm').append("<input type='hidden' id='tag-"+this.id+"-"+cleanText+"' name='data[Tag][set][]["+this.id+"]' value='"+this.text+"' />");
        });
    //Do same for each question
    }
    $('#createSetForm').submit(function(){
        $("#loading-img").show();
        createTagElements();
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
            'top':$(window).scrollTop()+169+"px"
        },{
            queue: false,
            duration: 600
        });
    });
    resetControlPanel();
    /*Autocomplete Remote and Multiple*/
    $( ".tags" ).bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).data( "autocomplete" ).menu.active ) {
            event.preventDefault();
        }
    }).autocomplete({
        minLength: 0,
        source: function( request, response ) {
            $.getJSON( 'tags/fetch', {
                term: extractLast( request.term )
            }, response );
        },
        minLength: 2,
        focus: function(event, ui) {
            // prevent value inserted on focus
            //            $( "#tags" ).val( ui.item.value );
            return false;
        //            return false;
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            
            // remove the current input
            terms.pop();
            
            // add the selected item
            //Before doing all this should check to make sure not already present
            terms.push( ui.item.root );
            
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = "";

            //We use this to create elements
            var cleanText = ui.item.root.replace(/[^A-Za-z0-9]/g,"");
            
            //Are we dealing with a question or set tag?
            var tagModel = 'set';
            var myChainCtr = $(this).parent().next(); //myChainContainer
            var myTagInputCtr = myChainCtr.next();
            if($(this).is('.q-tag')) tagModel = 'questions';
            if(myTagInputCtr.find('.tag-'+ui.item.value+'-'+cleanText).length == 0) {
                //            if($.inArray(ui.item.value, tags[tagModel]) == -1) {
                //                tags[tagModel].push({
                //                    id: ui.item.value.toString(), 
                //                    text: ui.item.root
                //                });
                myChainCtr.append("<div class='chain-"+ui.item.value+"-"+cleanText+"'><a href='#' class='del-tag' onClick='removeTag("+ui.item.value+",\""+ui.item.root+"\"); return false;'>✘</a>"+ui.item.label+"</div>")
                initRemoveTag(myChainCtr.find('.del-tag:last'), myTagInputCtr);
                var inputName = inputName = "data[Tag][set][]["+ui.item.value+"]";
                if(tagModel == 'questions') {
                    var qIndex = $(this).attr('id').substr(7);
                    inputName = "data[Question]["+qIndex+"][Tags][]["+ui.item.value+"]";
                }
                myTagInputCtr.append("<input type='hidden' class='tag-"+ui.item.value+"-"+cleanText+"' name='"+inputName+"' value='"+ui.item.root+"' />");
                //Immediate create the hidden input field
                //                    $(this).parent().next().next().append("<input type='hidden' class='q-tag-"+ui.item.value+"-"+cleanText+"' name='data[Question]["+qIndex+"][Tags][]["+ui.item.value+"]' value='"+ui.item.root+"' />");
//                $('#createSetForm').append("<input type='hidden' id='tag-"+this.id+"-"+cleanText+"' name='data[Tag][set]["+(i++)+"]["+this.id+"]' value='"+this.text+"' />");
            } else {
                console.log(myChainCtr.find('.tag-'+ui.item.value+'-'+cleanText));
                myChainCtr.find('.chain-'+ui.item.value+'-'+cleanText).show('pulsate', 200);
            }
            return false;
        }
    //        open: function () {
    //            $("#tags").bind("blur", function () {
    //                if (typeof $(this).data("uiItem") === 'undefined') {
    //                    $(this).val("");
    //                }
    //            });
    //        },
    //        close: function () {
    //            $("#tags").unbind("blur");
    //        }
    });
    $('.hidden-elastic').each(function () {
        $(this).html("");
    });
    $('#add-question').hover(function() {
        $('#cp-message').css('color', '#D9D9D9').html('Add Questions');
    }, function() {
        $('#cp-message').html("Questions: "+$('.question-container').length);
    });
    $('#reset-set').hover(function() {
        $('#cp-message').css('color', '#D9D9D9').html('Start Over');
    }, function() {
        $('#cp-message').html("Questions: "+$('.question-container').length);
    });
    $('#save-set').hover(function() {
        $('#cp-message').css('color', '#D9D9D9').html('Save').show();
    }, function() {
        $('#cp-message').html("Questions: "+$('.question-container').length);
    });
    $('#toggle-smartbox').hover(function() {
        $('#cp-message').html('Toggle SmartBox').css('color', '#D9D9D9').show();
    }, function() {
        $('#cp-message').html("Questions: "+$('.question-container').length);
    });
    $('#publish-set').hover(function() {
        $('#cp-message').css('color', '#D9D9D9').html('Publish').show();
    }, function() {
        $('#cp-message').html("Questions: "+$('.question-container').length);
    });
    $('#sb-media').click(function() {
        //Show Upload Div
        $('a#inline').click();
    });
    $('a#inline').fancybox(
    {
        'hideOnContentClick': false,
        'titlePosition':    'over'
    });
    $('#sb-toggle-settings').click(function () {
        if($('#sb-settings').is(':visible'))
            $('#sb-settings').slideUp(300);
        else
            $('#sb-settings').slideDown(300);
    });
    $('#sb-settings-done').click(function () {
        $('#sb-settings').slideUp(300);
    })
}

//Reset control panel location
function resetControlPanel() {
    $('#control-panel').css({
        'left': $('#create-box').offset().left+945,
        'top': $(window).scrollTop()+280+"px"
    });
}

//CREATE LIBRARY

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
    //<div class='toggle-explanation toggle-explanation-on'></div>\
    var question = "<div class='full-question question-container' id='question-"+(id)+"'>\
    <div class='question-head'>\
        <span class='question-label'></span>\
        <div class='question-toolbar'>\
            <div class='delete-question' id='delete-question-index-"+(id)+"'></div>\
            <div class='add-answer'></div>\
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
        <div class='tag-space'>\
    <div class='form-row'>\
<div class='input text'>\
<span class='explanation-label'>Tags</span>\
<input name='data[QuestionSet][tags-q-"+(id)+"]' type='text' id='tags-q-"+(id)+"' class='input-inside tags q-tag' value=''>\
</div>\
<div id='chain-container-q-"+(id)+"' class='chain-container'>\
</div>\
<div class='tag-input-container'>\
                                        </div>\
                                    </div>\
                                </div>\
</div>\
</div>";
                                    
                                        
                                        
                                        
                                        
    $('#question-space').append(question);
    $('#question'+id).fadeIn('slow');
    addAnswer(id, 2, false);
    addQuestion.q_number++;
    addQuestion.nextQIndex++;
    initQuestionContainer($('.question-container:last'));
    initAutocomplete($('.tags:last'));
    refreshQuestionNumbers();
    $('#control-panel').css({
        'left': $('#create-box').offset().left+945
    });
    return false;
}

function initAutocomplete($me) {
    $me.bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).data( "autocomplete" ).menu.active ) {
            event.preventDefault();
        }
    }).autocomplete({
        minLength: 0,
        source: function( request, response ) {
            $.getJSON( 'tags/fetch', {
                term: extractLast( request.term )
            }, response );
        },
        minLength: 2,
        focus: function(event, ui) {
            // prevent value inserted on focus
            return false;
        //            return false;
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            
            // remove the current input
            terms.pop();
            // add the selected item
            //Before doing all this should check to make sure not already present
            terms.push( ui.item.root );
            
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = "";
//            //We use this to create elements
            var cleanText = ui.item.root.replace(/[^A-Za-z0-9]/g,"");
//            
//            //Are we dealing with a question or set tag?
            var tagModel = 'set';
            var myChainCtr = $(this).parent().next(); //myChainContainer
            var myTagInputCtr = myChainCtr.next();
            if($(this).is('.q-tag')) tagModel = 'questions';
            if(myTagInputCtr.find('.tag-'+ui.item.value+'-'+cleanText).length == 0) {
                myChainCtr.append("<div class='chain-"+ui.item.value+"-"+cleanText+"'><a href='#' class='del-tag' onClick='removeTag("+ui.item.value+",\""+ui.item.root+"\"); return false;'>✘</a>"+ui.item.label+"</div>")
                initRemoveTag(myChainCtr.find('.del-tag:last'), myTagInputCtr);
                var inputName = inputName = "data[Tag][set][]["+ui.item.value+"]";
                if(tagModel == 'questions') {
                    var qIndex = $(this).attr('id').substr(7);
                    inputName = "data[Question]["+qIndex+"][Tags][]["+ui.item.value+"]";
                }
                myTagInputCtr.append("<input type='hidden' class='tag-"+ui.item.value+"-"+cleanText+"' name='"+inputName+"' value='"+ui.item.root+"' />");
                //Immediate create the hidden input field
            } 
            else {
                console.log(myChainCtr.find('.tag-'+ui.item.value+'-'+cleanText));
                myChainCtr.find('.chain-'+ui.item.value+'-'+cleanText).show('pulsate', 200);
            }
            return false;
        }
    });
}

function addAnswer(id, number, deletable) {
    var a_id = $('#answer-space-'+id).find('.answer-row').size();
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
        //initAnswerRow($('#question-'+id).find('.answer-row').last());
        initAnswerRow($('#answer-space-'+(id)).children('#answer-'+(a_id)));
        a_id++;
    }
    markUnsavedQuestion(id);
    initInput();
    refreshAnswerLetters(id);
    if($('.question-container').length == 1) {
        $('#control-panel').css({
            'left': $('#create-box').offset().left+945
        });
    }
    return false;
}

function removeQuestion(id)
{
    addQuestion.q_number--;
    $('#question-'+id).slideUp('fast', function() {
        $(this).remove();
        refreshQuestionNumbers();
    });
    $('#control-panel').css({
        'left': $('#create-box').offset().left+945
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
    var basicsPageErrors = false;
    var questionsPageErrors = false;
    flashMessage(data.message);
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
            questionsPageErrors = true;
        } else {
            onError.basicsPageError = false;
            for (fieldName in this) {
                element = $("#" + camelize(model + '_' + fieldName));
                _insert = $(document.createElement('div')).insertAfter(element);
                _insert.addClass('error-message').text(this[fieldName]);
                basicsPageErrors = true;
            //If we're on the Questions page let the user know the error is on the basics page
            }
            basicsPageErrors = true;
        }
        if(basicsPageErrors) $('#nav-basics').click();
        else if (questionsPageErrors) $('#nav-questions').click();
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
function  initRemoveTag($this, myTagInputCtr) {
    $this.click(function () {
        var myIdAndText = $this.parent().attr('class').substr(6);
//        var myTagInputCtr = $this.parent().next().next();
        //        $("#chain-"+tagId+"-"+tagText).remove(); 
//        $.each(tags['set'], function() {
//            if(this.id == tagId && this.text == tagText)
//                tags['set'].splice(tags['set'].indexOf(this),1);
//        });
        myTagInputCtr.find('.tag-'+myIdAndText).remove();
//        var cleanText = tagText.replace(/[^A-Za-z0-9]/g,"");
//        $('#tag-'+tagId+'-'+cleanText).remove();
        $this.parent().remove();
        return false;
    })
}

//$this is a JQuery object that refers to a particular question container
function initQuestionContainer($this) {
    $this.each(function () {
        $(this).find('.delete-question').click(function() {
            if($('.question-container').length == 1)
                return false;
            $(this).parents('.question-container').remove();
            refreshQuestionNumbers();
        });

        $(this).find('.toggle-explanation').click(function() {
            var explanationSpace = $(this).parents('.question-container').find('.explanation-space');
            if(explanationSpace.is(':visible')) {
                explanationSpace.hide();
                $(this).removeClass('toggle-explanation-on');
            }
            else {
                explanationSpace.show();
                $(this).addClass('toggle-explanation-on');
            }
        });
        var id = -1;
        $(this).find('.add-answer').click(function() {
            var qIndex = $(this).parents('.question-container').attr('id').substr(9);
            //alert(qIndex);
            if($('#answer-space-'+qIndex).children().length > 5) {
                return false;
            }
            addAnswer(qIndex, 1, true);
            id = qIndex;
        });
        
        $(this).hover(function() {
            $(this).find('.question-toolbar').show();
        }, function() {
            $(this).find('.question-toolbar').hide();
        });

        //ACTIVATE AUTOGROW
        $(this).find('.prompt').elastic();
        refreshAnswerLetters(id);
    });
}

function initAnswerRow($this) {
    $this.each(function () {
        //HOVER ANSWER ROW
        $(this).hover(function() {
            $(this).find('.answer-toolbar').show();
        }, function() {
            $(this).find('.answer-toolbar').hide();
        });

        //TOGGLE CORRECT CLICK
        $(this).find('.correct-toggle').click(function() {
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
        $(this).find('.delete-answer').click(function() {
            var qIndex = $(this).attr('name').substr(22);
            $(this).parents('.answer-row').remove();
            markUnsavedQuestion(qIndex);
            refreshAnswerLetters(qIndex);
        });
        //ACTIVATE AUTOGROW
        $(this).find('.answer-prompt').elastic();
    });
    
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
    if((number == addQuestion.maxQuestions || number == 1)) {
        $('#cp-message').css('color', '#F6402D');
    } else {
        $('#cp-message').css('color', '#D9D9D9');
    }
    $('#cp-message').html("Questions: "+number);
    if(number == 1) {
        $('#control-panel').css({
            'left': $('#create-box').offset().left+945
        });
    }
}
    function split( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        return split( term ).pop();
    }