import React, { useState, useContext, useCallback } from 'react';
import { Flex, Button, Toast } from 'monday-ui-react-core';
import TextInput from './TextInput';
import DropdownInput from './DropdownInput';
import useMondayService from '../hooks/useMondayService';
import { MondayContext } from '../context/MondayContext'; 

const CustomForm = ({ fragrances, loading, error }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [inscription, setInscription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [selectedFragrances, setSelectedFragrances] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const MAX_FRAGRANCES = 3;

    const { boardId } = useContext(MondayContext);
    const { createOrder } = useMondayService();

    const handleFragranceChange = (selectedOptions) => {
        setSelectedFragrances(selectedOptions);
    };
    const validateForm = useCallback(() => {
        if (!firstName.trim()) return "First Name is required.";
        if (!lastName.trim()) return "Last Name is required.";
        if (!quantity || quantity <= 0) return "Quantity must be a positive number.";
        if (selectedFragrances.length !== MAX_FRAGRANCES) return `Please select exactly ${MAX_FRAGRANCES} fragrances.`;
        return null;
    }, [firstName, lastName, quantity, selectedFragrances]);

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setToastMessage(validationError);
            setShowToast(true);
            return;
        }

        //column values from mondayAPI. TODO dynamically assign these from monday query (would lift state into useMondayService hook or create a context)
        const columnValues = {
            text: firstName,
            text6: lastName,
            text5: inscription,
            numbers: quantity
        };

        const itemName = `${firstName} ${lastName} Order`;
        const fragranceLabels = selectedFragrances.map(f => f.label);

        try {
            const newItemId = await createOrder(boardId, itemName, columnValues, fragranceLabels);
            console.log('Order created successfully with ID:', newItemId);
            // Reset form fields
            setFirstName('');
            setLastName('');
            setInscription('');
            setQuantity(0);
            setSelectedFragrances([]);
            // Show success message to user
            alert('Order created successfully!');
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Failed to create order. Please try again.');
        }
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
                <TextInput
                        title="Inscription"
                        type="text"
                        text={inscription}
                        placeholder="Custom Inscription!"
                        handleChange={setInscription}
                        required={false}
                    />
                </div>
                <div style={{ width: "100%" }}>
                    <DropdownInput 
                        options={fragrances.map(f => ({ value: f._id, label: f.name }))}
                        selectedOptions={selectedFragrances}
                        onChange={handleFragranceChange}
                        maxSelections={MAX_FRAGRANCES}
                    />
                </div>
                <div style={{ alignSelf: 'flex-start' }}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </Flex>
            {showToast && (
                <Toast
                    open={showToast}
                    type={toastMessage.includes('successfully') ? Toast.types.POSITIVE : Toast.types.NEGATIVE}
                    autoHideDuration={3000}
                    onClose={() => setShowToast(false)}
                >
                    {toastMessage}
                </Toast>
            )}
        </div>
    );
};

export default CustomForm;