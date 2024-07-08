import React from 'react';
import { Dropdown } from 'monday-ui-react-core';

const DropdownInput = ({ options, selectedOptions, onChange, loading, error, maxSelections }) => {
    if (loading) return <div>Loading fragrances...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleChange = (newSelectedOptions) => {
        if (newSelectedOptions.length <= maxSelections) {
            onChange(newSelectedOptions);
        }
    };

    return (
        <div>
            <Dropdown
                placeholder={`Select ${maxSelections} fragrances`}
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                multi
                className="dropdown-stories-styles_with-chips"
                tooltipContent={`Select exactly ${maxSelections} different fragrances`}
            />
        </div>
    );
};

export default DropdownInput;