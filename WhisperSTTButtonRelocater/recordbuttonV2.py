def create_ui():
    mu = shared.args.multi_user

    # ... [rest of the existing code prior to the generate-stop-container] ...

    with gr.Column(elem_id='generate-stop-container'):
        with gr.Row():
            shared.gradio['Stop'] = gr.Button('Stop', elem_id='stop', visible=False)
            shared.gradio['Generate'] = gr.Button('Generate', elem_id='Generate', variant='primary')
            # New "RecD" button
            shared.gradio['RecD'] = gr.Button('RecD', elem_id='RecD')

    # JavaScript action for the "RecD" button to toggle text and color
    shared.gradio['RecD'].click(None, None, None, _js="""() => {
        const recDButton = document.getElementById('RecD');
        const isRecording = recDButton.textContent === 'Active';
        Array.from(document.querySelectorAll('button')).find(
            button => button.textContent.includes('Record from microphone') || button.textContent.includes('Stop recording')
        ).click();
        
        if (isRecording) {
            recDButton.textContent = 'RecD';
            recDButton.style.color = ''; // Default color
        } else {
            recDButton.textContent = 'Active';
            recDButton.style.color = 'red'; // Active color
        }
    }""")

    # ... [rest of the existing code after the generate-stop-container] ...

    # Define all other elements, interactions, and layout as per your original code
    # ...


