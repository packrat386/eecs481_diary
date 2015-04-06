var React = require('react');
var Parse = require('../../utils/ParseInit');

var MoodPanel =  React.createClass({

	function getImageSource(value){
		console.log("/images/pain-"+value+".png");
		return "/images/pain-"+value+".png";
	}

	var painList = [0, 2, 4, 8, 10];

	render: function(){
		return 
			<span>
				<img src={getImageSource(this.props.entry.get("data").mood)} />
			</span>;
	}

});

module.exports = MoodPanel;