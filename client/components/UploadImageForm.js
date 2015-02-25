var React = require('react');
var Router = require('react-router');
var Parse = require('parse').Parse;
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var TextAutosize = require('react-textarea-autosize');
var _ = require('underscore');

var UploadImageForm = React.createClass({
  getInitialState: function() {
    return {
      myFileName: "",
      myFileHandle: {}
    };
  },

  handleChange: function(event) {
    console.log("handleChange() fileName = " + event.target.files[0].name);
    console.log("handleChange() file handle = " + event.target.files[0]);
    this.setState( {myFileName: event.target.files[0].name} );
    this.setState( {myFileHandle: event.target.files[0]} );
    console.log("got here");

    //test
    var myUser = Parse.User.current();
    var file = event.target.files[0];
    var name = event.target.files[0].name;
    console.log(file);
    console.log(name);

    var parseFile = new Parse.File(name, file);
      myUser.set("profilePicFile", parseFile);
      console.log(parseFile);

    if(!Parse.User.current()){
      if(cb) cb(null);
      console.log("null");
    }


    var ImageEntry = Parse.Object.extend("ImageEntry");
    var imageEntry = new ImageEntry();
    imageEntry.set("name", name);
    imageEntry.set("createdBy", Parse.User.current());
    imageEntry.set("profilePicFile", parseFile);
      console.log(imageEntry);

    imageEntry.save(null, 
      {
        success: function(entry){
          console.log("Added image");
          if(cb) cb(parseEntry(entry));
        },
        error: function(entry, error){
          console.log("Error adding");
          console.log(error);
          if(cb) cb(null);
        }
      }
    );

  },

  handleSubmit: function(e) {
    console.log("made it to submit");

    e.preventDefault();
    console.log("INSIDE: handleSubmit()");
    console.log("fileName = " + this.state.myFileName); 
    console.log("this.state.myFileHandle = " + this.state.myFileHandle);

    if (this.state.myFileHandle) {
      console.log("INSIDE if test myFileHandle.length");
      var file = this.state.myFileHandle;
      var name = this.state.myFileName;
      var parseFile = new Parse.File(name, file);

      var myUser = new Parse.Object("TestObj");
      myUser.set("profilePicFile", parseFile);
      myUser.save()
        .then(function() {
          // The file has been saved to User.
          this.setState( {myFileHandle: null} );
          console.log("FILE SAVED to Object: Parse.com");
        }.bind(this), function(error) {
          // The file either could not be read, or could not be saved to Parse.
          console.log("ERROR: Parse.com " + error.code + " " + error.message);
        });;
    } // end if
  },

  render: function() {
      return  (
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleChange} id="profilePhotoFileUpload" />
          <input type="submit" value="Post" />
        </form>
      );
  }
});


module.exports = UploadImageForm;
