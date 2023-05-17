// Create button
const button = document.createElement('button');
button.textContent = 'Submit File';
button.style.backgroundColor = 'green';
button.style.color = 'white';
button.style.padding = '5px';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.margin = '5px';

// Create progress element
const progress = document.createElement('progress');
progress.style.width = '99%';
progress.style.height = '5px';
progress.style.backgroundColor = 'grey';

// Create progress bar inside the progress element
const progressBar = document.createElement('div');
progressBar.style.width = '0%';
progressBar.style.height = '100%';
progressBar.style.backgroundColor = 'blue';

progress.appendChild(progressBar);

// Find the target element to insert before
const targetElement = document.querySelector('.flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4');

// Insert the button and progress element before the target element
targetElement.parentNode.insertBefore(button, targetElement);
targetElement.parentNode.insertBefore(progress, targetElement);

// Add event listener to the button
button.addEventListener('click', async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt,.js,.py,.html,.css,.json,.csv';

  input.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    // Split file into chunks of size 15000
    const chunkSize = 15000;
    const content = await new Promise((resolve) => {
      reader.onload = () => {
        const text = reader.result;
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
          chunks.push(text.slice(i, i + chunkSize));
        }
        resolve(chunks);
      };
    });

    // Submit each chunk to the conversation
    const filename = file.name;
    const numChunks = content.length;
    for (let i = 0; i < numChunks; i++) {
      const chunk = content[i];
      await submitConversation(chunk, i + 1, filename);
      progressBar.style.width = `${((i + 1) / numChunks) * 100}%`;
    }

    // Check if ChatGPT is ready
    let chatgptReady = false;
    while (!chatgptReady) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      chatgptReady = !document.querySelector('.text-2xl > span:not(.invisible)');
    }

    // Update progress bar to blue
    progressBar.style.backgroundColor = 'blue';
  });

  // Trigger the file input dialog
  input.click();
});

// Function to submit conversation
async function submitConversation(text, part, filename) {
  const textarea = document.querySelector("textarea[tabindex='0']");
  const enterKeyEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 13,
  });
  textarea.value = `Part ${part} of ${filename}:\n\n${text}`;
  textarea.dispatchEvent(enterKeyEvent);
}
