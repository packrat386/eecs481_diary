var React = require('react');
var Router = require('react-router');

var VisitorList = React.createClass({

	_getData: function(){
		return {
			data: {
				visitors: this.refs.list.getDOMNode().value.split(",")
			}
		}
	},

	componentDidMount: function(){
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	render: function(){

		return (
			<span>
			<label className="control-label">Other Visitors (Separate name by comma)</label>
				<div className="form-group">
					
					<div className="col-sm-12">
						<input ref="list" type="list" className="form-control" defaultValue=""/>
					</div>
				</div>
			</span>
		);
	}
});

module.exports = VisitorList;