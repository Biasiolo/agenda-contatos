document.addEventListener('DOMContentLoaded', () => { 
    // Este evento garante que o código JavaScript seja executado apenas após o carregamento completo do documento HTML.

    const contactForm = document.getElementById('contact-form');
    const contactTable = document.getElementById('contact-table');
    const phoneInput = document.getElementById('phone');

    // Função para formatar o telefone
    function formatPhoneNumber(input) {
        // Remove todos os caracteres não numéricos
        const phoneNumber = input.value.replace(/\D/g, '');

        // Aplica a formatação desejada
        if (phoneNumber.length >= 2) {
            input.value = `(${phoneNumber.substring(0, 2)}`;
            if (phoneNumber.length >= 7) {
                input.value += `) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`;
            } else {
                input.value += `) ${phoneNumber.substring(2, 7)}`;
            }
        }
    }

    // Atualiza a formatação do telefone à medida que o usuário digita
    phoneInput.addEventListener('input', () => {
        formatPhoneNumber(phoneInput);
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        const phone = phoneInput.value;

        if (name && phone) {
            // Adiciona uma nova linha à tabela de contatos com os valores inseridos no formulário
            const newRow = contactTable.insertRow(-1);
            const nameCell = newRow.insertCell(0);
            const phoneCell = newRow.insertCell(1);

            nameCell.innerHTML = name;
            phoneCell.innerHTML = phone;

            // Limpa os campos de entrada após a submissão
            nameInput.value = '';
            phoneInput.value = '';
        }
    });

    // Botão para salvar o arquivo em formato .txt
    const saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', () => {
        saveContactsAsTextFile();
    });

    function saveContactsAsTextFile() {
        // Obtém as informações da tabela de contatos e cria um arquivo de texto com esses dados
        const contactTable = document.getElementById('contact-table');
        const rows = contactTable.querySelectorAll('tr');
        let textContent = 'Nome\tTelefone\n';

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 2) {
                const name = cells[0].textContent;
                const phone = cells[1].textContent;
                textContent += `${name}\t${phone}\n`;
            }
        });

        // Cria um Blob a partir do conteúdo de texto
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Cria um link de download e simula um clique para fazer o download do arquivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contatos.txt';
        a.click();

        // Libera o URL após o download
        URL.revokeObjectURL(url);
    }
});

