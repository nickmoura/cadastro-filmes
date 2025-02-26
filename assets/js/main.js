document.getElementById('movieForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Captura os valores dos campos e remove espaços extras
    const moviename = document.getElementById('moviename').value.trim();
    const director = document.getElementById('director').value.trim();
    const seenon = document.getElementById('seenon').value;
    const rate = document.getElementById('rate').value.trim();

    // Validação dos campos
    if (!moviename) {
        showToast("O nome do filme é obrigatório!", "danger");
        return;
    }
    
    if (!director) {
        showToast("O nome do diretor é obrigatório!", "danger");
        return;
    }

    if (!seenon) {
        showToast("A data de visualização é obrigatória!", "danger");
        return;
    }

    // Validação da data: não pode ser no futuro
    const today = new Date().toISOString().split('T')[0]; // Obtém a data de hoje no formato YYYY-MM-DD
    if (seenon > today) {
        showToast("A data de visualização não pode ser no futuro!", "danger");
        return;
    }

    if (!rate || isNaN(rate) || rate < 1 || rate > 5) {
        showToast("A nota deve ser um número entre 1 e 5!", "danger");
        return;
    }

    // Monta o objeto para envio
    const movieData = { moviename, director, seenon, rate };

    try {
        const response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData)
        });

        if (response.ok) {
            showToast("Filme cadastrado com sucesso!", "success");
            document.getElementById('movieForm').reset();
        } else {
            showToast("Erro ao cadastrar o filme.", "warning");
        }
    } catch (error) {
        showToast("Erro de comunicação com o servidor!", "warning");
    }
});

// Função para exibir os Toasts personalizados
// Função para exibir os Toasts personalizados
function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0 show`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Inicializa o toast corretamente
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Remove o toast após um tempo
    setTimeout(() => {
        bsToast.hide();
        toast.remove();
    }, 4000);
}

