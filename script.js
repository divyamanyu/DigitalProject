document.addEventListener("DOMContentLoaded", function () {
    const customerForm = document.getElementById("customerForm");
    const customerTable = document.getElementById("customerTable");

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    function renderTable() {
        customerTable.innerHTML = "";
        customers.forEach((customer, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td><button class="delete-btn" onclick="deleteCustomer(${index})">Delete</button></td>
            `;

            customerTable.appendChild(row);
        });

        localStorage.setItem("customers", JSON.stringify(customers));
    }

    customerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && email && phone) {
            customers.push({ name, email, phone });
            renderTable();

            customerForm.reset();
        }
    });

    window.deleteCustomer = function (index) {
        customers.splice(index, 1);
        renderTable();
    };

    renderTable();
});