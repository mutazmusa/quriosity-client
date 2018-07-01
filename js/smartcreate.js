/**
 * @author Mutaz Musa
 */
var tagArray = [];
function initPageJS2 () {
    initPageJS2.shouldReverse = true;
    $.fn.insertRoundCaret = function (tagStart, tagEnd) {
        return this.each(function(){
            strStart = tagStart;
            strEnd = tagEnd;
            if (document.selection) {
                //IE support
                stringBefore = this.value;
                this.focus();
                sel = document.selection.createRange();
                insertstring = sel.text;
                fullinsertstring = strStart + sel.text + strEnd;
                sel.text = fullinsertstring;
                document.selection.empty();
                initPageJS2.shouldReverse = false;
                $('#smartbox').focus();
                stringAfter = this.value;
                i = stringAfter.lastIndexOf(fullinsertstring);
                range = this.createTextRange();
                numlines = stringBefore.substring(0,i).split("\n").length;
                i = i+3-numlines+tagName.length;
                j = insertstring.length;
                range.move("character",i);
                range.moveEnd("character",j);
                range.select();
            } else if (this.selectionStart || this.selectionStart == '0') {
                //MOZILLA/NETSCAPE support
                if(this.selectionStart != this.selectionEnd) {
                    startPos = this.selectionStart;
                    endPos = this.selectionEnd;
                    scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + strStart + this.value.substring(startPos,endPos) + strEnd + this.value.substring(endPos,this.value.length);
                    initPageJS2.shouldReverse = false;
                    $('#smartbox').focus()
                    this.selectionStart = startPos + strStart.length ;
                    this.selectionEnd = endPos + strStart.length;
                    this.scrollTop = scrollTop;
                }
            } else {
                this.value += strStart + strEnd;
                initPageJS2.shouldReverse = false;
                $('#smartbox').focus();
            }
            initPageJS2.shouldReverse = true;
        });
    };
    
    function insertAtCaret(areaId,text) {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
            "ff" : (document.selection ? "ie" : false ) );
        if (br == "ie") { 
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            strPos = range.text.length;
        }
        else if (br == "ff") strPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0,strPos);  
        var back = (txtarea.value).substring(strPos,txtarea.value.length); 
        txtarea.value=front+text+back;
        strPos = strPos + text.length;
        if (br == "ie") { 
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            range.moveStart ('character', strPos);
            range.moveEnd ('character', 0);
            range.select();
        }
        else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    }

    /*GENERAL*/
    $('#smartbox').elastic();
    $('#smartbox').blur(function() {
        if($('#smartbox').val() == '') {
            $('#smartbox').val('Type in your questions...');
        } else {
            processSmartBox();
        }
    });
    $('#smartbox').focus(function() {
        if($('#smartbox').val() == 'Type in your questions...') {
            $('#smartbox').val('');
        }
        safeSmartBoxFocus(initPageJS2.shouldReverse);
    });

    /*SB CONTROL PANEL*/
    $('#sb-group-selection').click(function() {
        $('#smartbox').insertRoundCaret('[[', ']]');
        processSmartBox();
    });
    $('#sb-mark-correct').click(function() {
        $('#smartbox').insertRoundCaret('*', '');
        processSmartBox();
    });
    $('#sb-mark-explanation').click(function() {
        $('#SMARTBOX').INSERTrOUNDcARET('?', '');
        processSmartBox();
    });
    $('#sb-process').click(function() {
        $('#loading-img').show();
        processSmartBox();
    });
    $('#sb-toggle-help').click(function() {
        if($('#sb-help').is(':visible')) {
            $('#sb-help').slideUp('fast');
            $('#control-panel').css({
                'top': $(window).scrollTop()+280+"px"
            });
        }
        else
            $('#sb-help').slideDown('fast');
    });
    $('#sb-showme').click(function() {
        $('#smartbox').val($('#sb-demo').html());
        processSmartBox();
    });

    /*JKEY and KEYUP*/
    $('#smartbox').keyup(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) { //Enter keycode
            $('#loading-img').show();
            processSmartBox();
        }
    });
    $('#smartbox').jkey('ctrl+p',function(){
        $('#loading-img').show();
        processSmartBox();
    });
    $('#smartbox').jkey('ctrl+g',function(){
        $('#sb-group-selection').click();
    });
    $('#smartbox').jkey('ctrl+h',function(){
        $('#sb-toggle-help').click();
    });
    $('#smartbox').jkey('ctrl+8',function(){
        $('#sb-mark-correct').click();
    });
    $('#smartbox').jkey('ctrl+?',function(){
        $('#sb-mark-explanation').click();
    });

    /*MAIN CONTROL PANEL*/
    $('#toggle-smartbox').click(function() {
        if($('#sb-container').is(':visible')) {
            //            $('#sb-container').slideUp('fast');
            $('#sb-container').hide();
        }
        else
            $('#sb-container').show();
        //            $('#sb-container').slideDown('fast');
        var createBoxOffset = $('#create-box').offset();
        $('#control-panel').css({
            'left': createBoxOffset.left+945
        });
    });

    function processSmartBox() {
        $('#loading-img').show();
        var content = $('#smartbox').val().trim().split("\n");
        //console.log(exploded);
        var openGroup = false;
        var buffer = '';
        var aCount = 0;
        var qCount = 0;
        var result =  {};
        result[qCount] = {
            'prompt':'',
            'explanation':'',
            'correct':'',
            'answers': {}
        };
        result[qCount]['answers'][aCount] = {
            'prompt':''
        }
        for ($this in content) {
            //            console.log(content[$this]);
            if(openGroup) { //If group is open
                if(content[$this].substr(-2) == "]]") { //If group is NOW closed
                    openGroup = false;
                    if(result[qCount]['prompt'] == '') { //If we lack a qPrompt
                        result[qCount]['prompt'] = buffer + content[$this];
                        buffer = '';
                        result[qCount]['prompt'] = result[qCount]['prompt'].substr(2,result[qCount]['prompt'].length-4);
                        continue;
                    } else {
                        buffer = buffer + content[$this];
                        if(buffer.substr(2,1) == "?") { //If this is an explanation
                            result[qCount]['explanation'] = buffer.substr(3, buffer.length-5);
                            buffer = '';
                            continue;
                        } else {
                            if(buffer.substr(2,1) == "*") { //If starts with "*"
                                result[qCount]['correct'] = aCount;
                                result[qCount]['answers'][aCount]['prompt'] = buffer.substr(3,buffer.length-5);
                            } else {
                                result[qCount]['answers'][aCount]['prompt'] = buffer.substr(2,buffer.length-4);
                            }
                            aCount++;
                            expandResultObject(result, qCount, aCount, true)
                            buffer = '';
                            continue;
                        }
                    }
                } else {
                    buffer = buffer + content[$this] + "\n";
                }
            } else {
                if(content[$this].substr(0,2) == "[[") { //If group is NOW open
                    openGroup = true;
                    if(content[$this].substr(-2) == "]]") { //If group is NOW closed
                        openGroup = false;
                        if(result[qCount]['prompt'] == '') { //If we lack a qPrompt
                            result[qCount]['prompt'] = content[$this];
                            result[qCount]['prompt'] = result[qCount]['prompt'].substr(2,result[qCount]['prompt'].length-4);
                            continue;
                        } else {
                            buffer = buffer + content[$this];
                            if(buffer.substr(2,1) == "?") { //If this is an explanation
                                result[qCount]['explanation'] = buffer.substr(3, buffer.length-5);
                                buffer = '';
                                continue;
                            } else {
                                if(buffer.substr(2,1) == "*") { //If starts with "*"
                                    result[qCount]['correct'] = aCount;
                                }
                                result[qCount]['answers'][aCount]['prompt'] = buffer.substr(3,buffer.length-5);
                                aCount++;
                                expandResultObject(result, qCount, aCount, true)
                                buffer = '';
                                continue;
                            }
                        }
                    } else {
                        buffer = buffer + content[$this] + "\n";
                        continue;
                    }
                } else {
                    if(content[$this] == '') { //If $this=""
                        if(priorNewLine == false) { //If priorNewLine==false
                            qCount++;
                            aCount = 0;
                            expandResultObject(result, qCount, aCount, false)
                        }
                        priorNewLine = true;
                        continue;
                    } else {
                        if(result[qCount]['prompt'] == '') { //If we lack a qPrompt
                            result[qCount]['prompt'] = content[$this];
                            priorNewLine = false;
                            continue;
                        } else {
                            if(content[$this].substr(0,1) == "?") { //If this is an explanation
                                result[qCount]['explanation'] = content[$this].substr(1);
                                priorNewLine = false;
                                continue;
                            } else {
                                result[qCount]['answers'][aCount]['prompt'] = content[$this];
                                if(content[$this].substr(0,1) == "*") { //If starts with "*"
                                    result[qCount]['correct'] = aCount;
                                    result[qCount]['answers'][aCount]['prompt'] = content[$this].substr(1);
                                }
                                aCount++;
                                expandResultObject(result, qCount, aCount, true)
                                priorNewLine = false;
                                continue;
                            }
                        }
                    }

                }

            }
        }
        trimResult(result);
        renderResult(result);
        $('#loading-img').hide();
    }
    
    function expandResultObject(result, qCount, aCount, answerOnly) {
        if(answerOnly) {
            result[qCount]['answers'][aCount] = {
                'prompt':''
            }
        } else {
            result[qCount] = {
                'prompt':'',
                'explanation':'',
                'correct':'',
                'answers': {}
            };
            result[qCount]['answers'][aCount] = {
                'prompt':''
            }
        }
    }

    function trimResult(result) {
        for(qCount in result) {
            for(aCount in result[qCount]['answers']) {
                if(result[qCount]['answers'][aCount]['prompt'] == '')
                    delete result[qCount]['answers'][aCount];
            }
        }
    }

    function renderResult(result) {
        $('#question-space').html("");
        //        var qmarkk = $('#sb-settings-qmark').val();
        
        //We want to preserve tag chains and inputs
        $('.question-container').each(function() {
            tagArray.push($(this).find('.tag-space'));
        });
        
        var qmark = /^[0-9][.]/i;
        var amark = /^[a-zA-Z][.]/i;
        for(qCount in result) {
            if(qCount>19) break;
            result[qCount]['prompt'] = $.trim(result[qCount]['prompt']);
            result[qCount]['prompt'] = result[qCount]['prompt'].replace(result[qCount]['prompt'].match(qmark), "");
            result[qCount]['prompt'] = $.trim(result[qCount]['prompt']);
            
            var question = "<div class='full-question question-container' id='question-"+(qCount)+"'>\
                            <div class='question-head'>\
                                <span class='question-label'></span>\
                                <div class='question-toolbar'>\
                                    <div class='delete-question' id='delete-question-index-"+(qCount)+"'></div>\
                                    <div class='add-answer'></div>\
                                </div>\
                            </div>\
                            <div class='question-body'>\
                                <div class='question-prompt form-row'>\
                                    <textarea id='Question"+(qCount)+"Prompt' cols='' rows='' class='input-inside prompt' name='data[Question]["+(qCount)+"][prompt]'>"+(result[qCount]['prompt'])+"</textarea>\n\
                                    <input type='hidden' id='Question"+(qCount)+"QuestionId' value='0' name='data[Question]["+(qCount)+"][question_id]'>\n\
                                    <input type='hidden' value='"+(result[qCount]['correct'])+"' name='data[Question]["+(qCount)+"][Answer][correct]' id='hidden-correct-"+(qCount)+"'>\
                                </div>\
                                <div id='answer-space-"+(qCount)+"'>";
            for(aCount in result[qCount]['answers']) {
                if(aCount>5) break;
                var deleteButton = '';
                if(aCount > 1)
                    deleteButton = "<div class='delete-answer' name='delete-question-index-"+(qCount)+"' id='delete-answer-index-"+(aCount)+"'></div>";
                var correct = '';
                if(result[qCount]['correct'] == aCount)
                    correct = 'correct-answer';
                
                //Trim and delete answer beginnings
                result[qCount]['answers'][aCount]['prompt'] = $.trim(result[qCount]['answers'][aCount]['prompt']);
                result[qCount]['answers'][aCount]['prompt'] = result[qCount]['answers'][aCount]['prompt'].replace(result[qCount]['answers'][aCount]['prompt'].match(amark), "");
                result[qCount]['answers'][aCount]['prompt'] = $.trim(result[qCount]['answers'][aCount]['prompt']);
                var answer = "<div class='form-row answer-row "+(correct)+"' id='answer-"+(aCount)+"'>\n\
                              <span class='form-label answer-label'></span>\
                              <span class='answer-toolbar'>\
                              <div class='correct-toggle' name='correct-toggle-question-index-"+(qCount)+"' id='correct-toggle-answer-index-"+(aCount)+"'></div>\
                              " + deleteButton + "\
                              </span>\
                              <span class='input'>\n\
                                <textarea id='Question"+(qCount)+"Answer"+(aCount)+"Prompt' cols='30' rows='1' class='input-inside answer-prompt' name='data[Question]["+(qCount)+"][Answer]["+(aCount)+"][prompt]'>"+(result[qCount]['answers'][aCount]['prompt'])+"</textarea>\
                                <input type='hidden' id='Question"+(qCount)+"Answer"+(aCount)+"AnswerId' value='0' name='data[Question]["+(qCount)+"][Answer]["+(aCount)+"][answer_id]'>\n\
                              </span>\
                              </div>";
                question = question + answer;
            }
            question = question + "</div>\
                                <div id='explanation-"+(qCount)+"' class='explanation-space'>\
                                    <div class='form-row'>\
                                        <span class='explanation-label'>Explanation</span>\
                                        <span class='input'>\n\
                                            <textarea id='Question"+(qCount)+"Explanation' cols='30' rows='1' class='input-inside prompt' name='data[Question]["+(qCount)+"][explanation]'>"+(result[qCount]['explanation'])+"</textarea>\n\
                                        </span>\
                                    </div>\
                                </div>\
                            </div>\
                            </div>";
            $('#question-space').append(question);
            initQuestionContainer($('.question-container:last'));
            markUnsavedQuestion(qCount);
            refreshAnswerLetters(qCount);
        }
        refreshQuestionNumbers();
        initInput();
        $('.answer-row').each(function() {
            initAnswerRow($(this));
        });
        $('.hidden-elastic').each(function () {
            $(this).html("");
        });
        $('#question-space').fadeIn('fast');
    }

    /*CONSIDER PARSING DIRECTLY TO TEXT*/
    function reverseProcess() {
        var qCount = 0;
        var aCount = 0;
        var result = {};
        result[qCount] = {
            'prompt':'',
            'explanation':'',
            'correct':'',
            'answers': {}
        };
        result[qCount]['answers'][aCount] = {
            'prompt':''
        }
        var questions = $('.full-question');
        questions.each(function() {
            //Parse Question Prompts
            var questionPrompt = $(this).find('.question-prompt').children('textarea').val();
            if(questionPrompt != '') {
                result[qCount]['prompt'] = questionPrompt;
            }

            //Parse Explanation
            var explanation = $(this).find('.explanation-space').find('textarea').val();
            result[qCount]['explanation'] = explanation;
            
            //Parse Correct Answer
            var correct = $(this).find(('input[id^="hidden-correct"]')).val();
            result[qCount]['correct'] = correct;

            //Parse Answer Prompts
            var answers = $(this).find('.answer-row');
            answers.each(function() {
                var answerPrompt = $(this).find('textarea').val();
                result[qCount]['answers'][aCount]['prompt'] = answerPrompt;
                aCount++;
                expandResultObject(result, qCount, aCount, true)
            });
            qCount++;
            aCount = 0;
            expandResultObject(result, qCount, aCount, false);
        });

        //Now to populate SmartBox
        var text = '';
        var buffer = '';
        for(question in result) {
            if(result[question]['prompt'] == "") continue;
            //Populate question prompt
            buffer = result[question]['prompt'];
            if(result[question]['prompt'].indexOf("\n") != -1) { //If there's a new line surround with [[ ]]'
                buffer = "[[" + buffer + "]]";
            }
            text = text + buffer + "\n";

            //Populate answer prompt
            for(answer in result[question]['answers']) {
                if(result[question]['answers'][answer]['prompt'] == "") continue;
                buffer = result[question]['answers'][answer]['prompt'];
                if(result[question]['correct'] == answer) {
                    buffer = "*" + buffer;
                }
                if(buffer.indexOf("\n") != -1) {
                    buffer = "[[" + buffer + "]]";
                }
                text = text + buffer + "\n";
            }

            //Populate explanation
            if(result[question]['explanation'] != "") {
                buffer = "?" + result[question]['explanation'];
                if(buffer.indexOf("\n") != -1) {
                    buffer = "[[" + buffer + "]]";
                }
                text = text + buffer + "\n";
            }
            text = text + "\n";
        }
        $('#smartbox').val(text);
    }

    //Change the function triggered by smartbox.focus(), trigger smartbox.focus()
    //then revert back to the original function
    function safeSmartBoxFocus(shouldReverse) {
        if(shouldReverse) reverseProcess();
    }

    if(editing) reverseProcess();
}