var React = require('react');
var GeneralPanel = require('./PanelViews/GeneralPanel');

var PanelList =  React.createClass({

	render: function(){

		var entries = this.props.entries.map(function(entry){
			return <GeneralPanel key={entry.id} entry={entry} />;
		});

		return (
			<div> {entries} </div>
			);
	}

});

module.exports = PanelList;