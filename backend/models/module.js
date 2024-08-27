import { Schema, model } from "mongoose";

const moduleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
        unique: true,
      },
      video: {
        url: {
          type: String,
          required: true,
          unique: true
        },
        duration: {
          type: Number, // in seconds
          required: true,
        },
        order: {
          type: Number, // order in which the video should be watched
          required: true,
          unique: true,
          default: 1,
        },
      },
    }, {
        timestamps: true,
    });

const Module = model("Module", moduleSchema);

export default Module;