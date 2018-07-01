/**
 * @author Mutaz Musa
 */
var a_id = 1;

$(document).ready(function()
{
    RefreshQuestionNumbers();
    refreshAnswerLetters(0);
    refreshAnswerLetters(1);

    $('#submitreset').css({
        'top':($(window).scrollTop()+$(window).height()-$('#submitreset').outerHeight())+"px"
    },{
        queue: false,
        duration: 350
    });
    $("#createSetForm").validate();
}
);
//scroll the message box to the top offset of browser's scrool bar
$(window).scroll(function()
{
    $('#controlpanel').animate({
        'top':$(window).scrollTop()+"px"
    },{
        queue: false,
        duration: 350
    });
    $('#submitreset').animate({
        'top':($(window).scrollTop()+$(window).height()-$('#submitreset').outerHeight())+"px"
    },{
        queue: false,
        duration: 350
    });
    $('#messagebox').animate({
        'top':$(window).scrollTop()+100+"px"
    },{
        queue: false,
        duration: 350
    });
});

function AddQuestion()
{
    //Initialize the static variable that will keep track of the NUMBER of questions
    if ( typeof AddQuestion.q_number == 'undefined' ) {
        AddQuestion.q_number = 0;
    }

    //Initialize the static variable that will keep track of the INDEX of the next question
    if ( typeof AddQuestion.nextQIndex == 'undefined' ) {
        AddQuestion.nextQIndex = 1;
    }
    var id = AddQuestion.nextQIndex;
	
    $("#question_space").append("<div id='question"+(id)+"' class='full_question'>\
<table class='questionsform'>\
	<tr>\
		<td valign='top'><span name='qNumberLabel'></span><br/>Prompt:</td>\
		<td><textarea name='data[Question]["+(id)+"][prompt]' rows='10' cols='40'></textarea></td>\
		<td valign='bottom'>Correct Choice</td>\
	</tr>\n\
</table>\
<table  name='answerSpace"+(id)+"'>\n\
<tr>\
		<td valign='top'><span class='aLetterLabel'>A</span></td>\
		<td><input type='text' name='data[Question]["+(id)+"][Answer]["+(a_id)+"][prompt]' />\
		<td align='center'><input type='radio' name='data[Question]["+(id)+"][Answer][correct]' value='"+ (a_id++) +"' CHECKED /></td>\
	</tr>\
	<tr>\
		<td valign='top'><span class='aLetterLabel'>B</span></td>\
		<td><input type='text' name='data[Question]["+(id)+"][Answer]["+ (a_id) +"][prompt]' />\n\
		<td align='center'><input type='radio' name='data[Question]["+(id)+"][Answer][correct]' value='"+ (a_id++) +"' /></td>\
	</tr>\
</table>\n\
<table>\
<tr>\
		<td valign='top'>Explanation:</td>\
		<td><textarea name='data[Question]["+(id)+"][explanation]' rows='2' cols='20'></textarea></td>\
		<td></td>\
	</tr>\
</table>\
<input type='button' value='Remove Question' name='remove_q' onclick='RemoveQuestion(\"#question"+(id)+"\");'> \
<input type='button' value='Add Answer' name='add_a' onclick='addAnswer("+(id)+");'> \
</div>\
	");
    $('#question'+id).slideDown('slow');
    AddQuestion.q_number++;
    AddQuestion.nextQIndex++;
    document.getElementById("q_number").innerHTML = AddQuestion.q_number;
    refreshQuestionNumbers();
}

function addAnswer(id) {
    $("[name=answerSpace"+id+"]").append("\
<tr id='answer"+(a_id)+"'>\
		<td valign='top'><span class='aLetterLabel'></span></td>\
		<td><input type='text' name='data[Question]["+(id)+"][Answer]["+(a_id)+"][prompt]' /></td>\n\
		<td align='center'><input type='radio' name='data[Question]["+(id)+"][Answer][correct]' value='"+ (a_id) +"'>\n\
<input type='button' onclick='removeAnswer("+(a_id++)+","+(id)+");' value='del' /></td>\
</tr>");
    refreshAnswerLetters(id);
}

function RemoveQuestion(id)
{
    AddQuestion.q_number--;
    document.getElementById("q_number").innerHTML = AddQuestion.q_number;
    $(id).slideUp('fast', function() {
        $(id).remove();
        RefreshQuestionNumbers();
    });
}

function removeAnswer(a_id, id) {
    $("#answer"+a_id).remove();
    refreshAnswerLetters(id);
}

function RefreshQuestionNumbers()
{
    var question_number = 1;
    var qNumberSpans = $("span[name='qNumberLabel']");
    for (var i=0;i<qNumberSpans.length;i++)
    {
        qNumberSpans[i].innerHTML = "Question "+question_number;
        question_number++;
    }
}

function refreshAnswerLetters(id) {
    var letterAscii = 65;
    var aTable = $("table[name='answerSpace"+(id)+"']");
    var aLabels = $(aTable).find('.aLetterLabel');
    for(var c=0;c<aLabels.length;c++) {
        $(aLabels[c]).html(itoc(letterAscii++));
    }
}

function SaveQuiz()
{
    $.post("save", $("#createSetForm").serialize(), function(data)
    {
        if(data.length > 0)
        {
            $('#messagebox').html(data);
            $('#messagebox').slideDown('fast');
            if(data.search(/Congratulations/) != -1)
            {
        //$('#savebutton').attr('disabled','disabled');
        //$('#savebutton').attr('class','disabled');
        //setTimeout("window.location='list.php'", 3000);
        }
        }
        else $('#messagebox').slideUp('fast');
    });
}

function clearQuiz()
{
    //Clear the quiz
    var inputs = document.getElementsByTagName('input');
    var textareas = document.getElementsByTagName('textarea');
    for (var i=0;i<inputs.length;i++)
    {
        if(inputs[i].type.indexOf("text") == 0)
        {
            inputs[i].value = '';
        }
    }
    for (var i=0;i<textareas.length;i++)
    {
        textareas[i].value = '';
    }
}

function itoc(i) {
    return String.fromCharCode(i);
}