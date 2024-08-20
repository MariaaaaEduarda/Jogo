// Função para exibir uma mensagem e esperar a entrada do jogador
function showMessage(message) {
    alert(message);
}

// Função para obter a entrada do jogador
function getInput(promptText) {
    return prompt(promptText);
}

// Função principal do jogo
function playGame() {
    // Introdução ao jogo
    showMessage("Bem-vindo ao jogo de Yekta Jamali Galeh! Você está ajudando uma jovem refugiada do Afeganistão a chegar a Paris para as Olimpíadas, para competir em levantamendo de peso que sempre foi seu sonho. Sua jornada será longa e cheia de desafios, mas a determinação e a empatia serão suas maiores aliadas.");

    let inventory = [];
    let empathy = 0;
    let life = 100;
    let checkpoints = [false, false, false];
    let hasArrived = false;
    
    // Função para verificar o status
    function checkStatus() {
        showMessage(`Status Atual: Vida: ${life}, Empatia: ${empathy}, Inventário: ${inventory.join(", ")}`);
    }

    // Função para encontrar um NPC
    function meetNPC(name, requiredEmpathy, item, empathyReward, requiredItem) {
        showMessage(`Você encontrou ${name}, um local que está passando por dificuldades e pode ajudar em sua jornada. No entanto, ${name} precisa ver sua empatia ou um item especial para oferecer assistência.`);
        let choice = getInput("1. Falar com o NPC\n2. Ignorar e seguir em frente");
        
        if (choice === "1") {
            if (empathy >= requiredEmpathy) {
                showMessage(`${name} está visivelmente aliviado e decide ajudar você. Ele lhe oferece ${item} como um presente.`);
                if (item) {
                    showMessage(`Você recebeu um ${item}. Isso pode ser muito útil para os desafios futuros que enfrentará.`);
                    inventory.push(item);
                }
                empathy += empathyReward; // Aumenta a empatia
            } else if (inventory.includes(requiredItem)) {
                showMessage(`${name} olha para o ${requiredItem} e parece mais disposto a ajudar. Ele lhe dá ${item} em troca.`);
                inventory.push(item);
                empathy += empathyReward; // Aumenta a empatia
            } else {
                showMessage(`${name} não parece satisfeito e você percebe que precisará de mais empatia ou do item especial para receber ajuda.`);
            }
            checkStatus(); // Mostrar status após interação com NPC
        } else if (choice === "2") {
            showMessage(`Você decide seguir em frente sem a ajuda de ${name}. Embora a decisão possa atrasá-lo, você se mantém determinado a completar sua jornada.`);
        } else {
            showMessage("Escolha inválida. Você perde algum tempo tentando decidir e se sente um pouco frustrado.");
            life -= 10;
            checkStatus(); // Mostrar status após escolha inválida
        }
    }

    // Função para enfrentar um desafio
    function faceChallenge(challengeName, successChance, lifeImpact, interactive) {
        showMessage(`Você se depara com o desafio: ${challengeName}. Este desafio é uma prova importante e poderá testar suas habilidades e recursos.`);
        let choice = getInput("1. Tentar resolver o desafio\n2. Evitar o desafio");
        
        if (choice === "1") {
            if (interactive) {
                showMessage(`Para superar o desafio, você precisa fazer uma escolha cuidadosa entre as opções disponíveis.`);
                let result = getInput("Escolha uma opção para superar o desafio. Digite um número de 1 a 3:");
                let correctOption = Math.floor(Math.random() * 3) + 1; // Opção correta aleatória
                
                if (parseInt(result) === correctOption) {
                    showMessage(`Você escolheu corretamente e conseguiu superar o desafio: ${challengeName}. Sua bravura foi recompensada.`);
                    empathy += 3;
                } else {
                    showMessage(`Você escolheu incorretamente e falhou no desafio: ${challengeName}. O revés foi difícil e você perdeu um pouco de vida.`);
                    life -= lifeImpact;
                }
            } else {
                let success = Math.random() < successChance; // Chance de sucesso
                if (success) {
                    showMessage(`Você teve sucesso em superar o desafio: ${challengeName}. Sua persistência ajudou a superar essa dificuldade.`);
                    empathy += 3;
                } else {
                    showMessage(`Infelizmente, você falhou no desafio: ${challengeName}. A dificuldade foi grande e sua saúde foi afetada.`);
                    life -= lifeImpact;
                }
            }
            checkStatus(); // Mostrar status após desafio
        } else if (choice === "2") {
            showMessage(`Você decide evitar o desafio: ${challengeName}. Embora tenha conseguido evitar o problema imediato, isso causou um atraso na sua jornada.`);
            life -= 10;
            checkStatus(); // Mostrar status após evitar o desafio
        } else {
            showMessage("Escolha inválida. Você perde algum tempo tentando decidir e a jornada se torna um pouco mais difícil.");
            life -= 10;
            checkStatus(); // Mostrar status após escolha inválida
        }
    }

    // Função para lidar com itens coletados
    function collectItem(item) {
        if (!inventory.includes(item)) {
            inventory.push(item);
            showMessage(`Você encontrou um ${item} enquanto explorava. Este item pode ser crucial para enfrentar os desafios que estão por vir.`);
            checkStatus(); // Mostrar status após coletar item
        } else {
            showMessage(`Você já tem um ${item} no seu inventário. Talvez possa usá-lo mais tarde.`);
        }
    }

    // Função para usar itens do inventário
    function useItem(item) {
        if (inventory.includes(item)) {
            if (item === "Maçã") {
                life = Math.min(life + 20, 100);
                showMessage("Você comeu uma maçã fresca. Sua saúde melhorou um pouco, e você se sente revitalizado.");
                inventory = inventory.filter(i => i !== item); // Remove a maçã do inventário
            } else if (item === "Água") {
                life = Math.min(life + 10, 100);
                showMessage("Você bebeu água e se sente um pouco melhor. A hidratação ajudou a restaurar sua energia.");
                inventory = inventory.filter(i => i !== item); // Remove a água do inventário
            } else if (item === "Kit de Primeiros Socorros") {
                life = Math.min(life + 30, 100);
                showMessage("Você utilizou um kit de primeiros socorros e está se sentindo muito melhor. Seu corpo se recuperou de forma significativa.");
                inventory = inventory.filter(i => i !== item); // Remove o kit do inventário
            } else if (item === "Roupas de Frio") {
                showMessage("Você veste as roupas de frio que encontrou. Isso ajudará a manter seu conforto em condições geladas e pode reduzir o impacto de desafios relacionados ao frio.");
                // Pode ter outros efeitos, como reduzir impacto de desafios em clima frio
            } else if (item === "Cesta de Frutas") {
                showMessage("Você compartilha a cesta de frutas com pessoas ao longo do caminho. Sua generosidade é notada e você ganha empatia por isso.");
                empathy += 5;
                inventory = inventory.filter(i => i !== item); // Remove a cesta do inventário
            } else if (item === "Mapa de Paris") {
                showMessage("Você estuda o mapa de Paris e descobre rotas mais seguras e rápidas para o seu destino. Isso pode ajudar a evitar alguns desafios.");
                // Esse item pode ter outros efeitos, como ajudar a evitar desafios
            } else if (item === "Bilhete para o Trem") {
                showMessage("Você usa o bilhete para o trem para acelerar sua viagem até Paris. A viagem se torna muito mais rápida e você avança rapidamente.");
                // Esse item pode ter outros efeitos, como ajudar a evitar desafios
            } else {
                showMessage(`Você não pode usar o item ${item} agora. Talvez seja útil em outra parte da sua jornada.`);
            }
            checkStatus(); // Mostrar status após usar item
        } else {
            showMessage(`Você não tem o item ${item} no inventário. Verifique seus itens novamente para garantir que possui o que precisa.`);
        }
    }

    // Função para salvar o checkpoint
    function checkpoint(stage) {
        if (stage === 1 && !checkpoints[0]) {
            checkpoints[0] = true;
            showMessage("Você chegou a um ponto de controle na Turquia, onde encontra um abrigo seguro. Sua vida foi restaurada parcialmente devido ao descanso e ao apoio encontrado aqui.");
            life = Math.min(life + 30, 100); // Restaura parte da vida, não excede 100
        } else if (stage === 2 && !checkpoints[1]) {
            checkpoints[1] = true;
            showMessage("Você chegou a um ponto de controle na Itália, onde um grupo de pessoas solidárias ofereceu ajuda. Sua vida foi restaurada parcialmente devido ao conforto e ao apoio recebido.");
            life = Math.min(life + 30, 100); // Restaura parte da vida, não excede 100
        } else if (stage === 3 && !checkpoints[2]) {
            checkpoints[2] = true;
            showMessage("Você chegou a um ponto de controle na França, próximo ao seu destino. O esforço e a determinação ajudaram a restaurar parte da sua vida, trazendo esperança para a etapa final.");
            life = Math.min(life + 30, 100); // Restaura parte da vida, não excede 100
        } else {
            showMessage("Você já passou por este ponto de controle. Continue avançando em sua jornada.");
        }
        checkStatus(); // Mostrar status após checkpoint
    }

    // Introdução da história
    showMessage("Yekta Jamali Galeh é uma jovem atleta com um sonho grande: participar das Olimpíadas em Paris. Ela enfrenta desafios imensos, mas sua determinação e coragem são suas maiores forças. Em sua jornada, você ajudará Yekta a superar obstáculos e encontrar seu caminho até Paris.");

    // Jornada da Yekta
    showMessage("Sua jornada começa na Turquia. Você está em uma cidade movimentada, repleta de pessoas e oportunidades. Sua primeira tarefa é encontrar um meio de transporte para avançar para a Europa.");

    // Encontros e desafios
    showMessage("Enquanto explora a Turquia, você encontra o NPC Ali. Ali é um homem que entende bem a dificuldade de viajar e pode oferecer assistência para sua jornada.");
    meetNPC("Ali", 5, "Passagem de Trem", 2, "Cesta de Frutas");
    faceChallenge("Cruzar a Fronteira", 0.6, 20, true); // Desafio interativo
    collectItem("Maçã"); // Coleta de item
    collectItem("Água"); // Coleta de item
    checkpoint(1); // Chegada ao primeiro checkpoint
    
    showMessage("Você agora está na Itália. A viagem até aqui foi cheia de desafios e obstáculos. A Itália é um lugar vibrante, mas também apresenta novos desafios que você precisará enfrentar.");

    meetNPC("Giulia", 7, "Mapa da Cidade", 3, "Água");
    faceChallenge("Sobrevivendo ao Mercado de Rua", 0.5, 25, true); // Desafio interativo
    collectItem("Kit de Primeiros Socorros"); // Coleta de item
    collectItem("Roupas de Frio"); // Coleta de item adicional
    checkpoint(2); // Chegada ao segundo checkpoint
    
    showMessage("Finalmente, você chegou à França. Você está muito perto de seu destino final, Paris. No entanto, ainda há um último obstáculo a ser superado antes de alcançar seu sonho.");

    meetNPC("Jean", 10, "Bilhete para o Trem", 4, "Kit de Primeiros Socorros");
    faceChallenge("Atravessar a França", 0.4, 30, true); // Desafio interativo
    collectItem("Cesta de Frutas"); // Coleta de item adicional
    checkpoint(3); // Chegada ao terceiro checkpoint
    
    // Decisão final
    showMessage("Você está agora em Paris. A cidade está ao seu alcance e as Olimpíadas estão quase começando. É hora de tomar uma decisão final sobre como avançar até o grande evento.");
    let finalChoice = getInput("1. Acelerar para chegar às Olimpíadas rapidamente\n2. Descansar antes de continuar");
    
    if (finalChoice === "1") {
        if (inventory.includes("Bilhete para o Trem")) {
            showMessage("Você usa o bilhete para o trem e a viagem se torna rápida e tranquila. Paris está agora ao seu alcance, e você se aproxima do seu sonho com mais confiança.");
            hasArrived = true;
        } else {
            showMessage("Sem o bilhete para o trem, a viagem se torna difícil e você enfrenta diversos desafios ao longo do caminho. A jornada se torna mais cansativa e sua saúde é afetada.");
            life -= 30;
        }
    } else if (finalChoice === "2") {
        showMessage("Você decide tirar um momento para descansar e recuperar suas energias. O descanso traz alívio e você está pronto para a etapa final de sua jornada.");
        life = Math.min(life + 20, 100);
    } else {
        showMessage("Escolha inválida. Você perde algum tempo tentando decidir e sua saúde é impactada devido ao atraso.");
        life -= 10;
    }
    
    // Final do jogo
    if (hasArrived) {
        showMessage("Parabéns! Você chegou às Olimpíadas em Paris. Sua determinação, coragem e perseverança fizeram com que você realizasse seu sonho. Você representa seu país com orgulho e conquistou seu objetivo.");
    } else {
        showMessage("Infelizmente, sua jornada não chegou ao fim desejado. Apesar das dificuldades e desafios, sua luta foi admirável. Continue acreditando em seus sonhos e tente novamente no futuro. Melhor sorte da próxima vez.");
    }
}

// Iniciar o jogo
playGame();