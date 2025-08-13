const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resetNext = false;

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.dataset.value));
});

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Flash the matching button
    flashButton(key);

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        handleInput(key);
    } else if (key === "Enter" || key === "=") {
        handleInput("=");
    } else if (key.toLowerCase() === "c" || key === "Escape") {
        handleInput("C");
    }
});

function handleInput(value) {
    if (value === undefined || value === "") {
        return; // ignore bad input
    }

    if (value === "C") {
        currentInput = "";
        display.textContent = "0";
        addPulse();
        return;
    }

    if (value === "=") {
        try {
            currentInput = eval(currentInput).toString();
            display.textContent = currentInput;
            resetNext = true;
            addPulse();
        } catch {
            display.textContent = "Error";
            currentInput = "";
            addPulse();
        }
        return;
    }

    if (resetNext && !isNaN(value)) {
        currentInput = value;
        resetNext = false;
    } else {
        currentInput += value;
    }

    display.textContent = currentInput;
    addPulse();
}

// Make the button flash when pressed via keyboard
function flashButton(key) {
    let matchedButton = null;

    buttons.forEach(button => {
        if (button.dataset.value === key ||
            (key === "Enter" && button.dataset.value === "=") ||
            (key.toLowerCase() === "c" && button.dataset.value === "C")) {
            matchedButton = button;
        }
    });

    if (matchedButton) {
        matchedButton.classList.add("active");
        setTimeout(() => matchedButton.classList.remove("active"), 150);
    }
}

function addPulse() {
    display.classList.add("pulse");
    setTimeout(() => {
        display.classList.remove("pulse");
    }, 300);
}
