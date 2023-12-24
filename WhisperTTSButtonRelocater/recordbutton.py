def create_ui():
    mu = shared.args.multi_user

    # ... [rest of the existing code prior to the generate-stop-container] ...

    with gr.Row(elem_id='generate-stop-container'):
        with gr.Column():
            shared.gradio['Stop'] = gr.Button('Stop', elem_id='stop', visible=False)
            shared.gradio['Generate'] = gr.Button('Generate', elem_id='Generate', variant='primary')
            # New "RecD" button
            shared.gradio['RecD'] = gr.Button('RecD', elem_id='RecD')

    # JavaScript action for the "RecD" button
    shared.gradio['RecD'].click(None, None, None, _js="""() => {
        Array.from(document.querySelectorAll('button')).find(
            button => button.textContent.includes('Record from microphone') || button.textContent.includes('Stop recording')
        ).click();
    }""")

    # ... [rest of the existing code after the generate-stop-container] ...

    # Define all other elements, interactions, and layout as per your original code
    # ...

# Don't forget to call create_ui() to build the interface
create_ui()
