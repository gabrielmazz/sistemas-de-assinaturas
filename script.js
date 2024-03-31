// Obtém a referência para o elemento canvas no documento HTML
const canvas = document.getElementById('canvas');

// Obtém o contexto de renderização 2D do canvas
const ctx = canvas.getContext('2d');

// Variáveis para controlar o estado da assinatura
let isSigning = false; // Indica se o usuário está assinando ou não
let lastX = 0; // Guarda a última posição X do mouse
let lastY = 0; // Guarda a última posição Y do mouse

// Função chamada quando o usuário começa a assinar
function startSigning(e) {
    isSigning = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Salva a posição atual do mouse
}

// Função chamada quando o usuário está assinando
function sign(e) {
    if (!isSigning) return; // Se não estiver assinando, retorna
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move o ponto de início para a última posição do mouse
    ctx.lineTo(e.offsetX, e.offsetY); // Desenha uma linha até a posição atual do mouse
    ctx.stroke(); // Renderiza a linha no canvas
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Atualiza a última posição do mouse
}

// Função chamada quando o usuário para de assinar
function stopSigning() {
    isSigning = false;
}

// Adiciona os event listeners para os eventos do mouse
canvas.addEventListener('mousedown', startSigning); // Quando o botão do mouse é pressionado
canvas.addEventListener('mousemove', sign);         // Quando o mouse é movido
canvas.addEventListener('mouseup', stopSigning);    // Quando o botão do mouse é solto
canvas.addEventListener('mouseout', stopSigning);   // Quando o mouse sai da área do canvas

// Adiciona um event listener para o botão de salvar
document.getElementById('saveButton').addEventListener('click', () => {
    
    // Converte o conteúdo do canvas para uma imagem base64
    const signatureImage = canvas.toDataURL(); 

    // Cria um elemento <a> para fazer o download da imagem
    const link = document.createElement('a'); 

    // Define o atributo href com a imagem base64
    link.href = signatureImage; 

     // Define o atributo download com o nome do arquivo
    link.download = 'assinatura.png';

     // Simula o clique no link para iniciar o download
    link.click();
});

// Adiciona um event listener para o botão de limpar
document.getElementById('clearButton').addEventListener('click', () => {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Adiciona um event para redirencionar para a página do formulário
//https://docs.google.com/forms/d/19t67NTkS7cCVxippZEDLEmgfRhvvVnEwWSb6UWxGWHc/edit?ts=65315e56
document.getElementById('formButton').addEventListener('click', () => {
    window.location.href = 'https://docs.google.com/forms/d/19t67NTkS7cCVxippZEDLEmgfRhvvVnEwWSb6UWxGWHc/edit?ts=65315e56';
});