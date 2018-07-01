<!-- Set Report/Statistics -->
<section class="slimmer" style="background: rgb(252, 252, 235)" data-bind="visible: locked() || stats.showSummaryBar">
    <div class="container slim" data-bind="with: stats">
        <div class="row row-centered">
            <div class="col-md-2 col-centered">
                <h1 data-bind="text: score() + '%'"></h1>
                <h4>Score</h4>
            </div>
            <div class="col-md-2 col-centered">
                <h1 data-bind="text: $parent.time().toString().toHHMMSS()"></h1>
                <h4>Time</h4>
            </div>
<!--             <div class="col-md-2 col-centered">
                <div data-bind="text: flagged().length"></div>
                <div>Flagged</div>
            </div> -->
            <div class="col-md-2 col-centered">
                <h1 data-bind="text: correct().length"></h1>
                <h4>Correct</h4>
            </div>
            <div class="col-md-2 col-centered">
                <h1 data-bind="text: incorrect().length"></h1>
                <h4>Incorrect</h4>
            </div>
            <div class="col-md-2 col-centered">
                <h1 data-bind="text: unanswered().length"></h1>
                <h4>Unanswered</h4>
            </div>
            <div class="col-md-2 col-centered" data-bind="toggle:  showTable">
                <i class="fa fa-star fa-4x"></i>
                <h4>Review</h4>
            </div>
        </div>
        <!-- <div class="row row-centered">
            <div class="col-md-2 col-centered">
                <div data-bind="text: percentile() + '%'"></div>
                <div>Percentile</div>
            </div>
            <div class="col-md-2 col-centered">
                <div data-bind="text: mean() + '%'"></div>
                <div>Mean</div>
            </div>
            <div class="col-md-2 col-centered">
                <div data-bind="text: stddev() + '%'"></div>
                <div>Std Dev</div>
            </div>
        </div> -->
    </div>
    <div class="container hidden"  data-bind="with: graphs">
        <div class="row row--centered">
            <div class="col-md-9">
                <span class="graph" data-bind="plot: histogram, plotOptions: options.histogram"></span>
                <span><p>This is an explanation of the graph</p></span>
            </div>
            <div class="col-md-3">
                <div class="graph" data-bind="plot: pie, plotOptions: options.pie"></div>
            </div>
        </div>
        <div class="row row--centered">
            <div class="col-md-9">
                <p>This is an explanation of the graph</p>
            </div>
            <div class="col-md-3">
                <div class="graph" data-bind="plot: topic, plotOptions: options.topic()"></div>
            </div>
        </div>
        <div class="row row--centered">
            <div class="col-md-9">
                <p>This is an explanation of the graph</p>
            </div>
            <div class="col-md-3">
                <div class="graph" data-bind="plot: trend, plotOptions: options.trend"></div>
            </div>
        </div>
        <div class="row row--centered">
            <div class="col-md-9">
                <p>This is an explanation of the graph</p>
            </div>
            <div class="col-md-3">
                <div class="graph" data-bind="plot: time, plotOptions: options.time()"></div>
            </div>
        </div>                                
    </div>
    <div class="container slim" data-bind="visible: stats.showTable">
        <div class="row row-centered">
            <div class="col-md-12">
                <table class='table table-bordered table-hover table-condensed display' id="review-table">
                    <thead>
                    <tr>
                        <th></th><th>Question</th><th>Chosen</th><th>Correct</th><th>Topics</th><th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- ko foreach: questions -->
                    <tr data-bind="click: function() { $parent.jump($index(), true) }, css: { success: result() == 'correct', danger: result() == 'incorrect'  } ">
                        <td data-bind="text: resultSymbol"></td>
                        <td data-bind="text: number"></td>
                        <td data-bind="text: selectionLetters">
                        </td>
                        <td data-bind="foreach: answers">
                            <span data-bind="if: correct">
                                <span data-bind="text: letter"></span>
                            </span>
                        </td>
                        <td>
                            <div data-bind="foreach: tags">
                                <span class="label label-info" data-bind="text: $data"></span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span data-bind="text: time().toString().toHHMMSS()"></span>
                            </div>
                        </td>                        
                    </tr>
                    <!-- /ko -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            </div>
        </div>
    </div>
</section>
<!-- /Set Report/Statistics