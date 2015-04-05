var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var TextAutosize = require('react-textarea-autosize');
var _ = require('underscore');
var Graffiti = require('./Graffiti');
var UploadImageForm = require('./UploadImageForm');
var moment = require('moment');
var CurrentUserStore = require ('../stores/CurrentUserStore');
var Parse = require('../utils/ParseInit');

var PostViewer = React.createClass({

    render: function(){
        return (
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <div className="page-header">
                            <h1 className="text-center">
                                April 2nd, 2015
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-md-4 column">
                        <p className="text-left">
                            You had two visitors: <br> </br>
                            test
                            <img alt="140x140" src="http://lorempixel.com/140/140/" className="img-circle"></img> <br></br>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PostViewer;


