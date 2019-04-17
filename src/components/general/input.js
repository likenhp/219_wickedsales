import React from 'react';

export default ({col='s12', input, id, label, meta: {error, touched}, type = 'text'}) => {

    //const {col='s12', input, id, label, meta: {error, touched}, type = 'text'} = props

    return (
        <div className={`input-field col ${col}`}>
            <input {...input} id={id} type={type}/>
            <label htmlFor={id}>{label}</label>
            <p className="red-text text-datkern-2">{touched && error}</p>
        </div>
    )
}