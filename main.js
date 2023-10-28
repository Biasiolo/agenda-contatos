document.addEventListener('DOMContentLoaded', () => { 
    const contactForm = document.getElementById('contact-form');
    const contactTable = document.getElementById('contact-table');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const contacts = []; // Array para armazenar os contatos

    function formatPhoneNumber(input) {
        const phoneNumber = input.value.replace(/\D/g, '');

        if (phoneNumber.length >= 2) {
            input.value = `(${phoneNumber.substring(0, 2)}`;
            if (phoneNumber.length >= 7) {
                input.value += `) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`;
            } else {
                input.value += `) ${phoneNumber.substring(2, 7)}`;
            }
        }
    }

    phoneInput.addEventListener('input', () => {
        formatPhoneNumber(phoneInput);
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const phone = phoneInput.value;

        if (name && phone) {
            // Adiciona o novo contato à matriz de contatos
            contacts.push({ name, phone });

            // Ordena a matriz de contatos em ordem alfabética com base no nome
            contacts.sort((a, b) => a.name.localeCompare(b.name));

            // Limpa a tabela HTML
            contactTable.innerHTML = '';

            // Insere os contatos na tabela na ordem classificada
            contacts.forEach(contact => {
                const newRow = contactTable.insertRow(-1);
                const nameCell = newRow.insertCell(0);
                const phoneCell = newRow.insertCell(1);
                nameCell.innerHTML = contact.name;
                phoneCell.innerHTML = contact.phone;
            });

            // Limpa os campos de entrada após a submissão
            nameInput.value = '';
            phoneInput.value = '';
        }
    });

    const saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', () => {
        saveContactsAsTextFile();
    });

    function saveContactsAsTextFile() {
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

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'contatos.txt';
        a.click();

        URL.revokeObjectURL(url);
    }
});