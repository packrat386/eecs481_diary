var React = require('react');
var Router = require('react-router');
var EntryItem = require('./EntryItem');

var EntryList = React.createClass({
	render: function(){
		var entries = [];

		for(var key in this.props.allEntries){
			var isSelected=false;
			if((this.props.currentSelected) &&
				this.props.allEntries[key].id === this.props.currentSelected.id){
				isSelected = true;
			}
			entries.push(
				<EntryItem key={key} 
					entry={this.props.allEntries[key]} 
					isSelected={isSelected} 
					selectionCallback={this.props.selectionCallback}
				/>);
		}

		return (
			<div className="list-group">
				{entries}
			</div>
		)
	}

});

module.exports = EntryList;