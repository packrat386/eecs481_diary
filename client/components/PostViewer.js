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
    render: function() {
        var arrows;
        var contentString;

        return(
            <div class="container">
                <div class="row clearfix">
                    <div class="col-md-12 column">
                        <div class="page-header">
                            <h1 class="text-center">
                                April 2nd, 2015
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">
                    <div class="col-md-4 column">

                        <p class="text-left">
                            You had two visitors: <br>
                            Eric: <br>
                            <img alt="140x140" src="http://lorempixel.com/140/140/" class="img-circle">
                                <div>
                                </div>
                                Andrew <br>
                                <img alt="140x140" src="http://lorempixel.com/140/140/" class="img-circle">

                                </p>
                            </div>
                                <div class="col-md-4 column">
                                    <div class="row clearfix">
                                        <div class="col-md-12 column">
                                            <p>
                                                On Wednesday, April 2nd, you were in a great mood!.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row clearfix">
                                        <div class="col-md-12 column">
                                            <p class="text-center">
                                                You drew this:
                                            </p>
                                            <img alt="140x140" src="http://lorempixel.com/300/350/" class="img-square">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 column">
                                        <p>
                                            Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna.
                                            <img alt="140x140" src="http://lorempixel.com/300/250/" class="img-square">
                                                <img alt="140x140" src="http://lorempixel.com/400/350/" class="img-square">

                                                </p>
                                            </div>
                                        </div>
                                    </div>

        );
    }
});

module.exports = PostViewer;
