/* KNOCKOUT APP */

//@Todo: consider looping through data to populate model properties rather than listing them explicitly
function Answer(data, question) {
    var self = this;

    //Translate from DB field names to property names
    var dictionary = {
        'answer_id': 'id', 'prompt': 'prompt', 'created': 'created', 'modified': 'modified', 'index': 'index',
        'explanation': 'explanation', 'correct': 'correct', 'struck': 'struck', 'times_chosen': 'timesChosen'
    };

    var template = {
        id: 0,
        prompt: "",
        questionid: "0"
    };

    if(data == null || data == 'undefined') data = template;

    //Init
    $.each(dictionary, function(columnName, propertyName) {
    //If the data contains one of these fields, instantiate it
    if(data.hasOwnProperty(columnName))
        self[propertyName] = ko.observable(data[columnName]);
    else
        self[propertyName] = ko.observable(null);
    });

    //Runtime properties
    //@TODO: Currently answers carry their index but questions don't (Set carries their index)
    //Figure out which is best and make consistent
    self.question = question;
    self.index = ko.observable(data.index);
    self.letter = ko.observable(String.fromCharCode(65 + self.index()));
    self.struck = ko.observable(false);

    //Computed
    self.selected = ko.computed(function() {
        return $.inArray(self.index(), self.question.selection()) > -1;
    });

    //Methods
    self.select = function() {
        self.selected(true);
    }
    self.populateMeta = function(meta) {
        self.correct(meta.correct > 0);
        self.timesChosen(meta.times_chosen);
    }

    /* Create Related Namespace */
    //Create a namespace for all the set creation junk
    self.create = {
        showToolbar: ko.observable(false),
        toggleCorrect: function() {
            self.correct(!self.correct());
        }
    };

    /* CREATE Validation Rules */
    self.prompt.extend({required: true});

    /*  /SET CREATION  */
}

function Question(data, forcedIndex) {
    //console.log('Fresh: ', data);
    /* Init */
    var self = this;

    //@TODO: Modify column names to reflect ViewModel property names
    //Until then use dictionary object
    //Dictionary lists all the properties the model should have
    //It also defines each the property name corresponding to each DB field
    var dictionary = {
        'question_id': 'id', 'prompt': 'prompt', 'created': 'created', 'modified': 'modified', 'index': 'index',
        'explanation': 'explanation', 'answered_correctly': 'correct', 'answered_incorrectly': 'incorrect',
        'total_time': 'totalTime', 'Answer': 'Answer'
    };

    //First change all  fields names to property names
    /*var data = {}; //Will hold all our clean data
    $.each(question, function(index, property) {
        if (dictionary.hasOwnProperty(index))
            data[dictionary[index]] = question[;
    });*/

    //This is template data in case no data is passed
    var template = {
                prompt: "",
                index: forcedIndex,
                id: 0,
                Answer: [{
                    id: 0,
                    prompt: "",
                    questionid: "0"
                },
                {
                    answer_id: "0",
                    index: "1",
                    prompt: "",
                    question_id: "0"
                }]};

    if(data == null || data == 'undefined') data = template;
    //The way $.merge works is the first array is modified, the second array doesn't matter
    //$.extend is more appropriate for objects
    //console.log('Q Before: ', data);
    var extendedData = $.extend(true, {}, template, data);
    console.log('Q After: ', extendedData, 'Template', template, 'Data', data);

    //Populate the model's properties using the dictionary
    $.each(dictionary, function(columnName, propertyName) {
        //If the data contains one of these fields, instantiate it
        if(data.hasOwnProperty(columnName))
            self[propertyName] = ko.observable(data[columnName]);
        else
            self[propertyName] = ko.observable();
    });

    //Runtime Properties
    self.totalTime = ko.observable();
    self.answers = ko.observableArray([]);
    self.qhistoryId = ko.observable(0);
    self.multianswer = ko.observable(false);

    //Arrays
    self.selection = ko.observableArray([]);

    //Computed
    self.result = ko.computed(function() { //correct, incorrect, unanswered
        var result = 'unanswered'; //Assume unanswered

        //Loop through the selections and check each if it is correct
        $.each(self.selection(), function(i, index) {
            //Ensure that the correct property is no longer null, meaning server has responded
            if (self.answers()[index].correct() !== null) {
                if(self.answers()[index].correct() === true)
                    result = 'correct';
                else
                    result = 'incorrect';
            }
        });
        return result;
    });

    self.resultSymbol = ko.computed(function() {
        if (self.result() == 'correct')
            return '✔';
        else if (self.result() == 'incorrect')
            return '✘';
        else if (self.result() == 'unanswered')
            return '➜';
    });
    /*self.autoCheck = ko.computed(function() {
     if (self.selection().length > 0 && App.set().express())
     self.check();
     });*/

    /* Runtime */
    //Properties
    self.number = ko.observable(data.index + 1);
    self.flagged = ko.observable(false);
    self.locked = ko.observable(false);
    self.time = ko.observable(0);
    self.queued = ko.observable(false); //Queued for submission
    self.answerReference = {};
    self.tags = ko.observableArray([]);

    //Populate answer model
    self.answers($.map(data.Answer, function(answer, index) {
        self.answerReference[answer.answer_id] = index;
        answer.index = index;
        return new Answer(answer, self);
    }));


    //Methods
    self.mousedown = function(answer, event) {
        if (self.locked())
            return false;
        switch (event.which) {
            case 1: //If left click
                self.toggleAnswer(answer.index());
                break;
            case 2:
                //Middle button
                break;
            case 3:
                //Secondary (usually right) button
                if (answer.struck())
                    answer.struck(false);
                else
                    answer.struck(true);
                break;
            default: //pass
                ;
        }
        return false;
    }
    self.toggleAnswer = function(index) {
        if (!self.multianswer()) { //If this is a single answer question:
            if ($.inArray(index, self.selection()) === -1)
                self.selection([index]);
            else
                self.selection.remove(index);
        }
        else if ($.inArray(index, self.selection()) === -1)
            self.selection.push(index);
        else
            self.selection.remove(index);

        //If we're in express mode and we have an answer score it
        if(App.set().express() && self.selection().length > 0)
            self.check();
    }
    self.packet = ko.computed(function() {
        //Create an array of the id's of the selected answers
        var selectionById = [];
        $.each(self.selection(), function(index, selection) {
            selectionById.push(self.answers()[selection].id());
        });

        //Create a packet of data to score made up of the question, selected answers, and some meta
        var packet = {
            id: self.id(), answer: selectionById, time: self.time(),
            flagged: self.flagged(), qhistoryId: self.qhistoryId()
        };
        return packet;
    });

    /* % of past respondent that answered the question correctly */
    self.percentCorrect = ko.computed(function() {
        if (self.locked())
            return Math.round(self.correct() / (self.correct() + self.incorrect()) * 100);
        else
            return false;
    });
    self.averageTime = ko.computed(function() {
        return Math.round(self.totalTime() / (self.correct() + self.incorrect()));
    });

    self.check = function() {
        //If unasnwered or already checked then do nothing
        if(self.selection().length == 0 || self.locked())
            return false;

        //Lock the question, add this packet to the queue
        self.locked(true);
        App.set().packets.push(self.packet());

        //If we're just checking  this question then go ahead and score it
        if (!App.set().checkAll())
            App.set().score();
    }

    //Give it the selection array it returns the letter(s) of the answers or 'Unanswered'
    //@TODO there's a bug here where it doesn't show multiple answers, has something to do
    //with not being invoked when there's a push to selection
    self.selectionLetters = ko.computed(function() {
        if(self.selection().length  == 0) return 'Unanswered';
        else {
            var letters = "";
            $.each(self.selection(), function(index, position) {
                //console.log(position, self.selection());
                letters = letters + String.fromCharCode(65 + position) + " ";
            });
            return letters;
        }

    });
    self.populateMeta = function(meta) {
        console.log(meta);
        self.explanation(meta.explanation.enrich());
        self.correct(parseInt(meta.answered_correctly));
        self.incorrect(parseInt(meta.answered_incorrectly));
        self.totalTime(parseInt(meta.total_time));

        //Populate Tags
        if (meta.Tag.length == 0)
            self.tags.push('Unclassified');
        else {
            $.each(meta.Tag, function(index, tag) {
                self.tags.push(tag.text);
            });
        }

        //Populate Answer meta
        $.each(meta.Answer, function(index, answer) {
            var answerIndex = self.answerReference[answer.answer_id];
            self.answers()[answerIndex].populateMeta(answer);
        });
    };

    //Load history if present
    if (data.hasOwnProperty('QuestionHistory') && data.QuestionHistory.length > 0) {
        var qHistory = data.QuestionHistory[0]; //because Cake does weird shit like this

        //Add the question the user selected
        self.selection.push(self.answerReference[qHistory.answer_id]);

        //Populate the other data about the question history
        self.flagged(qHistory.flagged);
        self.time(parseInt(qHistory.time_taken));
        self.qhistoryId(qHistory.qhistory_id);
        self.locked(qHistory.locked);

        //Finally populate the question's meta data (explanation, etc)
        //We're passing the Question which carries it's meta along with Answer meta
        self.populateMeta(qHistory.Question);
    }

    /* CREATE PORTION */
    //First create a name space for all the create junk
    self.create = {
        showToolbar: ko.observable(false),
        deleteAnswer: function(answer) {
            self.answers.remove(answer);
        },
        addAnswer: function () {
            self.answers.push(new Answer(null, self));
        },
    }
    /* CREATE Validation Rules */
    self.prompt.extend({required: true});

    //At least one correct answer
    self.hasCorrect = ko.computed(function() {
        var hasCorrect = false;
        $.each(self.answers(), function(index, answer) {
            if(answer.correct()) hasCorrect = true;
        });
        return hasCorrect;
    }).extend({equal: { params: true, message: "Need to pick a correct answer"}});

    //At least two answer choices
    //@TODO: When adding different question types need to enforce these rules selectively
    self.atLeastTwoAnswers = ko.computed(function() {
        if(self.answers().length > 1) return true;
        return false;
    }).extend({equal: { params: true, message: "Need at least 2 answer choices"}});

}

function Set(data) {
    /* Init */
    //Properties
    //@TODO: Turn this into an introspective loop
    var self = this;

    /*$.each(data, function(index, value) {
        if(index == "Question") {
            self.questions = ko.observableArray(
                $.map())
        }
        //Dictionary an associative array that translates 'database' names to 'client-side' names
        var dictionary = [['set_id', 'id'], ['user_id', 'userId']];
        //syntax for dynamically adding a property with name 'index' and value 'value'

    });*/

    /* Intrinsic */
    /* Constructor Code */
    var template = {
            Question: [{
                index: 0,
                prompt: "",
                question_id: "0",
                set_id: "0",
                Answer: [{
                    answer_id: "0",
                    index: "0",
                    prompt: "",
                    question_id: "0"
                },
                {
                    answer_id: "0",
                    index: "1",
                    prompt: "",
                    question_id: "0"
                }] }],
            QuestionSet: {
                description: "",
                private: 0,
                published: 0,
                set_id: 0,
                title: "",
                user_id: 0
                },
            Tag: [],
            User: {
                user_id: 0,
                username: ''
            },
            SetHistory: {}
        };
    if(data == null || data == 'undefined') data = template;

    //Uncovered
    self.historyId = ko.observable(0);

    self.historyId.subscribe(function() {
        if(!App.linkSetHistoryToUser(self.historyId())) {
                App.user().completedSets.push({
                history_id: self.historyId(),
                set_id: self.id(),
                number_correct: self.stats.correct,
                created: new Date(),
                QuestionSet: {
                    title: self.title()
                }
            });
        }
    });

    //Covered
    self.id = ko.observable(data.QuestionSet.set_id);
    self.title = ko.observable(data.QuestionSet.title);
    self.description = ko.observable(data.QuestionSet.description);
    self.userId = ko.observable(data.QuestionSet.user_id);
    self.views = ko.observable(data.QuestionSet.views);
    self.noq = ko.observable(data.QuestionSet.noq);
    self.noe = ko.observable(data.QuestionSet.noe);
    self.published = ko.observable(data.QuestionSet.published);
    self.created = ko.observable(data.QuestionSet.created);
    self.modified = ko.observable(data.QuestionSet.modified);
    //self.author = ko.observable(data.User.username);
    self.author = {
        id: ko.observable(data.User.user_id),
        imgUrl: ko.observable(data.User.imgUrl == '' ? 'https://www.zoolz.com/Images/siteImges/Managment_Icon.png'
            : data.User.imgUrl),
        username: ko.observable(data.User.username)
    };

    /* Run-time */
    //Properties
    self.express = ko.observable(true);
    self.openbook = ko.observable(false);
    self.remainingQuestions = ko.observable();
    self.activeQuestion = ko.observable(0);
    self.saved = ko.observable(true);
    self.checkAll = ko.observable(false);
    self.tags = ko.observableArray([]);
    self.questionReference = {};
    self.packets = [];
    self.unsaved = ko.observable(false);
    self.debugQuestion = ko.observable(false);
    self.debugSet = ko.observable(false);

    //Populate Questions
    self.questions = ko.observableArray(
        $.map(data.Question, function(question, index) {
            self.questionReference[question.question_id] = index;
            question.index = index;
            return new Question(question)
        })
    );

    //Computed
    self.unchecked = ko.computed(function() {
        var unchecked = [];
        $.each(self.questions(), function(index, question) {
            if (!question.locked())
                unchecked.push(question.index());
        });
        return unchecked;
    });
    self.time = ko.computed(function() {
        var time = 0;
        $.each(self.questions(), function(index, question) {
            time += question.time();
        });
        return time;
    });

    //If all the questions have been locked then the Set as a whole is locked too
    self.locked = ko.computed(function() {
        var locked = true;
        $.each(self.questions(), function(index, question) {
            if (!question.locked())
                locked = false
        });
        return locked;
    });

    self.hash = ko.computed(function () {
        var hash = '#/sets/' + self.id();
        if(self.historyId() != 0) hash += '/' + self.historyId();
        hash += '/q/' + (self.activeQuestion()+1).toString();
        return hash;
    });

    //Methods
    //@TODO: Have to make next/jump all use the same reference, switching from index to number is silly
    self.next = function() {
            //Jump expects question number so +1 for index->number, and then +1 for next
            self.jump(self.activeQuestion()+2);
    }
    self.previous = function() {
            //Jump expects question number so -1 for index->number, and then +1 for next
            self.jump(self.activeQuestion());
    }

    //@TODO: create new computed, self.activeQuestionNumber = self.activeQuestion()+1
    self.jump = function(qNumber, scroll) { //Go to question by question INDEX
        qNumber = parseInt(qNumber);
        if(qNumber <= self.noq() && qNumber > 0) {
            self.activeQuestion(qNumber-1);
            if(typeof scroll != 'undefined') {
                $(window).scrollTo($('#question-panel'), 500);
            }

            /* If the hash already reflects this question great, otherwise update the hash */
            var questionHash = '/q/' + qNumber;

            if(location.hash.indexOf(questionHash) == -1) {
               App.router.setLocation(self.hash());
            }
        }
    }

    //Start clock
    //@TODO Need to encapsulate this somehow so it doesn't run when creating a set
    //self.startClock = function () {
        window.setInterval(function() {
            //@TODO the self.questions.length check is a crap hack to avoid running when Creating Sets
            if (self.questions().length > 0 && !self.questions()[self.activeQuestion()].locked()) {
                self.questions()[self.activeQuestion()].time(self.questions()[self.activeQuestion()].time() + 1);
            }
        }, 1000);
    //}
    //Time of the set is the sum of the times of the questions
    self.time = ko.computed(function() {
        var time = 0;
        $.each(self.questions(), function(index, question) {
            time += question.time();
        });
        return time;
    });

    //Whenever the active question changes we must start its clock
    self.activeQuestion.subscribe(function(newQuestion) {

    });

    self.check = function() {
        self.checkAll(true);

        //If the question has been answered but not checked yet go ahead and check it
        $.each(self.questions(), function(index, question) {
            if (!question.locked() && question.selection().length > 0)
                question.check();
        });
        self.checkAll(false);
        self.score();
    }
    self.score = function() {
        var package = {
            questions: self.packets, setId: self.id(), historyId: self.historyId(),
            openbook: self.openbook(), locked: self.locked()
        };
        $.post('question_sets/jsonscore', package, function(response) {

            $.each(response, function(index, meta) { //meta is {Question, QuestionSet, etc}
                //@TODO: I don't like how the server returns data and therefore how it's handled, it's messy
                if (index == 'historyId') {
                    if (self.historyId() == 0) {
                        console.log("History ID: ",meta);
                        self.historyId(meta);
                        App.router.setLocation(self.hash());
                        //location.hash = '#/sets/' + self.id() + '/' + self.historyId() + '/q/' + self.activeQuestion();
                        return false;
                    }
                    return 1; //equivalent of continue
                }
                $.each(meta.Question, function(index, question) {
                    var questionIndex = self.questionReference[question.question_id];
                    self.questions()[questionIndex].populateMeta(question);
                });
                if (self.locked()) {
                    self.stats.parsePastScores(meta.SetHistory);
                }
            });
        }, "json");
        self.packets = [];
    }
    self.handleKeyPress = function(set, key) {
        if(key.keyCode >= 49 && key.keyCode < self.questions()[self.activeQuestion()].answers().length+49)
            /* numerics control answer toggle but make sure we don't go out of bounds */
            self.questions()[self.activeQuestion()].toggleAnswer(key.keyCode-49);

        switch (key.keyCode) {
            case 39: //right
                self.next();
                break;
            case 37: //left
                self.previous();
                break;
            case 13: //enter
                self.questions()[self.activeQuestion()].check();
                break;
        }
    }

    //@TODO: Not happy with this construction, called too frequently and prematurely
    //Has dependencies where one is the daughter of the other questions>locked
    self.questionsByDifficulty = ko.computed(function() {
        var questions = [];
        $.each(self.questions(), function(index, question) {
            if (question.locked())
                questions.push([question.percentCorrect(), question]);
        });
        questions.sort(function(a, b) {
            return a[0] - b[0];
        });
        var response = [];
        $.each(questions, function(index, question) {
            response.push(question[1]);
        });
        return response;
    });

    /* STATS NAMESPACE */
    self.stats = new function() {
        var stats = this;

        stats.visibleSummary = ko.computed(function () {
            if(self.locked())
                return true;
            else
                return false;
        });

        stats.showTable = ko.observable(false);
        stats.showSummaryBar = ko.observable(true);

        //Methods
        stats.calcSum = function(arr) {
            var sum = 0;
            $.each(arr, function(i, v) {
                sum += v;
            });
            return sum;
        }
        stats.calcAverage = function(arr) {
            return Math.round(stats.calcSum(arr) / arr.length);
        }

        stats.correct = ko.computed(function() {
            var correct = [];
            $.each(self.questions(), function(index, question) {
                if (question.result() == 'correct')
                    correct.push(index);
            });
            return correct;
        });
        stats.incorrect = ko.computed(function() {
            var incorrect = [];
            $.each(self.questions(), function(index, question) {
                if (question.result() == 'incorrect')
                    incorrect.push(index);
            });
            return incorrect;
        });
        stats.unanswered = ko.computed(function() {
            var unanswered = [];
            $.each(self.questions(), function(index, question) {
                if (question.result() == 'unanswered')
                    unanswered.push(index);
            });
            return unanswered;
        });
        stats.flagged = ko.computed(function() {
            var flagged = [];
            $.each(self.questions(), function(index, question) {
                if (question.flagged())
                    flagged.push(index);
            });
            return flagged;
        });
        stats.score = ko.computed(function() {
            return parseInt(stats.correct().length / self.noq() * 100, 10);
        });
        stats.allPastScores = ko.observableArray([]);
        stats.myPastScores = ko.observableArray([]);
        stats.mean = ko.computed(function() {
            if (stats.allPastScores().length == 0)
                return false;
            return stats.calcAverage(stats.allPastScores());
            var mean = 0, sum = 0;
            for (var i = 0; i < stats.allPastScores().length; i++)
                sum += parseInt(stats.allPastScores()[i]);
            return Math.round((sum / stats.allPastScores().length) / self.noq());
        });
        stats.percentile = ko.computed(function() {
            //Get array of scores
            //sort it ascending
            var scores = stats.allPastScores();
            var userscore = stats.score();

            scores.sort(function(a, b) {
                return a - b;
            });

            //find index of user's score (i)
            var i = $.inArray(userscore, scores);

            //add 1 (i+1)
            i++;

            //find total number of items (n)
            var n = scores.length;
            return Math.round(100 * (i - 0.5) / n);
        });
        stats.stddev = ko.computed(function() {
            //Get Average
            var numArr = stats.allPastScores();
            var avg = stats.calcAverage(numArr);

            //Get Variance
            var i = numArr.length,
                    v = 0;
            while (i--) {
                v += Math.pow((numArr[ i ] - avg), 2);
            }
            v /= numArr.length;

            //Get StdDev
            return Math.round(Math.sqrt(v));
        });
        stats.parsePastScores = function(histories) {
            var allPastScores = [], myPastScores = [];
            $.each(histories, function(index, history) {
                allPastScores.push(Math.round(history.number_correct / self.noq() * 100));
                if (history.user_id != 0 && history.user_id == App.user().id())
                    myPastScores.push(Math.round((history.number_correct / self.noq()) * 100));
            });

            stats.allPastScores(allPastScores);
            stats.myPastScores(myPastScores);
        }
    };

    /* GRAPHS NAMESPACE */
    self.graphs = new function() {
        var graphs = this;

        //The various graph builder methods
        graphs.histogram = ko.computed(function() {
            var data = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];
            var bins = [20, 40, 60, 80, 100];
            $.each(self.stats.allPastScores(), function(score) {
                for (var i = 0; i < bins.length; i++)
                    if (score <= bins[i]) {
                        data[i][1]++;
                        break;
                    }
            });

            //User performance series
            var me = [[0, 0]];
            for (var i = 0; i < bins.length; i++)
                if (self.stats.score() <= bins[i]) {
                    me[0][0] = i;
                    me[0][1] = data[i][1];
                    break;
                }
            return [data, me];
        });
        graphs.trend = ko.computed(function() {
            var data = [];
            $.each(self.stats.myPastScores().slice(-10), function(index, score) {
                data.push([index, score]);
                index += self.stats.myPastScores().length - 10;
            });
            return [data];
        });
        graphs.pie = ko.computed(function() {
            var data = [
                {data: self.stats.correct().length, label: 'Correct'},
                {data: self.stats.incorrect().length, label: 'Incorrect'},
                {data: self.stats.unanswered().length, label: 'Missed'}];
            return data;
        });
        graphs.topicTicks = ko.observableArray([]);
        //@TODO: I don't like this construction, it's invoked too many times and prematurely
        //it has 2 observable dependencies one of which is the daughter of the other (questions>tags)
        graphs.topic = ko.computed(function() {
            //tags = { Unclassified: { total: 0, correct: 0, score: 0 } };
            tags = {};
            //Tally tags
            $.each(self.questions(), function(index, question) {
                $.each(question.tags(), function(tagIndex, tag) {
                    if (tag in tags)
                        tags[tag]['total']++;
                    else
                        tags[tag] = {total: 1, correct: 0, score: 0};
                    if (question.result() == 'correct') {
                        tags[tag]['correct']++;
                        tags[tag]['score'] = Math.round(tags[tag]['correct'] / tags[tag]['total'] * 100);
                    }
                });
            });

            //Format plot data
            var total = [], correct = [], ticks = [], i = 1;
            $.each(tags, function(tag, stats) {
                total.push([100, i]);
                correct.push([stats.score, i]);
                ticks.push([i, tag]);
                i++;
            });
            graphs.topicTicks(ticks);
            return [total, correct];
            //return [[[0,1],[1,2]]];
        });
        graphs.timeTicks = ko.observableArray([]);
        graphs.time = ko.computed(function() {
            graphs.timeTicks([]);
            var flotTime = [], flotMyAvgTime = [], flotAvgTime = [];
            var times = [];
            var i = 0;
            $.each(self.questions(), function(index, question) {
                if (!question.locked())
                    return true;
                times.push(question.time());
                graphs.timeTicks.push([i, question.number() + "<br/>" + question.resultSymbol()]);
                flotAvgTime.push([i, question.averageTime()]);
                i++;
            });
            var average = self.stats.calcAverage(times);
            $.each(times, function(index, time) {
                flotTime.push([index, time]);
                flotMyAvgTime.push([index - 0.5, average]);
            });
            flotMyAvgTime.push([times.length - 0.5, average]);
            return [
                {
                    data: flotTime,
                    bars: {
                        show: true,
                        align: 'center',
                        lineWidth: 1,
                        fillColor: {
                            colors: [{
                                    opacity: 0.5
                                }, {
                                    opacity: 0.2
                                }]
                        }
                    }
                },
                {
                    data: flotMyAvgTime,
                    lines: {
                        show: true,
                        fill: 0.3,
                        lineWidth: 0,
                        align: 'left'
                    },
                },
                {
                    data: flotAvgTime,
                    points: {
                        show: true,
                        fill: 0.3,
                        lineWidth: 1
                    },
                    yaxis: 1
                }];
        });

        //The various graph options
        graphs.options = {
            default: {
                grid: {
                    hoverable: true,
                    mouseActiveRadius: 5,
                    color: 'gray',
                    borderWidth: 0,
                    borderColor: "#000",
                    aboveData: false,
                    backgroundColor: '#FFF',
                }
            },
            histogram: {
                series: {
                    bars: {
                        show: true,
                        fill: 0.5
                    }
                },
                xaxis: {
                    ticks: [[1, 20], [2, 40], [3, 60], [4, 80], [5, 100]]
                },
                colors: ['#5BF', '#F33'],
            },
            trend: {
                legend: {
                    show: true,
                    backgroundOpacity: 0.5
                },
                xaxis: {
                    ticks: [[0, "Past"], [9, "Recent"]],
                    min: 0,
                    max: 9
                },
                yaxis: {
                    max: 100
                },
                series: {
                    lines: {
                        show: true,
                        lineWidth: 0,
                        fill: 0.5
                    }
                },
                colors: ['pink', '#5BF'],
                points: {
                    show: true,
                    radius: 3
                },
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 0,
                    fill: 0.4
                },
            },
            pie: {
                series: {
                    pie: {
                        show: true,
                        innerRadius: 0.5,
                        fill: 0.5,
                        highlight: {
                            opacity: 0.2
                        }
                    }
                },
                legend: {
                    show: true
                },
                colors: ['#AAD450', '#C03', '#FF8A3C'],
            },
            topic: ko.computed(function() {
                var options = {
                    legend: {
                        show: true,
                        backgroundOpacity: 0.5
                    },
                    yaxis: {
                        ticks: graphs.topicTicks()
                    },
                    xaxis: {
                        min: 0
                    },
                    bars: {
                        show: true,
                        horizontal: true,
                        fill: 0.6,
                        align: 'center'
                    },
                    colors: ['#5BF', '#AAD450', 'white']
                }
                return options;
            }),
            time: ko.computed(function() {
                var options = {
                    legend: {
                        show: true,
                        backgroundOpacity: 0.5
                    },
                    xaxis: {
                        ticks: graphs.timeTicks(),
                    },
                    colors: ['pink', '#AAD450', 'white'],
                };
                return options;
            })
        }

        ko.bindingHandlers.plot = {
            init: function(element, valueAccessor, allBindingsAccessor, viewModel) {

            },
            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var data = ko.utils.unwrapObservable(valueAccessor());
                var options = allBindingsAccessor().plotOptions || false;
                if (options)
                    $.extend(options, graphs.options.default); //merge any non-default options the user specifies
                $.plot($(element), data, options);
            }
        };
    };

    ko.bindingHandlers.toggle = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            ko.applyBindingsToNode(element, {
                click: function() {
                    value(!value());
                }
            });
        }
    };

    /*ko.bindingHandlers.filter = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {

        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var userList = new List('sethistory-list', { valueNames: ['set-title'] });
        }
    };*/

    //Load history if present
    if (typeof data.SetHistory != 'undefined' && data.SetHistory.length > 0) {
        var history = data.SetHistory[0];
        self.historyId(history.history_id);
        self.openbook(history.open_book);
        if (history.submmitted)
            self.stats.parsePastScores(data.SetHistory);
    }

    /* CREATE NEW SET NAMESPACE */
    self.create = {
        addQuestion: function() {
            //@TODO: Review your design here, why does the question need its index
            //in the Set.questions array, only the Set should know this reaaly
            //The rest should just rendering stuff; think about it, if you reordered the questions
            //You'd have to let every question know individually and update its index
            //This is an ugly fix until the index is abstracted out of the question model
            //self.questions.push(new Question(null, self.questions().length));
            self.questions.push(new Question(null, self.questions().length));

        },
        deleteQuestion: function(question) {
            if(self.questions().length > 1) //don't delete the last question
                self.questions.remove(question);
        },
        save: function () {
            if(App.user().id() == 0) {
                BootstrapDialog.alert('You need to login to create a set');
                return false;
            }
            //Validate the newSet
            if(!App.validation.check()) {
                BootstrapDialog.alert('There are errors in your set. Please review them and try again');
                return false;
            }

            /*Process the model*/
            //@TODO: There must be a way to JSONify the model
            //Package the set data
            var  newSet = {
                QuestionSet: {
                    set_id: self.id(),
                    title: self.title(),
                    description: self.description(),
                    published: self.published()
                },
                Question: []
            };

            //Loop through questions and answers and populate new set JSON
            $.each(self.questions(), function(index, question) {
                //Populate the answers
                var answers = [];
                $.each(question.answers(), function(index, answer) {
                    answers.push({
                        answer_id: answer.id(),
                        prompt: answer.prompt(),
                        correct: answer.correct()
                    });
                });

                //Populate the question
                newSet.Question.push( {
                    question_id: question.id(),
                    prompt: question.prompt(),
                    explanation: question.explanation(),
                    Answer: answers
                });
            });

            //Post the new set JSON to server
            console.log('saving this : ', newSet);
            $.post('question_sets/save', newSet, function(response) {
                console.log('saving response: ', response);
                if(response.success) {
                    //Get the latest ids
                    var ids = response.success.ids;

                    //Populate set ID
                    self.id(ids.QuestionSet.set_id);

                    //Populate question and answer IDs
                    $.each(ids.Question, function(qIndex, question) {
                        self.questions()[qIndex].id(question.question_id);
                        $.each(question.Answer, function(aIndex, answer) {
                            console.log('Q'+qIndex+' = '+question.question_id, 'A'+aIndex+' - '+answer.answer_id);
                            self.questions()[qIndex].answers()[aIndex].id(answer.answer_id);
                        });
                    });

                    //If we haven't already done so, change the hash to reflect the new set id
                    if(location.hash.indexOf(self.id()) == -1)
                        location.hash = '#/create/' + self.id();
                } else {
                    alert('There was a problem saving your set');
                }
            }, "json");
        },
        preview: function() {
            if(self.id() != 0) {
                App.router.setLocation("#/sets/"+self.id());
            } else {
                BootstrapDialog.alert('You must save your set before you can preview it');
                return false;
            }
        },
        publish: function () {
            //Confirm publication
            BootstrapDialog.confirm(
            {
                title: 'Publishing Set',
                message: 'You are about to publish your set. Once you do you will no longer be able to make any changes to it. Are you sure you want to proceed?',
                size: BootstrapDialog.SIZE_SMALL,
                callback: function(result) {
                    //If confirmed set published to true
                    self.published(true);

                    //Then call save
                    self.create.save();
                }
            });
        },
        //@TODO: ** Clearing the Set after it has been saved should delete the set
        //@TODO: If it's unsaved just clear, if it's saved give two buttons: DELETE or CLEAR
        reset: function() {
            BootstrapDialog.confirm(
            {
                title: 'Clearing Set',
                message: 'Are you sure you want to clear this set?',
                size: BootstrapDialog.SIZE_SMALL,
                callback: function(result) {
                    if(result) App.newSet(new Set());
                }
            });
        },
        changed: ko.observable(false), //monitors whether any changes have been made
        showToolbarLabels: ko.observable(false)
    }

    /* CREATE Validation Rules*/
    self.title.extend({required: true});
    self.description.extend({required: true});
}

/*
This holds snapshots (or data in brief) of data for visualization
For instance
- it can hold information on a set under search results (as a single result)
- it can hold information on a set under user for created sets
- it can hold information on a set under user for completed sets
*/
function Snapshot(data) {
    var self = this;
    //create some observables from the data
    $.each(data, function(index, data) {
        self[index] = ko.observable(data);
    });
}

function User(data) {
    console.log("User: ", data);
    /* Create a boolean loggedIn that returns id>0 to replace all such checks in view*/
    var self = this;
    //A dictionary to change DB fields into property names
    var propertyDictionary = {
        'user_id': 'id',                    'prompt': 'prompt',     'created': 'created',
        'modified': 'modified',             'index': 'index',       'explanation': 'explanation',
        'answered_correctly': 'correct',    'answered_incorrectly': 'incorrect', 'total_time': 'totalTime',
    };

    //Null set
    setTemplate = {
        User: {
            'user_id':0,
            'username':'Guest',
            'email':'',
            'created':0,
            'imgUrl':null,
        },
        QuestionSet: [],
        SetHistory: []
    };

    if(data == null) data = setTemplate;

    //Populate model properties introspectively
    $.each(data.User, function(index, value) {
        if (propertyDictionary.hasOwnProperty(index)) {
            index = propertyDictionary[index];
        }
        //console.log('Index: ', index, 'Value: ', value);
        self[index] = ko.observable(value);
    });

    //Fill the default profile photo
    if(self.imgUrl() == '') self.imgUrl();

    //Created Sets and Completed Sets
    //They hold abbridged data to show on the profile
    self.createdSets = ko.observableArray(data.QuestionSet);
    self.completedSets  = ko.observableArray(data.SetHistory);

    self.createdSetsModel = {
      page: ko.observable(1),
      next: function() { this.page(this.page()+1) },
      previous: function() { this.page(this.page()-1) },
      createdSets: self.createdSets
    }

    self.completedSetsModel = {
      page: ko.observable(1),
      next: function() { this.page(this.page()+1) },
      previous: function() { this.page(this.page()-1) },
      completedSets: self.completedSets
    }

    /*$.each(data.QuestionSet, function(index, createdSet) {
        self.createdSets.push({
            title:      ko.observable(createdSet.title),
            set_id:     ko.observable(createdSet.set_id),
            created:    ko.observable(createdSet.created),
            views:      ko.observable(createdSet.views),
        });
    });*/

    //Any time we have a change in the sets completed, refresh the search
    //@TODO this should be a custom binding to attach on the DOM elemnt

    self.loginForm = {
        username:   ko.observable(''),
        password:   ko.observable(''),
        remember:   ko.observable(true)
    };

    //Google Sign In call back - called automatically on processing of G+ sign in button
    self.onGoogleSignIn = function(authResult) {
        console.log('Googles Response: ', authResult);
         if (!authResult['error']) {
            // Send the code to the server
            var googleTokens = { code: authResult['code'] };
            $.post('users/storeGoogleToken', googleTokens, function(result) {
                //Populate User Model
                console.log("Log in result: ",result);
                if(result.status = 'success')
                    App.user(new User(result.User));

                //Populate the profile with the new user
                App.profile(App.user());
            }, "json").fail(function() {
                console.log("There was an error: ", result.error);
            });
        } else {
            console.log("Google didn't return a code");
        }
    }

    self.login = function () {
        $.post('users/login', ko.toJSON(self.loginForm), function(response) {
            if(response.success) ;
                //console.log('Great success');
            else ;
                //console.log('Poor fortune indeed');
        }, 'json');
    }

    /* Run-time */
    self.me = ko.observable(false);
}

function Quriosity() {
    var self = this;

    //Set the browser title
    self.browserTitle = ko.observable('Quriosity - Learn through practice');

    //The array of pages for the main navbar
    self.pages = ko.observableArray([
        { name: 'sets', label: 'Learn' },
        { name: 'create', label: 'Create' }
    ]);

    //Holds the active page - default to the 'home' tab
    self.page = ko.observable('home');

    self.page.subscribe(function() {
        $(window).scrollTop(0);
    });

    //Create a user model and show him on the profile page
    self.user = ko.observable(new User());
    self.profile = ko.observable(self.user());

    //Define the small paginator component
    ko.components.register('paginator', {
      viewModel: { require: 'components/paginator/paginator' },
      template: { require: 'components/paginator/paginator.html' }
    });

    //Instantiate two blank sets - one for View and one for Create
    self.set = ko.observable(new Set());
    self.newSet = ko.validatedObservable(new Set());

    self.showAbout = function() {
      BootstrapDialog.show('TEST');
    }

    /* Validation Namespace */
    //@TODO: See if we can make this at the level of newSet not at App
    self.validation = {
        initiated: false,
        check: function () {
            //If we haven't initiated the validator let's do so
            if(!self.validation.initiated) {
                //Initialize validator, ensure that we dig deep (Set->Question->Answer)
                ko.validation.init();

                //So we don't repeat this step
                self.validation.initiated = true;
            }

            //@TODO: Validation and error management should be at level of newSet not App
            //This is the heart of it, ensuring that validation happens for nested models
            //And capture the errors for later presentation or fidings
            self.errors = ko.validation.group(self.newSet(), { deep: true, live: true, observable: true });

            //Validate the SET and QUESTION and ANSWERS
            if(self.errors().length == 0) return true;
            else {
                self.errors.showAllMessages();
                return false;
            }
        }
    }


    self.navbar = {
        find: function() {
            if(self.search.show())
                return self.search.hash();
            else
                return self.set().hash();
        },
        create: function() {
            if(self.newSet().id() == 0) return '#/create';
            else return '#/create/'+self.newSet().id();
        }
    };

    //launcher
    self.error = ko.observable("You need to login to save your activity");
    self.error.subscribe(function() {
         $(window).scrollTo($('html'), 500);
    });

    //User sign in out stuff should move to user model
    self.googleSignOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            self.user(new User());
        });
    }

    self.logout = function() {
        $.post('users/googleDisconnect', function(result) {
            if(result == "success") {
                self.user(new User());
                //@TODO: Add a subscriber to self.user() whenever it changes reset profile to
                self.profile(self.user());
            }
        }, "json").fail(function() {
            //Logout failed
        });
    }

    /* SEARCH NAMESPACE */
    self.search = new function () {
        var search = this;
        search.show = ko.observable(true);
        search.hash = ko.observable('#/sets/search/');
        search.query = ko.observable('');
        search.results = ko.observableArray(); //will hold all the 'result' objects
        search.result = function(data) {
            var result = this;
            $.each(data, function(index, value) {
                result[index] = ko.observable(value);
                /*if (dictionary.hasOwnProperty(index))  ---- Later we can introduce a dictionary as necessary
                    self[dictionary[index]] = ko.observable(property); */
            });
        }
        search.example = function() {
            var examples = ['Biology', 'Chemistry', 'Immunology', 'MCAT', 'USMLE Step 1', 'LSAT', 'SAT', 'TOEFL',
            'USMLE Step 2', 'Kanji', 'Japanese language proficiency test', 'Calculus', 'Physics', 'Astronomy',
            'Algebra', 'Microbiology', 'Genetics', 'Linear Algebra'];
            return examples[Math.floor(Math.random() * examples.length)];
        }
    };

    //@TODO this function should be subscribed to the set.historyId change and should prolly sit in User()
    self.linkSetHistoryToUser = function (setHistoryId) {
        //Loop through each set completed by the user and see if its the same instance we're loading
        //If so link it to the user's snapshot
        var linked = false;
        $.each(self.user().completedSets(), function(index, completedSet) {
            if(setHistoryId == completedSet.historyId) {
                //Found it, let's link
                linked = true;

                self.user().completedSets[index] = {
                    created: self.set().created()
                }

                //No need to keep looking
                return false;
            }
            return linked;
        });
    }

    /* ROUTER - CURRENTLY SAMMY.JS */
    //@TODO: Replace Sammy with a heirarchical routing engine - see Finch.js and Simrou.js
    // Finch.route('#/sets/', function() {
    //   alert('At sets');
    // });
    self.router = Sammy(function() {
        this.get('#/sets/:id', function() {
            var id = this.params['id'];
            self.search.show(false);
            self.page('sets');
            $.getJSON('question_sets/getSetJson/' + id, function(data) {
                console.log('Question Set Loaded Data: ', data);
                //if (typeof data.SetHistory != 'undefined' && data.SetHistory.length > 0) {
                    //@TODO: Consider returning all Histories and letting the user pick the version to resume
                    //self.router.setLocation('#/sets/' + id + "/" + data.SetHistory[0].history_id);
                //} else {
                    self.set(new Set(data));
                    self.search.show(false);
                //}
            });
        });
        this.get('#/sets/:id/:hid', function() {
            var id = this.params['id'];
            var hid = this.params['hid'];
            self.search.show(false);
            self.page('sets');
            if(self.set() != undefined && self.set().historyId() == id) return false; //if we've already generated the set let's stop
            $.getJSON('question_sets/getSetJson/' + id + '/' + hid, function(data) {
                self.set(new Set(data));
                linkSetHistoryToUser(hid);
            });
        });
        this.get('#/sets/:id/q/:qNumber', function() {
            var id = this.params['id'];
            var qNumber = this.params['qNumber'];

            self.search.show(false);
            self.page('sets');
            if(self.set() != undefined && self.set().id() == id) {
                if(self.set().activeQuestion()+1 == qNumber) return false;
                else if(qNumber <= self.set().noq() && qNumber > 0) self.set().jump(qNumber);
                else self.set().jump(1);
            } else {
                $.getJSON('question_sets/getSetJson/' + id, function(data) {
                    self.set(new Set(data));
                    self.set().jump(qNumber);
                    linkSetHistoryToUser(hid);
                });
            }
        });
        this.get('#/sets/:id/:hid/q/:qNumber', function() {
            var id = this.params['id'];
            var hid = this.params['hid'];
            var qNumber = this.params['qNumber'];

            self.search.show(false);
            self.page('sets');

            if(self.set() != undefined && self.set().historyId() == hid) {
                console.log('Here', qNumber, self.set().activeQuestion()+1);
                if(self.set().activeQuestion()+1 == qNumber) return false;
                else if(qNumber <= self.set().noq() && qNumber > 0) self.set().jump(qNumber);
                else self.set().jump(1); //If user is requesting question that's out of bounds go to the first Q
            } else {
                $.getJSON('question_sets/getSetJson/' + id + '/' + hid, function(data) {
                    alert('getting me data');
                    console.log('gots me data', data);
                    self.set(new Set(data));
                    self.set().jump(qNumber);
                    linkSetHistoryToUser(hid);
                });
            }
        });
        this.get('#/sets/search/', function() {
            self.search.show(true);
            self.page('sets');
            var params = {}; //We need to recreate the query string because Sammy is shit and only creates the objects
            $.each(this.params, function(key, value) {
                if(typeof value == "string") params[key] = value;
            });
            //if it's empty show empty search page
            if(params.q == undefined || params.q == "") { self.search.results(""); return false; }
            //Make sure we populate search.query() in case this is a fresh page load
            else { self.search.query(params.q); }

            //This is a jQuery helper function that url encodes the index/value pairs
            var queryString  = $.param(params);
            $.getJSON('question_sets/findJson?' + queryString, function(data) {
                self.search.results($.map(data, function(object, index) {
                    return new self.search.result(object.QuestionSet);
                }));
            });

            //update the search hash so we can return to it later if needed
            self.search.hash("#/sets/search/?"+queryString);
        });
        this.get('#/', function() {
            self.page('home');
        });
        this.get('#/sets', function() {
            self.page('sets');
        });
        this.get('#/create', function() {
            self.page('create');
        });
        this.get('#/create/:id', function() {
            self.page('create');

            var id = this.params['id'];

            //If the set is already being edited do nothing
            if(id == self.newSet().id())  return false;

            //If there's another set being edited try to save it
            //if it fails don't confirm that the user wants to navigate away
            //@TODO; there should be a beforeUnLoad hook on the newSet to do this automatically
            if(self.newSet().id() != 0) {
                App.newSet().create().save();
            }

            $.getJSON('question_sets/edit/' + id, function(data) {
                console.log(data);
                self.newSet(new Set(data));
                location.hash = '#/create/' + id;
            });
            //Here we have to load the identified set by id into self.newSet()
            //Or report an error if the user can't edit that set
        });
        this.get('#/user', function() {
            self.page('user');
        });
        this.get('#/user/:id', function() {
            self.page('user');
            var userId = this.params['id'];
            if(userId == self.profile().id()) return false;
            else if(userId == self.user().id()) {
                self.profile(self.user());
            } else {
                $.getJSON('users/view/' + userId, function(data) {
                    self.profile(new User(data));
                    /*self.profile($.map(data, function(object, index) {
                        return new self.search.result(object.QuestionSet);
                    }));*/
                });
            }
        });
        this.get('#/info', function() {
            self.page('info');
        });
        this.notFound = function() {
            self.page('home');
        }
    });
    self.router.run();

    /* SOCKET */
    //Connect to websocket and misc code
    /*self.socket = io.connect('http://127.0.0.1:3000');
    self.socketDebug = ko.observable('Nothing');
    self.debug = ko.observable(false);

    //Socket Handlers
    {
        self.socket.on('connecting', function(data) {
            self.socketDebug('Connecting...');
        });
        self.socket.on('connect', function(data) {
            self.socketDebug('Connected');
        });
        self.socket.on('connect_failed', function(data) {
            self.socketDebug('Failed to connect');
        });
        self.socket.on('reconnecting', function(data) {
            self.socketDebug('Reconnecting...');
        });
        self.socket.on('reconnect', function(data) {
            self.socketDebug('Reconnected');
        });
        self.socket.on('news', function(data) {
            self.socketDebug(data);
        });
    }*/

    /* SMARTBOX Nonsense */
    self.smartbox = {
        contents: ko.observable(''),
        process: function(data, key) {
            console.log(key.keyCode);
            if(typeof key != 'undefined'
                && typeof key.keyCode != 'undefined' && key.keyCode != 13) return false;
            var result = processSmartBox();

            //Let's trim this shit
            //@TODO: Can add custom trim code here
            result = trimResult(result);


            //If we already have questions, lets save their ids and those of their answers
            var ids = {};
            $.each(self.newSet().questions(), function(qIndex, question) {
                ids[qIndex] = { id: question.id(), Answer: {}  };
                $.each(question.answers(), function(aIndex, answer) {
                    ids[qIndex]['Answer'][aIndex] = {id: answer.id()};
                });
            });

            self.newSet().questions([]);

            //Populate questions
            $.each(result, function(qIndex, question) {
                var correctAnswerIndex = question.correct;
                //Amend the answer structure
                if(question.answers.length == 0) return false;
                $.each(question.answers, function(aIndex, answer){
                    var isCorrect   = (correctAnswerIndex == aIndex);
                    answer.correct  = isCorrect;
                    if(typeof ids[qIndex] != 'undefined' && typeof ids[qIndex]['Answer'][aIndex] != 'undefined')
                        answer.id       = ids[qIndex]['Answer'][aIndex]['id'];
                });

                //Push a new Question into set questions array
                var qId = 0;
                if(typeof ids[qIndex] != 'undefined') qId = ids[qIndex]['id'];
                self.newSet().questions.push(new Question(
                {
                    prompt:         question.prompt,
                    explanation:    question.explanation,
                    Answer:         question.answers,
                    id:             qId
                },
                self.newSet().questions().length));
            })

            //@TODO: This is an ugly quick fix for autosizing new textareas
            autosize($('textarea'));
        },
        markCorrect: function () {
            $('#smartbox').insertRoundCaret('*', '');
            self.smartbox.process();
        },
        markExplanation: function() {
            $('#smartbox').insertRoundCaret('?', '');
            self.smartbox.process();
        },
        removeLinebreaks: function () {
            var txtarea = $('#smartbox')[0];
            var selection = $(txtarea).val().substring(txtarea.selectionStart, txtarea.selectionEnd);
            var cleanSelection = selection.replace(/\r\n?|\n/,'');
            $(txtarea).val(
                $(txtarea).val().substring(0, txtarea.selectionStart)+
                cleanSelection+
                $(txtarea).val().substring(txtarea.selectionEnd)
           );
        }
    }
}

/*My Library*/
//Linkifies
String.prototype.enrich = function() {
    var string = this.toString();
    string = string.replace(/\n/g, '<br />'); //New line formatting
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    string = string.replace(exp, "<a href='$1'>$1</a>"); //linkify
    return string;
}

//Turns int into an ordinal e.g. 1st, 2nd, 3rd
Number.prototype.ordinal = function(options) {
    var num = parseInt(this);
    var options = options || {}; // setup the options
    var sScript = options.sScript; // get subscript if needed

    var mod1 = num % 100; // get the divided "remainder" of 100
    var mod2 = num % 10; // get the divided "remainder" of 10
    var ord; // ste the ordinal variable

    if ((mod1 - mod2) == 10) { // capture 10
        ord = "th"; // set the oridnal to th as in: 10th
    } else {// for everything else
        switch (mod2) {  // check the remainder of the 10th place
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
    switch (sScript) {
        case "sub":
            return num + "<sub>" + ord + "<\/sub>";   // put the ordinal in the HTML sub script
            break;
        case "sup":
            return num + "<sup>" + ord + "<\/sup>";   // put the ordinal in the HTML super script
            break;
        default:
            return num + ord;
            break;
    }
}
Number.prototype.timeFormat = function(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}
$(window).onbeforeunload = function() {
    var unload = confirm('You have unsaved changes. Are you sure you want to navigate away?');
    if (!unload)
        return false;
}

function onSignIn(authResult) {
    App.user().onGoogleSignIn(authResult);
}

//KO Bind the App
var App = new Quriosity();
ko.applyBindings(App, $('#quriosity')[0]);

//Launch everything when document ready
autosize($('textarea'));


$(document).ready(function() {
  $(document).ajaxStart(function() {
      NProgress.start();
  });
  $(document).ajaxStop(function() {
     NProgress.done();
  });
});


function toTimeAgo (dt) {
    var secs = (((new Date()).getTime() - dt.getTime()) / 1000),
        days = Math.floor(secs / 86400);
    return days === 0 && (
    secs < 60 && "just now" ||
    secs < 120 && "a minute ago" ||
    secs < 3600 && Math.floor(secs / 60) + " minutes ago" ||
    secs < 7200 && "an hour ago" ||
    secs < 86400 && Math.floor(secs / 3600) + " hours ago") ||
    days === 1 && "yesterday" ||
    days < 31 && days + " days ago" ||
    days < 60 && "one month ago" ||
    days < 365 && Math.ceil(days / 30) + " months ago" ||
    days < 730 && "one year ago" ||
    Math.ceil(days / 365) + " years ago";
};

ko.bindingHandlers.timeAgo = {
    update: function (element, valueAccessor) {
        var val = ko.unwrap(valueAccessor()),
            date = new Date(val), // WARNING: this is not compatibile with IE8
            timeAgo = toTimeAgo(date);
        return ko.bindingHandlers.html.update(element, function () {
            return '<time datetime="' + encodeURIComponent(val) + '">' + timeAgo + '</time>';
        });
    }
};


/* global BootstrapDialog */

// =========================== //
//
// firebase login with Google
//
// =========================== //

// define firebase login variable
/*var fBase = new Firebase("https://qro.firebaseio.com");

// check to see if user is logged in
var authData = fBase.getAuth();
if (authData) {

    // user is logged in, let's do something (change icon, add name...)
    console.log('Yay, still authed!', authData);
    App.user().onGoogleSignIn(authData);
}
*/
// user clicked on "Connect with Google" button and will now connect with Google (either new or existing user)
function loginGoogle() {

    // oauth popup request for google
    fBase.authWithOAuthPopup("google", function(error, authData) {

        // check if Google returns an error
        if (error) {

            // do something if error
            console.log("Login failed: ", error);

        } else {

            // if Google was successful, we'll receive a bunch of data in authData
            console.log(authData);
            App.user().onGoogleSignIn(authData);

            // check if user exists, if no -> add the data, else -> nothing
        }

    }, {
      scope: "email" // ask google to return their email address (google permissions)
    });
}

// =========================== //
//
// end firebase login
//
// =========================== //
