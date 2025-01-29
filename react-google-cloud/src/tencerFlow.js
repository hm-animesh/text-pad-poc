import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const TensorflowOCR = () => {
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Load the TensorFlow.js model
    const loadModel = async () => {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
    };

    // Detect objects in the video stream
    const detectObjects = async () => {
        if (!model) return;
        const video = videoRef.current;
        const predictions = await model.detect(video);
        setPredictions(predictions);

        // Draw predictions on the canvas
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "18px Arial";
        ctx.fillStyle = "red";
        predictions.forEach(prediction => {
            ctx.beginPath();
            ctx.rect(
                prediction.bbox[0],
                prediction.bbox[1],
                prediction.bbox[2],
                prediction.bbox[3]
            );
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] - 5);
        });
    };

    return (
        <div>
            <h1>TensorFlow.js Handwriting Recognition</h1>
            <button onClick={loadModel}>Load Model</button>
            <button onClick={detectObjects}>Detect Text</button>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                width="640"
                height="480"
                style={{ border: "2px solid black" }}
            />
            <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", top: 0, left: 0 }} />
            <div>
                {predictions.map((pred, index) => (
                    <p key={index}>{pred.class}</p>
                ))}
            </div>
        </div>
    );
};

export default TensorflowOCR;
