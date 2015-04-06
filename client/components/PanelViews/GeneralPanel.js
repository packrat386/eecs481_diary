var React = require('react');
var Parse = require('../../utils/ParseInit');
var CurrentUserStore = require('../../stores/CurrentUserStore');
var DiaryActions = require('../../actions/DiaryActions');

var TextPanel = require('./TextPanel');
var DoodlePanel = require('./DoodlePanel');
var moment = require('moment');
var _ = require('underscore');

function classLookupFunc(entry, edit, cb){
	return {
		text: TextPanel,
		doodle: DoodlePanel
	};
}

// text: <TextPanel entry={entry} edit={edit} cb={cb}/>

var GeneralPanel =  React.createClass({

	getInitialState: function(){
		return {
			edit: false,
			getData: null,
			classLookup: classLookupFunc(), 
		}
	},

	_registerCallback: function(func){
		this.setState({
			getData: func
		});
	},

	_toggleEdit: function(){
		this.setState({
			edit: !this.state.edit
		});
	},

	_onUpdate: function(){
		if(this.state.getData){
			var curData = {
				id: this.props.entry.id,
				type: this.props.entry.get("type"),
				data: this.state.getData()
			};

			DiaryActions.updateEntry(curData, function(response){
				if(response instanceof Parse.Error || response === null){

				} else {
					this.setState(
						{edit:false}
					);
				}
			}.bind(this));
		} else {
			console.log("lol");
		}

		// console.log('onUpdate');
		// var curData = 
		// 	{
		// 		id: this.state.entry.id,
		// 		data: this.state.entry.get("data")
		// 	};
		
		// if(this.state.canvasFunc){
		// 	curData.data["canvasImage"] = this.state.canvasFunc();

		// }
		// curData.data["title"] = this.refs.diary_title.getDOMNode().value;
		// curData.data["text"] = this.refs.diary_text.getDOMNode().value;

		// console.log(curData);

		// DiaryActions.updateEntry(curData, function(response){
		// 	if(!(response instanceof Parse.Error)){
		// 		this.setState({
		// 			entry: response,
		// 			edited: false,
		// 			readOnly: true
		// 		});		
		// 	}

		// }.bind(this));
	},

	_onDelete: function(){
		r = confirm("Are you sure you want to delete this entry?");
		if(r == true){
			DiaryActions.removeEntry(this.props.entry);
		}
	},

	render: function(){
		var createdTime = moment(this.props.entry.createdAt, "ddd MMM DD YYYY hh:mm:ss");
		var updatedTime = moment(this.props.entry.updatedAt, "ddd MMM DD YYYY hh:mm:ss");
		var createdTimeString = createdTime.fromNow(true);

		var editedTime = null;
		if(createdTime.isSame(updatedTime) === false){

			var editedTimeString = updatedTime.fromNow(true);
			editedTime = <p>Updated {editedTimeString} ago</p>;
		}

		var buttons = null;
		if(this.props.entry.getACL().getWriteAccess(CurrentUserStore.getUser().id)){	
			if(this.state.edit === false){
				buttons = (
					<div className="form-group">
						<div className="col-sm-7">
							<button 
									className="btn btn-lg btn-primary" 
									onClick={this._toggleEdit}
								>Edit</button>
						</div>
					</div>
				);
			} else {
				buttons = (					
					<div className="form-group">
						<div className="col-sm-7">
							<button 
								className="btn btn-lg btn-primary" 
								onClick={this._onUpdate}
								>Save</button>

							<span className="pull-right">
								<button 
								className="btn btn-lg btn-primary" 
								onClick={this._toggleEdit}
								>Cancel</button>

								<button 
										className="btn btn-lg btn-danger"
										onClick={this._onDelete}
								>Delete</button>
							</span>
						</div>
					</div>
				);		
			}

		}

		var mainView = null;
		if(this.state.classLookup[this.props.entry.get("type")]){
			var ClassType = this.state.classLookup[this.props.entry.get("type")];
			mainView = (<
				ClassType
				entry={this.props.entry}
				edit={this.state.edit}
				registerCallback={this._registerCallback}
				/>);
		}	

		return (
			<div className="panel panel-default">
				<div className="panel-heading"> 
					<p><b>Author: {this.props.entry.get("createdBy").id}</b></p>
					{editedTime}
					<p>Added {createdTimeString} ago</p>
				</div>
				
				<div className="panel-body"> 
					{mainView}
					{buttons}
				</div>

			</div>);
	}

});

module.exports = GeneralPanel;