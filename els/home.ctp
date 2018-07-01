<div class="tab-content">
    <!-- Home -->
    <div class="" id="home" data-bind="visible: page() == 'home' ">
        <!-- Header -->
        <header>
            <div class="container">
                <div class="row row-centered">
                    <div class="col-md-5 col-centered">
                        <div>
                            <div class="intro-text text-center">
                                <div class="name"> Learn through practice.</div>
                                <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678078-light-bulb-128.png" />
                                <!-- <div class="login-box">
                                    <a class="btn btn-danger" role="button" onclick="loginGoogle()"><i class="fa fa-google"></i>&nbsp;&nbsp;&nbsp;Connect with <b>Google</b> </a>
                                </div> -->
                                <h4>Find practice questions</h4>
                                <form class="form-horizontal center-block" role="form" method="get" action="#/sets/search/">
                                    <div class="form-group form-group-lg">
                                        <div class="">
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="q" data-bind="value: search.query, attr: { placeholder: 'E.g. ' + search.example() } ">
                                                                        <span class="input-group-btn">
                                                                            <input type="submit" value="Go!" class="btn btn-default btn-lg" />
                                                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <h4>or create your own</h4>
                                <a href="#/create">
                                    <i style="font-size: 120px; color: green" class="fa fa-plus-circle"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="second-lead hiddenn">
            <i style="vertical-align:middle" class="fa fa-pencil-square-o fa-2x"></i>
            <strong>quriosity</strong> is a learning platform centered on practice -
            <a style="" class="" href="#/about/mission">learn more &nbsp;<i class="fa fa-angle-double-right"></i></a>
        </section>
        <section id="portfolio">
            <div class="container">
                <div class="row row-centered">
                    <div class="col-lg-12">
                        <h1 style="margin-bottom:60px; font-size:3em">the quri<i class="fa  fa-lightbulb-o"></i>us</h1>
                    </div>
                </div>
                <div class="row row-centered">
                    <a data-bind="attr: { href: search.show() ? search.hash() : set().hash() } ">
                        <div class="col-md-3 col-centered block-box">
                            <div class="text-centered">
                                <? echo $html->image('student.png', array('class' => 'center-block')); ?>
                                <div class="title">students</div>
                            </div>
                            Complete practice questions on any subject and get deep performance analysis
                        </div>
                    </a>
                    <a href="#/create">
                        <div class="col-md-3 col-centered block-box">
                            <div class="text-centered">
                                <? echo $html->image('teacher.png', array('class' => 'center-block')); ?>
                                <div class="title">educators</div>
                            </div>
                            Create media-rich question sets and track student and item performance </p>
                        </div>
                    </a>
                    <a href="#/info/contact">
                        <div class="col-md-3 col-centered block-box">
                            <div class="text-centered">
                                <? echo $html->image('schedule.png', array('class' => 'center-block')); ?>
                                <div class="title">organizations</div>
                            </div>
                            Share your knowledge base with your people and the world</p>
                        </div>
                    </a>
                </div>
            </div>
    </div>
    </section>
</div>
<!-- /Home -->
