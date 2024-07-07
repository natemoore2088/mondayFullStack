import React, { useState } from 'react';
import { Flex, Button } from 'monday-ui-react-core';
import TextInput from './TextInput';
import DropdownInput from './DropdownInput';

const CustomForm = ({ fragrances, loading, error }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [selectedFragrances, setSelectedFragrances] = useState([]);

    const handleFragranceChange = (selectedOptions) => {
        setSelectedFragrances(selectedOptions);
    };

    const handleSubmit = () => {
        console.log({
            firstName,
            lastName,
            quantity,
            selectedFragrances: selectedFragrances.map(option => option.label)
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Flex justify={Flex.justify.CENTER} gap={Flex.gaps.LARGE} direction={Flex.directions.COLUMN}>
                <Flex gap={Flex.gaps.MEDIUM}>
                    <TextInput
                        title="First Name"
                        type="text"
                        text={firstName}
                        placeholder="Jane"
                        handleChange={setFirstName}
                        required={true}
                    />
                    <TextInput
                        title="Last Name"
                        type="text"
                        text={lastName}
                        placeholder="Doe"
                        handleChange={setLastName}
                        required={true}
                    />
                    <TextInput
                        title="Quantity"
                        type="number"
                        text={quantity}
                        placeholder={0}
                        handleChange={setQuantity}
                        required={true}
                    />
                </Flex>
                <div style={{ width: "100%" }}>
                    <DropdownInput 
                        options={fragrances.map(f => ({ value: f._id, label: f.name }))}
                        selectedOptions={selectedFragrances}
                        onChange={handleFragranceChange}
                    />
                </div>
                <div style={{ alignSelf: 'flex-start' }}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </Flex>
        </div>
    );
};

export default CustomForm;