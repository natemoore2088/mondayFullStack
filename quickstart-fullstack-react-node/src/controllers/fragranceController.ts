import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Fragrance, { IFragrance } from '../models/Fragrance';

export const getAllFragrances = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    // Pagination and sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sort = req.query.sort as string || 'name';
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortField = sort.replace(/^-/, '');

    const fragrances = await Fragrance.find()
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

    const count = await Fragrance.countDocuments();
    
    if (!fragrances.length) {
        res.status(200).json({ message: 'No fragrances found' });
        return;
    }
    
    res.json({
        fragrances,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
});

export const getFragranceById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    
    const fragrance = await Fragrance.findById(id).lean();
    
    if (!fragrance) {
        res.status(200).json({ message: 'Fragrance not found' });
        return;
    }
    
    res.json(fragrance);
});

export const createNewFragrance = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, category, image_url } = req.body;

    if (!name || !description || !category || !image_url) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const duplicateName = await Fragrance.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean();

    if (duplicateName) {
        res.status(409).json({ message: 'Duplicate fragrance name' });
        return;
    }
    
    const fragranceObject: IFragrance = { name, description, category, image_url } as IFragrance;

    const fragrance = await Fragrance.create(fragranceObject);

    res.status(201).json({ message: `New fragrance ${name} created`, fragrance });
});

export const updateFragrance = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
        res.status(400).json({ message: 'Fragrance ID is required' });
        return;
    }
    // Check for duplicate fragrance names
    if (updateData.name) {
        const duplicate = await Fragrance.findOne({ name: updateData.name, _id: { $ne: id } })
            .collation({ locale: 'en', strength: 2 })
            .lean();
        if (duplicate) {
            res.status(409).json({ message: 'Duplicate fragrance name' });
            return;
        }
    }

    const updatedFragrance = await Fragrance.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedFragrance) {
        res.status(200).json({ message: 'Fragrance not found' });
        return;
    }

    res.json({ message: `${updatedFragrance.name} updated`, fragrance: updatedFragrance });
});

export const deleteFragrance = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    
    if (!id) {
        res.status(400).json({ message: 'Fragrance ID Required' });
        return;
    }

    const result = await Fragrance.findByIdAndDelete(id);

    if (!result) {
        res.status(200).json({ message: 'Fragrance not found' });
        return;
    }

    res.json({ 
        message: `Fragrance ${result.name} with ID ${result._id} deleted`,
        deletedFragrance: result
    });
});