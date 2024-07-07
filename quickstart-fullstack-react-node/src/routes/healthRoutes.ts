import express, { Request, Response } from 'express';

const router = express.Router();

function getHealth() {
  return {
    ok: true,
    message: 'Healthy'
  };
}

router.get('/', (req: Request, res: Response) => {
  res.json(getHealth());
});

export default router;