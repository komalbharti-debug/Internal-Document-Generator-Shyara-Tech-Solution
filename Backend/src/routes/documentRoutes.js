import express from 'express';
import {
    generateDocument,
    getDocuments,
    getDocumentById,
    generatePDF,
    previewDocument
} from '../controllers/documentController.js';


const router = express.Router();
router.post('/preview', previewDocument);

router.post('/generate', generateDocument);

router.get('/', getDocuments);

router.get('/:id', getDocumentById);

router.get('/:id/pdf', generatePDF);

export default router;


