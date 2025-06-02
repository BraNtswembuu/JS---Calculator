// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation
let justCalculated = false;

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    
    // If we just calculated and now entering a new number, clear the display first
    if (justCalculated && !isNaN(value) && value !== '.') {
        display.value = '';
        justCalculated = false;
    }
    
    // If display shows 0, replace it unless we're adding a decimal point
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        // Don't allow multiple decimal points
        if (value === '.' && display.value.includes('.')) {
            return;
        }
        display.value += value;
    }
}

function clearDisplay() {
    console.log('Clear button pressed.');
    display.value = '0';
    justCalculated = false;
}

function deleteLast() {
    console.log('Backspace button pressed.');

    let currentValue = display.value;

    // If there's only one character or it's 0, reset to 0
    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
}

function calculate() {
    console.log('Equals button pressed.');
    
    try {
        // Replace × with * and ÷ with / for evaluation
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            // Format the result (limit decimal places if needed)
            display.value = parseFloat(result.toFixed(10)).toString();
        }
        
        justCalculated = true;
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    console.log('Key pressed', event.key);

    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+') {
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay('-');
    } else if (event.key === '*') {
        appendToDisplay('*');
    } else if (event.key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator loaded successfully');
    console.log('Display element:', display);

    if (display) {
        console.log('Current display value:', display.value);
    } else {
        console.log('Display element not found');
    }
});
