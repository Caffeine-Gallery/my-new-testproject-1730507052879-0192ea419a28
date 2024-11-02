import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let storedValue = '';
let currentOperation = null;

window.appendToDisplay = (value) => {
    currentValue += value;
    display.value = currentValue;
};

window.setOperation = (operation) => {
    if (currentValue !== '') {
        if (storedValue !== '') {
            calculate();
        } else {
            storedValue = currentValue;
            currentValue = '';
        }
    }
    currentOperation = operation;
};

window.clearDisplay = () => {
    currentValue = '';
    storedValue = '';
    currentOperation = null;
    display.value = '';
};

window.calculate = async () => {
    if (currentOperation && storedValue !== '' && currentValue !== '') {
        const x = parseFloat(storedValue);
        const y = parseFloat(currentValue);
        let result;

        try {
            switch (currentOperation) {
                case '+':
                    result = await backend.add(x, y);
                    break;
                case '-':
                    result = await backend.subtract(x, y);
                    break;
                case '*':
                    result = await backend.multiply(x, y);
                    break;
                case '/':
                    const divisionResult = await backend.divide(x, y);
                    if (divisionResult === null) {
                        throw new Error('Division by zero');
                    }
                    result = divisionResult;
                    break;
            }

            display.value = result.toString();
            storedValue = result.toString();
            currentValue = '';
            currentOperation = null;
        } catch (error) {
            display.value = 'Error: ' + error.message;
            storedValue = '';
            currentValue = '';
            currentOperation = null;
        }
    }
};
