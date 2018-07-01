/**
 * @author Mutaz Musa
 */
var expressMode = 1;
var correct = {};
var countCorrect = 0;
var countIncorrect = 0;
var timeElapsed = [0,0,0,0,0];
var firstAnswer = [0,0,0,0,0];
var reportGenerated = false;
var globalResponse = [];
var missed = [];
var noq = 0;
var missedCount = 0;
var correctCount = 0;
var incorrectCount = 0;
var publicScore = 0;
//var noq = 5;
//var missedCount = 1;
//var correctCount = 3;
//var incorrectCount = 1;
var dummyData = {
    "noq":"5",
    "stats":{
        "1364":{
            "time_taken":"11",
            "user_choice":"3954",
            "tags":["Management","endocrinology","Diagnosis"],
            "history":{
                "time_taken":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","4","4","0","177","11","11","8","2","89","4","103","75","13","35","15","8","88","1","2","1","32","1","1","1","4","22","1","1","1","1","1","1","2","4","2","51","12","15","35","4","2","2","4","3","1","1","2","10","1","2","9","2","1","1","1","4","35","6","10","1","2","6","2","1","5","5","0","1","1","1","2","10","1","1","1","4","1","1","1","1","7","1","1","1","1","5","1","1","1","1","1","1","1","1","1","15","19","7","44","2","5","2","5","2","1","3","3","33","1","29","0","1","1","1","0","5","0","0","5","4","0","3","0","0","1","2","0","45","12","10","2","1","1","28","80","3","3","3","3","3","3","3","3","3","3","3","4","4","33","2","9","4","5","8","7","11"]
            },
            "correct_answer":"3955",
            "answered_correctly":"92",
            "answered_incorrectly":"71",
            "answers":{
                "3954":{
                    "times_chosen":"29"
                },
                "3955":{
                    "times_chosen":"109"
                },
                "3956":{
                    "times_chosen":"15"
                },
                "3953":{
                    "times_chosen":"10"
                }
            }
        },
        "1366":{
            "time_taken":"2",
            "user_choice":"3962",
            "tags":["Screening"],
            "history":{
                "time_taken":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2","2","2","2","2","1","2","1","1","23","82","1","7","14","22","38","1","1","1","1","0","0","1","1","1","1","2","0","1","15","14","1","2","3","0","0","3","1","2","2","0","1","1","0","0","0","1","1","0","0","0","1","1","0","0","1","2","1","2","0","0","0","1","0","1","1","0","1","3","0","29","1","2","2","2","1","2","2","0","1","0","0","0","0","0","0","1","0","0","18","2","9","2","0","0","1","1","1","1","1","1","1","1","1","1","1","1","4","4","4","4","4","3","3","3","3","3","3","3","3","1","1","2","0","2","3","3","6","2"]
            },
            "correct_answer":"3961",
            "answered_correctly":"46",
            "answered_incorrectly":"75",
            "answers":{
                "3961":{
                    "times_chosen":"22"
                },
                "3962":{
                    "times_chosen":"66"
                },
                "3963":{
                    "times_chosen":"22"
                },
                "3964":{
                    "times_chosen":"8"
                },
                "3965":{
                    "times_chosen":"3"
                }
            }
        },
        "1367":{
            "time_taken":"10",
            "user_choice":"3968",
            "tags":["Diagnosis"],
            "history":{
                "time_taken":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2","0","5","0","1","26","0","1","1","1","0","2","0","0","0","11","1","2","6","1","0","1","6","1","1","5","0","4","2","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","9","3","0","0","0","2","7","0","1","0","2","3","0","0","0","2","0","5","1","59","2","1","1","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","0","0","0","1","1","2","0","1","1","1","1","5","1"]
            },
            "correct_answer":"3968",
            "answered_correctly":"38",
            "answered_incorrectly":"60",
            "answers":{
                "3966":{
                    "times_chosen":"3"
                },
                "3967":{
                    "times_chosen":"26"
                },
                "3968":{
                    "times_chosen":"54"
                },
                "3969":{
                    "times_chosen":"13"
                },
                "3970":{
                    "times_chosen":"2"
                }
            }
        },
        "1368":{
            "time_taken":"2",
            "user_choice":"3971",
            "tags":["Etiology"],
            "history":{
                "time_taken":["0","0","0","0","0","0","0","0","0","0","0","0","6","6","6","0","1","3","1","0","3","0","0","0","1","1","1","1","0","3","0","2","1","1","1","1","3","1","1","1","1","1","2","1","1","1","0","0","0","0","0","0","0","0","0","0","1","3","1","1","2","0","2","0","1","1","0","0","0","2","0","0","0","29","2","1","1","1","1","0","0","0","0","0","0","0","0","0","1","1","0","0","1","0","0","0","2"]
            },
            "correct_answer":"3971",
            "answered_correctly":"36",
            "answered_incorrectly":"50",
            "answers":{
                "3971":{
                    "times_chosen":"46"
                },
                "3972":{
                    "times_chosen":"8"
                },
                "3973":{
                    "times_chosen":"17"
                },
                "3974":{
                    "times_chosen":"13"
                },
                "3975":{
                    "times_chosen":"2"
                }
            }
        },
        "1369":{
            "time_taken":"13",
            "user_choice":"3977",
            "tags":["Complications"],
            "history":{
                "time_taken":["0","0","0","0","0","0","0","0","0","2","2","2","3","1","4","7","9","1","7","1","0","0","2","0","1","2","0","7","0","3","1","1","2","2","3","1","2","1","1","1","2","1","1","1","3","0","1","11","7","3","2","1","2","2","0","2","0","0","1","6","2","1","0","1","0","0","1","0","0","1","1","1","0","13"]
            },
            "correct_answer":"3977",
            "answered_correctly":"36",
            "answered_incorrectly":"38",
            "answers":{
                "3976":{
                    "times_chosen":"15"
                },
                "3977":{
                    "times_chosen":"46"
                },
                "3978":{
                    "times_chosen":"11"
                },
                "3979":{
                    "times_chosen":"2"
                },
                "3980":{
                    "times_chosen":"0"
                }
            }
        }
    },
    "explanations":{
        "1369":"Of the 300,000 patients in the United States with end-stage renal disease (ESRD), one-third of those have their disease due to diabetic nephropathy. While the other listed answers may cause ESRD, diabetes is the most common cause.<br\/><br\/><br\/><br\/>Diabetic Nephropathy: http:\/\/www.ncbi.nlm.nih.gov\/pubmedhealth\/PMH0001524\/"
    },
    "correctAnswers":{
        "1369":"3977"
    },
    "historyId":"1052",
    "userAnswers":{
        "1369":"3977"
    },
    "complete":true,
    "setHistory":{
        "notMe":{
            "number_correct":["1","0","1","0","0","1","1","0","1","0","1","0","1","0","1","0","0","1","0","1","0","1","0","0","0","0","1","0","1","0","0","0","1","1","1","1","0","1","1","0","0","1","0","0","1","1","0","1","1","0","0","1","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","1","0","0","0","1","0","0","0","0","1","1","0","0","1","0","1","1","0","0","1","1","1","1","1","1","1","1","0","0","0","1","0","1","0","1","1","0","0","0","0","0","0","0","1","0","1","0","1","1","1","1","1","1","1","1","0","0","0","1","0","1","0","0","1","0","0","1","1","0","0","0","1","1","1","0","0","0","1","1","1","0","1","1","0","0","1","1","0","0","1","0","1","0","0","0","0","1","0","1","2","0","2","2","2","1","0","0","1","0","1","1","3","0","1","3","2","2","4","3","1","5","0","1","0","0","0","1","0","0","0","1","1","0","0","1","1","3","4","0","3","4","3","0","3","2","2","1","1","0","1","1","1","2","0","0","0","2","1","0","2","1","0","0","1","1","0","0","1","1","0","1","1","5","1","0","4","0","4","5","1","2","3","1","1","2","2","3","1","0","1","0","0","0","1","2","4","4","0","0","1","0","0","0","2","1","0","1","1","4","4","2","2","1","0","2","0","1","0","1","0","1","0","1","0","1","2","4","0","1","2"]
        },
        "me":{
            "number_correct":["1","1","0","1","0","1","0","0","1","0","1","3","4"]
        }
    },
    "username":"ColumbiaUniversity"
};

function initPageJS() {
    $('#generate-report').click(function () {
        $('#analyzeSetForm').submit();
        return false;
    });
    $('#setHistoryId').val(0);
    //Render Stats Table
    var setData = {
        "stats":{
            "1366":{
                "answered_correctly":"7",
                "answered_incorrectly":"18",
                "answers":{
                    "3961":{
                        "times_chosen":"0"
                    },
                    "3962":{
                        "times_chosen":"25"
                    },
                    "3963":{
                        "times_chosen":"0"
                    },
                    "3964":{
                        "times_chosen":"0"
                    },
                    "3965":{
                        "times_chosen":"0"
                    }
                }
            },
            "1364":{
                "answered_correctly":"22",
                "answered_incorrectly":"17",
                "answers":{
                    "3954":{
                        "times_chosen":"0"
                    },
                    "3955":{
                        "times_chosen":"39"
                    },
                    "3956":{
                        "times_chosen":"0"
                    },
                    "3953":{
                        "times_chosen":"0"
                    }
                }
            },
            "1367":{
                "answered_correctly":"6",
                "answered_incorrectly":"14",
                "answers":{
                    "3966":{
                        "times_chosen":"0"
                    },
                    "3967":{
                        "times_chosen":"0"
                    },
                    "3968":{
                        "times_chosen":"20"
                    },
                    "3969":{
                        "times_chosen":"0"
                    },
                    "3970":{
                        "times_chosen":"0"
                    }
                }
            },
            "1368":{
                "answered_correctly":"10",
                "answered_incorrectly":"10",
                "answers":{
                    "3971":{
                        "times_chosen":"20"
                    },
                    "3972":{
                        "times_chosen":"0"
                    },
                    "3973":{
                        "times_chosen":"0"
                    },
                    "3974":{
                        "times_chosen":"0"
                    },
                    "3975":{
                        "times_chosen":"0"
                    }
                }
            },
            "1369":{
                "answered_correctly":"7",
                "answered_incorrectly":"10",
                "answers":{
                    "3976":{
                        "times_chosen":"0"
                    },
                    "3977":{
                        "times_chosen":"17"
                    },
                    "3978":{
                        "times_chosen":"0"
                    },
                    "3979":{
                        "times_chosen":"0"
                    },
                    "3980":{
                        "times_chosen":"0"
                    }
                }
            }
        },
        "explanations":{
            "1369":"Of the 300,000 patients in the United States with end-stage renal disease (ESRD), one-third of those have their disease due to diabetic nephropathy. While the other listed answers may cause ESRD, diabetes is the most common cause.<br\/><br\/><br\/><br\/>Diabetic Nephropathy: http:\/\/www.ncbi.nlm.nih.gov\/pubmedhealth\/PMH0001524\/"
        },
        "correctAnswers":{
            "1369":"3977"
        },
        "historyId":"734",
        "userAnswers":{
            "1369":"3977"
        },
        "complete":true,
        "username":"person"
    };    
    
    $('#brain').click(function () {
        //        renderTables(dummyData);
        });
    
    var newYear = new Date(); 
    //    newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1);
    $("#clock").countdown({
        since: newYear, 
        compact: true, 
        layout: '{hnn}{sep}{mnn}{sep}{snn}',
        onTick: addToCurrentQ
    //        onTick: highlightEnd
    });

    function addToCurrentQ() {
        var currentQ = pageselectCallback.old_index;
        timeElapsed[currentQ] += 1;
    }
    function highlightEnd(periods) {
        if ($.countdown.periodsToSeconds(periods) == 10*60) { 
            $(this).css('color', 'red'); 
        } 
    }
    $(window).focus(function() {
        $("#clock").countdown('resume');
        $(this).css('color', '#3e3e3e'); 
    });
    $(window).blur(function() {
        $("#clock").countdown('pause');
        $(this).css('color', 'lightgray'); 
    });
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
            $(window).scrollLeft()) + "px");
        return this;
    }
    $('#toggle-book').click(function () {
        if($("#book-container").is(':visible')) {
            $("#book-container").hide();
        } else {
            //show
            $("#book-container").css('display', 'block');
        }
    });
    $('.answer-prompt').bind('contextmenu', function(){
        return false
    });
    if(typeof initPagination.express == 'undefined') {
        $(window).resize(function() {
            adjustLeftRightFloat();
            $(window) .scroll();
        });
        var viewBoxOffset = $('#view-box').offset();
        $('#control-panel').css('left',$('#view-box').width() + viewBoxOffset.left - 5);
        $('#control-panel').css('top',viewBoxOffset.top + 100);
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
        //            $('html, body').animate({
        //                scrollTop: $('#meta-description').offset().top
        //            }, 500); 
            
        });
        $('#prev-question').click(function() {
            //            $('html, body').animate({
            //                scrollTop: $('#meta-description').offset().top
            //            }, 500); 
            $('.prev').click();
        });
    } else {
    }
    initPagination();
    if(typeof isHistory != 'undefined') {
        $(":radio").attr('disabled', true);
    } else {
        $(":input").attr('disabled', false);
        $(':input').attr('checked', false);
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
    $('#open-book-container').click(function () {
        if(!$(this).is('.selected')) {
            $('#closed-book-container').removeClass('selected');
            $(this).addClass('selected');
            $('#openBook').val(1);
        }
    });
    $('#closed-book-container').click(function () {
        if(!$(this).is('.selected')) {
            $('#open-book-container').removeClass('selected');
            $(this).addClass('selected');
            $('#openBook').val(0);
        }
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
        if($('#stats-advanced').is(':visible')) {
            $('#stats-advanced').slideUp();
        } else if (!reportGenerated) {
            $('#generating').center().fadeIn().delay(3000).fadeOut();
            $('#overlay').show().delay(4000).fadeOut(10, function () {
                $('#stats-advanced').slideDown(1, function () {
                    renderTables(globalResponse);
                    renderGraphs(globalResponse);
                //                renderTables(dummyData);
                //                renderGraphs(dummyData);
                });
                reportGenerated = true;
            });
        } else {
            $('#stats-advanced').slideDown();
        }
    });
    function showAdvancedStats() {
        $('#stats-advanced').slideDown();
    }
    $('#clock-button').click(function () {
        if($("#clock-container").is(':visible')) {
            $("#clock-container").hide();
        } else {
            //show
            $("#clock-container").css('display', 'block');
        }
    });
    $('a[id^="nav-"]').click(function () {
        $('html, body').animate({
            scrollTop: $('#target-'+$(this).attr('id').substr(4)).offset().top
        }, 1500); 
        return false;
    });
    $('.nav-general').click(function() {
        $('html, body').animate({
            scrollTop: $('#target-general').offset().top
        }, 1500); 
        return false;
    });
    $('#expand-button').click(function () {
        if($('#page-right').is(':visible')) {
            $('#page-right').hide();
            $('#page-left').animate({
                width: '100%'
            }, 100);
            $('#meta-description').animate({
                width: '890px'
            }, 100);
            //            $('#page-left').css('float', 'none');
            $('.fb-comments').animate({
                width: '100%'
            }, 100);
        } else {
            $('#page-left').css({
                width: '580px'
            });
            $('#meta-description').css({
                width: '560px'
            });
            $('#page-right').css('display', 'inline-block');
        }
    });
    //    $('#overlay').click(function(){
    //        $("#overlay").fadeOut();
    //        $('#stats-strip').fadeOut();
    //    });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        });

    adjustLeftRightFloat();
    if(typeof initPagination.express == 'undefined') {
        $(window).jkey('right',function(){
            $('#next-question').click();
        });
        $(window).jkey('left',function(){
            $('#prev-question').click();
        });
    }
    $('#quick-next-question').click(function() {
        $('#next-question').click();
        $(this).blur();
        return false;
        
    });
    $('#quick-prev-question').click(function() {
        $('#prev-question').click();
        $(this).blur();
        return false;
    });
    $('.answer-row').bind("contextmenu",function(e){
        //return false;
        });
    $('.answer-row').click(function(e) {
        if(score.submitted) return false;
        if($(this).children('input').attr('disabled')) return false;
        if(!$(this).is('.answer-selected')) {
            $(this).parent('.radio-group').children('.answer-row').removeClass('answer-selected');
            $(this).children('input').attr('checked', true);
            $(this).addClass('answer-selected');
        //            var currentQ = $(this).find('input').attr('name').substr(8);
        //            currentQ = currentQ.substr(0, currentQ.length-1);
        //            $('#currentQ').val(currentQ);
        }
        if(e.which == 3) {
            if($(this).find('.answer-prompt').css('text-decoration') == 'line-through')
                $(this).find('.answer-prompt').css('text-decoration', 'none');
            else
                $(this).find('.answer-prompt').css('text-decoration', 'line-through');
        } else {
            if(expressMode) {
                //Find what question we're on and pull its time taken value
                var currentQ = pageselectCallback.old_index;
                $("#timeTaken-"+currentQ).val(timeElapsed[currentQ]);
                score($(this).parent('.radio-group').find(':radio'));
            }
        }
    });
    $('.answer-row').mousedown(function (e) {
        if(e.which == 3) {
            if($(this).find('.answer-prompt').css('text-decoration') == 'line-through')
                $(this).find('.answer-prompt').css('text-decoration', 'none');
            else
                $(this).find('.answer-prompt').css('text-decoration', 'line-through');
        }
        return false;
    });
    $('.answer-row').hover(function() {
        if(score.submitted && !$(this).is('.answer-selected') && !$(this).is('.correct-answer') && !$(this).is('.incorrect-answer')) {
            $(this).css('background', 'transparent');
        }
        if($(this).is('.correct-answer')) {
            $(this).css('background', '#D5FDBE');
        }
        if($(this).is('.incorrect-answer')) {
            $(this).css('background', '#fcdbe5');
        }
    });
    $('#notes-container-head').click(function() {
        if($('#notes-container-body').is(':visible')) {
            $('#notes-container-body').hide();
        } else {
            $('#notes-container-body').show();
        }
        adjustLeftRightFloat();
    });
    $('#discussion-container-head').click(function() {
        if($('#discussion-container-body').is(':visible')) {
            $('#discussion-container-body').hide();
        } else {
            $('#discussion-container-body').show();
            $('.uiBoxYellow, .fbConnectWidgetFooter').remove();
            
        }
        adjustLeftRightFloat();
    });
    $('#save-note').click(function() {
        var formData = $('#NoteAddForm').serializeArray();
        var foreignKey = formData[2].value;
        $.ajax({
            type: "post",		// Request method: post, get
            url: BASE+"notes/add",	// URL to request
            data: formData,		// Form variables
            dataType: "json",	// Expected response type
            success: function(response, status) {
                if(response.success) {
                    onSuccessfulNoteSave(response.note_id, foreignKey);
                } else {
                    parseSaveNoteError(response);
                }
            },
            error: function(response, status) {
                alert('There was an error saving your note. Please try again.');
            }
        });
        return false;
    });
    $('.edit-note').click(function() {
        $('#NoteNoteId').val($(this).attr('name'));
        $('#NoteContent').val($(this).prev().html()).focus();
        $('#notes-editor').show();
        $(this).parent().hide();
        return false;
    });
    $('#cancel-note').click(function() {
        $('#notes-editor').hide();
        $('#note-'+$('#NoteNoteId').val()).show();
        adjustLeftRightFloat();
        return false;
    });
    $('.add-note-button').click(function() {
        var questionNote = $('.note-container.my-note.q-'+$(this).attr('name'));
        if(questionNote.length > 0) {
            alert ('Already have a note for this one');
            $('html, body').animate({
                scrollTop: questionNote.offset().top
            }, 1000);
            questionNote.animate({
                opacity: 0.25
            }, 750).animate({
                opacity: 1.0
            }, 750);
        } else {
            $('#NoteContent').val('');
            $('#NoteNoteId').val('0');
            $('#NoteForeignKey').val($(this).attr('name'));
            $('#notes-editor').show();
            $('#NoteContent').focus();
            $('html, body').animate({
                scrollTop: $('#NoteContent').offset().top
            }, 1000);
        }
        adjustLeftRightFloat();
        return false;
    });
    $('#express-mode-container').click(function() {
        if(!expressMode) {
            $("#express-mode-label").html("ON");
            $(this).addClass('on');
            $('#submit-button').hide();
            expressMode = 1;
            $('#expressMode').val(1);
        }
        else {
            $("#express-mode-label").html("OFF");
            $(this).removeClass('on');
            $('#submit-button').show();
            expressMode = 0;
            $('#expressMode').val(0);
        }
            
    });
    //    $('#scoreboard').css('left', $(document).width());
    $('.fancybox').fancybox(
    {
        'hideOnContentClick': true,
        'titlePosition':    'over'
    });
}

function parseSaveNoteError(response) {
    if(response.message == 'guest') {
        alert('You are no longer logged in. Sign-in to save your note.');
    } else {
        alert('Error: '+ response.message);
    }
}

function onSuccessfulNoteSave(noteId, foreignKey) {
    //if the note is new
    //Add a div with the note to the note list, at the top
    //Give it an edit icon to trigger the textarea
    var thisNote = $('#note-'+noteId);
    if(thisNote.length > 0) {
        thisNote.children('.users-note-content').html($('#NoteContent').val());
        $('#notes-editor').hide();
        thisNote.fadeOut().fadeIn();
    } else {
        var noteContent = $('#NoteContent').val();
        var newNote = "<div id='note-"+noteId+"' class='note-container my-note q-"+foreignKey+"' style='display:none'>\
                     <span class='users-note-content'>"+noteContent+"</span>\
                     <a href='#' class='edit-note' name='"+noteId+"'>Edit</a></div>";
        $('#notes-container-body').prepend(newNote);
        $('#notes-container').find('.edit-note:first').click(function() {
            $('#NoteNoteId').val($(this).attr('name'));
            $('#NoteContent').val($(this).prev().html()).focus();
            $('#notes-editor').show();
            $(this).parent().hide();
            return false;
        });
        $('#note-'+noteId).fadeIn();
    }
    $('#notes-editor').hide();
}

function adjustLeftRightFloat() {
//    if(typeof initPagination.express != 'undefined') return false;
//    var leftOffset = $('#page-left').offset();
//    var leftHeight = parseInt($('#page-left').css('height'));
//    var leftBottom = parseInt(parseInt(leftOffset.top)+leftHeight);
//    var rightOffset = $('#page-right').offset();
//    var rightHeight = parseInt($('#page-right').css('height'));
//    var rightBottom = parseInt(parseInt(rightOffset.top)+rightHeight);
//    //    alert(leftBottom + ":" + rightBottom);
//    if(leftBottom > rightBottom || leftBottom == rightBottom) { //float right
//        $('#page-left').css('float', 'none');
//        $('#page-right').css('float', 'right');
//        $('#page-right').css('margin-left', '0px');
//    }
//    else { //float left
//        $('#page-left').css('float', 'left');
//        $('#page-right').css('float', 'none');
//        $('#page-right').css('margin-left', '10px');
//    }
//    if(!$('#page-right').is(':visible')) $('#page-left').css('float', 'none');
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

function score(radiosElement)    {
    radios = radiosElement || $(':radio');
    if (score.submitted) {
        alert('This set has already been submitted');
        return false;
    }
    $('#loading-img').show();
    var serializedFormData = $("#questionSetForm").serialize();
    radios.attr('disabled', true);
    if(!validate($("#questionSetForm").serializeArray())) {
        $('#loading-img').hide();
        return false;
    }
    $.ajax({
        type: "post",		// Request method: post, get
        url: BASE+"score",	// URL to request
        data: serializedFormData,		// Form variables
        dataType: "json",	// Expected response type
        success: function(response, status) {
            console.log(response);
            globalResponse = response;
            afterValidate(response);
            if(!expressMode)
                score.submitted = true;
        },
        error: function(response, status) {
            $('.loading-img').hide();
            return false;
        }
    });

    return true;
}

//function scoreSingleQuestion() {
//    //I need setId, qId, aId
//    var serializedFormData = $("#questionSetForm").serialize();
//    //    if(!validate($("#questionSetForm").serializeArray())) {
//    //        $('#loading-img').hide();
//    //        return false;
//    //    }
//    $.ajax({
//        type: "post",		// Request method: post, get
//        url: BASE+"scoreSingle",	// URL to request
//        data: serializedFormData,		// Form variables
//        dataType: "json",	// Expected response type
//        success: function(response, status) {
//            markUpSingle(response);
//            $('#scoreboard').click();
//        },
//        error: function(response, status) {
//            return false;
//        }
//    });
//}

function markUpSingle(response) {
//    var scoreIncrement = 5;
//    var explanation = response['explanation'];
//    var correctAnswer = response['correctAnswer'];
//    var userAnswer = response['userAnswer'];
//    var stats = response['stats'];
//    var username = response['username'];
//    var currentQ = response['currentQ'];
//
//    if(userAnswer == correctAnswer) {
//        scoreIncrement += 5;
//    }
//    $('#points-container').animate({
//        opacity: '1.0'
//    }, 2000);
//    $('#points').countTo({
//        from:   currentScore,
//        to:     currentScore+scoreIncrement,
//        speed:  750,
//        refreshInterval: 30
//    });
//    $('#points-container').animate({
//        opacity: '0.3'
//    });
//    currentScore += scoreIncrement;
//
//    //Disable this question's form
//    $('#'+currentQ.toString()).find('input').each(function() {
//        $(this).attr('disabled', 'disabled');
//    });
//
//    //Show ticks and crosses
//    var wrongs = [
//    "Keep Going!",
//    "No Worries!",
//    "Chin-up!",
//    "Drat!",
//    "No Stress"
//    ];
//    var corrects = [
//    "x2 Combo",
//    "Awesome!",
//    "Excellent!",
//    "Keep it up!",
//    "Fatality!"];
//    $("#result-img-"+correctAnswer).addClass('correct-img').html("✔").show();
//    $("#answer-container-"+correctAnswer).addClass('correct-answer').show();
//    var comment = corrects[Math.floor(Math.random()*corrects.length)]
//    $('#sb-comment').html(comment).css('color', '#3e3e3e').css('background', 'orange');
//    if(userAnswer != correctAnswer) {
//        $("#answer-container-"+userAnswer).addClass('incorrect-answer').show();
//        $("#result-img-"+userAnswer).addClass('incorrect-img').html("✘").show();
//        var comment = wrongs[Math.floor(Math.random()*wrongs.length)]
//        $('#sb-comment').html(comment).css('color', 'white').css('background', '#454545');
//    }
    
//    renderScoreBoard();
//
//    //Show explanations
//    explanation = explanation.replace('OSA', "<a href='http://www.nature.com/gt/journal/v11/n1s/images/3302368f1.jpg' title='Figure 1: Cystic Fibrosis Lung Schematic' class='fancybox' ><img src='http://www.nature.com/gt/journal/v11/n1s/images/3302368f1.jpg' class='img-inset' /></a>");
//    explanation = explanation.replace('patients', '<br/><iframe width="420" height="315" src="http://www.youtube.com/embed/Twjg7v-pTO4" frameborder="0" allowfullscreen></iframe>');
//    explanation = explanation.replace('image1', "<a href='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' title='Figure 1: Hemoglobin A1C' class='fancybox' ><img src='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' class='img-inset' /></a>");
//    alert('yo');
//    if(explanation != "") {
//        $('#explanation-'+currentQ.toString()).html(explanation).show();
//        $('#explanation-'+currentQ.toString()+' .fancybox').fancybox();
//    }
//    adjustLeftRightFloat();

//If all q's answered show stats strip
}

function renderScoreBoard() {
    //    $('#scoreboard').css('top', '100px');
    //    var docW = $(document).width();
    //    docW = parseInt(docW);
    //    var newL = docW - parseInt($('#scoreboard').width());
    //    var newL2 = (docW + 100).toString() + "px";
    $('#scoreboard').show('drop', {
        direction: 'down'
    }, 200).delay(1200).hide('drop', {
        direction: 'down'
    }, 200);
//    $('#scoreboard').show().animate({
//        left: newL.toString()+"px"
//    }, 200).delay(1000).animate({
//        left: newL2
//    }, 200).hide(0);
}

function validate(data) {
    var radioGroups = {};
    var questionNumber = 1;
    $('.radio-group').each(function() {
        radioGroups[questionNumber] = this.id;
        questionNumber++;
    });
    missed = [];
    var atLeastOne = false;
    if(!expressMode) {
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
    } else
        return true;
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

function markupQuestionSet(response) {
    var explanations = response['explanations'];
    var correctAnswers = response['correctAnswers'];
    var userAnswers = response['userAnswers'];
    var reference = "";
    var relative = "";
    var username = response['username'];

    /*Go through each question and:
     *1. Show explanations if any
     *2. Highlight questions/answers according to correct/incorrect
     *3. Show stats
     *4. Disable input
     */
    if(expressMode) {
        reference = correctAnswers;
        relative = userAnswers;
    } else {
        reference = correctAnswers;
        relative = userAnswers;
    }
        
    for(var questionId in reference) {
        //Disable form for this question
        $(":radio[name=answers\\["+questionId+"\\]]").attr("disabled", true);
        
        //Show explanations if any
        populateExplanations(questionId, explanations);

        //Highlight in/correct questions and answers
        var scoreIncrement = 5;

        //Mark correct answer
        $("#result-img-"+reference[questionId]).addClass('correct-img').html("✔").show();
        $("#answer-container-"+reference[questionId]).addClass('correct-answer').show();
        
        var wrongs = [
        "Keep Going!",
        "No Worries!",
        "Chin-up!",
        "Drat!",
        "No Stress"
        ];
        var corrects = [
        "Awesome!",
        "Excellent!",
        "Keep it up!"];
    
        //Mark incorrect answer if applicable
        if(relative[questionId] != reference[questionId]) {
            $("#answer-container-"+relative[questionId]).addClass('incorrect-answer').show();
            $("#result-img-"+relative[questionId]).addClass('incorrect-img').html("✘").show();
            var comment = wrongs[Math.floor(Math.random()*corrects.length)]
            countIncorrect++;
            if(countIncorrect == 1) {
                comment = "First Mishap!";
            }
        //            $('#scoreboard').css('background', 'url(../img/darkstripes.jpg)');
        } else {
            scoreIncrement += 5;
            var comment = corrects[Math.floor(Math.random()*corrects.length)]
            countCorrect++;
            if(countCorrect == 1) {
                comment = "Getting Started!";
                $('#sb-icon').attr('src', '../img/redstar.png');
            } else if (countCorrect ==  2) {
                comment = "x2 Combo!";
            }
        //            $('#scoreboard').css('background', 'url(../img/bluestripes.jpg)');
        }
        
        //Update Scoreboard
        $('#points-container').animate({
            opacity: '1.0'
        }, 2000);
        $('#points').countTo({
            from:   currentScore,
            to:     currentScore+scoreIncrement,
            speed:  750,
            refreshInterval: 30
        });
        $('#points-container').animate({
            opacity: '0.3'
        });
        currentScore += scoreIncrement;
        $('#sb-comment').html(comment);
    }
    
    $('#setHistoryId').val(response['historyId']);
    
    var radioGroups = {};
    var questionNumber = 1;
    var allDone = true;
    if(expressMode) {
        $('.radio-group').each(function() {
            radioGroups[questionNumber] = this.id;
            questionNumber++;
        });
        for(group in radioGroups) {
            checked = !!$(":radio[name=answers\\["+radioGroups[group]+"\\]]:checked").length;
            if(!checked) allDone = false;
        }
    }
    if(allDone) {
        populateStatStrip(response);
        toggleStatStrip();
        $('#clock').countdown('pause');
        $('#discussion-container').show();
    } else {
    }
    
    populateExplanationBar(pageselectCallback.old_index);
    $('#loading-img').hide();
    $('.explanations-button').show();
    $('#stats-button').show()
    //    if(!expressMode)
    //        $('#submit-button').remove();
    $('#reset-set').remove();
    $('#details-bar').show();
    markCorrect(reference);
    if(typeof initPagination.express == 'undefined') {
        //$('.explanation').show();
        adjustLeftRightFloat();
        drawChart();
    }
    if(username == '') {
        $('#more-label').html("<form id='signinupToSaveForm' method='post'><span class='smaller-label-more'><input type='hidden' name='cb' value='sp'><a href='#' id='sign-in-to-save-link'>Sign-in</a> or <a href='#' id='sign-up-to-save-link'>Register</a> to save and track your performance</span></form>");
        $('#sign-in-to-save-link').click(function () {
            $("#signinupToSaveForm").attr('action', BASE+'/signin').submit();
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
            $('#more-label').html("<a href="+BASE+"/users/history/"+(response['historyId'])+ ">more ⇒</a>");
        }
    }
    //    $('#min-max-explanations').click(function () {
    //        if(parseInt($('#explanation-bar').css('margin-top')) == 0) {
    //            $('#explanation-bar').css('margin-top', 128);
    //            $('#explanation-bar').css('height', 58);
    //            $('#explanation-screen').addClass('min').removeClass('max');
    //            $('#min-max-explanations').addClass('max-button').removeClass('min-button');
    //        } else {
    //            $('#explanation-bar').css('margin-top', 0);
    //            $('#explanation-bar').css('height', 186);
    //            $('#explanation-screen').addClass('max').removeClass('min');
    //            $('#min-max-explanations').addClass('min-button').removeClass('max-button');
    //        }
    //
    //    })
    //Count up the score board
    renderScoreBoard();
    return true;
}


function populateStatStrip(response) {
    var correctAnswers = response['correctAnswers'];
    var userAnswers = response['userAnswers'];
    var stats = response['stats'];
    var percentCorrectSum = 0;
    var numberQuestions = 0;
    noq = response['noq'];
    missedCount = missed.length;
    var atLeastOne = false;
    $('.radio-group').each(function() {
        $(this).find('input').each(function() {
            if($(this).is(':checked')) atLeastOne = true;
        });
        if(!atLeastOne) {
            missed++;
        }
    });
    for(var questionId in response.stats) {
        if(response.stats[questionId]['user_choice'] == response.stats[questionId]['correct_answer'])
            correctCount++;
        else
            incorrect++;
    }
    var correct = correctCount;
    var incorrect = incorrectCount = noq - correctCount - missedCount;
    //    for(var questionId in correctAnswers) {
    //        if(userAnswers[questionId] == correctAnswers[questionId])
    //            correct++;
    //        else
    //            incorrect++;
    //    }
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
        
    //Populate Stats-strip IF finished set
    //    var missed = (correct+incorrect) - countJSON(userAnswers);
    var average = Math.round(percentCorrectSum/numberQuestions);
    var score = publicScore = Math.round(100*correct/(correct+incorrect+missedCount));
    console.log("Score: "+score,"correct: "+correct,"incorrect: "+incorrect);
    if(average.toString() == 'NaN') average = score;
    $(".average-stat").html((average).toString()); //Average score of all test-takers
    $("#flagged-stat").html($('.flagged').size()); //Number of flagged items
    $(".score-stat").html((score).toString()); //User's score'
    $('#correct-stat').html(correct);
    $('#incorrect-stat').html(incorrect);
    $('#missed-stat').html(missedCount);
    if(!expressMode)
        $("#demo-content :input").attr('disabled', true);
    var grade = '';
    if(score >= 90) grade = 'A+';
    if((score >= 80) && (score < 90)) grade = 'A';
    if((score >= 70) && (score < 80)) grade = 'B';
    if((score >= 60) && (score < 70)) grade = 'C';
    if((score >= 50) && (score < 60)) grade = 'D';
    if((score < 50)) grade = 'F';
    $("#grade").html(grade);
}

function markCorrect(correctAnswers) {
    for(var answer in correctAnswers) {
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
        $('#explanation-'+id).html('No explanation provided.').hide();
    else {
        //Show explanations
        var explanation = explanations[[id]];
        while(explanation.indexOf('[img:') > -1) {
            var start = explanation.indexOf('[img:')+5;
            var end = explanation.indexOf(']', start);
            end -= start;
            var filename = explanation.substr(start,end);
            explanation = explanation.replace('[img:'+filename+']', "<center><a href='../img/uploads/"+filename+".png' title='' class='fancybox' ><img src='../img/uploads/"+filename+".png' class='img-inset' /></a></center>");
        } 
        
        //explanation = explanation.replace('OSA', "<a href='http://www.nature.com/gt/journal/v11/n1s/images/3302368f1.jpg' title='Figure 1: Cystic Fibrosis Lung Schematic' class='fancybox' ><img src='http://www.nature.com/gt/journal/v11/n1s/images/3302368f1.jpg' class='img-inset' /></a>");
        //explanation = explanation.replace('patients', '<br/><iframe width="420" height="315" src="http://www.youtube.com/embed/Twjg7v-pTO4" frameborder="0" allowfullscreen></iframe>');
        explanation = explanation.replace('video1', '<br/><div class="video-inset"><center><iframe width="420" height="315" src="http://www.youtube.com/embed/oxnePlhjpRs" frameborder="0" allowfullscreen></iframe></center></div>');
        explanation = explanation.replace('video2', '<br/><center><iframe width="420" height="315" src="http://www.youtube.com/embed/DASvmFJeYX8" frameborder="0" allowfullscreen></iframe></center>');
        //        explanation = explanation.replace('image1', "<center><a href='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' title='Figure 1: Hemoglobin A1C' class='fancybox' ><img src='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('image1', "<center><a href='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' title='Figure 1 - Hemoglobin A1C' class='fancybox' ><img src='http://bloggingdiabetes.com/wp-content/uploads/2011/05/ac-guidelines-diabetes.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('image2', "<center><a href='http://syncmed.com/wp-content/uploads/2011/07/Diabetic-Foot.jpg' title='Foot Ulcers' class='fancybox' ><img src='http://syncmed.com/wp-content/uploads/2011/07/Diabetic-Foot.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('image3', "<center><a href='http://cybersarges.tripod.com/pdiabetes.jpg' title='Fasting Glucose Levels and Diabetes' class='fancybox' ><img src='http://cybersarges.tripod.com/pdiabetes.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('image4', "<center><a href='http://www.nlm.nih.gov/medlineplus/ency/images/ency/fullsize/19713.jpg' title='During diabetic nephropathy the kidney becomes damaged and more protein than normal collects in the urine. As the disease progresses, more of the kidney is destroyed. Over time, the kidney's ability to function starts to decline, which may eventually lead to chronic kidney failure.' class='fancybox' ><img src='http://cybersarges.tripod.com/pdiabetes.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('image5', "<center><a href='http://cybersarges.tripod.com/pdiabetes.jpg' title='Fasting Glucose Levels and Diabetes' class='fancybox' ><img src='http://cybersarges.tripod.com/pdiabetes.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('imginsulin', "<center><a href='http://img.tfd.com/dorland/thumbs/insulin.jpg' title='C peptide is a the product of lysing pro-insulin prior to release of insulin from the pancreas' class='fancybox' ><img src='http://img.tfd.com/dorland/thumbs/insulin.jpg' class='img-inset' /></a></center>");
        explanation = explanation.replace('imgt1dm', "<center><a href='http://dtc.ucsf.edu/images/charts/1.d.jpg' title='Type I DM review' class='fancybox' ><img src='http://dtc.ucsf.edu/images/charts/1.d.jpg' class='img-inset' /></a></center>");
        $('#explanation-content-'+id).html(explanation);
        $('#explanation-'+id).show();
        $('#explanation-'+id).autolink();
        $('.fancybox').fancybox(
        {
            'hideOnContentClick': true,
            'titlePosition':    'over'
        });
    }
}

function onError(errors) {
    alert('There was a problem processing your request: ' + errors['message']);
    $('#loading-img').hide();
}

function stats(data) {
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

function pageselectCallback(page_index) {
    var items_per_page = initPagination.items_per_page;
    var page = page_index + 1;
    var qStart = items_per_page *(page-1);
    var qStop = (items_per_page * page) - 1;
    if(initPagination.express == 'undefined') initPagination.express = 0;
    $('#questions div.question').hide();
    for(var i = qStart;i<qStop+1;i++) {
        if(initPagination.express == 1)
            populateExplanationBar(i);
        $('#questions div.question:eq('+i+')').show();
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
    //This piece assumes 1 question per page
    if(page == initPagination.num_entries) {
        $('#quick-next-question').hide();
    } else {
        $('#quick-next-question').show();
    }
    if(page == 1) {
        $('#quick-prev-question').hide();
    } else {
        $('#quick-prev-question').show();
    }
    adjustLeftRightFloat();
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
        num_display_entries: 4
    });
}

function countJSON (obj) {
    var i;
    var c = 0;
    for(i in obj)
        c++;
    return c;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function stdDev(numArr) {
    //Get Average
    var i = numArr.length, 
    sum = 0;
    while( i-- ){
        sum += numArr[ i ];
    }
    var avg = sum/numArr.length;
    
    //Get Variance
    i = numArr.length,
    v=0;
    while( i-- ){
        v += Math.pow( (numArr[ i ] - avg), 2 );
    }
    v /= numArr.length;
    
    //Get StdDev
    var stdDev = Math.sqrt( v );
    return Math.round(stdDev);
}

function percentiles(scores, userscore) {
    //Get array of scores
    //sort it ascending
    scores.sort(function(a,b){
        return a-b
    });
    //find index of user's score (i)
    var i = $.inArray(userscore, scores);
    //add 1 (i+1)
    i++;
    
    //find total number of items (n)
    var n = scores.length;
    return Math.round(100*(i-0.5)/n);
}

function renderGraphs(response) {
    
    /* SCORE PIE CHART */
    
    renderPieChart();
    
    /* SCORE FREQUENCY DISTRIBUTION */
                        
    //Calculate appropriate bucket size
    var sizeOfBin = Math.round(100/noq);
    
    
    var numberOfScorers = [], currentScoreBar = [], currentUserScores = [];
    var ticks = [0,"0"]; //Will hold 'text' ticks for the x-axis
    //Initialize array of number of scorers
    for(i=0;i<noq;i++) {
        numberOfScorers.push([i,0]);
        
        //while we're at it we'll create the x-axis ticks
        ticks.push([i+1,(i+1)*sizeOfBin]);
        
        //And while we're at it also
        if(publicScore <= (i+1)*sizeOfBin && currentScoreBar.length == 0)
            currentScoreBar.push([i,0]);
    }

    //Next loop through all the past scores and check which bin they fall into
    var rawScoreList = [];
    $.each(response.setHistory, function(i, userCollection) {
        //userCollection is either 'me' or 'notMe'
        
        //This includes both this user AND other users' scores
        $.each(userCollection.number_correct, function(index, $this) {
            score = Math.round(parseInt($this)/noq * 100);
            rawScoreList.push(score);
            if(i == 'me') currentUserScores.push([index, score]);
            $.each(numberOfScorers, function (bin) {
                if(score <= numberOfScorers[bin][0]*sizeOfBin) {
                    numberOfScorers[bin][1]++;
                    return false;
                }
            });
        });
    });
    var percentile = percentiles(rawScoreList, parseInt(publicScore));
    $('.percentile-stat').html(percentile+"%");
    $('.percentile-ord-stat').html(ordinal(percentile));
    $('.score-perc-stat').html(publicScore+"%");
    var sd = stdDev(rawScoreList);
    $('.stddev-stat').html(sd+"%");
    
    //Make the height of the bar representing the current score the same as the other bar
    //    console.log("HERE: ", currentScoreBar, numberOfScorers);
    //    return false;
    //    if(typeof currentScoreBar[0] == 'undefined')
    console.log('currentScoreBar: ' + currentScoreBar);
    console.log('numberOfScorers: ' + numberOfScorers);
    currentScoreBar[0][1] = numberOfScorers[currentScoreBar[0][0]][1];
    
    //Create the ticks
    //    ticks: [[-0.5,0],[0.5,20],[1.5,40],[2.5,60],[3.5,80],[4.5,100]]
    
    //    var graphMe = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]];
    
    //Count number of scores in each bucket that user scored
    //    $.each(response.setHistory.me.number_correct, function(index, $this) {
    //        
    //        score = Math.round(parseInt($this)/noq * 100);
    //        if (score < 10) graphMe[0][1]++;
    //        else if(score >= 10 && score < 20) graphMe[1][1]++;
    //        else if(score >= 20 && score < 30) graphMe[2][1]++;
    //        else if(score >= 30 && score < 40) graphMe[3][1]++;
    //        else if(score >= 40 && score < 50) graphMe[4][1]++;
    //        else if(score >= 50 && score < 60) graphMe[5][1]++;
    //        else if(score >= 60 && score < 70) graphMe[6][1]++;
    //        else if(score >= 70 && score < 80) graphMe[7][1]++;
    //        else if(score >= 80 && score < 90) graphMe[8][1]++;
    //        else if(score >= 90 && score <= 100) graphMe[9][1]++;
    //        scores.push(score);
    //    });
    //    
    //    //Count number of scores in each bucket by other users
    //    $.each(response.setHistory.notMe.number_correct, function(index, $this) {
    //        score = Math.round(parseInt($this)/noq * 100);
    //        if (score < 10) graphMe[0][1]++;
    //        else if(score >= 10 && score < 20) graphMe[1][1]++;
    //        else if(score >= 20 && score < 30) graphMe[2][1]++;
    //        else if(score >= 30 && score < 40) graphMe[3][1]++;
    //        else if(score >= 40 && score < 50) graphMe[4][1]++;
    //        else if(score >= 50 && score < 60) graphMe[5][1]++;
    //        else if(score >= 60 && score < 70) graphMe[6][1]++;
    //        else if(score >= 70 && score < 80) graphMe[7][1]++;
    //        else if(score >= 80 && score < 90) graphMe[8][1]++;
    //        else if(score >= 90 && score <= 100) graphMe[9][1]++;
    //        scores.push(score);
    //    });
    //    var graphMe2 = [0,0];
    
    //Categorize this current performance
    //    if (publicScore < 10) graphMe2[0] = 1; 
    //    else if(publicScore >= 10 && publicScore < 20) graphMe2[0] = 2;
    //    else if(publicScore >= 20 && publicScore < 30) graphMe2[0] = 3;
    //    else if(publicScore >= 30 && publicScore < 40) graphMe2[0] = 4;
    //    else if(publicScore >= 40 && publicScore < 50) graphMe2[0] = 5;
    //    else if(publicScore >= 50 && publicScore < 60) graphMe2[0] = 6;
    //    else if(publicScore >= 60 && publicScore < 70) graphMe2[0] = 7;
    //    else if(publicScore >= 70 && publicScore < 80) graphMe2[0] = 8;
    //    else if(publicScore >= 80 && publicScore < 90) graphMe2[0] = 9;
    //    else if(publicScore >= 90 && publicScore <= 100) graphMe2[0] = 10;
    //        
    //    graphMe2[1] = graphMe[0][1];
    //    
    
    $.plot($("#flotter"), [
    {
        data: numberOfScorers
    //        data: [[0,10],[1,10],[2,10],[3,10],[4,10]]
    },
    {
        data: currentScoreBar,
        bars: {
            show: true
        }
    }
    ], {
        series: {
            bars: {
                show: true,
                fill: 0.5
            }
        },
        xaxis: {
            //            ticks: [[1,20],[2,40],[3,60],[4,80],[5,100]]
            ticks: ticks
        //            ticks: [[0.5,"0"],[1.5,"10"],[2.5,"20"],[3.5,"30"],[4.5,"40"],[5.5,"50"],[6.5,"60"],[7.5,"70"],[8.5,"80"],[9.5,"90"],[10.5,"100"]]
        },
        colors: ['#5BF', '#F33'],
        grid: {
            hoverable: true,
            mouseActiveRadius: 5,
            color: 'gray',
            borderWidth: 0,
            borderColor: "#000",
            aboveData: false,
            backgroundColor: '#FFF',
        }
    });
    
    /* PERFORMANCE TRACKING */
    //Create ordinal ticks
    var ordinalTicks = [];
    var i = 0;
    if(currentUserScores.length > 10) {
        currentUserScoresSlice = currentUserScores.slice(-10);
        i = currentUserScores.length - 10;
    } else currentUserScoresSlice = currentUserScores;
    for(i;i<=currentUserScores.length;i++) {
        ordinalTicks.push([i,ordinal(i+1)]);
    }
    $.plot($("#mb-graph"), [
    {
        data: currentUserScoresSlice,
        lines: {
            show: true, 
            fill: true, 
            lineWidth: 0, 
            fill: 0.4
        },
        //        points: {
        //            show: true, 
        //            fill:true, 
        //            fillColor: 'white'
        //        },
        label: 'Score'
    }
    //    {
    //        data: [[1,50],[2,58],[3,63],[4,81],[5,100]],
    //        label: 'Time Spent',
    //        yaxis: 1
    //    }
    ], 
    {
        legend: {
            show: true,
            backgroundOpacity: 0.5
        },
        xaxis: {
            ticks: ordinalTicks
        //            ticks: [[1,"1st"],[2,"2nd"],[3,"3rd"],[4,"4th"],[5,"5th"],[6,"6th"]]
        //                    mode: 'time',
        //                    timeformat: '%b %d %h:%M%p'

        },
        yaxis: {
            max:100
        },
        //        y2axis: {
        //            tickFormatter: function (f, g) {
        //                return f.toFixed(g.tickDecimals) + "\u00B0C"
        //            }
        //        },
        series: {
            lines: {
                show: true,
                lineWidth: 0,
                fill: 0.5
            }
        },
        colors: ['pink', '#5BF'],
        grid: {
            hoverable: true,
            mouseActiveRadius: 5,
            color: 'gray',
            borderWidth: 0,
            borderColor: "#000",
            aboveData: false,
            backgroundColor: '#FFF',
        },
        points: {
            show: true, 
            radius: 3
        }
    });
    
    /* TOPIC BREAKDOWN  */
    
    //Tally up correct and total questions for each tag
    var scoreByTag = [];
    $.each(response.stats, function(qId, qStats) {
        $.each(qStats.tags, function(index, tag) {
            if(tag in scoreByTag) ; //pass
            else scoreByTag[tag] = {
                total: 0, 
                correct: 0
            };
            if(qStats.user_choice == qStats.correct_answer) scoreByTag[tag]['correct']++;
            scoreByTag[tag]['total']++;
        });
    });
    
    //Create flot data and tick arrays
    var correctByTag = [], totalByTag = [], tagTicks = [], i = 1;
    for(tag in scoreByTag) {
        var score = Math.round(scoreByTag[tag]['correct']/scoreByTag[tag]['total'] * 100);
        correctByTag.push([score,i]);
        totalByTag.push([100,i]);
        tagTicks.push([i,tag]);
        i++;
    }
    
    $.plot($("#topic-graph"), [
    {
        //        data: [[1,1],[1,2],[1,3],[1,4],[1,5]],
        data: totalByTag,
        bars: {
            show:true, 
            horizontal:true, 
            fill:0.1, 
            align:'center'
        },
        label: 'Total',
        yaxis: 1
    },
    {
        //        data: [[75,1],[60,2],[100,3],[30,4],[10,5]],
        data: correctByTag,
        bars: {
            show:true, 
            horizontal:true, 
            fill:0.6, 
            align:'center'
        },
        label: 'Percentage Correct',
        yaxis: 1
    },
    //    {
    //        data: [[65,1],[40,2],[50,3],[70,4],[30,5]],
    //        points: {
    //            show:true, 
    //            horizontal:true, 
    //            fill:0.6, 
    //            align:'center'
    //        },
    //        label: 'Average',
    //        yaxis: 1
    //    }
    ], 
    {
        legend: {
            show: true,
            backgroundOpacity: 0.5
        },
        yaxis: {
            //            ticks: [[1,"Management"],[2,"Screening"],[3,"Diagnosis"],[4,"Etiology"],[5,"Complications"]]
            ticks: tagTicks
        },
        xaxis: {
            min: 0
        },
        colors: ['#5BF', '#AAD450', 'white'],
        grid: {
            hoverable: true,
            mouseActiveRadius: 1,
            color: 'gray',
            borderWidth: 0,
            borderColor: "#000",
            aboveData: false,
            backgroundColor: '#FFF',
        }
    });
    /* TIME MANAGEMENT  */

    //Create flot data array for time taken per question
    var timeByQuestion = [], totalTime = 0, averageTime = 0, i = 1;
    $.each(response.stats, function(qId, qStats) {
        qStats.time_taken = parseInt(qStats.time_taken);
        timeByQuestion.push([i, qStats.time_taken]);
        totalTime += qStats.time_taken;
        i++;
    });
    
    //Create flot data array for average time per question
    averageTime = Math.round(totalTime/noq);
    var averageTimeArray = [[0.5, averageTime]];
    i=1;
    while(i<=noq) {
        averageTimeArray.push([i,averageTime]);
        i++;
    }
    averageTimeArray.push([i-0.5, averageTime]); //For formatting the flot graph
    
    //Create flot data array for average time per question for ALL USERS
    var timesQuestionAnswered = 0, questionTotalTime = 0, questionAverageTime = [], i = 1;
    $.each(response.stats, function(qId, qStats) {
        questionTotalTime = 0;
        $.each(qStats.history.time_taken, function(index, time_taken) {
            time_taken = parseInt(time_taken);
            questionTotalTime += time_taken;
        });
        timesQuestionAnswered = parseInt(qStats.answered_correctly) + parseInt(qStats.answered_incorrectly);
        questionAverageTime.push([i, Math.round(questionTotalTime/timesQuestionAnswered)]);
        i++;
    });
    
    //    $.plot($("#time-graph"), [
    //    {
    //        data: timeByQuestion,
    //        //        data: [[1, 75],[2, 101],[3, 23],[4,11],[5,29]],
    //        bars: {
    //            show:true, 
    //            align:'center', 
    //            lineWidth: 1,
    //            fillColor: {
    //                colors: [ {
    //                    opacity: 0.5
    //                }, {
    //                    opacity: 0.2
    //                } ]
    //            }
    //        },
    //        label: 'Time Spent',
    //        yaxis: 1
    //    },
    //    {
    //        data: averageTimeArray,
    //        lines: {
    //            show:true, 
    //            fill:0.3, 
    //            lineWidth:0,
    //            align: 'left'
    //        },
    //        label: 'Your Average',
    //        yaxis: 1
    //    },
    //    {
    //        data: questionAverageTime,
    //        points: {
    //            show:true, 
    //            fill:0.3, 
    //            lineWidth:1
    //        },
    //        label: 'Test Average',
    //        yaxis: 1
    //    }
    //            
    //    ], 
    //    {
    //        legend: {
    //            show: true
    //        },
    //        //            colors: [{ opacity: 0.8 }, { brightness: 0.6, opacity: 0.8 } ],
    //        colors: ['pink','#AAD450', 'white'],
    //        grid: {
    //            hoverable: true,
    //            mouseActiveRadius: 1,
    //            color: 'gray',
    //            borderWidth: 0,
    //            borderColor: "#000",
    //            aboveData: false,
    //            backgroundColor: '#FFF',
    //        },
    //        xaxis: {
    //            ticks: [[1,1],[2,2],[3,3],[4,4],[5,5]]
    //        }
    //    });
        
    //Choice Analysis
    //    $.plot($("#choice-graph"), [
    //    {
    //        data: [[1, 75],[2, 100],[3, 23],[4,11],[5,29],[6,55]],
    //        bars: {
    //            show:true, 
    //            align:'center', 
    //            lineWidth: 1
    //        },
    //        label: 'Percent Selected',
    //        yaxis: 1
    //    }
    //    ], 
    //    {
    //        legend: {
    //            show: true
    //        },
    //        //            colors: [{ opacity: 0.8 }, { brightness: 0.6, opacity: 0.8 } ],
    //        colors: ['pink','#AAD450', 'white'],
    //        xaxis: {
    //            ticks: [[1,1],[2,5],[3,6],[4,10],[5,14],[6,20]]
    //        },
    //        yaxis: {
    //            max: 100
    //        },
    //        grid: {
    //            hoverable: true,
    //            mouseActiveRadius: 1,
    //            color: 'gray',
    //            borderWidth: 0,
    //            borderColor: "#000",
    //            aboveData: false,
    //            backgroundColor: '#FFF',
    //        }
    //    });
        
    //TOOLTIP
    var b = null;
    $('#flotter').bind('plothover', function(i,k,h) {
        $('#x').text(k.x.toFixed(2));
        $('#y').text(k.y.toFixed(2));
        if (h) {
            if (b != h.datapoint) {
                b = h.datapoint;
                $('#tooltip').remove();
                var f = h.datapoint[0],
                j = h.datapoint[1];
                f = 1000 * f;
                var g = new Date(f);
                var msg = " test takers";
                if(j == 1) msg = " test taker";
                toolTip(h.pageX, h.pageY, j + msg)
            }
        } else {
            $("#tooltip").remove();
            b = null;
        }
    });
    $('#mb-graph').bind('plothover', function (i, k, h) {
        $('#x').text(k.x.toFixed(2));
        $('#y').text(k.y.toFixed(2));
        if (h) {
            if (b != h.datapoint) {
                b = h.datapoint;
                $('#tooltip').remove();
                var f = h.datapoint[0],
                j = h.datapoint[1];
                f = 1000 * f;
                var g = new Date(f);
                toolTip(h.pageX, h.pageY, j+"%")
            }
        } else {
            $("#tooltip").remove();
            b = null;
        }
    });
    $('#topic-graph').bind('plothover', function (i, k, h) {
        $('#x').text(k.x.toFixed(2));
        $('#y').text(k.y.toFixed(2));
        if (h) {
            if (b != h.datapoint) {
                b = h.datapoint;
                $('#tooltip').remove();
                var f = h.datapoint[0],
                j = h.datapoint[1];
                f = 1000 * f;
                var g = new Date(f);
                var label = h.series.label;
                if(label != 'Total')
                    toolTip(h.pageX, h.pageY, h.datapoint[0]+"%");
            }
        } else {
            $("#tooltip").remove();
            b = null;
        }
    });
}

//GRAPH TOOLTIP
function toolTip(f, h, g) {
    $('<div id="tooltip">' + g + '</div>').css({
        position: 'absolute',
        display: 'none',
        'font-family': 'Dosis',
        'font-size': '14px', 
        top: h + 5,
        'border-radius': '5px',
        left: f + 15,
        padding: '0 4px',
        'background-color': "#FFFFFF",
        opacity: 0.8
    }).appendTo("body").show();
}

function renderPieChart() {
    $.plot($("#pie-graph"), [
    {
        data: correctCount,
        label: 'Correct'
    },
    {
        data: incorrectCount,
        label: 'Incorrect'
    },
    {
        data: missedCount,
        label: 'Missed'
    }
    ], 
    {
        series: {
            pie: {
                show: true, 
                innerRadius: 0.5, 
                fill:0.5, 
                highlight: {
                    opacity:0.2
                }
            }
        },
        legend: {
            show: true
        },
        colors: ['#AAD450', '#C03', '#FF8A3C'],
        grid: {
            hoverable: true,
            mouseActiveRadius: 1,
            color: 'gray',
            borderWidth: 0,
            borderColor: "#000",
            aboveData: false,
            backgroundColor: '#FFF',
        }
    });
    
//    $('#pie-graph').bind('plothover', function(i,k,h) {
//        $('#x').text(k.x.toFixed(2));
//        $('#y').text(k.y.toFixed(2));
//        if (h) {
//            if (b != h.datapoint) {
//                b = h.datapoint;
//                $('#tooltip').remove();
//                var f = h.datapoint[0],
//                j = h.datapoint[1];
//                f = 1000 * f;
//                var g = new Date(f);
//                var msg = " questions";
//                if(j == 1) msg = " test taker";
//                toolTip(h.pageX, h.pageY, j + msg)
//            }
//        } else {
//            $("#tooltip").remove();
//            b = null;
//        }
//    });
}

function renderTables(data) {
    //Render tables
    var alt = 'alt', i = 1, correct = [], mark = [], chosenLetter = [], correctLetter = [], difficulty = [];
    console.log(data.stats);
    $.each(data.stats, function(index,$this) {
        //Initialize output
        correct[index] = 'incorrect', mark[index] = '✘';
        //If the user answered correctly, change class and mark
        if($this.user_choice == $this.correct_answer) correct[index] = 'correct', mark[index] = '✔';
        
        //Assign letters to user's selections and correct answer
        var ii = 0;
        $.each($this.answers, function(indexx) {
            if(indexx == $this.user_choice) chosenLetter[index] = String.fromCharCode(ii + 65); 
            if(indexx == $this.correct_answer) correctLetter[index] = String.fromCharCode(ii + 65);
            ii++;
        });
        
        if(typeof chosenLetter[index] == 'undefined') chosenLetter[index] = 'missed';
        //Render score card table - done score table
        $('#scoreCardTable').append("<tr class='"+alt+"'><td class='"+correct[index]+"'>"+mark[index]+"</td><td align='left'>"+(i++)+"</td><td>"+chosenLetter[index]+"</td><td>"+correctLetter[index]+"</td></tr>");

        //Alternate row class
        alt = (alt=='alt' ? '' : 'alt');
        
        //Move on to difficulty table
        //Get times each question was answered incorrectly
        var ai = parseInt($this.answered_incorrectly)
        var ac = parseInt($this.answered_correctly)
        percentageIncorrect = Math.round(ai/(ai+ac)*100);
        difficulty.push([index, percentageIncorrect]);
    });
    
    //Sort questions in descending order of difficulty
    difficulty.sort(function(a, b) {
        a[1] = a[1].toString();
        b[1] = b[1].toString();
        return b[1].localeCompare(a[1]);
    });
    
    //Loop through each question and create a row
    ii = 1, alt='';
    $.each(difficulty, function(index, question) {
        var i = 1,questionNumber = 0;
        $.each(data.stats, function(indexx){
            if(question[0] == indexx)
                questionNumber = i;
            i++;
        });
        index  = question[0];
        $('#difficultyTable').append("<tr class='"+alt+"'><td class='"+correct[index]+"'>"+mark[index]+"</td><td align='left'>"+(ii++)+"</td><td>"+questionNumber+"</td><td>"+question[1]+"%</td></tr>");    
        
        //Alternate row class
        alt = (alt=='alt' ? '' : 'alt');
    });
    
    
}

/* BEGIN: [Ordinal Number Format v.1 :: Author: Addam Driver :: Date: 10/5/2008 ]
    ** Disclaimer:  Use at your own risk, copyright Addam Driver 2008  
    ** Example on calling this function:
    ** ordinal(this, {subScript: true});
    ** The Ordinal script will append the proper ordinal to any number like: 1st, 2nd, 33rd, etc.
    ** If you pass the "subScript:true" option, then it will use the html subscript for the new ordinal
*/
function ordinal(num, options){		
    var options = options || {}; // setup the options
    var sScript = options.sScript; // get subscript if needed
    
    var mod1 = num%100; // get the divided "remainder" of 100
    var mod2 = num%10; // get the divided "remainder" of 10
    var ord; // ste the ordinal variable
    
    if((mod1-mod2) == 10){ // capture 10
        ord = "th"; // set the oridnal to th as in: 10th
    } else {// for everything else
        switch(mod2){  // check the remainder of the 10th place
            case 1: // if 1 as in 1st
                ord = "st"; // set the ordinal
                break;
            case 2: // if 2 as in 2nd
                ord = "nd";// set the ordinal
                break;
            case 3: // if 3 as in 3rd
                ord = "rd";// set the ordinal
                break;
            default: // for everything else
                ord = "th";// set the ordinal
                break;
        }
    }
    switch(sScript){
        case "sub":
            return num+"<sub>"+ord+"<\/sub>";	// put the ordinal in the HTML sub script
            break;
        case "sup":
            return num+"<sup>"+ord+"<\/sup>";	// put the ordinal in the HTML super script
            break;
        default:
            return num+ord;
            break;
    }	
}


