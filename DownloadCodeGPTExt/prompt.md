Prompt 1:
The code should look for containers on the page that contain code and have the following attributes:

Class name: "flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"
Contains a button with class name "flex ml-auto gap-2"
Contains a span that displays the selected programming language
The "Create File" button that the code creates should have the following attributes:

Text content: "Create File"
ID: "update-vscode-btn"
Padding: "2px 10px"
Border: "none"
Border radius: "20px"
Text color: "#fff"
Background color: "#28a745"
Font weight: "300"
Margin right: "200px"

When the "Create File" button is clicked, the code should simulate a click on the "Copy Code" button and look for the programming language displayed in the span mentioned above to determine the appropriate file extension to use. The code should support the following programming languages:

JavaScript (.js)
HTML (.html)
CSS (.css)
Python (.py)

If the selected language is not one of the above, the file extension should default to ".txt".

The code should check for the existence of the "Create File" button in each container and only add it if it does not already exist. The addition of the button should be checked every 3 seconds using the setInterval function. The code should also listen for new code containers added to the page using a MutationObserver. Please provide the code.


Prompt2:
when the create button is clicked it should click on the following element: class="ﬁex mI-auto gap-2"
it should also dump the data from the clipboard into a file as speciﬁed earlier. please update the code.

