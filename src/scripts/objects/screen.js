const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){  
        this.userProfile.innerHTML = `<div class="info">
                        <img scr="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                <p>👥 Seguidores: ${user.followers ?? 'Não possui seguidores 😢'}</p>
                                <p>👥 Seguindo: ${user.following ?? 'Não está seguindo ninguém 😢'}</p>
                                <br>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                            </div>
                        </div>`

            let repositoriesItens = ''
            user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                        <a href="${repo.html_url}" target="_blank">
                                                                            ${repo.name}
                                                                            <ul>
                                                                                <li>🍴${repo.forks_count}</li>
                                                                                <li>⭐${repo.stargazers_count}</li>
                                                                                <li>👀${repo.watchers_count}</li>
                                                                                <li>👨‍💻${repo.language}</li>
                                                                            </ul>
                                                                        </a>
                                                                    </li>`)

            if(user.repositories.length > 0) {
                this.userProfile.innerHTML +=   `<div class="repositories section">
                                                    <h2>Repositórios</h2>
                                                    <ul>${repositoriesItens}</ul>
                                                </div>`
            }

            let eventsList = ''

            if(user.events){
                user.events.forEach(event => {
                    if(event.payload && event.payload.commits){
                        event.payload.commits.forEach(commit => {
                            eventsList += `<li><b>${event.repo.name}</b> - ${commit.message}</li>`
                        })
                    }
                })
            }

            if (user.events.length > 0) {
                this.userProfile.innerHTML +=   `<div class="events">
                                                    <h2>Eventos</h2>
                                                    <ul>${eventsList}</ul>
                                                </div>`
            }
        },

    renderNotFound(){
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
    }

export { screen }