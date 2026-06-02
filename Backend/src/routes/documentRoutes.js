import express from 'express';
import {
    generateDocument,
    getDocuments,
    getDocumentById
} from '../controllers/documentController.js';



const router = express.Router();

router.post('/generate', generateDocument);

router.get('/', getDocuments);

router.get('/:id', getDocumentById);


export default router;


