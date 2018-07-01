<!-- info -->
<div class="clearfix" id="info" data-bind="visible: page() == 'info' ">
    <section  style="background: beige" class="slimmer">

    </section>
    <div class='container'>
        <h1>More Information</h1>
        <div class='col-md-3'>
            <ul class="nav nav-pills tabs-left">
                <li class="active"><a href="#/info/gettingstarted" href="#/info/start" aria-controls="home" role="tab" data-toggle="tab">Getting Fsasdaarted</a></li>
                <li><a href="#/info/team" data-toggle="tab">Team</a></li>
                <li><a href="#/info/support" data-toggle="tab">Support</a></li>
                <li><a href="#/info/contact" data-toggle="tab">Contact</a></li>
            </ul>
        </div>
        <div class="tab-content col-md-9">
            <div class="tab-pane active" id="gettingstarted">START!</div>
            <div class="tab-pane" id="team">Team!</div>
            <div class="tab-pane" id="support">Help!</div>
            <div class="tab-pane" id="contact"><? echo $this->element('contact'); ?></div>
        </div>
    </div>
</div>
<!-- /info -->