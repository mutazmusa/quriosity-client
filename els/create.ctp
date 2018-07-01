CREATE PAGE -->
<div  id="create" data-bind="visible: page() == 'create', with: newSet">
    <section class="slimmer form-horizontal" style="background: rgb(60, 142, 161); color: white;">
        <div class='container'>
            <div class="row">
                <div class="col-md-5">
                    <h1>Create your own</h1>
                    <h4>Create your own sets in a few quick steps</h4>
                </div>
            </div>
        </div>
    </section>
    <!-- Title and Description-->
    <section class="slimmer" style="background: beige">
        <div class="container">
            <div class="row">
                <div class="col-md-1 side-guide">1.</div>
                <div class="col-md-11 form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-10">
                            <input type="text" class="form-control title" style="font-size: 30px" placeholder="Give your set a title" data-bind="value: title" />
                            <!-- <p class="invalid" data-bind="validationMessage: title"></p> -->
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10">
                            <textarea placeholder="Describe your set" rows="1" class="form-control" data-bind="value: description"></textarea>
                            <!-- <p class="invalid" data-bind="validationMessage: description"></p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /Title and Description-->
    <!-- SmartBox-->
    <section class="slimmer" style="background: rgb(249, 249, 230)">
        <div class="container">
            <div class="row">
                <div class="col-md-1 side-guide">2.</div>
                <div class="col-md-11 form-horizontal">
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default" data-bind="click: $parent.smartbox.process"><i class="fa fa-cube"></i> Process</button>
                        <!-- <button type="button" class="btn btn-default"><i class="fa fa-eraser" data-bind="click: $parent.smartbox.removeLinebreaks"></i> Remove Linebreaks</button> -->
                        <button type="button" class="btn btn-default" data-bind="click: $parent.smartbox.markCorrect"><i class="fa fa-check-circle-o"></i> Correct</button>
                        <button type="button" class="btn btn-default" data-bind="click: $parent.smartbox.markExplanation"><i class="fa fa-life-ring"></i> Explanation</button>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10">
                            <textarea id="smartbox" placeholder="Paste your set here" rows="2" class="form-control"
                            data-bind="event: { 'keyup': $parent.smartbox.process } "></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /SmartBox-->
    <!-- Questions -->
    <section class="slim">
        <div class="container">
            <div class="row">
                <div class="col-md-1 side-guide">Or</div>
                <div class="col-md-11 form-horizontal">
                    <div data-bind="foreach: questions">
                        <div class="question-container" data-bind="event: {
                        mouseover: function() { create.showToolbar(true) },
                        mouseout: function() { create.showToolbar(false) } }">
                        <div class="form-group">
                            <h3 class="col-md-10">Question <span data-bind="text: $index()+1"></span></h3>
                            <div class="col-md-2" style="margin-top:20px">
                                <div class="btn-group btn-group-sm pull-right" role="toolbar" data-bind="visible: create.showToolbar()">
                                    <button type="button" class="btn btn-default"
                                    data-bind="click: function() { $parent.create.deleteQuestion($data) },
                                    visible: $parent.questions().length > 1">
                                    <i class="fa fa-trash-o fa-2x"></i></button>
                                    <button type="button" class="btn btn-default"
                                    data-bind="click: function() { create.addAnswer() }">
                                    <i class="fa fa-plus-square fa-2x"></i></button>
                                    <button type="button" class="btn btn-default">
                                    <i></i></button>
                                </div>
                            </div>
                        </div>
                        <textarea  rows="1" class="form-control" placeholder="Type in your question prompt" data-bind="value: prompt" ></textarea>
                        <div class="form-horizontal" data-bind="foreach: answers">
                            <div class="form-group answer-container"  data-bind="
                            css: { 'bg-success': correct },
                            event: { mouseover: function() { create.showToolbar(true) }, mouseout: function() { create.showToolbar(false) } }">
                            <label data-bind="text: String.fromCharCode(65 + $index()) + '.'" class="col-md-1 control-label">
                            </label>
                            <div class="col-md-9">
                                <textarea rows="1" class="form-control" placeholder="Type in your answer" data-bind="value: prompt" ></textarea>
                            </div>
                            <div class="col-md-2 text-right">
                                <div class="btn-group btn-group-sm pull-right" role="toolbar" data-bind="visible: create.showToolbar">
                                    <button type="button" class="btn btn-default" data-bind="toggle: correct">
                                        <i class="fa fa-check-square-o"></i></button>
                                        <button type="button" class="btn btn-default" data-bind="visible: $parent.answers().length > 2,
                                            click:  function() { $parent.create.deleteAnswer($data) }">
                                            <i class="fa fa-trash-o "></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="invalid" data-bind="validationMessage: hasCorrect"></div>
                            <div class="invalid" data-bind="validationMessage: atLeastTwoAnswers"></div>
                            <textarea  rows="1" placeholder="Explain the question and correct answer" class="form-control" data-bind="value: explanation"></textarea>
                            <!-- <input type="text" class="form-control" placeholder="Tags" data-bind="value: tags" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /Questions -->
    <!-- @TODO Move the logic to check if should showToolbar et al to the JS, leave view with just a boolean-->
    <div class="btn-group btn-group-vertical btn-group-sm pull-right opaque-onhover btn-default" class="" role="toolbar" id="floating-toolbar" datda-spy="affix" data-offset-tsop="60" data-bind="visible: $parent.page() == 'create',
    event: { mouseover: function() { create.showToolbarLabels(true) },
        mouseout: function() { create.showToolbarLabels(false) } }">
        <button type="button" class="btn btn-default" data-bind="click: create.addQuestion">
            <span class="toolbar-label" data-bind="visible: create.showToolbarLabels">Add Question</span>
            <i class="fa fa-plus fa-2x"></i>
        </button>
        <button type="button" class="btn btn-default" data-bind="click: create.save">
            <span class="toolbar-label" data-bind="visible: create.showToolbarLabels">Save Set</span>
            <i class="fa fa-floppy-o fa-2x"></i>
        </button>
        <button type="button" class="btn btn-default" data-bind="click: create.preview">
            <span class="toolbar-label" data-bind="visible: create.showToolbarLabels">Preview Set</span>
            <i class="fa fa-search fa-2x"></i>
        </button>
        <button type="button" class="btn btn-default"  data-bind="click: create.publish" >
            <span class="toolbar-label" data-bind="visible: create.showToolbarLabels">Publish Set</span>
            <i class="fa fa-check fa-2x"></i></button>
        <button type="button" class="btn btn-default" data-bind="click: create.reset">
            <span class="toolbar-label" data-bind="visible: create.showToolbarLabels">Clear Set</span>
            <i class="fa fa-trash fa-2x"></i></button>
    </div>
</div>
<!-- /Create -->
