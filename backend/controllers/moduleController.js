import Module from "../models/module.js";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from 'uuid';


const createModule = asyncHandler(async (req, res) => {

    const lastModule = await Module.findOne().sort({ 'video.order': -1 })
    const nextOrder = lastModule ? lastModule.video.order + 1 : 1;
    // Generate a unique title and video URL using uuidv4
    const title = `${uuidv4()}`;
    const videoUrl = `${uuidv4()}`;

    // Create a new module instance
    const newModule = new Module({
        title: title,
        content: `C${title}`,
        video: {
            url: videoUrl,
            duration: 10.2, 
            order: nextOrder
        }
    });

    try {
        const savedModule = await newModule.save();
        res.status(201).json({
            message: "Module created successfully",
            module: savedModule
        }); 
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message }); 
    }
});

//get all modules

const getAllModules = asyncHandler(async (req, res) => {
    try {
        const modules = await Module.find({});
        if (modules) {
            res.status(200).json({
                message: "Modules fetched successfully",
                modules: modules
            });
        } else {
            res.status(404).json({ message: "No modules found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// get single module

const getModuleById = asyncHandler(async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);

        if (module) {
            res.status(200).json({
                message: "Module fetched successfully",
                module: module
            });
        } else {
            res.status(404).json({ message: "Module not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// update module

const updateModule = asyncHandler(async (req, res) => {
    const { title, content, url, duration, order } = req.body;
    try {
        const updateModule = {
            title,
            content,
            video: {
                url: url,
                duration,
                order
            }
        }
        const updatedModule = await Module.findByIdAndUpdate(req.params.id, updateModule, { new: true });

        if (updatedModule) {
            res.status(200).json({
                message: "Module updated successfully",
                module: updatedModule
            });
        } else {
            res.status(404).json({ message: "Module not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// delete module

const deleteModule = asyncHandler(async (req, res) => {
    try {
        const deletedModule = await Module.findByIdAndDelete(req.params.id);

        if (deletedModule) {
            res.status(200).json({
                message: "Module deleted successfully",
                module: deletedModule
            });
        } else {
            res.status(404).json({ message: "Module not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});




export { createModule, getAllModules, getModuleById, updateModule, deleteModule };
