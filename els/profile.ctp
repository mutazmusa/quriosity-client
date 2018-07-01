<!-- Profile -->
<div class="" id="user" data-bind="visible: page() == 'user', with: profile">
    <header>
        <div class='container' dasta-bind="visible: user().id() == 0">
            <div class="row row-centered">
                <div style="text-align: center" class="col-md-7 col-centered">
                    <a style="margin-bottom:20px" class="btn btn-default" data-bind="click: $parent.logout, visible: $parent.user().id() > 0 && id() == $parent.user().id()" > <i class="fa fa-sign-out fa-2"></i> Log Out</a>
                    <a style="margin-bottom:20px" class="btn btn-default" data-bind="visible: id() != $parent.user().id(), attr: { 'href': '#/user/' + $parent.user().id() }" > <i class="fa fa-undo fa-2"></i> Return to Your Profile</a>
                    <i style="font-size: 120px; display: block" class="fa fa-user-secret fa-5 img-circle" data-bind="visible: imgUrl() == null"></i>
                    <img class="profile-image-lg img-circle" data-bind="visible: imgUrl() != null, attr:  { src: imgUrl()  }" />
                    <h2 class="text-center" data-bind="text: username"></h2>
                    <h6 data-bind="visible: id() > 0">Joined <span data-bind="timeAgo: created"></span></h6>
                </div>
            </div>
        </div>
    </header>
    <section  class="slim">
        <div class="container">
            <div class="row row-centered">
                <div class="col-md-5 col-centered">
                    <h2 class="profile-stats" data-bind="text: completedSets().length"></h2>
                    <h4 class="profile-stats-lbl">Sets Completed</h4>
                </div>
                <div class="col-md-5 col-centered" style="vertical-align: top">
                    <h2 class="profile-stats" data-bind="text: createdSets().length"></h2>
                    <h4 class="profile-stats-lbl">Sets Created</h4>
                </div>
            </div>
        </div>
    </section>
    <section class="slimmer" style="background: whitesmoke" data-bind="visible: completedSets().length > 0 || createdSets().length > 0">
        <div class="container">
            <div class="row row-centered">
                <div class="col-md-5 col-centered" id="completedSets-list" style="vertical-align: top">
                    <div class="panel panel-default text-left" data-bind="visible: completedSets().length > 0">
                        <ul class="list" data-bind="foreach: completedSets">
                            <li>
                                <div class="panel-body">
                                    <a class="search-result" data-bind="attr: { href: '#/sets/' + set_id + '/' + history_id }">
                                        <p class="set-title" data-bind="text: QuestionSet.title"></p>
                                        <span>Started </span><span data-bind="timeAgo: created"></span> -
                                        <!-- <span class="" data-bind="text: number_correct().length + ' correct'"></span> -->
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-5 col-centered" style="vertical-align: top">
                    <div class="panel panel-default text-left" data-bind="visible: createdSets().length > 0">
                      <!-- ko with:createdSetsModel -->
                        <ul class="list" data-bind="foreach: createdSets">
                            <li data-bind="visible: $index+1 <= page()*5 && $index+1 >= ((page()-1)*5)+1">
                                <div class="panel-body">
                                    <a class="search-result" data-bind="attr: { href: '#/sets/' + set_id }">
                                        <p class="" data-bind="text: title"></p>
                                        <span>Created </span><span data-bind="timeAgo: created"></span> -
                                        <span class="" data-bind="text: views + ' views'"></span>
                                    </a>
                                    <a class="btn" style="margin-top:-15px;float: right" data-bind="hidden: published , attr: { href: '#/create/' + set_id  }"><i class="fa fa-pencil"></i></a>
                                </div>
                            </li>
                        </ul>
                        <ul class="pagination">
                          <li data-bind='click: previous'>Previous</li>
                          <li data-bind='click: next'>Next</li>
                        </ul>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section  class="slim" style="background: #D0D3D7">
        <div class="container">
            <div class="row row-centered">
                <div class="col-md-5 col-centered">
                    <a class="btn btn-success" href="#/sets">Find Questions</a>
                </div>
                <div class="col-md-5 col-centered" style="vertical-align: top">
                    <a class="btn btn-success" href="#/create">Create Questions</a>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- /Profile
