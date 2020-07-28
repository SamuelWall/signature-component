import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Signature from 'react-native-signature-canvas';

//const SignaturePhone = ({text, onOK}) => {
class SignaturePhone extends Component{
	render = () => {
		return (
			<View style = {{width: 300, height: 250}}>
				<Signature
				  // handle when you click save button
				  onOK={(img) => {
						const {imageOutputAction} = this.props;
						if(imageOutputAction) imageOutputAction(img)
					}}
				  onEmpty={() => console.log("empty")}
				  // description text for signature
				  descriptionText="Sign"
				  // clear button text
				  clearText= {this.props.clearText}
				  // save button text
				  confirmText={this.props.saveText}
				  // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
				  webStyle={`.m-signature-pad {
						  background-color: ${this.props.backgroundColor};
							width: 300px;
  						height: 250px;
						}
						.m-signature-pad--footer
							.button{
								background-color: ${this.props.buttonBackgroundColor};
								color: ${this.props.buttonTextColor};
							}
						`
				  }
				  autoClear={true}
				  imageType={"image/svg+xml"}
				/>
			</View>
	  );
	}
}

export default SignaturePhone
