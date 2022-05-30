import React from 'react'


const Notification = ({message}) => {

    const errorStyle = {
        color: 'Green',
        background: 'lightgrey',
        fontSize: 20,
        borderstyle: 'solid',
        padding: 10,
        marginbottom: 10
    }

    if (message == null) {
        return null
    }

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default Notification