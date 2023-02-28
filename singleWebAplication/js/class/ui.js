class UI{
    printUsers(registeredUsers,bodyTable){
        registeredUsers.forEach(user => {
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
    printPosts(registeredUsersPosts,registeredUsers, divUsersPosts){
        registeredUsers.forEach(user => {
            const divMain = document.createElement('div');
            const h3 = document.createElement('h3');
            const divPostsOfUser = document.createElement('div');
            h3.innerHTML =`Posts de ${user.username}`;
            divPostsOfUser.setAttribute('uk-sortable','group: sortable-group');
            divMain.setAttribute('class','allPostsContainer');
            divMain.setAttribute('id', 1000 + user.id);
            divMain.appendChild(h3);
            divMain.appendChild(divPostsOfUser);
            divUsersPosts.appendChild(divMain);
        });

        registeredUsersPosts.forEach(post => {
            const divPostsOfUser = document.getElementById(1000 + post.userId);
            const divChild = document.createElement('div');
            const articlePost = document.createElement('article');
            articlePost.innerHTML = 
            `<h4>${post.title}</h4>
            <p>${post.body}</p>`;

            divChild.classList.add('uk-margin');
            articlePost.classList.add('uk-card','uk-card-default','uk-card-body','uk-card-small');
            articlePost.setAttribute('id', `USP_${post.id}`);
            divChild.appendChild(articlePost);
            divPostsOfUser.appendChild(divChild);
        });
    }
    mountUsersToSelect(registeredUsers,selectTag){
        registeredUsers.forEach(user =>{
            const option = document.createElement('option');
            option.value = 1000 + user.id;
            option.innerHTML = user.username;
            selectTag.appendChild(option);
        })
    }
    
    showUserPostsFromSelectedUser(mainDiv, selectTag){
        const selectedOption = selectTag.options[selectTag.selectedIndex];
        const allPostsContainers = mainDiv.querySelectorAll('.allPostsContainer');
        if(selectedOption.value != 0){
            //En proceso
            allPostsContainers.forEach(userPostContainer =>{
                if(userPostContainer.id != selectedOption.value){
                    userPostContainer.style.display = 'none';
                }
                else{
                    userPostContainer.style.display ='block';
                }
            })
        } 
        else{
            allPostsContainers.forEach(userPostContainer =>{
                userPostContainer.style.display ='block';
            })
        }
    }

}
export default UI;