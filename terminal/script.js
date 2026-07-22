// caret
// completamente copiado do claude / gpt
// sou eu sou uma bichinha

const userInput = document.getElementById("userInput");
const caret = document.getElementById("caret");

const measurer = document.createElement("span");
measurer.style.font = getComputedStyle(userInput).font;
measurer.style.visibility = "hidden";
measurer.style.position = "absolute";
measurer.style.whiteSpace = "pre";
document.body.appendChild(measurer);

measurer.textContent = "M";
const charWidth = measurer.getBoundingClientRect().width;

function updateCaretPosition() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile){
        caret.style.left = `${userInput.offsetLeft + userInput.value.length * charWidth + 8}px`;
    }
    caret.style.left = `${userInput.offsetLeft + userInput.value.length * charWidth + 5}px`;
}

function showCaret() {
    caret.style.display = "inline";
    updateCaretPosition();
}

userInput.addEventListener("input", updateCaretPosition);
userInput.addEventListener("focus", showCaret);
userInput.addEventListener("blur", () => caret.style.display = "none");

window.addEventListener("DOMContentLoaded", () => {
    if (document.activeElement === userInput) showCaret();
});

// check

const ans = document.getElementById("answer");

function check() {

    let value = document.getElementById("userInput").value;
    const history = document.getElementById("history");
    const wrapperInput = document.getElementById("wrapperInput");

    //sanitizar input
    value = value.replace(/[<>/'"\s+]/g, "");

    const commands = {
        "ondeestavoce": "Estou em 30°27'56.3'N 130°29'50.1'E, <br> na direção em que o sol nasce...",
        "osolseposeondeestavoce": "Estou em 30°27'56.3'N 130°29'50.1'E, <br> na direção onde o sol nasce...",
        "futatsunokokoro": "...revivendo assuntos pra outra vida. E você? Onde está?",
        "distantedetudo": "https://youtube.com/[url]"
    };
    const commandsTroll = {
        "doiscoracoes": "Onde estamos?", // pequena excessao. botei aqui pq nao é a lagarta que fala
        "six": "seven",
        "gato": "miau",
        "bora": "bill",
        "ai": "que delicia cara",
        "pudim": "https://pudim.com.br"
    }

    // add
    history.innerHTML +=
        `<div class="historyLine">
        <span class="prefix">></span>
        <span class="content">${value}</span>
      </div>`;;

    // casos especiais
    if (value === "clear") {
        history.innerHTML = "";
    }
    else if (value === "help") {
        history.innerHTML +=
            `<p id="answerPrefix">
            As respostas aceitas não contém acentos, letras maiúsculas ou pontuação. <br>
            Tente fazer perguntas. <br><br>
            Boa sorte.
            <br><br>
            
            help: Mostra esta mensagem. <br>
            clear: Limpa o histórico. <br>
            color: Troca a cor do texto. <br> 
            <br>
                <span id="options">
                    color [opção]
                </span>
                <br> 
                <span id="options">
                    [R]ed, [W]ite, [G]reen, [P]ink, [B]lue
                </span><br>
                
            <p id="msgHelp">Anoitecer </p>
        </p>`
    }

    // resposta
    if (value in commands) {
        history.innerHTML +=
            `<div class="answerLine">
            <span id="answerPrefix">
                lagarta: 
            </span>
                ${commands[value]}
        </div>`;
    }
    else if (value in commandsTroll) {
        history.innerHTML +=
            `<div class="answerLine">
                ${commandsTroll[value]}
        </div>`;
    }

    document.getElementById("userInput").value = "";
    showCaret();
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        check();
    }
});

document.body.addEventListener('click', () => {
    userInput.focus();
});