document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const formInicio = document.getElementById('form-inicio');
    const modalInstrucoes = document.getElementById('modal-instrucoes');
    const botaoFecharModal = document.getElementById('botao-fechar-modal');
    const menuPrincipal = document.getElementById('menu-principal');
    const selecaoCliente = document.getElementById('selecao-cliente');
    const cenariosContainer = document.getElementById('cenarios-container');
    const botaoFinalizar = document.getElementById('botao-finalizar');

    // Dados do Participante e Progresso
    let participante = { nome: '', equipe: '' };
    let statusCenarios = {
        pedro: { status: 'pendente', nome: 'Pedro' },      julia: { status: 'pendente', nome: 'Júlia' },
        ana: { status: 'pendente', nome: 'Ana' },          carlos: { status: 'pendente', nome: 'Carlos' },
        mariana: { status: 'pendente', nome: 'Mariana' },  ricardo: { status: 'pendente', nome: 'Ricardo' },
        fernanda: { status: 'pendente', nome: 'Fernanda' },lucas: { status: 'pendente', nome: 'Lucas' },
        sonia: { status: 'pendente', nome: 'Sônia' },      gustavo: { status: 'pendente', nome: 'Gustavo' },
        beatriz: { status: 'pendente', nome: 'Beatriz' },  tiago: { status: 'pendente', nome: 'Tiago' }
    };

    // Banco de Dados de Feedbacks
    const feedbacks = {
        pedro_fb_1a: { tipo: 'correto', texto: '<strong>Ótimo começo!</strong><br>Você foi proativo e abriu a conversa de forma aberta, sem pressionar. Isso deixa o cliente à vontade para falar.' },
        pedro_fb_1b: { tipo: 'errado', texto: '<strong>Cuidado!</strong><br>Oferecer um produto sem saber quem é a pessoa é um erro. A abordagem correta é investigar primeiro. Ex: "Seja bem-vindo! Você já empreende ou está começando?"' },
        pedro_fb_1c: { tipo: 'errado', texto: '<strong>Poderia ser melhor.</strong><br>Ser passivo pode funcionar, mas na agitação de uma feira, você perde a oportunidade. A abordagem correta é tomar a iniciativa de forma consultiva.' },
        pedro_fb_2a: { tipo: 'correto', texto: '<strong>Perfeito!</strong><br>Você ouviu a palavra-chave "portfólio" e conectou diretamente à solução ideal: o Criador de Sites.' },
        pedro_fb_2b: { tipo: 'errado', texto: '<strong>Escute o cliente!</strong><br>Ele não disse que queria VENDER, mas sim MOSTRAR o trabalho. A abordagem correta seria focar na necessidade declarada, oferecendo o Criador de Sites.' },
        pedro_fb_2c: { tipo: 'correto', texto: '<strong>Boa jogada de Vendedor!</strong><br>Você já introduziu a ideia do serviço de maior valor (UOL Faz Para Você), se posicionando como um consultor que apresenta opções.' },
        pedro_fb_3a: { tipo: 'correto', texto: '<strong>Excelente Quebra de Objeção com Upsell!</strong><br>Você resolveu a objeção ("é complicado") e imediatamente usou a resposta para abrir a porta para um produto de maior valor. Perfeito.' },
        pedro_fb_3b: { tipo: 'errado', texto: '<strong>Resposta Fraca.</strong><br>Apenas dizer "é fácil" não convence. A abordagem correta seria explicar o PORQUÊ é fácil, mencionando o Editor com IA.' },
        pedro_fb_3c: { tipo: 'errado', texto: '<strong>Abordagem de Upsell Agressiva.</strong><br>Você desistiu da primeira opção rápido demais. O correto seria primeiro quebrar a objeção do Criador de Sites e depois, sutilmente, introduzir o UOL Faz Para Você como alternativa.' },
        pedro_fb_4a: { tipo: 'correto', texto: '<strong>Venda de Valor!</strong><br>Você focou nos benefícios para o cliente ("tranquilidade", "focar no trabalho dele"), justificando o investimento no UOL Faz para Você. Perfeito.' },
        pedro_fb_4b: { tipo: 'errado', texto: '<strong>Não desvalorize o produto!</strong><br>Ao sugerir o produto mais barato, você mesmo diminuiu a percepção de valor do serviço mais completo. A abordagem correta é manter o foco nos benefícios de cada opção.' },
        pedro_fb_4c: { tipo: 'errado', texto: '<strong>Preço não é benefício!</strong><br>O argumento de "preço bom" é fraco. A abordagem correta é sempre focar no VALOR que o cliente recebe (tranquilidade, site profissional, etc.).' },
        julia_fb_1a: { tipo: 'correto', texto: '<strong>Diagnóstico perfeito!</strong><br>Você rapidamente identificou que o problema não era o site em si, mas a falta de visitas (tráfego), e começou a investigar a origem dos clientes.'},
        julia_fb_1b: { tipo: 'errado', texto: '<strong>Erro de diagnóstico!</strong><br>A cliente disse que já tem um site. A abordagem correta seria investigar POR QUE o site não traz resultado, em vez de tentar vender um novo.'},
        julia_fb_1c: { tipo: 'errado', texto: '<strong>Solução errada!</strong><br>Ela não mencionou vender produtos, e sim que seu site não recebe visitas. Oferecer uma loja virtual não resolve o problema de tráfego.'},
        julia_fb_2a: { tipo: 'correto', texto: '<strong>Solução Direcionada!</strong><br>A cliente falou "procuram no Google", e você ofereceu a solução exata para isso: Google Ads. Demonstra escuta ativa e conhecimento.'},
        julia_fb_2b: { tipo: 'errado', texto: '<strong>Poderia funcionar, mas não é o ideal.</strong><br>UOL Anúncios é ótimo para visibilidade, mas a abordagem correta seria priorizar o Google Ads, que ataca diretamente a intenção de busca que a cliente mencionou.'},
        julia_fb_2c: { tipo: 'errado', texto: '<strong>Lento demais.</strong><br>SEO é importante, mas é uma estratégia de longo prazo. A abordagem correta para um cliente que quer resultado agora é o Tráfego Pago (anúncios).'},
        julia_fb_3a: { tipo: 'correto', texto: '<strong>Quebra de Objeção Perfeita!</strong><br>Você tirou o peso da "complexidade" das costas dela e vendeu o principal valor do nosso serviço: a gestão especializada.'},
        julia_fb_3b: { tipo: 'errado', texto: '<strong>Resposta Vaga.</strong><br>Falar de "custo-benefício" não resolve o medo dela sobre a complexidade. A abordagem correta seria focar no serviço de gestão de campanha que está incluso.'},
        julia_fb_3c: { tipo: 'errado', texto: '<strong>Confuso.</strong><br>Ela já está receosa com UM serviço de anúncio, e você já está tentando vender um segundo. A abordagem correta é resolver um problema de cada vez.'},
        mariana_fb_1a: { tipo: 'correto', texto: '<strong>Excelente!</strong><br>Você confirmou o interesse e já devolveu uma pergunta aberta, convidando o cliente a falar. É a melhor forma de começar um diagnóstico.' },
        mariana_fb_1b: { tipo: 'errado', texto: '<strong>Erro grave!</strong><br>Você listou produtos sem saber NADA sobre o cliente. A abordagem correta é sempre perguntar sobre o negócio do cliente primeiro.' },
        mariana_fb_1c: { tipo: 'errado', texto: '<strong>Muito passivo!</strong><br>Você transferiu a responsabilidade para o cliente. A abordagem correta é ser consultivo e guiar a conversa.' },
        mariana_fb_2a: { tipo: 'correto', texto: '<strong>Perfeito!</strong><br>Essa pergunta é a chave da venda. Você está diagnosticando se a necessidade é institucional (Site) ou transacional (Loja) antes de recomendar.' },
        mariana_fb_2b: { tipo: 'errado', texto: '<strong>Você presumiu!</strong><br>Embora seja provável, você não confirmou. A abordagem correta é sempre qualificar com uma pergunta, como "seu objetivo é um site de apresentação ou uma loja para vender?"' },
        mariana_fb_2c: { tipo: 'errado', texto: '<strong>Você ouviu só metade!</strong><br>A dor principal era "perder tempo com pedidos". Um site institucional não resolve isso. A abordagem correta é focar na dor principal.' },
        mariana_fb_3a: { tipo: 'correto', texto: '<strong>Venda de Mestre!</strong><br>Você usou a informação que ela te deu ("perco tempo") para valorizar o serviço de maior valor (Loja Pronta), mostrando as duas opções.' },
        mariana_fb_3b: { tipo: 'errado', texto: '<strong>Argumento errado.</strong><br>Focar no "mais barato" desvaloriza seu produto. A abordagem correta é focar no valor, e você perdeu a chance de oferecer a Loja Pronta, que resolveria a falta de tempo dela.' },
        mariana_fb_3c: { tipo: 'errado', texto: '<strong>Fora de Hora.</strong><br>O foco da cliente é resolver o problema da criação da loja. A abordagem correta é resolver uma dor de cada vez.' },
        mariana_fb_4a: { tipo: 'correto', texto: '<strong>Objeção Quebrada!</strong><br>Você transformou uma objeção de preço em um argumento de valor, explicando que a mensalidade garante a manutenção e a tranquilidade contínua.' },
        mariana_fb_4b: { tipo: 'errado', texto: '<strong>Resposta fraca.</strong><br>Apenas dizer "justifica o valor" não convence. O correto seria detalhar O QUE justifica o valor, como as 5 manutenções mensais inclusas.' },
        mariana_fb_4c: { tipo: 'errado', texto: '<strong>Venda perdida!</strong><br>Ao sugerir o produto mais barato, você concordou com a objeção dela e perdeu a venda do produto de maior valor. O correto seria defender o valor da Loja Pronta.' },
        sonia_fb_1a: { tipo: 'correto', texto: '<strong>Ótimo!</strong><br>Você respeitou o tempo dela e foi direto a uma pergunta profissional e qualificatória. Isso mostra que você é eficiente.' },
        sonia_fb_1b: { tipo: 'errado', texto: '<strong>Muito direto!</strong><br>Uma pessoa apressada e provavelmente cética não quer um "interrogatório". O correto seria uma pergunta mais aberta, como "Qual sua área de atuação?"' },
        sonia_fb_1c: { tipo: 'errado', texto: '<strong>Desistiu!</strong><br>Ela te deu uma objeção de tempo e você a usou como desculpa para não vender. O correto seria mostrar que você também valoriza o tempo dela com uma abordagem rápida.' },
        sonia_fb_2a: { tipo: 'correto', texto: '<strong>Perfeito!</strong><br>Empatia + argumento de segurança ("garantia da EMPRESA") + solução focada na dor dela ("sem se preocupar"). Você está no caminho certo para quebrar essa grande barreira.' },
        sonia_fb_2b: { tipo: 'errado', texto: '<strong>Soou arrogante.</strong><br>Apenas dizer que "é diferente" sem explicar o porquê não gera confiança. O correto seria demonstrar empatia primeiro, e depois explicar O QUE é diferente (a garantia da marca, o processo formal).' },
        sonia_fb_2c: { tipo: 'errado', texto: '<strong>Solução errada!</strong><br>Uma advogada sem tempo é a última pessoa que vai querer "ela mesma fazer" um site. A dor dela não é depender dos outros, é depender de amadores.' },
        sonia_fb_3a: { tipo: 'correto', texto: '<strong>Honestidade que Vende!</strong><br>Você foi honesto e alinhou as expectativas. Explicar que o site é a base para o marketing é a abordagem correta e consultiva.' },
        sonia_fb_3b: { tipo: 'errado', texto: '<strong>Promessa Falsa!</strong><br>Nunca prometa resultados que não dependem de você (como "clientes virão"). Isso quebra a confiança. O correto é vender o site como a fundação profissional para o marketing dela.' },
        sonia_fb_3c: { tipo: 'errado', texto: '<strong>Apressado Demais!</strong><br>Você tentou vender um segundo produto antes de fechar o primeiro. Isso soa como oportunismo. O correto é focar em resolver a dor principal (ter um site confiável) primeiro.' },
        sonia_fb_4a: { tipo: 'correto', texto: '<strong>Argumento Final!</strong><br>Você vendeu o processo, que para essa cliente, era mais importante que o produto. Detalhes como "briefing", "especialistas" e "aprovação" transmitem o profissionalismo que ela busca.' },
        sonia_fb_4b: { tipo: 'errado', texto: '<strong>Vago Demais.</strong><br>Essa resposta soa exatamente como a promessa que o freelancer anterior pode ter feito. O correto é detalhar o processo (briefing, prazo, aprovação) para gerar confiança.' },
        sonia_fb_4c: { tipo: 'errado', texto: '<strong>Não resolve a dor principal.</strong><br>A qualidade do site é importante, mas a dor dela é o MEDO de ter outra experiência ruim. O correto é focar em como nosso PROCESSO é seguro e transparente.' },
        ricardo_fb_1a: { tipo: 'correto', texto: '<strong>Ótima abordagem!</strong><br>Você validou o que o cliente disse ("Instagram é fantástico") e fez uma pergunta investigativa sobre o PROCESSO dele, em vez de confrontar a opinião dele.' },
        ricardo_fb_1b: { tipo: 'errado', texto: '<strong>Confronto Direto!</strong><br>Ao dizer "mas um site é mais profissional", você desvalorizou o método atual do cliente e o colocou na defensiva. O correto seria investigar as dores do processo atual dele primeiro.' },
        ricardo_fb_1c: { tipo: 'errado', texto: '<strong>Promessa Vazia!</strong><br>Dizer que ele "poderia vender mais" é vago. O correto é investigar o processo dele para encontrar problemas concretos (como perda de tempo) que sua solução resolve.' },
        ricardo_fb_2a: { tipo: 'correto', texto: '<strong>Direto na Dor!</strong><br>Perfeito! Você conectou o "trabalhinho" que ele mencionou a uma dor real de negócio: perda de tempo que poderia ser usado de forma mais estratégica. Você está vendendo o BENEFÍCIO (tempo), não o produto.' },
        ricardo_fb_2b: { tipo: 'errado', texto: '<strong>Benefício Fraco.</strong><br>Facilitar para o cliente é bom, mas a dor mais forte para o DONO do negócio é a perda de tempo e a ineficiência. O correto seria focar nos benefícios para ele.' },
        ricardo_fb_2c: { tipo: 'errado', texto: '<strong>Argumento Racional, mas Pouco Empático.</strong><br>A segurança é importante, mas não parece ser a dor principal dele. O "trabalhinho" e a perda de tempo são dores mais latentes que você poderia ter explorado.' },
        ricardo_fb_3a: { tipo: 'correto', texto: '<strong>Upsell de Mestre!</strong><br>O cliente te deu a objeção perfeita ("não tenho tempo") e você usou-a como uma ponte para o serviço de maior valor, que é a solução exata para essa dor. Jogada de mestre.' },
        ricardo_fb_3b: { tipo: 'errado', texto: '<strong>Você não ouviu!</strong><br>Ele acabou de dizer que NÃO tem tempo para gerenciar uma loja, e você respondeu que a ferramenta é "fácil de mexer". Você ignorou a objeção dele. O correto seria oferecer o serviço Loja Pronta.' },
        ricardo_fb_3c: { tipo: 'errado', texto: '<strong>Ignorou a Dor Principal.</strong><br>A objeção dele é sobre a falta de tempo para a GESTÃO da loja, não sobre a construção inicial. O correto seria oferecer uma solução que resolvesse o problema de gestão, como a Loja Pronta.' },
        gustavo_fb_1a: { tipo: 'correto', texto: '<strong>Excelente Pivot de Conversa!</strong><br>Você não caiu na armadilha do preço. Reconheceu a questão dele e imediatamente mudou o foco para um diferencial de VALOR que afeta diretamente o lucro (custo de frete).' },
        gustavo_fb_1b: { tipo: 'errado', texto: '<strong>Resposta Fraca.</strong><br>Dizer que "é superior" sem provar não convence um cliente focado em números. O correto seria apresentar diferenciais concretos que justifiquem o preço, como o Envio Fácil.' },
        gustavo_fb_1c: { tipo: 'errado', texto: '<strong>Posição de Fraqueza!</strong><br>Pedir desconto ao gerente mostra que seu preço é negociável e que você não confia no valor do seu produto. O correto é defender o preço com argumentos de valor.' },
        gustavo_fb_2a: { tipo: 'correto', texto: '<strong>Argumento de Valor Irrefutável!</strong><br>Você somou dois diferenciais EXCLUSIVOS (Envio Fácil + Shopping UOL) que o concorrente não pode oferecer, mostrando que a comparação de preço da mensalidade é simplista. Você está vendendo um ecossistema, não apenas uma plataforma.' },
        gustavo_fb_2b: { tipo: 'errado', texto: '<strong>Faltou o "Grand Finale".</strong><br>A resposta está correta, mas incompleta. Você poderia ter aproveitado para mencionar o segundo diferencial exclusivo, o Shopping UOL, para fortalecer ainda mais seu argumento de valor.' },
        gustavo_fb_2c: { tipo: 'errado', texto: '<strong>Diferencial Fraco.</strong><br>A IA para descrição é um bom recurso, mas não é um argumento forte o suficiente para justificar uma diferença de preço para um cliente focado em ROI. O correto seria focar em diferenciais que impactam diretamente o lucro, como frete e novos canais de venda.' },
        gustavo_fb_3a: { tipo: 'correto', texto: '<strong>Fechamento Perfeito!</strong><br>Você confirmou que ele entendeu seu ponto sobre lucratividade e já o chamou para o próximo passo prático ("Vamos fazer uma simulação?"), conduzindo a venda para o fechamento.' },
        gustavo_fb_3b: { tipo: 'errado', texto: '<strong>Muito Apressado!</strong><br>Ele concordou com seu argumento, mas você pulou direto para o "vamos fechar?". O correto seria reforçar o valor com um próximo passo consultivo, como "vamos simular sua economia?", para solidificar a decisão dele.' },
        gustavo_fb_3c: { tipo: 'errado', texto: '<strong>Tom Arrogante.</strong><br>Essa frase soa como se você estivesse desprezando a busca dele por um bom negócio. O correto é manter o tom consultivo e focar nos benefícios que justificam o preço.' }
    };

    function mostrarTela(id) {
        document.querySelectorAll('.container').forEach(t => t.classList.remove('ativa'));
        const tela = document.getElementById(id);
        if (tela) tela.classList.add('ativa');
    }
    
    function mostrarCenario(id, feedbackId = null) {
        document.querySelectorAll('.tela-cenario').forEach(t => t.style.display = 'none');
        const cenario = document.getElementById(id);
        if (cenario) {
            cenario.querySelectorAll('.feedback').forEach(fb => {
                fb.style.display = 'none';
                fb.className = 'feedback';
            });
            if (feedbackId && feedbacks[feedbackId]) {
                const fbData = feedbacks[feedbackId];
                const feedbackEl = cenario.querySelector(`[data-feedback-id="${feedbackId}"]`);
                if (feedbackEl) {
                    feedbackEl.innerHTML = fbData.texto;
                    feedbackEl.classList.add(fbData.tipo);
                    feedbackEl.style.display = 'block';
                }
            }
            cenario.style.display = 'block';
        }
    }

    formInicio.addEventListener('submit', function(e) {
        e.preventDefault();
        participante.nome = document.getElementById('nome-participante').value;
        participante.equipe = document.getElementById('equipe-participante').value;
        menuPrincipal.classList.remove('ativa');
        modalInstrucoes.style.display = 'flex';
    });

    botaoFecharModal.addEventListener('click', function() {
        modalInstrucoes.style.display = 'none';
        mostrarTela('selecao-cliente');
    });

    document.querySelectorAll('.botao-cliente').forEach(botao => {
        if (!botao.disabled) {
            botao.addEventListener('click', () => {
                const clienteId = botao.dataset.clienteId;
                mostrarTela('cenarios-container');
                mostrarCenario(`${clienteId}_1`);
            });
        }
    });

    document.querySelectorAll('.opcoes-container button').forEach(botao => {
         botao.addEventListener('click', () => {
            const proximaTelaId = botao.dataset.target;
            const feedbackId = botao.dataset.feedback;
            mostrarCenario(proximaTelaId, feedbackId);
        });
    });

    botaoFinalizar.addEventListener('click', function() {
        document.getElementById('resumo-nome').textContent = participante.nome;
        document.getElementById('resumo-equipe').textContent = participante.equipe;
        const listaResumo = document.getElementById('resumo-lista');
        listaResumo.innerHTML = '';
        Object.keys(statusCenarios).forEach(id => {
            const cenario = statusCenarios[id];
            if(cenario.status !== 'pendente') {
                let resultado = cenario.status === 'sucesso' ? 'Sucesso ✅' : 'Falha ❌';
                const item = document.createElement('li');
                item.innerHTML = `<strong>${cenario.nome}:</strong> ${resultado}`;
                listaResumo.appendChild(item);
            }
        });
        mostrarTela('tela-resumo');
    });

    window.voltarAoMenu = function(clienteId, resultado) {
        if (clienteId && resultado) {
            statusCenarios[clienteId].status = resultado;
        }
        const iconeSpan = document.querySelector(`.botao-cliente[data-cliente-id="${clienteId}"] .status-icon`);
        if(iconeSpan){
            iconeSpan.textContent = resultado === 'sucesso' ? '✅' : '❌';
        }
        mostrarTela('selecao-cliente');
    }
});
