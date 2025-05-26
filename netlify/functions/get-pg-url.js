<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Bisteca Casino</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #121212;
      color: #fff;
      margin: 0;
      padding: 0;
    }
    header {
      background-color: #1c1c1c;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo {
      font-size: 26px;
      font-weight: bold;
      color: #e74c3c;
    }
    nav a {
      color: #fff;
      text-decoration: none;
      margin-left: 20px;
      font-weight: 500;
      cursor: pointer;
    }
    main {
      padding: 40px 20px;
      max-width: 1000px;
      margin: auto;
    }
    h2 {
      color: #f39c12;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ul li {
      padding: 10px 0;
      font-size: 18px;
    }
    ul li a {
      color: #f39c12;
      text-decoration: none;
      cursor: pointer;
    }
    #game-details {
      margin-top: 30px;
      border-top: 1px solid #333;
      padding-top: 20px;
    }
    #game-details img {
      max-width: 100%;
      margin-top: 10px;
      border-radius: 8px;
    }
    .play-btn {
      display: inline-block;
      margin-top: 15px;
      background: #e74c3c;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
    }
  </style>
</head>
<body>

<header>
  <div class="logo">Bisteca Casino</div>
  <nav>
    <a>Início</a>
    <a>Jogos</a>
    <a>Promoções</a>
    <a>VIP</a>
  </nav>
</header>

<main>
  <h2>Top Jogos da PG Soft</h2>
  <ul>
    <li><a onclick="loadGame('mahjong')">Mahjong Ways</a></li>
    <li><a onclick="loadGame('neko')">Lucky Neko</a></li>
    <li><a onclick="loadGame('caishen')">Caishen Wins</a></li>
    <li><a onclick="loadGame('aztec')">Treasures of Aztec</a></li>
    <li><a onclick="loadGame('ganesha')">Ganesha Gold</a></li>
  </ul>

  <h2>Top Jogos da Spribe</h2>
  <ul>
    <li><a onclick="loadGame('aviator')">Aviator</a></li>
    <li><a onclick="loadGame('mines')">Mines</a></li>
    <li><a onclick="loadGame('plinko')">Plinko</a></li>
    <li><a onclick="loadGame('dice')">Dice</a></li>
    <li><a onclick="loadGame('hilo')">HiLo</a></li>
  </ul>

  <div id="game-details">
    <p>Clique em um jogo para ver os detalhes aqui.</p>
  </div>
</main>

<script>
  const games = {
    mahjong: {
      name: "Mahjong Ways",
      description: "Jogo inspirado no tradicional Mahjong asiático com gráficos incríveis e bônus especiais.",
      image: "https://via.placeholder.com/600x300?text=Mahjong+Ways"
    },
    neko: {
      name: "Lucky Neko",
      description: "O famoso gato da sorte japonês traz bônus e multiplicadores incríveis.",
      image: "https://via.placeholder.com/600x300?text=Lucky+Neko"
    },
    caishen: {
      name: "Caishen Wins",
      description: "O deus da fortuna está pronto para te recompensar com rodadas grátis.",
      image: "https://via.placeholder.com/600x300?text=Caishen+Wins"
    },
    aztec: {
      name: "Treasures of Aztec",
      description: "Explore as riquezas das ruínas astecas neste slot cheio de mistérios.",
      image: "https://via.placeholder.com/600x300?text=Aztec+Treasure"
    },
    ganesha: {
      name: "Ganesha Gold",
      description: "O deus indiano Ganesha te guia por uma jornada de ouro e prosperidade.",
      image: "https://via.placeholder.com/600x300?text=Ganesha+Gold"
    },
    aviator: {
      name: "Aviator",
      description: "Jogo de crash onde você deve sair antes que o avião decole para longe.",
      image: "https://via.placeholder.com/600x300?text=Aviator"
    },
    mines: {
      name: "Mines",
      description: "Evite as minas e encontre as estrelas para aumentar seus ganhos.",
      image: "https://via.placeholder.com/600x300?text=Mines"
    },
    plinko: {
      name: "Plinko",
      description: "Solte a bola e veja onde ela cai — uma experiência cheia de emoção.",
      image: "https://via.placeholder.com/600x300?text=Plinko"
    },
    dice: {
      name: "Dice",
      description: "Role os dados e aposte alto — sorte e estratégia combinadas.",
      image: "https://via.placeholder.com/600x300?text=Dice"
    },
    hilo: {
      name: "HiLo",
      description: "Adivinhe se a próxima carta será maior ou menor. Simples e viciante!",
      image: "https://via.placeholder.com/600x300?text=HiLo"
    }
  };

  async function loadGame(key) {
    const game = games[key];
    const gameDetailsDiv = document.getElementById('game-details');

    gameDetailsDiv.innerHTML = `
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <img src="${game.image}" alt="${game.name}">
      <p>Carregando link do jogo...</p>
    `;

    try {
      // Supondo que o Netlify publica a função em /api/get-pg-url
      const userId = 'user123'; // Troque por ID real do usuário depois
      const res = await fetch(`/.netlify/functions/get-pg-url?game=${key}&userId=${userId}`);

      if (!res.ok) throw new Error('Erro ao buscar URL do jogo');

      const data = await res.json();

      if (data.launchUrl) {
        gameDetailsDiv.innerHTML += `<a href="${data.launchUrl}" target="_blank" class="play-btn">Jogar Agora</a>`;
      } else {
        gameDetailsDiv.innerHTML += `<p>Não foi possível carregar o jogo no momento.</p>`;
      }
    } catch (error) {
      gameDetailsDiv.innerHTML += `<p>Erro ao carregar o jogo: ${error.message}</p>`;
    }
  }
</script>

</body>
</html>

