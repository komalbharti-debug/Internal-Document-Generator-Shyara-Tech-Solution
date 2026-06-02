import prisma from '../config/prisma.js';

export const createTemplate = async (req, res) => {
    try {
        const { name, department, content } = req.body;

        const template = await prisma.template.create({
            data: {
                name,
                department,
                content
            }
        });

        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getTemplates = async (req, res) => {
    try {
        const templates = await prisma.template.findMany();

        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;

        const template = await prisma.template.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!template) {
            return res.status(404).json({
                message: "Template not found"
            });
        }

        res.status(200).json(template);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, content } = req.body;

        const template = await prisma.template.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                department,
                content
            }
        });

        res.status(200).json(template);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.template.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            message: "Template deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};