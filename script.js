document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const messageInput = document.getElementById('message');
    const codeKeyInput = document.getElementById('codeKey');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const resultElement = document.getElementById('result');

    // Add event listeners to buttons
    encodeBtn.addEventListener('click', function() {
        processMessage(true);
    });

    decodeBtn.addEventListener('click', function() {
        processMessage(false);
    });

    // Function to process the message (encode or decode)
    function processMessage(isEncoding) {
        const message = messageInput.value;
        let codeKey = codeKeyInput.value.toLowerCase();
        
        // Validate inputs
        if (!message) {
            resultElement.textContent = "Please enter a message!";
            return;
        }
        
        if (!codeKey) {
            resultElement.textContent = "Please enter a code key!";
            return;
        }
        
        // Filter code key to only include letters
        codeKey = codeKey.replace(/[^a-z]/g, '');
        
        if (!codeKey) {
            resultElement.textContent = "Your code key must contain at least one letter!";
            return;
        }
        
        // Process the message
        const result = transformMessage(message, codeKey, isEncoding);
        resultElement.textContent = result;
    }

    // Function to transform the message (encode or decode)
    function transformMessage(message, codeKey, isEncoding) {
        let result = '';
        let keyIndex = 0;
        
        // Process each character in the message
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            
            // Check if the character is a letter
            if (/[a-zA-Z]/.test(char)) {
                const isUpperCase = char === char.toUpperCase();
                const letterCode = char.toLowerCase().charCodeAt(0) - 97; // 'a' is 97 in ASCII
                
                // Get the corresponding key letter
                const keyChar = codeKey[keyIndex % codeKey.length];
                const keyShift = keyChar.charCodeAt(0) - 97;
                
                // Calculate new letter code (0-25)
                let newLetterCode;
                if (isEncoding) {
                    // For encoding: add the shift
                    newLetterCode = (letterCode + keyShift) % 26;
                } else {
                    // For decoding: subtract the shift
                    newLetterCode = (letterCode - keyShift + 26) % 26;
                }
                
                // Convert back to a letter
                let newChar = String.fromCharCode(newLetterCode + 97);
                
                // Restore the original case
                if (isUpperCase) {
                    newChar = newChar.toUpperCase();
                }
                
                result += newChar;
                keyIndex++; // Move to the next key character
            } else {
                // Non-alphabetic characters remain unchanged
                result += char;
            }
        }
        
        return result;
    }

    // Add fun animation when buttons are clicked
    function addButtonAnimation(button) {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    addButtonAnimation(encodeBtn);
    addButtonAnimation(decodeBtn);
}); 