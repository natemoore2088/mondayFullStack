import React, { useMemo } from 'react';
import { Dropdown } from 'monday-ui-react-core';


const DropdownInput = () => {
    const options = useMemo(
        () => [
            {
                value: "Rotem",
                label: "Rotem Dekel",
            },
            {
                value: "Hadas",
                label: "Hadas Farhi",
            },
            {
                value: "Netta",
                label: "Netta Muller",
            },
            {
                value: "Dor",
                label: "Dor Yehuda",
            },
        ],
        []
    ); return (
        <div>
            <Dropdown
                placeholder="Single line multi state"
                defaultValue={[options[0]]}
                options={options}
                multi
                className="dropdown-stories-styles_with-chips"
            />
        </div>
    )
}

export default DropdownInput;