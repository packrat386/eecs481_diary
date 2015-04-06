var React = require('react');
var TextAutosize = require('react-textarea-autosize');


var TextPanel =  React.createClass({

	_getData: function(){
		console.log({
			title: this.refs.title.getDOMNode().value,
			text: this.refs.text.getDOMNode().value
		});
		return {
			title: this.refs.title.getDOMNode().value,
			text: this.refs.text.getDOMNode().value
		};
	},

	componentDidMount: function(){
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	render: function(){

		var view = null;
		if(this.props.edit === true){
			view = (
				<span>
					<div className="form-group">
						<label className="col-md-2 control-label" >Title</label>
						<div className="col-md-10">
							<TextAutosize 
								className="form-control" 
								ref="title" 
								defaultValue={this.props.entry.get("data").title}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label" >Text</label>
						<div className="col-md-10">
							<TextAutosize 
								className="form-control" 
								ref="text" 
								defaultValue={this.props.entry.get("data").text}
							/>
						</div>
					</div>
				</span>
			);
		} else {
			view = (
				<span>
					<h3>{this.props.entry.get("data").title}</h3>
					<p>{this.props.entry.get("data").text}</p>
				</span>
			);
		}

		return (<div>
			{view}
			</div>);
	}

});

module.exports = TextPanel;