import React, {Component} from 'react';
import './modal.scss';

class Modal extends Component{
    

    render(){
        const {children, defaultAction, defaultActionText = "Okay", isOpen, secondaryAction = null, secondaryActionText = "Cancel"} = this.props

        if(isOpen){
            return(
                <div className="ws-modal">
                    <div className="ws-modal-content">
                        {children}

                        <div className="ws-modal-actions center">
                            <button className="btn orange darken-2 btn-large" onClick={defaultAction}>{defaultActionText}</button>

                            {
                                secondaryAction
                                ? <button className="btn orange darken-4 btn-large" onClick={secondaryAction}>{secondaryActionText}</button>
                                :null
                            }

                        </div>
                    </div>
                </div>
            )
        }

        return null;
        //makes nothig show up
    }
}

export default Modal;
