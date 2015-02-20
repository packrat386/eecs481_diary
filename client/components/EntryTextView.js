var React = require('react');
var Router = require('react-router');
var SelectedEntryStore = require('../stores/SelectedEntryStore');
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var TextAutosize = require('react-textarea-autosize');
var _ = require('underscore');

var EntryTextView = React.createClass({

	getInitialState: function(){
		return {
			entry: null
		};
	},

	// Add change listeners to stores
	componentDidMount: function() {
		SelectedEntryStore.addChangeListener(this._onChange);
	},

  	// Remove change listers from stores
	componentWillUnmount: function() {
		SelectedEntryStore.removeChangeListener(this._onChange);
	},

	render: function(){

		var current_component = null;
		
		if(this.state.entry != null){
			current_component = (
				<form className="form-horizontal">
					<h2>Current Note</h2>
					<div className="form-group">
						<label className="col-sm-1 control-label">Title</label>
						<div className="col-sm-10">
							<input
								className="form-control"
								ref="diary_title"
								onChange={this._onTitleChange}
								value={this.state.entry.title}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-1 control-label">Diary Text</label>
						<div className="col-sm-10">
							<TextAutosize 
								className="form-control" 
								ref="diary_text" 
								onChange={this._onEntryChange} 
								value={this.state.entry.text}
							/>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-1 col-sm-10">
							<button 
								className="btn btn-default" 
								onClick={this._onUpdate}
								>Save</button>
						</div>
					</div>
				</form>
			);
		} 
		console.log('render');
		return (
			<div className="container">
				{current_component}
			</div>
		);
	},

	_onUpdate: function(event){
		event.preventDefault();
		console.log(this.state.entry);
		DiaryActions.updateEntry(this.state.entry);
	},

	_onChange: function(){
		console.log("onChange");
		if(this.state.entry){
			DiaryActions.updateEntry(this.state.entry);
		}

		var entry_id = SelectedEntryStore.currentSelected();
		console.log(DiaryEntryStore.getEntry(entry_id));
		this.setState({
			entry: DiaryEntryStore.getEntry(entry_id)
		});
		
	},

	_onTitleChange: function(event){
		console.log("onTitleChange");
		this.setState({
			entry:_.extend({}, this.state.entry, {
				title: event.target.value
			})
		});
	},

	_onEntryChange: function(event){
		console.log("onEntryChange");
		this.setState({
			entry:_.extend({}, this.state.entry, {
				text: event.target.value
			})
		});
	}

});

module.exports = EntryTextView;

