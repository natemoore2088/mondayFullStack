import React, { useState } from 'react';
import { Flex, Button, Box } from 'monday-ui-react-core';
import TextInput from './TextInput';
import DropdownInput from './DropdownInput';

const CustomForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = () => {
        console.log(lastName, firstName, quantity);
    }

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
                    <DropdownInput />
                </div>
                <div style={{ alignSelf: 'flex-start' }}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </Flex>
        </div>
    )
}

export default CustomForm;