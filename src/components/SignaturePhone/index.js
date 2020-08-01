import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Signature from 'react-native-signature-canvas';

//const SignaturePhone = ({text, onOK}) => {
class SignaturePhone extends Component{
	render = () => {console.log(this.props);
		return (
			<View style = {{width: this.props._width+20, height: this.props._height}}>
				<Signature
				  // handle when you click save button
				  onOK={(img) => {
						const {imageOutputAction} = this.props;
						if(imageOutputAction) imageOutputAction(img)
					}}
				  onEmpty={() => console.log("empty")}
				  // description text for signature
				  descriptionText=""
				  // clear button text
				  clearText= {this.props.clearText}
				  // save button text
				  confirmText={this.props.saveText}
				  // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
				  webStyle={`.m-signature-pad {
						  background-color: ${this.props.backgroundColor};
							width: ${this.props._width-2};
  						height: ${this.props._height-2};
              border: 1px solid black;
              box-shadow: none;
						}
            .m-signature-pad:before, .m-signature-pad:after {
              left: 0px;
              right: 0px;
              box-shadow: none;
            }
            m-signature-pad:after {
            	left: 0px;
            	right: 0px;
            }
            .m-signature-pad--body{
              bottom: 20px;
            }
            .m-signature-pad--body
              canvas {
                box-shadow: none;
              }
            .m-signature-pad--footer{
              padding: 0px;
              margin: 0px;
              width: 100%;
              left: 0px;
              right: 0px;
            }
						.m-signature-pad--footer
							.button{
								background-color: ${this.props.buttonBackgroundColor};
								color: ${this.props.buttonTextColor};
                width: 50%;
                padding: 0px;
                margin: 0px;
                border: 1px solid black;
                border-radius: 0px;
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
