import React, { Component } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Text, View, StyleSheet } from 'react-native'
import "./reactsig.css"
class ReactSig extends Component {
	styles ={//= StyleSheet.create({
		wrapper: {
			borderColor: this.props.borderColor,
			//backgroundColor: this.props.backgroundColor,
			backgroundColor: this.props.backgroundColor,
			borderStyle: 'solid',
			borderWidth: 2,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',

			// width: this.props.width,
			// height: this.props.height,
		},
		div: {
			//backgroundColor: this.props.backgroundColor,
			backgroundColor: this.props.buttonBackgroundColor
			//border: "1px solid "+this.props.borderColor,
		},
		clearButton: {
			width: "50%",
		  height: "20%",
			backgroundColor: this.props.buttonBackgroundColor,
		  border: "1px solid "+this.props.borderColor,
		  borderBottom: "0",
		  margin: "auto",
		  display: "block",
		  float: "left",
			color: this.props.buttonTextColor

		},
		saveButton: {
			width: "50%",
		  height: "20%",
			backgroundColor: this.props.buttonBackgroundColor,
		  border: "1px solid "+this.props.borderColor,
		  borderBottom: "0",
		  margin: "auto",
		  display: "block",
		  float: "right",
			color: this.props.buttonTextColor
		}
	}//)
	 state = { trimmedDataURL: null, height: 160, width: 250 }

	 constructor(props){
		 super(props);
		 this.viewRef = React.createRef()
	 }
	 sigPad = {}

	 clear = () => {
		 this.sigPad.clear()
	 }

	 trim = () => {
		 let imgStuff = this.sigPage.getTrimmedCanvas().toDataURL('image/png')
		 this.setState({ trimmedDataURL: imgStuff })
		 const {imageOutputAction} = this.props;
			if(imageOutputAction) toggleAction(imgStuff)
	 }
	 componentDidMount = () => {
		 const height = this.viewRef.clientHeight;
		 const width = this.viewRef.clientWidth;
		 this.setState({componentHeight: height, componentWidth: width})

	 }
	render = () => {
		const { backgroundColor, penColor, borderColor, buttonTextColor, buttonBackgroundColor} = this.props
		const { trimmedDataURL } = this.state




		return (
			<View
				ref={this.viewRef}
				style={this.styles.wrapper}
				key={`view.${this.state.height+this.state.width}`}
				>
				<div>
						<SignatureCanvas
							penColor= {this.props.penColor}
							ref={(ref) => { this.sigPad = ref }}
				 			canvasProps={{width: this.state.width, height: this.state.height, className: 'sigCanvas'}}
							key={`sigCanvas.${this.props.backgroundColor+this.props.penColor}`}
				 		/>
				</div>
				<div style={this.styles.div} className="button-div">
        	<button
						style={this.styles.clearButton}
						className="clear-btn"
						onClick={this.clear}
						key={`clearButton.${this.props.buttonBackgroundColor+this.props.buttonTextColor}`}>
          	Clear
        	</button>
        	<button style={this.styles.saveButton} className="save-btn" onClick={this.trim}>
          	Save
        	</button>
      	</div>

			</View>

		)
	}
}


export default ReactSig
