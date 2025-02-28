document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multiplication-form");
    const numberInput = document.getElementById("number");
    const multiplicatorInput = document.getElementById("multiplicator");
    const multiplicationTitle = document.getElementById("multiplication-title");
    const multiplicationOperations = document.getElementById("multiplication-operations");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o recarregamento da página
        
        const number = parseInt(numberInput.value, 10);
        const multiplicator = parseInt(multiplicatorInput.value, 10);

        if (isNaN(number) || isNaN(multiplicator)) {
            multiplicationOperations.innerHTML = "<p>Por favor, insira números válidos.</p>";
            return;
        }

        // Atualiza o título
        multiplicationTitle.innerHTML = `Tabuada do número: <span>${number}</span>`;

        // Limpa resultados anteriores
        multiplicationOperations.innerHTML = "";

        // Gera a tabuada
        for (let i = 1; i <= multiplicator; i++) {
            const resultRow = document.createElement("div");
            resultRow.classList.add("row");

            const operation = document.createElement("div");
            operation.classList.add("operation");
            operation.textContent = `${number} x ${i} =`;

            const result = document.createElement("div");
            result.classList.add("result");
            result.textContent = number * i;

            resultRow.appendChild(operation);
            resultRow.appendChild(result);
            multiplicationOperations.appendChild(resultRow);
        }
    });
});
