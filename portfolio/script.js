// Menu Hamburguer
function setupMenuToggle() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    
    menuToggle.onclick = function() {
        nav.classList.toggle('active');
        // Animação do ícone
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '✕';
        } else {
            menuToggle.innerHTML = '☰';
        }
    };
    
    // Insere o botão no header
    const header = document.querySelector('header');
    header.insertBefore(menuToggle, header.firstChild);
    
    // Fecha o menu quando um link é clicado (para mobile)
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 480) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });
}

// Modal
function setupModal() {
    const button = document.querySelector("button.Learn More");
    const modal = document.querySelector("dialog");
    const buttonClose = document.querySelector("dialog button");

    if (button && modal && buttonClose) {
        button.onclick = function() {
            modal.showModal();
        }

        buttonClose.onclick = function() {
            modal.close();
        }
    }
}

// Projetos do GitHub
function getProjects() {
    const urlGitHub = 'https://api.github.com/users/Giovanni1Santos/repos';
    var loadingElement = document.getElementById('loading');

    fetch(urlGitHub, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        showProjects(response);
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    })
    .catch((e) => {
        console.log('Error:', e);
        if (loadingElement) {
            loadingElement.textContent = 'Erro ao carregar projetos';
        }
    });
}

function showProjects(data) {
    var listElement = document.getElementById('my-projects-list');
    if (!listElement) return;

    // Limita a exibir apenas 6 projetos para não poluir a tela
    const projectsToShow = data.slice(0, 6);
    
    projectsToShow.forEach(project => {
        let div = document.createElement("div");
        let a = document.createElement("a");
        a.href = project.html_url || project.clone_url;
        a.target = '_blank';
        a.title = project.description || 'Sem descrição';
        a.textContent = project.name;
        div.appendChild(a);
        listElement.appendChild(div);
    });
}

// Inicializa tudo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setupMenuToggle();
    setupModal();
    getProjects();
    
    // Fecha o menu se clicar fora (para mobile)
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 480 && nav.classList.contains('active') && 
            !event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '☰';
            }
        }
    });
});