import {
  SignaturePhone
} from '../../index.js'

export const components = {
  SignaturePhone
}

export const config = {"displayName":"Signature","logo":"./logo.png","name":"signature-phone","version":"dev","components":[{"name":"SignaturePhone","displayName":"Signature","defaultWidth":250,"defaultHeight":160,"props":[{"name":"backgroundColor","displayName":"Background Color","type":"color","default":"#ffffff"},{"name":"penColor","displayName":"Pen Color","type":"color","default":"#000000"},{"name":"buttonBackgroundColor","displayName":"Button Background Color","type":"color","default":"@primary"},{"name":"clearText","displayName":"Clear Button Text","type":"text","default":"Clear"},{"name":"saveText","displayName":"Save Button Text","type":"text","default":"Save"},{"name":"buttonTextColor","displayName":"Button Text Color","type":"color","default":"@contrast:buttonBackgroundColor"},{"name":"borderColor","displayName":"Border Color","type":"color","default":"#000000"},{"name":"imageOutputAction","displayName":"Action on Saved Signature","type":"action","arguments":[{"type":"text","displayName":"Signature Image"}]}],"resizeX":true,"resizeY":true}]}