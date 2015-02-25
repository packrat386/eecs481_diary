var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var TextAutosize = require('react-textarea-autosize');
var _ = require('underscore');
var Graffiti = require('./Graffiti');

var EntryTextView = React.createClass({

	getInitialState: function(){
		return {
			entry: this.props.initialEntry,
			edited: false,
			readOnly: true
		};
	},

	componentWillReceiveProps: function(newProps){
		this.setState({
			entry: newProps.initialEntry,
			edited: false,
			readOnly: true
		});
	},

	render: function(){

		var current_component = null;

		var buttons;
		//Save/Delete buttons or Edit button
		if(this.state.readOnly){
			buttons = (
				<div className="form-group">
					<div className="col-sm-7">
						<button 
							className="btn btn-primary"
							onClick={this._onEditClick}
						>Edit
						</button>
					</div>


				</div>
			);
		} else {
			buttons = (					
				<div className="form-group">
					<div className="col-sm-7">
						<button 
								className="btn btn-primary" 
								onClick={this._onUpdate}
							>Save</button>
						<span className="pull-right">
							<button 
									className="btn btn-danger"
									onClick={this._onDelete}
							>Delete</button>
						</span>
					</div>
				</div>
			);
		}

		if(this.state.entry){
			current_component = (
				<form className="form-horizontal">
					{buttons}
					<div className="form-group">
						<label className="col-md-1 control-label">Created</label>
						<div className="col-md-6">
							<input
								className="form-control"
								ref="diary_title"
								value={this.state.entry.createdAt}
								readOnly="true"
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-1 control-label">Title</label>
						<div className="col-md-6">
							<input
								className="form-control"
								ref="diary_title"
								onChange={this._onTitleChange}
								value={this.state.entry.title}
								readOnly={this.state.readOnly}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-1 control-label" >Text</label>
						<div className="col-md-6">
							<TextAutosize 
								className="form-control" 
								ref="diary_text" 
								onChange={this._onEntryChange} 
								value={this.state.entry.text}
								readOnly={this.state.readOnly}
							/>
						</div>
					</div>

					<div className="col-xs-12 col-md-7">
						<Graffiti readOnly={this.state.readOnly} entryID={this.state.entry.id}/>
					</div>
				</form>
			);
		} else {
			current_component = 
				(<div className="jumbotron col-xs-7">
					<h3>Diary entries show up here!</h3>
					
				</div>);
		} 
		return (
			<div className="container">
				{current_component}
			</div>
		);
	},

	_onUpdate: function(event){
		event.preventDefault();
		DiaryActions.updateEntry(this.state.entry, function(response){
			this.setState({
				entry: response,
				edited: false,
				readOnly: true
			});
		}.bind(this));
	},

	_onDelete: function(event){
		event.preventDefault();
		r = confirm("Are you sure you want to delete this entry?");
		if(r == true){
			var current_entry = this.state.entry;
			DiaryActions.removeEntry(this.state.entry);
		} 
	},

	_onTitleChange: function(event){
		console.log("onTitleChange");
		this.setState({
			entry:_.extend({}, this.state.entry, {
				title: event.target.value,
				edited: true
			})
		});
	},

	_onEntryChange: function(event){
		console.log("onEntryChange");
		this.setState({
			entry:_.extend({}, this.state.entry, {
				text: event.target.value,
				edited: true
			})
		});
	},

	_onEditClick: function(event){
		event.preventDefault();
		this.setState({
			readOnly: false
		});
	}

});

module.exports = EntryTextView;

