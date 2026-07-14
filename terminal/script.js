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

// ------------------ check

const ans = document.getElementById("answer");

function check() {
    const value = document.getElementById("userInput").value;
    const history = document.getElementById("history");
    const wrapperInput = document.getElementById("wrapperInput");

    const commands = {
        "gato": "miau",
        "six": "seven",
    };

    //repetir coisos
    history.innerHTML += `<div class="historyLine"><span class="prefix">></span> ${value}</div>`;;
    
    if (value === "clear"){
        history.innerHTML = "";
    }
    else if (value === "help"){
        history.innerHTML += `<p id="answerPrefix">

            help: Mostra essa mensagem. <br>
            color: Troca a cor do texto. <br>

            <span id="options">
                [R]ed, [W]ite, [G]reen, [P]ink,
            </span> <br>
            <span id="options">
                [B]lue, [LB] Light Blue, [LP] Light Pink
            </span>
            </p>`
    }

    if (value in commands){
        history.innerHTML += `<div class="answerLine"><span id="answerPrefix">lagarta: </span>${commands[value]}</div>`;
    }

    document.getElementById("userInput").value = "";

    showCaret();
}

userInput.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        check();
    }
});