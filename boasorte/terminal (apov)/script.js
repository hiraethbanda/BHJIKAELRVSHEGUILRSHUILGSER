// caret
// completamente copiado do claude

const userInput = document.getElementById('userInput');
const caret = document.getElementById('caret');

const measurer = document.createElement('span');
measurer.style.font = getComputedStyle(userInput).font;
measurer.style.visibility = 'hidden';
measurer.style.position = 'absolute';
measurer.style.whiteSpace = 'pre';
document.body.appendChild(measurer);

function updateCaretPosition() {
    measurer.textContent = userInput.value;
    const textWidth = measurer.getBoundingClientRect().width;
    caret.style.left = `${userInput.offsetLeft + textWidth + 5}px`;
}

function showCaret() {
    caret.style.display = 'inline';
    updateCaretPosition();
}

userInput.addEventListener('input', updateCaretPosition);
userInput.addEventListener('focus', showCaret);
userInput.addEventListener('blur', () => caret.style.display = 'none');

window.addEventListener('DOMContentLoaded', () => {
    if (document.activeElement === userInput) showCaret();
});

// check

const ans = document.getElementById("answer");

async function check() {
    const guess = userInput.value;

    const res = await fetch("netlify/functions/check.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess }),
    });

    const data = await res.json();
    ans.textContent = data.ans;
}

userInput.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        check();
    }
});