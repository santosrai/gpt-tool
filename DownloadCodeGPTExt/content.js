// Function to create the "Create File" button
function createButton(container) {
  //debugger
  //Check if container is null or not
   if (!container) {
    return;
  }

  // Check if button already exists in container
  if (container.querySelector('#update-vscode-btn')) {
    return; // Button already exists in this container, skip to next container
  }

  // Get the selected programming language from the span
  //const language = container.querySelector('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md > span');
  const languageElement = container.querySelector('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md > span');
  const language = languageElement ? languageElement.textContent : '';

  // Determine the appropriate file extension based on the language
  let extension;
  switch (language.toLowerCase()) {
    case 'javascript':
      extension = '.js';
      break;
    case 'html':
      extension = '.html';
      break;
    case 'css':
      extension = '.css';
      break;
    case 'python':
      extension = '.py';
      break;
    case 'json':
      extension = '.json';
      break;
    default:
      extension = '.txt';
      break;
  }


  // Create the "Create File" button
  const createButton = document.createElement('button');
  createButton.textContent = 'Create File';
  createButton.id = 'update-vscode-btn';
  createButton.style.padding = '2px 10px';
  createButton.style.border = 'none';
  createButton.style.borderRadius = '20px';
  createButton.style.color = '#fff';
  createButton.style.backgroundColor = '#28a745';
  createButton.style.fontWeight = '300';
  createButton.style.marginRight = '200px';

  // Add click event listener to simulate click on "Copy Code" button
  // Add click event listener to simulate click on "Create File" button
  createButton.addEventListener('click', () => {
    const targetElement = container.querySelector('.flex.ml-auto.gap-2');
    if (targetElement) {
      targetElement.click();
    }
    // Get the data from the clipboard
    navigator.clipboard.readText()
      .then((clipboardData) => {
        // console.log('Clipboard data:', clipboardData);

        // You can add code here to save the clipboardData to a file
        // For example, using the FileSaver.js library:
        const fileName = `code${extension}`;
        const blob = new Blob([clipboardData], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
      })
      .catch((error) => {
        console.error('Failed to read clipboard data:', error);
      });

  });

  // console.log('Added "Create File" button.');
  // console.log('Selected language:', language, 'File extension:', extension);

  // Add the button to the container
  container.querySelector('.flex.ml-auto.gap-2').before(createButton);
}


// Check for the existence of the "Create File" button every 3 seconds
setInterval(() => {
  const containers = document.querySelectorAll('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');
  containers.forEach(container => {
    createButton(container); // Call the createButton function when a mutation occurs
  });
}, 3000);

// Set up a MutationObserver to listen for new code containers added to the page
const observer = new MutationObserver(mutationList => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      const containers = document.querySelectorAll('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');
      containers.forEach(container => {
        createButton(container); // Call the createButton function when a mutation occurs
      });

    }
  }
});

// Observe changes to the body element and its descendants
observer.observe(document.body, { childList: true, subtree: true });

