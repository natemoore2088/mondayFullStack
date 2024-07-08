import request from 'supertest';
import express, { Application, Request, Response, NextFunction } from 'express';
import { getAllFragrances, getFragranceById, createNewFragrance, updateFragrance, deleteFragrance } from '../controllers/fragranceController';
import Fragrance from '../models/Fragrance';

jest.mock('../models/Fragrance');

const app: Application = express();
app.use(express.json());

app.get('/fragrances', getAllFragrances);
app.get('/fragrances/:id', getFragranceById);
app.post('/fragrances', createNewFragrance);
app.patch('/fragrances/:id', updateFragrance);
app.delete('/fragrances/:id', deleteFragrance);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

describe('Fragrance Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /fragrances', () => {
    it('should return a list of fragrances', async () => {
      try {
        const mockFragrances = [{ name: 'Test Fragrance', description: 'Test Description', category: 'Test Category', image_url: 'test.jpg' }];
        (Fragrance.find as jest.Mock).mockReturnValue({
          sort: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          lean: jest.fn().mockResolvedValue(mockFragrances),
        });
        (Fragrance.countDocuments as jest.Mock).mockResolvedValue(1);

        const response = await request(app).get('/fragrances');
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.fragrances).toEqual(mockFragrances);
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });

  describe('GET /fragrances/:id', () => {
    it('should return a fragrance by id', async () => {
      try {
        const mockFragrance = { name: 'Test Fragrance', description: 'Test Description', category: 'Test Category', image_url: 'test.jpg' };
        (Fragrance.findById as jest.Mock).mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockFragrance),
        });

        const response = await request(app).get('/fragrances/1');
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFragrance);
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });

  describe('POST /fragrances', () => {
    it('should create a new fragrance', async () => {
      try {
        const newFragrance = { name: 'Test Fragrance', description: 'Test Description', category: 'Test Category', image_url: 'test.jpg' };
        (Fragrance.findOne as jest.Mock).mockReturnValue({
          collation: jest.fn().mockReturnThis(),
          lean: jest.fn().mockResolvedValue(null)
        });
        (Fragrance.create as jest.Mock).mockResolvedValue(newFragrance);
  
        const response = await request(app).post('/fragrances').send(newFragrance);
        console.log('Response body:', response.body);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('New fragrance Test Fragrance created');
        expect(response.body.fragrance).toEqual(newFragrance);
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });

  describe('PATCH /fragrances/:id', () => {
    it('should update a fragrance', async () => {
      try {
        const updatedFragrance = { name: 'Updated Fragrance', description: 'Updated Description', category: 'Updated Category', image_url: 'updated.jpg' };
        
        // Mock for the duplicate name check
        (Fragrance.findOne as jest.Mock)
          .mockReturnValueOnce({
            collation: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue(null)
          });
  
        // Mock for the findByIdAndUpdate
        (Fragrance.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFragrance);
  
        const response = await request(app).patch('/fragrances/1').send(updatedFragrance);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Updated Fragrance updated');
        expect(response.body.fragrance).toEqual(updatedFragrance);
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  
    it('should return 409 if updating to a duplicate name', async () => {
      try {
        const updatedFragrance = { name: 'Duplicate Fragrance' };
        
        // Mock for the duplicate name check
        (Fragrance.findOne as jest.Mock)
          .mockReturnValueOnce({
            collation: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue({ _id: 'some-other-id', name: 'Duplicate Fragrance' })
          });
  
        const response = await request(app).patch('/fragrances/1').send(updatedFragrance);
        console.log('Response body:', response.body);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('Duplicate fragrance name');
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });

  describe('DELETE /fragrances/:id', () => {
    it('should delete a fragrance', async () => {
      try {
        const deletedFragrance = { name: 'Deleted Fragrance', _id: '1' };
        (Fragrance.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedFragrance);

        const response = await request(app).delete('/fragrances/1');
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Fragrance Deleted Fragrance with ID 1 deleted');
        expect(response.body.deletedFragrance).toEqual(deletedFragrance);
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });
});