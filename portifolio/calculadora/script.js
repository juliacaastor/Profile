let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let value = button.textContent;
        if (value === "C" && index === 0) {
            display.textContent = "";
        } else if (value === "CE" && index === 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else if (value === "<") {
            display.textContent = display.textContent.slice(0, -1);
        } else if (value === "=") {
            try {
                display.textContent = eval(display.textContent);
            } catch {
                display.textContent = "Erro";
            }
        } else if (value === "x") {
            const span = document.createElement("span");
            span.textContent = "*";
            display.append(span);
        } else {
            const span = document.createElement("span");
            span.textContent = value;
            display.append(span);
        }
    });
});