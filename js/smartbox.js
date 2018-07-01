/////Smart create shit   
function processSmartBox() {
        var content = $('#smartbox').val().trim().split("\n");
        var openGroup = false;
        var buffer = '';
        var aCount = 0;
        var qCount = 0;
        var result =  {};
        var priorNewLine = true;
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
        
        return result;
        //renderResult(result);
        //$('#loading-img').hide();
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
        //Get rid of stray empty fields
        for(qCount in result) {
            for(aCount in result[qCount]['answers']) {
                if(result[qCount]['answers'][aCount]['prompt'] == '') {
                    delete result[qCount]['answers'][aCount];
                } else {
                    //Replace letter  followed by . and space at the start of the line
                    result[qCount]['answers'][aCount]['prompt'] = 
                        result[qCount]['answers'][aCount]['prompt'].replace(/^[a-zA-Z]\. /i, '');
                }
            }
            //Replace digit followed by . and space at the start of the line
            result[qCount]['prompt'] = result[qCount]['prompt'].replace(/^\d+\. /, '');
        }

        return result;
    }

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
                //initPageJS2.shouldReverse = false;
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
                    //initPageJS2.shouldReverse = false;
                    $('#smartbox').focus()
                    this.selectionStart = startPos + strStart.length ;
                    this.selectionEnd = endPos + strStart.length;
                    this.scrollTop = scrollTop;
                }
            } else {
                this.value += strStart + strEnd;
                //initPageJS2.shouldReverse = false;
                $('#smartbox').focus();
            }
            //initPageJS2.shouldReverse = true;
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