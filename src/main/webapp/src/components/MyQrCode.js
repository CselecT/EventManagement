import React, {Component, Suspense} from "react";
import QRCode from "qrcode.react";
import Spinner from "reactstrap/es/Spinner";


export default class MyQrCode extends Component{

    render(){

if(this.props.open)  {return(
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>

            <h2>Thank you for applying!</h2>
            <QRCode
                includeMargin={true}
                value={this.props.myValue}
            />
        </div>
    </div>

)}
else return(<div></div>)
    }

}