document.addEventListener("DOMContentLoaded", function () {
    console.log("🧪 Tudo Que Testei: JavaScript inicializado com sucesso!");

    // 1. Abrir links externos automaticamente em nova aba por segurança
    const links = document.querySelectorAll("a");
    const currentHost = window.location.hostname;

    links.forEach(link => {
        // Verifica se o link é externo
        if (link.hostname && link.hostname !== currentHost) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });

    // 2. Criar e injetar um botão dinâmico de "Voltar ao Topo"
    const backToTopButton = document.createElement("button");
    backToTopButton.innerHTML = "↑ Topo";
    backToTopButton.id = "back-to-top";

    // Estilização inline rápida para o botão flutuante combinar com o tema escuro
    Object.assign(backToTopButton.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 14px",
        backgroundColor: "#1e293b",
        color: "#38bdf8",
        border: "1px solid #334155",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: "600",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.2s ease",
                  display: "none",
                  zIndex: "999"
    });

    document.body.appendChild(backToTopButton);

    // Mostrar ou esconder o botão dependendo da rolagem da página
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Ação de clique para subir suavemente
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Efeito hover no botão via JS
    backToTopButton.addEventListener("mouseenter", function () {
        backToTopButton.style.backgroundColor = "#334155";
        backToTopButton.style.borderColor = "#38bdf8";
    });

    backToTopButton.addEventListener("mouseleave", function () {
        backToTopButton.style.backgroundColor = "#1e293b";
        backToTopButton.style.borderColor = "#334155";
    });
});
