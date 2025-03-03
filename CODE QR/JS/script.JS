document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const qrForm = document.querySelector('#qr-form');
  const qrInput = document.querySelector('#qr-input');
  const qrType = document.querySelector('#qr-type');
  const qrSize = document.querySelector('#qr-size');
  const qrCodeSection = document.querySelector('#qr-code');
  const qrCodeImg = qrCodeSection.querySelector('img');
  const generateBtn = qrForm.querySelector('button');
  const printBtn = document.querySelector('#print-btn');
  const saveBtn = document.querySelector('#save-btn');
  const copyBtn = document.querySelector('#copy-btn');

  // Geração do QR Code
  qrForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = qrInput.value.trim();

    if (!inputValue || inputValue.length > 500) {
      alert('Por favor, insira um texto válido (máximo de 500 caracteres).');
      return;
    }

    generateBtn.textContent = 'Gerando...';
    generateBtn.disabled = true;

    let qrData = inputValue;
    const type = qrType.value;
    const size = qrSize.value;

    if (type === 'wifi') {
      qrData = `WIFI:T:WPA;S:${inputValue};P:senha123;;`;
    } else if (type === 'vcard') {
      qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${inputValue}\nEND:VCARD`;
    }

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;

    qrCodeImg.onload = () => {
      qrCodeSection.classList.add('active');
      container.classList.add('active');
      generateBtn.textContent = 'Gerado!';
      generateBtn.disabled = false;
    };

    qrCodeImg.onerror = () => {
      alert('Erro ao gerar o QR Code. Tente novamente.');
      generateBtn.textContent = 'Gerar QR Code';
      generateBtn.disabled = false;
    };
  });

  // Limpar ao digitar
  qrInput.addEventListener('input', () => {
    if (!qrInput.value) {
      qrCodeSection.classList.remove('active');
      container.classList.remove('active');
      generateBtn.textContent = 'Gerar QR Code';
      generateBtn.disabled = false;
    }
  });

  // Imprimir QR Code
  printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`
      <html>
        <head><title>Imprimir QR Code</title></head>
        <body style="text-align: center; padding: 20px;">
          ${qrCodeSection.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  });

  // Salvar QR Code
  saveBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(qrCodeImg.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${qrSize.value}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar o QR Code.');
    }
  });

  // Copiar URL
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrCodeImg.src)
      .then(() => {
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => (copyBtn.textContent = 'Copiar URL'), 2000);
      })
      .catch(() => alert('Erro ao copiar o link.'));
  });
});