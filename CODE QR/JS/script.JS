const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");

const qrCodeInput = container.querySelector("#qr-form input");
const qrCodeImg = container.querySelector("#qr-code img");

// Gerar código
qrCodeBtn.addEventListener("click", () => {
  let qrCodeInputValue = qrCodeInput.value;

  if (!qrCodeInputValue) return;

  qrCodeBtn.innerText = "Gerando código...";

  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

  qrCodeImg.addEventListener("load", () => {
    container.classList.add("active");
    qrCodeBtn.innerText = "Código Gerado com Sucesso!";
  });
});

// Limpar área do código
qrCodeInput.addEventListener("keyup", () => {
  if (!qrCodeInput.value) {
    container.classList.remove("active");
    qrCodeBtn.innerText = "Gerar QR Code";
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.getElementById('print-btn');
    const saveBtn = document.getElementById('save-btn');
  
    printBtn.addEventListener('click', () => {
      const qrCode = document.getElementById('qr-code');
      const printWindow = window.open('', '', 'width=600,height=400');
      printWindow.document.write('<html><head><title>Imprimir QR Code</title></head><body>');
      printWindow.document.write(qrCode.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    });
  
    saveBtn.addEventListener('click', () => {
      const qrCodeImg = document.querySelector('#qr-code img');
      fetch(qrCodeImg.src)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Erro ao baixar a imagem:', error);
        });
    });
  });
  // CODIGO PARA QR CODE DE PAGAMENTOS