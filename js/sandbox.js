/*
 * Messing around with Backbone.js
 */

$(document).ready(function() {

    /***SYNC***/
    
    //    Backbone.sync = function(method, model, success, errors) {
    //    }

    /***COLLECTIONS***/

    //Rows Collection
    var RowCollection = Backbone.Collection.extend({
        model: Row,
        initialize: function() {
            this.rowNumber = 1;
        }
    });

    /***MODELS***/

    //ROW MODEL
    var Row = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            text: "This is row ",
            rowNumber: 0
        }
    });

    //NOTE MODEL
    var Note = Backbone.Model.extend({
        initialize: function () {
            var noteView = new NoteView({
                model:this
            });
        },
        url : function() {
            var base = 'add';
            return base;
            //return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        },
        defaults: {
            text: "Fill me",
        }
    });

    /***VIEWS***/

    //ROW VIEW
    var RowView = Backbone.View.extend({
        tagName: 'li', //everytime this view is rendered it will populate a newly synthesised li element
        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'deleteRow');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
            this.render();
        },
        events: {
            'click .delete': 'deleteRow'
        },
        render: function() {
            $(this.el).html(this.model.get("text")+" <span class='delete'>Delete</span>");
            return this; //for the sake of chaining
        },
        unrender: function() {
            $(this.el).hide();
        },
        //My functions
        deleteRow:   function() {
            this.model.destroy();
        }
    });

    //NOTE VIEW
    var NoteView = Backbone.View.extend({
        className: 'note',
        initialize: function () {
            _.bindAll(this,'render','saveNote');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
            this.counter = 1;
            this.render();
        },
        events: {
            'click .save': 'saveNote',
            'click .delete': 'deleteNote'
        },
        render: function () {
            $(this.el).html(this.model.get('text') + " <span class='save'>Save</span> <span class='delete'>Delete</span>");
            $('#notes').append($(this.el));
        },
        unrender: function () {
            $(this.el).remove();
        },
        saveNote: function () {
            this.model.save({
                text: {
                    data: {
                        Note: {
                            text: this.model.get('text')
                        }
                    }
                }
            }, {
                success: function(model, resp) {
                    alert('Success');
                },
                error: function() {
                    alert('Error');
                }
            });
        },
        deleteNote: function () {
            this.unrender();
        }
    });

    //APP VIEW
    var appView = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            _.bindAll(this, 'render', 'addRow', 'showNewRow');
            this.expressMode = false;
            this.rows = new RowCollection();
            this.rows.bind('add', this.showNewRow);
            var firstNote = new Note();
        },
        events: {
            'click button#add-row': 'addRow',
            'click button#add-note': 'addNote',
        },
        //My Functions
        addRow: function () {
            var newRow = new Row();
            newRow.set({
                text: "This is row number " + this.rows.rowNumber,
                rowNumber: this.rows.rowNumber
            });
            this.rows.add(newRow);
        },
        addNote: function () {
            var newNote = new Note();
        },
        showNewRow: function (newRow) {
            var newRowView = new RowView({
                model: newRow
            });
            $('ul', this.el).append(newRowView.render().el);
            this.rows.rowNumber++;
        }
    });

    //Entry point
    var myView = new appView();
});









/*OTHER TUTORIAL*/
//Friend = Backbone.Model.extend({
//        name: null
//    });
//
//    Friends = Backbone.Collection.extend({
//        initialize: function(models, options) {
//            this.bind('add', options.view.addFriendLi);
//        }
//    });
//
///////////////////////////////////////////////////////////////////
//
//    Friend = Backbone.Model.extend({
//        //Create a model to hold friend atribute
//        name: null
//    });
//
//    Friends = Backbone.Collection.extend({
//        //This is our Friends collection and holds our Friend models
//        initialize: function (models, options) {
//            this.bind("add", options.view.addFriendLi);
//            this.bind("remove", options.view.printName);
//        //Listen for new additions to the collection and call a view function if so
//        }
//    });
//
//    AppView = Backbone.View.extend({
//        el: $("body"),
//        initialize: function () {
//            this.friends = new Friends( null, {
//                view: this
//            });
//        //Create a friends collection when the view is initialized.
//        //Pass it a reference to this view to create a connection between the two
//        },
//        events: {
//            "click #add-friend":  "showPrompt",
//        },
//        printName: function (model) {
//            alert('Removing '+model.get('name'));
//        },
//        showPrompt: function () {
//            var friend_name = prompt("Who is your friend?");
//            var friend_model = new Friend({
//                name: friend_name
//            });
//            //Add a new friend model to our friend collection
//            this.friends.add( friend_model );
//            this.friends.remove( friend_model );
//        },
//        addFriendLi: function (model) {
//            //The parameter passed is a reference to the model that was added
//            $("#friends-list").append("<li>" + model.get('name') + "</li>");
//        //Use .get to receive attributes of the model
//        }
//    });
//
//    var appview = new AppView;
