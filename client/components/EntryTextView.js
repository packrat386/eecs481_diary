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
			entry: this.props.initialEntry,
			edited: false,
			readOnly: true
		};
	},

	// Add change listeners to stores
	componentDidMount: function() {
		SelectedEntryStore.addChangeListener(this._onChange);
	},

	componentWillReceiveProps: function(newProps){
		if(!this.state.entry) return;
		if(this.state.entry.id !== newProps.entry.id){
			this._onChange();
		}
	},

  	// Remove change listers from stores
	componentWillUnmount: function() {
		SelectedEntryStore.removeChangeListener(this._onChange);
	},

	render: function(){

		var current_component = null;

		var buttons;
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
						<label className="col-sm-1 control-label">Title</label>
						<div className="col-sm-6">
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
						<label className="col-sm-1 control-label" >Text</label>
						<div className="col-sm-6">
							<TextAutosize 
								className="form-control" 
								ref="diary_text" 
								onChange={this._onEntryChange} 
								value={this.state.entry.text}
								readOnly={this.state.readOnly}
							/>
						</div>
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
		DiaryActions.updateEntry(this.state.entry, function(){
			this.setState({
				edited: false,
				readOnly: true
			});
		}.bind(this));
	},

	_onDelete: function(event){
		event.preventDefault();
		var current_entry = this.state.entry;
		DiaryActions.removeEntry(this.state.entry, function(response){
			//After delection, check if needed to deselect
			if(SelectedEntryStore.currentSelected() === current_entry.id){
				DiaryActions.setSelected(null);
			}
		});
	},

	_onChange: function(){
		if(this.state.entry && this.state.edited){
			DiaryActions.updateEntry(this.state.entry, function(){
				this.setState({
					edited: false,
					readOnly: true
				}.bind(this));
			});
		}

		var entry_id = SelectedEntryStore.currentSelected();
		this.setState({
			entry: DiaryEntryStore.getEntry(entry_id)
		});
		
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

