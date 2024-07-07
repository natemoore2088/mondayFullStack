import React from 'react';
import { Dropdown } from 'monday-ui-react-core';

const DropdownInput = ({ options, selectedOptions, onChange, loading, error }) => {
    if (loading) return <div>Loading fragrances...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Dropdown
                placeholder="Select fragrances"
                options={options}
                value={selectedOptions}
                onChange={onChange}
                multi
                className="dropdown-stories-styles_with-chips"
            />
        </div>
    );
};

export default DropdownInput;