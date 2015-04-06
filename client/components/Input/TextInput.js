var React = require('react');
var Router = require('react-router');

var TextInput = React.createClass({
	mixins: [Router.Navigation],

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
				<div className="form-group">
					<label className="col-sm-1 control-label">Title</label>
					<div className="col-sm-11">
						<input ref="title" type="title" className="form-control"/>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-1 control-label">Entry Text</label>
					<div className="col-sm-11">
						<textarea ref="text" className="form-control" rows="4"></textarea>
					</div>
				</div>
			</span>
		);
	}
});

module.exports = TextInput;