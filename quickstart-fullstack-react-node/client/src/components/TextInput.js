import React from 'react';
import { TextField } from 'monday-ui-react-core';

const TextInput = ({ text, title, placeholder, handleChange, type, required = false }) => {
    return (
        <div>
            <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>{title}</span>
                {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
            </div>
            <TextField
                placeholder={placeholder}
                type={type}
                value={text}
                wrapperClassName="monday-storybook-text-field_size"
                onChange={(value) => handleChange(value)}
                required={required}
            />        
        </div>
    )
}

export default TextInput;