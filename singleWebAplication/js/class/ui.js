class UI{
    printUsers(registeredUsers,bodyTable){
        registeredUsers.listar().forEach(user => {
            const userRow = document.createElement("tr");
            userRow.innerHTML = 
            `<td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.edad}</td>
            <td>${user.website}</td>`;

            bodyTable.appendChild(userRow);
        })
    }
    

}
export default UI;