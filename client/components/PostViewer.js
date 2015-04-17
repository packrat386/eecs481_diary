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

var DatePicker = require('react-datepicker');

var PostViewer = React.createClass({

    render: function(){
        if(this.props.variableName){
            //dostuff
        }


        return (
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <div className="page-header text-center">
                            <h1>
                                April 2nd, 2015
                            </h1>

                            <DatePicker

                            />
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-md-4 column">
                        <p className="text-left">
                            You had two visitors: <br> </br>
                            test
                            <br> </br>
                            <img alt="140x140" src="http://lorempixel.com/140/140/" className="img-circle"></img> <br></br>
                            <br> </br>
                            test
                            <br> </br>
                            <img alt="140x140" src="http://lorempixel.com/140/140/" className="img-circle"></img> <br></br>
                        </p>
                    </div>
                </div>

                <div className="col-md-4 column">
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <p>
                                On Wednesday, April 2nd, you were in a great mood!.
                            </p>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <p className="text-center">
                                You drew this:
                                <img alt="140x140" src="http://lorempixel.com/140/140/" className="img-square"></img> <br></br>

                            </p>
                            </div>
                        </div>
                    </div>
                <div className="col-md-4 column">
                    <p>
                        <img alt="500x500" src="http://lorempixel.com/500/500/" className="img-square"></img> <br></br>
                    </p>
                </div>


            </div>


        );
    }
});

module.exports = PostViewer;


