import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddEventDialog extends Component{

    state={
        inputData: {}
    }

    handleInputChange=(event)=>{
        event.persist();
        this.setState(prevState => {
            let inputData = {...prevState.inputData};
            inputData[event.target.id]=event.target.value;
            return{inputData};
        })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Event : {this.props.eventName} </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below to update the event.
                        </DialogContentText>
                        {this.props.fields.map(field => (
                            <TextField
                                margin="dense"
                                id={field.id}
                                label={field.label}
                                type={field.type}
                                defaultValue={field.defaultValue}
                                onChange={this.handleInputChange}
                                fullWidth
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>this.props.onSubmit(this.state.inputData, this.props.eventName)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
