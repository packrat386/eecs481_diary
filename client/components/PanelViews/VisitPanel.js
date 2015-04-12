var React = require('react');
var Parse = require('../../utils/ParseInit');
var TextPanel = require('./TextPanel');
var _ = require('underscore');
var moment = require('moment');
var UtilityFunctions = require('../../utils/UtilityFunctions');

var VisitPanel =  React.createClass({

	getInitialState: function(){
		return {
			getDataFunc: null
		};
	},

	componentDidMount: function(){
		this.props.registerCallback(this._getData);
	},

	_getData: function(){
		if(this.state.getDataFunc){
			console.log($.extend(true, {}, 
 					this.props.entry.get("data")
					, this.state.getDataFunc()));
			return $.extend(true, {}, 
 					this.props.entry.get("data")
					, this.state.getDataFunc());
		} else {
			return {}
		}
	},

	_registerCallback: function(func){
		this.props.registerCallback(_getData);
	},

	_registerChild: function(func){
		this.setState({
			getDataFunc: func
		});
	},


	render: function(){

		var photo = null;
		if(this.props.entry.get("photo")){
			photo = <img src={

				UtilityFunctions.getSecureParseFile(this.props.entry.get("photo").url())
			} />
		}

		var visitors = null;
		if(this.props.entry.get("data").visitors &&
			this.props.entry.get("data").visitors.length > 0){
			var visitorString = "";
			this.props.entry.get("data").visitors.map(function(visitor){
				visitorString += visitor + ", ";
			});
			visitorString = visitorString.slice(0, -2);

			visitors = (<span>
				<p><b>Visitors: </b>{visitorString}</p>
				</span>);
		}

		return (<span>
			{visitors}
			<TextPanel 
				entry={this.props.entry} 
				registerCallback={this._registerChild}
				edit={this.props.edit}
			/>
			{photo}
			<br/>
			</span>);
	}

});

module.exports = VisitPanel;