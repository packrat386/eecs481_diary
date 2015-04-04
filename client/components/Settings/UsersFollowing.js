var React = require('react');
var CaseStore = require('../../stores/CaseStore');
var SettingsActions = require('../../actions/SettingsActions');

var UsersFollowing = React.createClass({
	componentDidMount: function() {
		CaseStore.addChangeListener(this._onCurrentUserChange);
	},

	componentWillUnmount: function() {
		CaseStore.removeChangeListener(this._onCurrentUserChange);
	},

	_onCurrentUserChange: function(){


	},

	render: function(){

		return 
			<ul>

			</ul>;
	}


});

module.exports = UsersFollowing;