function initPageJS() {
        $('.list').jScrollPane();
}

function confirmDeleteSet(setId) {
    var deleteSet = confirm("Are you sure you want to delete this set?");
    if(deleteSet) {
        window.location = BASE+'question_sets/delete?id='+setId;
    //        window.location = 'http://www.google.com';
    }
}
