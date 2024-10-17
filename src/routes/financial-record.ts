import express, { Request, Response } from 'express';
import FinancialRecord from '../schema/finance-record';

const router = express.Router();

router.get('/getAllByUserID/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const record = await FinancialRecord.find({ userId: userId });
    if (record.length === 0) {
      return res.status(404).send('No records found for the user');
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecord(newRecordBody);

    const saveRecord = await newRecord.save();
    res.status(200).send(saveRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecord.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // const newRecordBody = req.body;
    const record = await FinancialRecord.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
