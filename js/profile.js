function initPageJS() {
    $('.set-entry').hover(function () {
        $(this).find('.set-toolbar').show();
    }, function() {
        $(this).find('.set-toolbar').hide();
    });
    $('#settings-anchor').click(function () {
        if($('#user-settings-module').is(':visible')) {
            $('#user-settings-module').slideUp();
            $('#user-set-module').fadeIn();
        } else {
            $('#user-settings-module').slideDown();
            $('#user-set-module').slideUp();
        }
        return false;
    });
    $('#cancelAcctSettings').click(function () {
        $('#user-settings-module').slideUp();
        $('#user-set-module').fadeIn();
    });
    $('#submitUpdateProfile').click(function(event) {
        event.preventDefault();
        var serializedFormData = $('#updateProfileProfileForm').serializeArray();
        $.ajax({
            type: "post",		// Request method: post, get
            url: BASE+"users/updateProfile",	// URL to request
            data: serializedFormData,		// Form variables
            dataType: "json",	// Expected response type
            success: function(response, status) {
                if(response.success) {
                    $('#user-settings-module').slideUp();
                    $('#user-set-module').fadeIn();
                    flashMessage("Your profile was updated.");
                }
                else flashMessage(response.message);
                return false;
            },
            error: function(response, status) {
                flashMessage('There was an error updating your profile. Please try again.');
                return false;
            }
        });
    });
    $('#inline').fancybox();
    $('#uploadImageFrame').fancybox();
    $('#uploadImgSubmit').click(function() {
        var serializedFormData = $('#QuestionSetUploadImageForm').serializeArray();
        console.log(serializedFormData);
        $.ajax({
            type: "post",		// Request method: post, get
            url: BASE+"question_sets/uploadImage",	// URL to request
            data: serializedFormData,		// Form variables
            dataType: "json",	// Expected response type
            success: function(response, status) {
                if(response.success) flashMessage("Your profile was updated.");
                else flashMessage(response.message);
            },
            error: function(response, status) {
                flashMessage('There was an error updating your profile. Please try again.');
                return false;
            }
        });
    });
    $('#message-box').click(function() {
        $(this).fadeOut();
    });
    
    
    // Create pagination element with options from form
    initPagination();

    //    $('#QuestionSetUploadImageForm').submit(function() {
    //        alert('submitting');
    //        //$("#loading-img").show();
    //        $.post('../question_sets/uploadImage',
    //            $(this).serializeArray(),
    //            afterValidate,
    //            "json"
    //            );
    //        return false;
    //    });

    //Select correct country from country list
    $('select.countrylist').val(country);
    
    //Select correct DOB from DOB list
    $('select.dobyear').val(dobY);
    $('select.dobmonth').val(dobM);
    $('select.dobday').val(dobD);
    
    $('select.year').val(yearOfStudy);
}
function flashMessage(message) {
    $('#message').html(message);
    $('#message').fadeIn();
    $('#message-box').fadeIn();
    $('html, body').animate({
        scrollTop: $("#page-box").offset().top
    }, 500);
}
    
function afterValidate(data, status) {
//$(".message").remove();
//$(".error-message").remove();
//    if (data.errors) {
//        alert('Error!');
//    } else if (data.success) {
//        alert('Success');
//    }
}

function confirmDeleteSet(setId) {
    var deleteSet = confirm("Are you sure you want to delete this set?");
    if(deleteSet) {
        $('#deleteSetId').val(setId);
        $('#deleteSetForm').submit();
    }
}

function edit(setId) {
    $('#editSetId').val(setId);
    $('#editSetForm').submit();
}

function pageselectCallbackHst(page_index) {
    var items_per_page = initPagination.items_per_page;
    var page = page_index + 1;
    var qStart = items_per_page *(page-1);
    var qStop = qStart+items_per_page-1;
    $('#usr-history-list div.set-entry').hide();
    //    $('#usr-sets-list div.set-entry').hide();
    for(var i = qStart;i<qStop+1;i++) {
        $('#usr-history-list div.set-entry:eq('+i+')').show();
    }
    if ( typeof pageselectCallbackHst.old_index == 'undefined' ) {
        pageselectCallbackHst.old_index = page_index;
    }
    return false;
}
function pageselectCallbackSets(page_index) {
    var items_per_page = initPagination.items_per_page;
    var page = page_index + 1;
    var qStart = items_per_page *(page-1);
    var qStop = qStart+items_per_page-1;
    $('#usr-sets-list div.set-entry').hide();
    for(var i = qStart;i<qStop+1;i++) {
        $('#usr-sets-list div.set-entry:eq('+i+')').show();
    }
    if ( typeof pageselectCallbackSets.old_index == 'undefined' ) {
        pageselectCallbackSets.old_index = page_index;
    }
    return false;
}

function initPagination() {
    var num_entries_hst = jQuery('#usr-history-list').children().length;
    var num_entries_sets = jQuery('#usr-sets-list').children().length;
    initPagination.items_per_page = 5;
    if(num_entries_hst < initPagination.items_per_page + 1) $('.pagination-nav.history').hide();
    if(num_entries_sets < initPagination.items_per_page + 1) $('.pagination-nav.sets').hide();
    initPagination.num_entries_hst = num_entries_hst;
    $(".pagination-nav.history").pagination(num_entries_hst, {
        callback: pageselectCallbackHst,
        items_per_page:initPagination.items_per_page, // Show only one item per page
        prev_text: "◄",
        next_text: "►",
        num_display_entries: 10,
        prev_show_always: false,
        num_edge_entries: 1,
        num_display_entries: 5
    });
    $(".pagination-nav.sets").pagination(num_entries_sets, {
        callback: pageselectCallbackSets,
        items_per_page:initPagination.items_per_page, // Show only one item per page
        prev_text: "◄",
        next_text: "►",
        num_display_entries: 10,
        prev_show_always: false,
        num_edge_entries: 1,
        num_display_entries: 5
    });
}