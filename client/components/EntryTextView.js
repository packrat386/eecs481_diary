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

var EntryTextView = React.createClass({

	getInitialState: function(){
		return {
			entry: this.props.initialEntry,
			edited: false,
			readOnly: true,
			canvasFunc: null
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
		//Do not show edit buttons if the user cannot actually edit the entry
		if(this.state.entry && this.state.entry.getACL().getWriteAccess(CurrentUserStore.getUser().id)){
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
		}


		if(this.state.entry){
			current_component = (


				<form className="form-horizontal">
					{buttons}
					<div className="form-group">
						<label className="col-md-2 control-label">Author</label>
						<div className="col-md-6">
							<input
								className="form-control"
								value={this.state.entry.get("createdBy").id}
								readOnly="true"
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-2 control-label">Updated</label>
						<div className="col-md-6">
							<input
								className="form-control"
								value={moment(this.state.entry.updatedAt, "ddd MMM DD YYYY hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm:ss a")}
								readOnly="true"
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-2 control-label">Created</label>
						<div className="col-md-6">
							<input
								className="form-control"
								value={moment(this.state.entry.createdAt, "ddd MMM DD YYYY hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm:ss a")}
								readOnly="true"
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-2 control-label">Title</label>
						<div className="col-md-6">
							<input
								className="form-control"
								ref="diary_title"
								defaultValue={this.state.entry.get("data").title}
								readOnly={this.state.readOnly}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-2 control-label" >Text</label>
						<div className="col-md-6">
							<TextAutosize 
								className="form-control" 
								ref="diary_text" 
								defaultValue={this.state.entry.get("data").text}
								readOnly={this.state.readOnly}
							/>
						</div>
					</div>

					<div className="col-xs-12 col-md-11">
						<Graffiti 
							readOnly={this.state.readOnly} 
							entry={this.state.entry.get("data").canvasImage}
							registerCanvas={this.registerCanvas}
						/>
					</div>

					<div className="col-xs-12 col-md-11">
						<h3> Add Photo: </h3>
						<p>Select File!</p>
						<UploadImageForm />
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
			<div>
				{current_component}
			</div>
		);
	},

	_onUpdate: function(event){
		event.preventDefault();
		console.log('onUpdate');
		var curData = 
			{
				id: this.state.entry.id,
				data: this.state.entry.get("data")
			};
		
		if(this.state.canvasFunc){
			curData.data["canvasImage"] = this.state.canvasFunc();

		}
		curData.data["title"] = this.refs.diary_title.getDOMNode().value;
		curData.data["text"] = this.refs.diary_text.getDOMNode().value;

		console.log(curData);

		DiaryActions.updateEntry(curData, function(response){
			if(!(response instanceof Parse.Error)){
				this.setState({
					entry: response,
					edited: false,
					readOnly: true
				});		
			}

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

	_onEditClick: function(event){
		event.preventDefault();
		this.setState({
			readOnly: false
		});
	},

	registerCanvas: function(getCanvasFunc){
		this.setState({
			canvasFunc: getCanvasFunc
		});
	}

});

module.exports = EntryTextView;

