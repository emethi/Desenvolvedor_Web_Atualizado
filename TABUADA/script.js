document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiplication-form');
    const numberInput = document.getElementById('number');
    const multiplicatorInput = document.getElementById('multiplicator');
    const multiplicationTitle = document.getElementById('multiplication-title');
    const multiplicationOperations = document.getElementById('multiplication-operations');
    const printBtn = document.getElementById('print-btn');
    const clearBtn = document.getElementById('clear-btn');
  
    // Geração da tabuada
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const number = parseInt(numberInput.value, 10);
      const multiplicator = parseInt(multiplicatorInput.value, 10);
  
      if (isNaN(number) || isNaN(multiplicator) || number < 1 || multiplicator < 1) {
        multiplicationOperations.innerHTML = '<p>Insira números válidos maiores que 0.</p>';
        return;
      }
  
      if (multiplicator > 50) {
        alert('O limite máximo é 50. Ajustando para 50.');
        multiplicatorInput.value = 50;
        return form.dispatchEvent(new Event('submit'));
      }
  
      multiplicationTitle.innerHTML = `Tabuada do número: <span>${number}</span>`;
      multiplicationOperations.innerHTML = '';
  
      for (let i = 1; i <= multiplicator; i++) {
        const resultRow = document.createElement('div');
        resultRow.classList.add('row');
  
        const operation = document.createElement('div');
        operation.classList.add('operation');
        operation.textContent = `${number} × ${i} =`;
  
        const result = document.createElement('div');
        result.classList.add('result');
        result.textContent = number * i;
  
        resultRow.appendChild(operation);
        resultRow.appendChild(result);
        multiplicationOperations.appendChild(resultRow);
      }
    });
  
    // Imprimir tabuada
    printBtn.addEventListener('click', () => {
      const printWindow = window.open('', '', 'width=600,height=400');
      printWindow.document.write(`
        <html>
          <head>
            <title>Tabuada do ${numberInput.value}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
              .row { display: flex; justify-content: center; padding: 8px 0; }
              .operation { font-weight: bold; margin-right: 5px; }
              .result { color: #007bff; }
            </style>
          </head>
          <body>
            <h2>${multiplicationTitle.innerHTML}</h2>
            ${multiplicationOperations.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    });
  
    // Limpar resultados
    clearBtn.addEventListener('click', () => {
      numberInput.value = '';
      multiplicatorInput.value = '10';
      multiplicationTitle.innerHTML = 'Tabuada do número: <span>-</span>';
      multiplicationOperations.innerHTML = '<p>Informe um número para calcular a tabuada...</p>';
      numberInput.focus();
    });
  });