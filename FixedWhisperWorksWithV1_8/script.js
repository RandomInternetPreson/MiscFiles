console.log("Whisper STT script loaded");

let mediaRecorder;
let audioChunks = [];

window.startRecording = function() {
    console.log("Start recording function called");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia not supported on your browser!");
        return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            console.log("Got audio stream");
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = []; // Reset audio chunks
            mediaRecorder.start();
            console.log("MediaRecorder started");

            mediaRecorder.addEventListener("dataavailable", event => {
                console.log("Data available event, data size: ", event.data.size);
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                console.log("MediaRecorder stopped");
                if (audioChunks.length > 0) {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    console.log("Audio blob created, size: ", audioBlob.size);
                    const reader = new FileReader();
                    reader.readAsDataURL(audioBlob);
                    reader.onloadend = function() {
                        const base64data = reader.result;
                        console.log("Audio converted to base64, length: ", base64data.length);
                        
                        const audioBase64Input = document.querySelector('#audio-base64 textarea');
                        if (audioBase64Input) {
                            console.log("Found audio-base64 textarea");
                            audioBase64Input.value = base64data;
                            audioBase64Input.dispatchEvent(new Event("input", { bubbles: true }));
                            audioBase64Input.dispatchEvent(new Event("change", { bubbles: true }));
                            console.log("Updated textarea with base64 data");
                        } else {
                            console.error("Could not find audio-base64 textarea");
                        }
                    }
                } else {
                    console.error("No audio data recorded");
                }
            });

            // Hide record button, show stop button
            const recordButton = gradioApp().querySelector("#record-button");
            const stopButton = gradioApp().querySelector("#stop-button");
            if (recordButton && stopButton) {
                recordButton.style.display = "none";
                stopButton.style.display = "inline-block";
            }
        })
        .catch(error => {
            console.error("Error accessing the microphone", error);
        });
}

window.stopRecording = function() {
    console.log("Stop recording function called");
    if (mediaRecorder && mediaRecorder.state === "recording") {
        console.log("Stopping MediaRecorder");
        mediaRecorder.stop();
        
        // Show record button, hide stop button
        const recordButton = gradioApp().querySelector("#record-button");
        const stopButton = gradioApp().querySelector("#stop-button");
        if (recordButton && stopButton) {
            recordButton.style.display = "inline-block";
            stopButton.style.display = "none";
        }
    } else {
        console.log("MediaRecorder not recording, no action taken");
    }
}

function gradioApp() {
    const elems = document.getElementsByTagName('gradio-app');
    const gradioShadowRoot = elems.length == 0 ? null : elems[0].shadowRoot;
    return gradioShadowRoot ? gradioShadowRoot : document;
}

// Wait for Gradio to finish loading
function onGradioLoaded() {
    console.log("Gradio loaded, setting up button listeners");
    const recordButton = gradioApp().querySelector("#record-button");
    const stopButton = gradioApp().querySelector("#stop-button");
    
    if (recordButton) {
        console.log("Record button found");
        recordButton.addEventListener('click', window.startRecording);
    } else {
        console.log("Record button not found");
    }
    
    if (stopButton) {
        console.log("Stop button found");
        stopButton.addEventListener('click', window.stopRecording);
        stopButton.style.display = 'none';
    } else {
        console.log("Stop button not found");
    }
}

// Check periodically if Gradio has loaded
const gradioLoadedCheckInterval = setInterval(() => {
    if (gradioApp().querySelector("#record-button")) {
        clearInterval(gradioLoadedCheckInterval);
        onGradioLoaded();
    }
}, 100);