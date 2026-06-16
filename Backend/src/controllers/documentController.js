
import prisma from '../config/prisma.js';

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path'; 
export const generateDocument = async (req, res) => {

try {

    const { templateId, values } = req.body;

    const template = await prisma.template.findUnique({
        where: {
            id: Number(templateId)
        }
    });

    if (!template) {
        return res.status(404).json({
            message: 'Template not found'
        });
    }

    let generatedContent = template.content;

    Object.entries(values).forEach(([key, value]) => {

        const regex = new RegExp(
            `<\\s*${key}\\s*>`,
            'g'
        );

        generatedContent =
            generatedContent.replace(
                regex,
                value || ''
            );

    });

    const document = await prisma.document.create({
        data: {
            templateId: template.id,
            content: generatedContent
        }
    });

    res.status(201).json({
        success: true,
        message: 'Document generated successfully',
        document
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}


};

export const getDocuments = async (req, res) => {
    try {
        const documents = await prisma.document.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await prisma.document.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!document) {
            return res.status(404).json({
                message: 'Document not found'
            });
        }

        res.status(200).json(document);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// 
export const previewDocument = async (req, res) => {

    try {

        const { templateId, values } = req.body;

        const template = await prisma.template.findUnique({
            where: {
                id: Number(templateId)
            }
        });

        if (!template) {
            return res.status(404).json({
                message: 'Template not found'
            });
        }

        let previewContent = template.content;

        Object.entries(values).forEach(([key, value]) => {
const regex = new RegExp(
    `<\\s*${key}\\s*>`,
    'g'
);

previewContent =
    previewContent.replace(
        regex,
        value || ''
    );

        });

        res.status(200).json({
            success: true,
            templateId,
            preview: previewContent
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Pdf Generation 
export const generatePDF = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await prisma.document.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!document) {
            return res.status(404).json({
                message: 'Document not found'
            });
        }

     const browser = await puppeteer.launch({
    headless: true
});

        const page = await browser.newPage();

        await page.setContent(document.content);

        const pdf = await page.pdf({
            format: 'A4'
        });

        await browser.close();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=document-${id}.pdf`
        });

        res.send(pdf);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};