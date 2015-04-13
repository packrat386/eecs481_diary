var React = require('react');
var Router = require('react-router');

var TextInput = React.createClass({

	// submitEntry: function(event){
	// 	event.preventDefault();
	// 	var title = this.refs.title.getDOMNode().value;
	// 	var text = this.refs.text.getDOMNode().value;

	// 	DiaryActions.addEntry({
	// 		data: {
	// 			title: title,
	// 			text: text
	// 		}
	// 	}, function(response){
	// 		if(response){
	// 			this.transitionTo('main');
	// 		}
	// 	}.bind(this));
	// 	console.log(title + " " + text);
	// },

	_getData: function(){
		var titleNode = this.refs.title.getDOMNode().value;
		var textNode = this.refs.text.getDOMNode().value;
		console.log("Entry Text: " + titleNode + " - " + textNode);
		return {
			data: {
				title: this.refs.title.getDOMNode().value,
				text: this.refs.text.getDOMNode().value
			}

		}
	},

	componentDidMount: function(){
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	render: function(){

		return (<span>
				<div className="row">
					<label className="control-label text-center">Title</label>
					<div className="col-sm-12 form-group">
						<input ref="title" type="title" className="form-control" defaultValue={this.props.initialTitle}/>
					</div>
				</div>
				<div className="row">
					<label className="col-sm-12 control-label">Notes</label>
					<div className="col-sm-12 form-group">
						<textarea ref="text" className="form-control" rows="4"></textarea>
					</div>
				</div>
			</span>
		);
	}
});

module.exports = TextInput;
