document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const renderContacts = () => {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                    <h5>${contact.name}</h5>
                    <p class="mb-1">Email: ${contact.email}</p>
                    <p class="mb-1">Phone: ${contact.phone}</p>
                </div>
                <div>
                    <button class="btn btn-warning btn-sm me-2 edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            contactList.appendChild(li);
        });
        attachEventListeners();
    };

    const addContact = (name, email, phone) => {
        contacts.push({ name, email, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    };

    const deleteContact = (index) => {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    };

    const editContact = (index, newName, newEmail, newPhone) => {
        contacts[index] = { name: newName, email: newEmail, phone: newPhone };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    };

    const attachEventListeners = () => {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = (e) => {
                const index = parseInt(e.target.dataset.index);
                deleteContact(index);
            };
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.onclick = (e) => {
                const index = parseInt(e.target.dataset.index);
                const contact = contacts[index];

                const newName = prompt('Edit Name:', contact.name);
                const newEmail = prompt('Edit Email:', contact.email);
                const newPhone = prompt('Edit Phone:', contact.phone);

                if (newName && newEmail && newPhone) {
                    editContact(index, newName, newEmail, newPhone);
                }
            };
        });
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        addContact(name, email, phone);
        contactForm.reset();
    });

    renderContacts();
});