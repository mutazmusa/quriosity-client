function initPageJS(){if(typeof initPagination.express=="undefined"){$(window).resize(function(){adjustLeftRightFloat();$(window).scroll()});$(window).scroll(function(){var b=$("#view-box").offset();$("#control-panel").css("left",$("#view-box").width()+b.left-5);if($(window).scrollTop()+169<(b.top+80)){return false}if(parseInt($("#control-panel").css("top"))>b.top+parseInt($("#view-box").css("height"))-20-parseInt($("#control-panel").css("height"))){$("#control-panel").css("top",b.top+parseInt($("#view-box").css("height"))-20-parseInt($("#control-panel").css("height"))+"px");return false}if($(window).scrollTop()+169>b.top+parseInt($("#view-box").css("height"))-20-parseInt($("#control-panel").css("height"))){return false}$("#control-panel").css({left:b.left+945,position:"absolute"});$("#control-panel").animate({top:$(window).scrollTop()+169+"px",},{queue:false,duration:600})});$("#next-question").click(function(){$(".next").click()});$("#prev-question").click(function(){$(".prev").click()})}else{}initPagination();if(typeof isHistory!="undefined"){$(":radio").attr("disabled",true)}else{$(":input").attr("disabled",false)}var a={off:function(){this.cancel();$("#meta").slideUp(200)},on:function(){this.cancel();var b=this;this.timeoutID=window.setTimeout(function(){$("#meta").slideDown(200)},1000)},cancel:function(){if(typeof this.timeoutID=="number"){window.clearTimeout(this.timeoutID);delete this.timeoutID}}};$("#meta-description").hover(function(){a.on()},function(){a.off()});$("#toggleMeta").click(function(){$("#meta").toggle();($("#meta").is(":visible"))?$("#toggleMeta").html("Hide details"):$("#toggleMeta").html("Show details");return false});$(".flag").click(function(){if(score.submitted){return false}if($(this).is(".flagged")){$(this).removeClass("flagged");$('[name="'+($(this).attr("id"))+'"]').val(0)}else{$(this).addClass("flagged");$('[name="'+($(this).attr("id"))+'"]').val(1)}});$(".flag").hover(function(){if(score.submitted){return false}$(this).addClass("flag-hover");return true},function(){if(score.submitted){return false}$(this).removeClass("flag-hover");return true});$("#hide-stats").click(function(){$("#stats-strip").hide()});$("#hide-explanations").click(function(){$(".explanations-button").removeClass("explanations-button-selected");$("#explanation-bar").hide();return false});$(".explanations-button").click(function(){if($("#explanation-bar").is(":visible")){$(this).removeClass("explanations-button-selected");$("#explanation-bar").hide()}else{$(this).addClass("explanations-button-selected");$("#explanation-bar").show()}var b=parseInt(parseInt($("#explanation-body").css("height"))/parseInt($("#explanation-body").css("line-height")));if(b>2){$("#min-max-explanations").show()}return false});$("#stats-button").click(function(){$("#stats-strip").show()});$("#submit-button").click(function(){$("#loadingDiv").show();score();return false});$("#more-stats").click(function(){if($(this).html()=="+"){$(this).html("-");$("#more-stats-label").html("Less");$("#stats-advanced").slideDown()}else{$(this).html("+");$("#more-stats-label").html("More");$("#stats-advanced").slideUp()}});$("#overlay").click(function(){$("#overlay").fadeOut();$("#stats-strip").fadeOut()});$("#dialog_link, ul#icons li").hover(function(){$(this).addClass("ui-state-hover")},function(){$(this).removeClass("ui-state-hover")});adjustLeftRightFloat();$(window).jkey("right",function(){$("#next-question").click()});$(window).jkey("left",function(){$("#prev-question").click()})}function adjustLeftRightFloat(){if(typeof initPagination.express!="undefined"){return false}var c=$("#page-left").offset();var e=parseInt($("#page-left").css("height"));var a=parseInt(parseInt(c.top)+e);var d=$("#page-right").offset();var f=parseInt($("#page-right").css("height"));var b=parseInt(parseInt(d.top)+f);if(a>b){$("#page-left").css("float","none");$("#page-right").css("float","right")}else{$("#page-left").css("float","left");$("#page-right").css("float","none")}}function googleVisualizationInit(){google.load("visualization","1",{packages:["corechart"]});google.setOnLoadCallback(drawChart)}function drawChart(){if(!score.submitted){return false}var b=new google.visualization.DataTable();b.addColumn("string","User");b.addColumn("number","Score");b.addRows(5);b.setValue(0,0,"Mutaz");b.setValue(0,1,100);b.setValue(1,0,"Steve");b.setValue(1,1,70);b.setValue(2,0,"Person");b.setValue(2,1,60);b.setValue(3,0,"Hanson21");b.setValue(3,1,30);b.setValue(4,0,"GreenEyes");b.setValue(4,1,10);var a=new google.visualization.BarChart(document.getElementById("chart-performers"));a.draw(b,{width:890,height:200,chartArea:{top:0},enableToolTips:false,backgroundColor:"#FAFAFA",colors:["#1074B4"],legend:"none",title:""});google.visualization.events.addListener(a,"onmouseover",selectHandler);b=new google.visualization.DataTable();b.addColumn("string","Question");b.addColumn("number","Answered Incorrectly");b.addRows(5);b.setValue(0,0,"Q17");b.setValue(0,1,1430);b.setValue(1,0,"Q34");b.setValue(1,1,730);b.setValue(2,0,"Q22");b.setValue(2,1,620);b.setValue(3,0,"Q11");b.setValue(3,1,310);b.setValue(4,0,"Q25");b.setValue(4,1,110);var a=new google.visualization.BarChart(document.getElementById("chart-hard-questions"));a.draw(b,{width:890,height:200,chartArea:{top:0},enableToolTips:false,backgroundColor:"#FAFAFA",colors:["#1074B4"],legend:"none",title:"",hAxis:{title:"Times Answered Incorrectly"}})}function selectHandler(){return false}$(function(){});function score(){if(score.submitted){alert("This set has already been submitted");return false}$("#loading-img").show();var a=$("#questionSetForm").serialize();if(!validate($("#questionSetForm").serializeArray())){$("#loading-img").hide();return false}$.ajax({type:"post",url:BASE+"/score",data:a,dataType:"json",success:function(c,b){afterValidate(c);score.submitted=true},error:function(c,b){alert(c+" "+b);$(".loading-img").hide();return false}});return true}function validate(e){var b={};var a=1;$(".radio-group").each(function(){b[a]=this.id;a++});var d=[];var f=false;for(group in b){checked=!!$(":radio[name=answers\\["+b[group]+"\\]]:checked").length;if(!checked){d.push(group)}else{f=true}$(":radio[name=answers\\["+b[group]+"\\]]").attr("disabled",true)}if(!f){alert("There are no questions to score");$(":radio").attr("disabled",false);return false}if(d.length>0){var c="";for(a in d){c=c+"\nQuestion "+d[a]}var g=confirm("You missed the following questions: "+c+".\nWould you like to continue anyway?");if(g){markMissed(d,b);return true}else{$(":radio").attr("disabled",false);return false}}else{return true}}function markMissed(c,b){for(questionNumber in c){var d=$("#question-"+b[c[questionNumber]]+" .prompt").first();var a=$(document.createElement("div")).insertBefore(d);a.addClass("missed-message").text("missed")}}function afterValidate(a){if(a.errors){onError(a)}else{markupQuestionSet(a)}return false}function markupQuestionSet(a){var l=a.explanations;var m=a.correctAnswers;var g=a.userAnswers;var u=a.stats;var f=0;var o=0;var r=0;var c=0;var i=a.username;for(var h in m){populateExplanations(h,l);$("#result-img-"+m[h]).addClass("correct-img").show();if(g[h]==m[h]){$("#question"+h).addClass("question-correct").removeClass("question-incorrect");$("input[@name='answers['+questionId+']']:checked").addClass("answer-correct").removeClass("answer-incorrect");f++}else{$("#result-img-"+g[h]).addClass("incorrect-img").show();$("#question"+h).addClass("question-incorrect").removeClass("question-correct");o++}var n=parseInt(u[h]["answered_correctly"]);var s=parseInt(u[h]["answered_incorrectly"]);var k=n+s;var p=Math.round(100*n/k);for(var j in u[h]["answers"]){var t=u[h]["answers"][j]["times_chosen"];var v=Math.round(100*t/k);$("#aPercentChosen"+j).html(" - "+v+" ("+t+")")}$("#qPercentCorrect"+h).html("Percent correct: "+p);c++;r=r+p}var e=(f+o)-countJSON(g);var d=Math.round(r/c);var q=Math.round(100*f/(f+o));if(d.toString()=="NaN"){d=q}$("#average-stat").html((d).toString());$("#flagged-stat").html($(".flagged").size());$("#score-stat").html((q).toString());$("#correct-stat").html(f);$("#incorrect-stat").html(o-e);$("#missed-stat").html(e);$("#demo-content :input").attr("disabled",true);var b="";if(q>=90){b="A+"}if((q>=80)&&(q<90)){b="A"}if((q>=70)&&(q<80)){b="B"}if((q>=60)&&(q<70)){b="C"}if((q>=50)&&(q<60)){b="D"}if((q<50)){b="F"}$("#grade").html(b);$("#setHistoryId").val(a.historyId);toggleStatStrip();populateExplanationBar(pageselectCallback.old_index);$("#loading-img").hide();$(".explanations-button").show();$("#stats-button").show();$("#submit-button").remove();$("#reset-set").remove();$("#details-bar").show();markCorrect(m);if(typeof initPagination.express=="undefined"){$(".explanation").show();adjustLeftRightFloat();drawChart()}if(i==""){$("#more-label").html("<form id='signinupToSaveForm' method='post'><span class='smaller-label-more'><input type='hidden' name='cb' value='sp'><a href='#' id='sign-in-to-save-link'>Sign-in</a> or <a href='#' id='sign-up-to-save-link'>Register</a> to save and track your performance</span></form>");$("#sign-in-to-save-link").click(function(){$("#signinupToSaveForm").attr("action",BASE+"/signin").submit();console.log($("#signinupToSaveForm").serialize());return false});$("#sign-up-to-save-link").click(function(){$("#signinupToSaveForm").attr("action",BASE+"/signup").submit();return false});if(typeof initPagination.express=="undefined"){$("#more-label").show()}}else{if(typeof initPagination.express!="undefined"){$("#more-label").html("<a href="+BASE+"/users/history/"+(a.historyId)+"'>more ⇒</a>")}}$("#min-max-explanations").click(function(){if(parseInt($("#explanation-bar").css("margin-top"))==0){$("#explanation-bar").css("margin-top",128);$("#explanation-bar").css("height",58);$("#explanation-screen").addClass("min").removeClass("max");$("#min-max-explanations").addClass("max-button").removeClass("min-button")}else{$("#explanation-bar").css("margin-top",0);$("#explanation-bar").css("height",186);$("#explanation-screen").addClass("max").removeClass("min");$("#min-max-explanations").addClass("min-button").removeClass("max-button")}});return true}function markCorrect(b){for(var a in b){$("#answer-container-"+b[a]).addClass("correct-answer")}}function toggleExplanations(b){if($("#explanation-bar").is(":visible")){$("#explanation-bar").hide()}else{$("#explanation-bar").show()}if($("#explanation-"+b).is(":visible")){$("#explanation-"+b).hide()}else{$("#explanation-"+b).show()}var a=parseInt(parseInt($("#explanation-body").css("height"))/parseInt($("#explanation-body").css("line-height")));if(a>2){$("#min-max-explanations").show()}return false}function populateExplanations(b,a){if(a[b].length==0){$("#explanation-"+b).html("No explanation provided.")}else{$("#explanation-"+b).html(a[b])}}function onError(a){alert("There was a problem processing your request: "+a.message);$("#loading-img").hide()}function stats(c){var a=new Array();var f=0;var h=0;var e=0;var g=c.length;for(var d=0;d<g;d++){f=f+(parseFloat(c[d],10))}var j=(f/g).toFixed(2);for(d=0;d<g;d++){a[d]=c[d]-j;a[d]=a[d]*a[d];h=h+a[d]}e=Math.sqrt(h/(g-1)).toFixed(2);var b=[];b.mean=j;b.stddev=e;return b}function toggleStatStrip(){if($("#stats-strip").attr("display")=="block"){$("#stats-strip").fadeOut()}else{$("#stats-strip").fadeIn()}}function pageselectCallback(e){var d=initPagination.items_per_page;var f=e+1;var c=d*(f-1);var g=(d*f)-1;if(initPagination.express=="undefined"){initPagination.express=0}$("#questions div.question").hide();for(var b=c;b<g+1;b++){if(initPagination.express==1){populateExplanationBar(b)}$("#questions div.question:eq("+b+")").fadeIn();adjustLeftRightFloat()}if(typeof pageselectCallback.old_index=="undefined"){pageselectCallback.old_index=e}else{$("#questions div.question:eq("+pageselectCallback.old_index+")").hide();pageselectCallback.old_index=e}var a=parseInt(parseInt($("#explanation-body").css("height"))/parseInt($("#explanation-body").css("line-height")));if(a>2){$("#min-max-explanations").show()}else{$("#min-max-explanations").hide()}return false}function populateExplanationBar(a){if($("#questions div.explanation:eq("+a+")").html()!=""){$("#explanation-body").html($("#questions div.explanation:eq("+a+")").html()).fadeIn()}}function initPagination(){var a=jQuery("#questions div.question").length;initPagination.items_per_page=1;initPagination.num_entries=a;$("#pagination-nav").pagination(a,{callback:pageselectCallback,items_per_page:initPagination.items_per_page,prev_text:"◄",next_text:"►",num_display_entries:10,prev_show_always:false,num_edge_entries:1,num_display_entries:10})}function countJSON(b){var a;var d=0;for(a in b){d++}return d};