import React, { useState } from 'react';
import { Button, TextField, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Avatar, Clickable, Flex } from 'monday-ui-react-core';

const FragranceManager = ({ fragrances, loading, error, createFragrance, updateFragrance, deleteFragrance, refreshFragrances }) => {
    const [selectedFragrance, setSelectedFragrance] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleCreate = () => {
        createFragrance({ name, description, category, image_url: imageUrl });
        resetForm();
    };

    const handleUpdate = () => {
        if (selectedFragrance) {
            updateFragrance(selectedFragrance._id, { name, description, category, image_url: imageUrl });
            resetForm();
        }
    };

    const handleDelete = () => {
        if (selectedFragrance) {
            deleteFragrance(selectedFragrance._id);
            resetForm();
        }
    };

    const resetForm = () => {
        setSelectedFragrance(null);
        setName('');
        setDescription('');
        setCategory('');
        setImageUrl('');
    };

    const columns = [
        { id: "name", title: "Name", width: 150 },
        { id: "description", title: "Description" },
        { id: "category", title: "Category", width: 150 },
        { id: "image_url", title: "Image", width: 100 },
        { id: "created_at", title: "Created At", width: 150 },
        { id: "updated_at", title: "Updated At", width: 150 },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{height:"75vh"
        }}>
            <h2>Fragrance Manager</h2>
            <Flex gap={Flex.gaps.SMALL} direction={Flex.directions.COLUMN}>
            <TextField value={name} onChange={setName} placeholder="Name" />
            <TextField value={description} onChange={setDescription} placeholder="Description" />
            <TextField value={category} onChange={setCategory} placeholder="Category" />
            <TextField value={imageUrl} onChange={setImageUrl} placeholder="Image URL" />
            <Flex justify={Flex.justify.START} gap={Flex.gaps.MEDIUM}>
            <Button onClick={handleCreate}>Create</Button>
            <Button onClick={handleUpdate} disabled={!selectedFragrance}>Update</Button>
            <Button onClick={handleDelete} disabled={!selectedFragrance}>Delete</Button>
            <Button onClick={refreshFragrances}>Refresh</Button>
            </Flex>
            </Flex>
            <h3>Fragrances</h3>
            <Table columns={columns}>
                <TableHeader>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.id} title={column.title} />
                    ))}
                </TableHeader>
                <TableBody>
                    {fragrances.map((fragrance) => (
                        <Clickable onClick={() => {
                            setSelectedFragrance(fragrance);
                            setName(fragrance.name);
                            setDescription(fragrance.description);
                            setCategory(fragrance.category);
                            setImageUrl(fragrance.image_url);
                        }}>
                            <TableRow
                                key={fragrance._id}
                            >
                                <TableCell>{fragrance.name}</TableCell>
                                <TableCell>{fragrance.description}</TableCell>
                                <TableCell>{fragrance.category}</TableCell>
                                <TableCell>
                                    {fragrance.image_url ? (
                                        <Avatar
                                            size={Avatar.sizes.SMALL}
                                            src={fragrance.image_url}
                                            type={Avatar.types.IMG}
                                            alt={fragrance.name}
                                        />
                                    ) : (
                                        <span>No image</span>
                                    )}
                                </TableCell>
                                <TableCell>{new Date(fragrance.created_at).toLocaleString()}</TableCell>
                                <TableCell>{new Date(fragrance.updated_at).toLocaleString()}</TableCell>
                            </TableRow>
                        </Clickable>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default FragranceManager;