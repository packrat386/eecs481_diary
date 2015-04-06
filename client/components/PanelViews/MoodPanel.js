var React = require('react');
var Parse = require('../../utils/ParseInit');

function getImageSource(value){
	console.log("/images/pain-"+value+".png");
	return "/images/pain-"+value+".png";
}

var MoodPanel =  React.createClass({

	render: function(){
		return (<span>
				<img
					style={
						{
							height: "250px",
							paddingBottom: "20px"
						}
					}
					src={getImageSource(this.props.entry.get("data").value)} />
			</span>);
	}

});

module.exports = MoodPanel;