import React from 'react'
import '../styles/Notifications.css'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function Notifications({notify,setNotify}) {
    return (
        <div className={`notification ${notify.isOpen?'show':'hide'}`}>
        <Alert onClose={() => {setNotify({isOpen: false,
        type:'success',
        message:'Added to the Cart',})}} severity={`${notify.type}`} >
        <AlertTitle>Success</AlertTitle>
        {notify.message} <strong>check out the Cart!</strong>
      </Alert>
      </div>
    )
}

export default Notifications
