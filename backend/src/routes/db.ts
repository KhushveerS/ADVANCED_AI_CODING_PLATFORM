import express from 'express';
import { ProblemModel } from '../models/Problem';
import { SheetModel } from '../models/Sheet';
import { listSheets, getSheetProblems } from '../data/sheets';

const router = express.Router();

router.get('/sheets', async (req, res) => {
  try {
    const docs = await SheetModel.find({}).lean();
    if (docs.length > 0) return res.json({ success: true, data: docs.map(({ _id, __v, ...rest }) => rest) });
    return res.json({ success: true, data: listSheets(), source: 'fallback' });
  } catch (e) {
    return res.json({ success: true, data: listSheets(), source: 'fallback' });
  }
});

router.get('/sheets/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const docs = await ProblemModel.find({ sheetKey: key }).lean();
    if (docs.length > 0) {
      return res.json({ success: true, data: docs.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest) });
    }
    const fb = getSheetProblems(key);
    if (!fb) return res.status(404).json({ success: false, message: 'Sheet not found' });
    return res.json({ success: true, data: fb, source: 'fallback' });
  } catch (e) {
    const fb = getSheetProblems(key);
    if (!fb) return res.status(404).json({ success: false, message: 'Sheet not found' });
    return res.json({ success: true, data: fb, source: 'fallback' });
  }
});

export default router;


