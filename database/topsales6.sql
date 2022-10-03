-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 03/10/2022 às 16:31
-- Versão do servidor: 5.7.39-0ubuntu0.18.04.2
-- Versão do PHP: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `topsales6`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Notebook'),
(2, 'Smartphone'),
(3, 'Desktop'),
(4, 'Hardware'),
(5, 'Tablet'),
(6, 'Periféricos'),
(7, 'Eletrônicos'),
(8, 'All In One'),
(9, 'Cadeira Gamer'),
(10, 'Geek');

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `destinatario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `marcas`
--

INSERT INTO `marcas` (`id`, `nome`) VALUES
(1, 'AMD'),
(2, 'Intel'),
(3, 'Acer'),
(4, 'Samsung'),
(5, 'Corsair'),
(6, 'Seagate'),
(7, 'LG'),
(8, 'Lenovo'),
(9, 'Rise Mode'),
(10, 'Superframe'),
(11, 'Dell'),
(12, 'Gigabyte'),
(13, 'ASRock'),
(14, 'Motorola'),
(15, 'Amazon'),
(16, 'Tedge'),
(17, 'DT3 Sports');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `endereco` text NOT NULL,
  `preco_total` float NOT NULL,
  `transportadora` varchar(100) NOT NULL,
  `metodo_pagamento` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `datahora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `modelo` varchar(45) NOT NULL,
  `descricao` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `preco` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `produtos`
--

INSERT INTO `produtos` (`id`, `id_categoria`, `nome`, `id_marca`, `modelo`, `descricao`, `img`, `preco`) VALUES
(1, 1, 'Aspire 5', 3, 'A515-54-74F9', 'Os notebooks da linha Aspire 5 são convenientemente portáteis e elegantes para acompanhar suas tarefas do dia a dia. Os recursos tecnológicos de sua confiança ao seu lado sempre que precisar. Desempenho suficiente para todas as tarefas com Processador Intel Core i7 de 10 Geração.', 'notebook-acer-aspire-5.jpg', 3399.99),
(2, 1, 'Latitude 3410', 11, 'Cf350', 'Seu PC conhece você? O Dell Optimizer é uma plataforma de IA inédita que aprende como você trabalha e se adapta continuamente ao seu estilo para criar uma experiência mais inteligente, personalizada e produtiva. ExpressResponse: usamos a IA integrada e a tecnologia Intel® Adaptix™ para ajustar os níveis de desempenho onde você mais precisa. ExpressCharge: a IA melhora o desempenho da bateria ao se adaptar a seu consumo de energia e padrões de carregamento típicos. Sempre em movimento? Você terá o ExpressCharge Boost para obter uma carga de até 35% em 20 minutos.* Tem mais tempo? O ExpressCharge carregará em até 80% em uma hora.* E se você não puder carregar o sistema imediatamente, ele ajustará as configurações de modo sutil para preservar os recursos, como escurecer a tela ou desligar o Bluetooth quando não estiver em uso. Áudio inteligente: o áudio inteligente do Dell Optimizer ajusta seu sistema automaticamente: ele ajusta o ruído de fundo, gerencia o volume da fala e refina a experiência geral do som para que você ouça e seja ouvido com mais qualidade, onde quer que trabalhe.', 'Note-Dell-Lat-3410-14.jpg', 839),
(3, 4, 'Processador Ryzen 5 3600', 1, '100-100000031BOX', 'Chave para o desempenho do seu computador de mesa, você não precisa mais pensar em como distribuir tempo e as ações pois agora as tarefas simultâneas são possíveis.', 'processador-amd-ryzen-5.jpg', 2800),
(4, 6, 'Headset Gamer SuperFrame', 10, 'VELKA - SF-H01', 'Vire um gamer de verdade com o headset Velka, com seu surround sound 7.1, microfone embutido e luzes RGB. Acompanhe os passos do seu inimigo e ganhe destaque na batalha. O headset VELKA é extremamente confortável, com espumas macias você terá uma excelente experiência nos jogos, com o microfone flexível e ajustável você poderá se adaptar ao jogo e mitar!', 'headset-gamer-superframe.jpg', 149.99),
(5, 2, 'Galaxy A03 Core', 4, 'A03 Core', 'Capture seus melhores momentos e reviva-os sempre que quiser com a câmera traseira de 8 Mpx.', 'smartphone-samsung-galaxy-a03.jpg', 859.99),
(6, 2, 'Moto G20', 14, 'XT2128-1', 'Fotografia profissional no seu bolso. Descubra infinitas possibilidades para suas fotos com as 4 câmeras principais de sua equipe. Teste sua criatividade e jogue com iluminação, diferentes planos e efeitos para obter ótimos resultados.', 'smartphone-motorola-moto-g20.jpg', 1164),
(7, 3, 'V50S', 8, 'Freedos', 'O desktop compacto Lenovo V50s é rápido, responsivo e eficiente. Combina a potência dos mais recentes processadores Intel® de 10ª geração com a velocidade da memória DDR4 para maximizar a produtividade. Versátil e seguro, o equipamento também oferece opções gráficas dedicadas e praticidade com portas USB frontais.', 'computador-lenovo.jpg', 2499.99),
(8, 8, '24V50N', 7, '24V50N-C.BH32P1', 'Realize suas tarefas com maior rapidez, consistência e alto desempenho com a 10ª Geração de Processadores Intel Core i5 com 8GB de memória RAM DDR4 e 1TB de armazenar seus documentos. Divirta-se com sua nova TV Digital! O novo LG All in One também é TV, podendo ser configurado facilmente pelo monitor através do sintonizador de canais. O monitor é construído com um paínel IPS de 23.8\" de seu LG All in One tem resolução Full HD (1920x1080) para melhor definição e mais clareza nas imagens reproduzidas. O Computador é construído na cor Branca e possui apenas 14.5mm de borda para uma perfeita imersão visual, permitindo uma tela muito mais ampla e uma incrível experiência visual, acompanha também um teclado e um mouse sem fio para combinar com o seu All-in-One. O LG 24V50N garante a conectividade que você necessita. Não só contém portas essenciais, mas também conta com HDMI e USB 3.0.  ', 'all-in-one-lg-24v50n.jpg', 4199.9),
(9, 4, 'Fonte VS600', 5, 'CP-9020224-BR', 'Inicie o seu novo PC com uma fonte de alimentação CORSAIR VS com fornecimento de energia certificado 80 PLUS com até 85% de eficiência operacional. Cabos planos e pretos e um revestimento preto corresponde ao estilo de qualquer PC. A ventoinha de 120 mm vem com uma curva de ventoinha especialmente projetada para manter o ruído baixo. Uma única configuração de trilho de + 12V oferece confiabilidade sob carga pesada e oferece ampla compatibilidade com o hardware moderno, e uma caixa compacta de 125 mm se encaixa em praticamente qualquer gabinete de PC moderno. Apoiada pela equipe de suporte técnico global da CORSAIR, as fontes de alimentação VS são uma opção confiável para a sua próxima construção de sistema e além.', 'fonte-corsair-vs600-600w-80-plus.jpg', 505.76),
(10, 4, 'Memória Vengeance LPX 8GB', 5, 'CMK8GX4M1E3200C16', 'Memória Corsair Vengeance LPX 8GB, 3200MHz, DDR4, CL16, Preta. A memória VENGEANCE LPX foi projetada para overclocking de alto desempenho. O dissipador de calor é confeccionado em alumínio puro possibilitando uma dissipação de calor mais rápida, e o PCB personalizado e otimizado ajuda a controlar o calor e oferece folga para overclocking superior. Cada CI é selecionado individualmente para garantir o desempenho máximo do produto. Dissipador de calor em alumínio. A sobrecarga de overlocking é limitada pela temperatura de funcionamento. O de   ', '89940_index_gg.jpg', 352.82),
(11, 4, 'HD Barracuda 2TB', 6, 'ST2000DM008', 'O Hard Disk Barracuda ST2000DM008 da Seagate foi desenvolvido especialmente para o seu Desktop, com confiabilidade e inovação comprovadas, o disco rígido Barracuda veio pra ajudar você a atingir os seus objetivos.', '100916_1552934430_index_gg.jpg', 399.88),
(12, 4, 'Pl Vídeo GeForce RTX 3060 Eagle', 12, 'GV-N3060EAGLE OC-12GD', 'Placa de Vídeo Gigabyte NVIDIA GeForce RTX 3060 Eeagle (rev. 2.0)\n \nSistema de resfriamento WINDFORCE 2X\n \n\nO sistema de resfriamento WINDFORCE 2X possui ventiladores de lâmina exclusivos de 2X100 mm, rotação alternada, 4 tubos de calor de cobre composto de GPU de toque direto, ventilador 3D ativo e resfriamento de tela, que juntos fornecem dissipação de calor de alta eficiência. A GIGABYTE gira os ventiladores adjacentes na direção oposta, de forma que a direção do fluxo de ar entre os dois ventiladores seja a mesma, reduzindo a turbulência e aumentando a pressão do fluxo de ar. O 3D Active Fan fornece resfriamento semipassivo, e os ventiladores permanecerão desligados quando a GPU estiver em um jogo de baixa carga ou baixo consumo de energia.\n\n \n\nRGB Fusion 2.0\n \nCom 16,7 milhões de opções de cores personalizáveis ??e vários efeitos de iluminação, você pode escolher os efeitos de iluminação ou sincronizar com outros dispositivos AORUS.\n\n \n\nDurabilidade Extrema e Overclocking\n \n\nA placa de vídeo usa o melhor design de fase de alimentação para permitir que o MOSFET opere em temperatura mais baixa e design de proteção contra superaquecimento e balanceamento de carga para cada MOSFET, além dos chokes e capacitores certificados Ultra Durable, para fornecer excelente desempenho e maior vida útil do sistema.', 'placa-de-video-gigabyte-nvidia-geforce-rtx-3060.jpg', 3411.65),
(13, 4, 'Pl Mãe ASRock B450M Steel Legend', 13, '90-MXB9Y0-A0UAYZ', 'Placa-Mãe ASRock B450M Steel Legend, AMD AM4, mATX, DDR4\n \nPlaca-mãe ASRock B450M Steel Legend \nPlaca-mãe ASRock B450M Steel Legend AMD DDR4 Resistente como aço, verdadeira lenda a Steel Legend representa o estado filosófico da sólida durabilidade e irresistível estética. Construída ao redor das especificações e recursos mais exigentes, a série Steel Legend visa os usuários do dia a dia e entusiastas mainstream!Oferecendo uma forte gama de materiais/componentes para assegurar um desempenho estável e confiável.\n\nUma placa-mãe que atende qualquer tarefa – com estilo!\nControle sua própria iluminação - Polychrome RGB As placas-mãe ASRock entregam um desempenho incrível e estética superior para que você possa controlar sua própria iluminação colorida! A ASRock oferece um controle muito abrangente para controlar os LEDs RGB integrados ou fitas de LED conectadas, ventoinhas da CPU, coolers, gabinete e quaisquer dispositivos RGB.\n\nDispositivos Sincronizados\nOs dispositivos também podem ser sincronizados através dos acessórios certificados Polychrome RGB Sync. M.2 duplo para SSD Dois dos slots M.2 mais rápidos do mundo. Um entrega velocidade de transferência até PCIe Gen3 x4 32Gb/s, e o outro suporta o modo SATA3 6Gb/s. *Por favor consulte a página de especificação do produto para mais detalhes. Dual USB 3.1 Gen2 (Tipo-A + Tipo-C) Um par de conectores USB 3.1 Gen2 Tipo-A e Tipo-C para oferecer taxas de transferência de dados de até 10Gbps.', 'placa-mae-asrock-b450m-steel-legend.jpg', 964.59),
(14, 4, 'Cooler Processador Gamer Rise Mode X5', 9, 'RM-ACX-05-RGB', 'Cooler para Processador Gamer Rise Mode X5, LED Rainbow, Intel e AMD', 'cooler-para-processador-gamer-rise-mode-x5.jpg', 1577.89),
(15, 5, 'Tab P11 Plus', 8, 'Tab P11 Plus', 'O Lenovo Tab P11 Plus é ideal para tarefas do dia a dia ao entretenimento com qualidade de imagem e som. Com tela de 11” multitouch IPS com bordas ultrafinas, possui uma incrível resolução de 2K para experiência superior de streaming e brilho de 400nits. Com certificação TÜV Rheinland Low Blue Light que reduz o impacto da luz da tela prejudicial aos ollhos.', 'tablet-lenovo-tab-p11-plus.jpg', 1577.89),
(16, 7, 'Smart TV 55 4K UHD', 7, '55UP7750PSB', 'VídeoTecnologia: LED Resolução: 4KTamanho da Tela: 55´´Sistema de Cores: NTSC, PAL-M/N, SBTVDAI Brightness Control4K UpscalingFilmaker Mode™Active HDRHGiG ConexõesWi-Fi Bluetooth Portas de Entrada e Saída03 Entradas HDMI 2.002 Entradas USB01 Entrada RF01 Saída Digital Optica Áudio2.0 Ch. AI SoundBluetooth Surround ReadyAI Acoustic TuningClear Voice IIISound ShareTV Sound Mode Sharee-ARC (HDMI 2)r Outros RecursosProcessador AI a5Timer OffTimer OnSleeptimer Relógio na TelaControle Remoto LG ThinQ AIGoogle Assistente (Built in)Amazon Alexa (Built in & Works With)Airplay2 & Homekit (Works with)Painel de ControleSports AlertProcessamento Natural de LinguagemAI RecommendationControle Smart MagicOtimizador de GamesLG ChannelsEdição Inteligente de AppsMedia Player EAN7893299915789 Especificações TécnicasModelo: 55UP7750PSBFrequência: 60HzConsumo de Energia: 135 kW/hConsumo Standby: 0,5WPotência de Áudio: 20WGarantia: 12 meses Dimensões e PesoDimensões do Produto sem Embalagem (AxLxP): 715x1235x575 mmDimensões do Produto com Embalagem (AxLxP): 815x1357x161 mmDimensão do Produto com Base (AxLxP): 776x1235x231 mm', 'smart-tv-lg-55-4k-uhd.jpg', 2900),
(17, 4, 'HD Skyhawk 2 TB', 6, 'ST2000VX015', 'Aproveite as cargas de trabalho de modo ininterrupita com discos desenhados para sistemas DVR e NVR. Os discos de videovigilância SkyHawk suportam até 64 câmeras HD e 32 streams adicionais de AI, equipados com o firmware ImagePerfect, que minimiza o número de quadros perdidos.\n\nSkyHawk Health Management (SHM) incluído.\n\nMais nitidez\n\nTransmissão nítida e clara 24/7\nAumente a confiabilidade em até 30% em comparação com os discos comuns de desktop com um firmware otimizado para vigilância.\n\n\nDesign mais resistente\nConte com uma taxa de carga de trabalho três vezes maior que os discos comuns de desktop - até 180TB/ano.\n\n\nSkyHawk Health Management\nMelhore a confiança geral quando seu sistema de videovigilância incorpora os discos SkyHawk e SHM.\n\n\nPlano de recuperação de dados de 2 anos\nDesafie erros do usuário, corrupção de dados, incêndio e danos por inundação com planos opcionais de recuperação de dados de 2 anos.\n\nDesenhado para oferecer desempenho e confiabilidade\n\nSolução criada para a vigilância\nSkyHawk foi desenhado para a vigiância doméstica e para as pequenas e médias empresas, satisfazendo as necessidades de transmissão e cópia de dados de segurança.\n\n\nCargas operacionais elevadas? Não se preocupe\nOs discos SkyHawk não são discos normais, já que contam com um projeto que permite cargas operacionais de vigilância elevadas.\n\n\nTenha sempre vídeos sem interrupções\nO firmware ImagePerfect está otimizado para a vigilância e conta com a tecnologia Acutrac de tolerância a vibração para garantir uma perfeita integridade de vídeo.\n\n\nOpte por uma perspectiva a longo prazo\nSkyHawk Health Management supervisiona e analiza o estado do disco e oferece opções para melhorar o desempenho.\n\nHD Desktop Seagate SkyHawk AI Surveillance 256MB 12TB 7200RPM 3,5? - ST12000VE001\nO SkyHawk ajuda a proteger o seu armazenamento de vídeo e o firmware ImagePerfect AI garante que não haverá queda de quadros, tolerando cargas de trabalho mais pesadas. Aproveite do desempenho consistente com sensores de vibração rotacional integrados, fornecendo armazenamento confiável para NVR.', 'hd-2tb-para-dvr-seagate-skyhawk-surveillance-sata-iii-para-dvr_1030.jpg', 389.99),
(18, 4, 'Pl Vídeo Asus RTX 3050 OC', 12, 'DUAL-RTX3050-O8G', 'aca de Vídeo Asus NVIDIA GeForce RTX 3050 OC, 8GB, GDDR6, Ray Tracing\n\n\nNúcleos RT de 2ª geração: experimente 2X a taxa de transferência dos núcleos RT de 1ª geração, além de RT e sombreamento simultâneos para um nível totalmente novo de desempenho de rastreamento de raios. Núcleos tensores de 3ª geração: obtenha até 2X a taxa de transferência com esparsidade estrutural e algoritmos avançados de IA, como DLSS. Esses núcleos oferecem um enorme aumento no desempenho do jogo e novos recursos de IA.\n\nPlaca traseira de proteção\nIsso é tão metal! O PCB é reforçado por uma placa traseira de alumínio que adiciona rigidez estrutural, ajudando a evitar flexões e a proteger componentes e caminhos de rastreamento contra danos.\n\n2x Ventiladores. 2x Diversão.\nApresentando a mais recente arquitetura NVIDIA Ampere, a ASUS Dual GeForce RTX 3050 combina desempenho térmico dinâmico com ampla compatibilidade. As soluções avançadas de refrigeração das principais placas gráficas - incluindo duas ventoinhas Axial-tech para maximizar o fluxo de ar para o dissipador de calor - estão incluídas na placa de 20 cm de comprimento e 2 slots, fornecendo mais potência em menos espaço. Esses aprimoramentos tornam o ASUS Dual a escolha perfeita para jogadores que desejam desempenho gráfico pesado em uma construção compacta.\n\nMemória GDDR6 de 8 GB\nMemória integrada para a melhor experiência de jogo e a melhor resolução.', '-555776416.jpg', 1949),
(19, 3, 'Optiplex 3050', 11, '3050 Micro', 'Maior performance, menor design.\nDesktop empresarial ultracompacto com várias opções de montagem para melhor adequação ao seu espaço de trabalho. Oferece segurança e capacidade de gerenciamento essenciais e líderes da categoria.', '61lgyFVAGaL._AC_SX679_.jpeg', 2490),
(20, 3, 'Optiplex 3060', 11, '3060 Micro', 'Projetado para enfrentar o dia de trabalho\nCompacto sem comprometimento: com recursos completos em um design compacto, cada vez mais profissionais estão escolhendo o micro OptiPlex. O micro ocupa menos área de superfície além de manter toda a confiabilidade que você espera.\nÉ só montar: com opções exclusivas de montagem personalizada, incluindo a montagem VESA ou o suporte para o All in One micro OptiPlex, o micro adapta-se ao seu ambiente exclusivo, permitindo que você tenha liberdade para trabalhar como deseja.', 'Mini_23832.jpg', 2998),
(21, 1, 'Thinkpad T480', 8, '20L6SCWJ00', 'Projetado para negócios de performance\nForma e função se unem ao robusto ThinkPad® T480. Leve a sua produtividade para além do esperado com os mais recentes e poderosos processadores Intel Core de 8ª Geração e bateria Power Bridge de longa duração. Um teclado retroiluminado (opcional) e portas padronizadas são aprimoramentos sutis do design que trazem as vantagens necessárias para um melhor desempenho. E com os recursos avançados de segurança, como o Windows Hello com leitor de impressão digital, seu trabalho será sempre seu, não importa aonde você vá.', 'lenovo-thinkpad-t480-intel-r-core-i5-de-8eme-gen.jpg', 2518),
(22, 1, 'Latitude 5420', 11, '5420', 'Totalmente equipado e pronto para trabalhar\nAssuma o controle: continue trabalhando com a duração da bateria excepcional, além de configurações inteligentes para preservar a energia quando ela estiver acabando. Opte por uma bateria de 42 Wh para ter mais leveza ou uma maior de 63 Wh para um tempo de execução mais longo. Tenha mais duração da bateria ao selecionar o painel de energia superbaixa, que consome menos energia do que um monitor padrão sem prejudicar o brilho da tela.\n\nConecte-se com confiança: mantenha a conexão com velocidades de banda larga móvel LTE de até 450 Mbit/s. O Wi-Fi 6E permite mais 7 canais (na banda de 6 GHz) para ter mais largura de banda, o que deixa o Wi-Fi mais rápido e estável, ainda mais em áreas de alta densidade.* Viaje com tranquilidade usando a nova tecnologia eSIM que se conecta a mais provedores de todo o mundo sem precisar trocar de cartão SIM.*\n\nDimensionamento de acordo com suas necessidades: graças à memória e ao armazenamento escaláveis, incluindo a memória DDR4 de até 64 GB e o armazenamento de até 2 TB, não há obstáculos que impeçam você de fazer o seu melhor. Escolha entre opções de teclado retroiluminado ou sem retroiluminação.\n\nRecursos gráficos incríveis: transmita vídeos, faça download e execute aplicativos sem problemas com a placa gráfica integrada.\n\nPortas para todas as finalidades: conecte-se rapidamente a periféricos com a grande variedade de portas disponíveis, incluindo Type-C™ 2x com Thunderbolt™ 4* e portas preexistentes, como HDMI e RJ45.\n\nDesempenho rápido: os mais recentes processadores Intel® Core™ i7 vPro® de 11ª geração oferecem às empresas o desempenho, a capacidade de gerenciamento, os recursos de segurança integrados e a estabilidade da plataforma Intel® vPro, a plataforma feita para empresas.', 'la5420nt_xnb_00055rf110_gy_5000x5000_gettyimages-1254825733.jpeg', 7999),
(23, 6, 'Mouse MS116', 11, 'MS116', 'O mouse óptico Dell MS116 fornece rastreamento óptico de LED e conectividade com fio, além de oferecer performance excelente todos os dias com uma estética de design contemporâneo, o mouse óptico da Dell MS116 combina perfeitamente com qualquer ambiente de desktop\n \n\nO mouse óptico da Dell – MS116 fornece controle óptico por LED e conectividade com fio, proporcionando uma performance excelente dia após dia. Melhore sua produtividade no escritório ou em casa. O mouse óptico da Dell ajudará você a manter o foco com controle óptico preciso de 1.000 DPI. Projetado para uso confortável durante longos períodos, o mouse óptico da Dell é seu parceiro de trabalho. Modelado e dimensionado conforme os contornos das mãos, incluindo dois botões e uma roda de rolagem, com o mouse óptico da Dell é fácil navegar pelos projetos na tela.\n\n \n\nO mouse óptico da Dell é compatível com quase todos os sistemas que possuem uma porta USB. Use um mouse no escritório e deixe o outro em casa. Basta conectar o mouse óptico da Dell a qualquer porta USB disponível e começar a trabalhar simples assim. O mouse óptico da Dell é a opção perfeita para uso doméstico ou empresarial, sempre que a meta for confiabilidade, conforto e praticidade.', '41VpUwvy5OL._AC_SX679_.jpeg', 83.66),
(24, 6, 'Teclado KB216 QWERTY', 11, 'KB216', 'Este teclado Dell é o melhor complemento para fazer todos os tipos de atividades. É confortável e prático ao escrever documentos, navegar e pesquisar na Internet, seja no seu trabalho ou no conforto de casa.', '811YM2Go9GL.__AC_SY300_SX300_QL70_ML2_.jpg', 134),
(25, 6, 'Alexa Echo Dot 3rd ', 15, 'Echo Dot', 'Amazon Smart Speaker Echo Dot Alexa - 3ª Geração\n \n\nO Echo Dot é o nosso smart speaker de maior sucesso. Controlado por voz com a Alexa, ele é perfeito para qualquer ambiente. Você pode pedir músicas, notícias, informações e muito mais. Além de ligar para amigos e familiares, criar timers, adicionar itens a listas e criar eventos e lembretes  e controlar dispositivos compatíveis de casa inteligente com sua voz. Use o Drop In para se conectar rapidamente a outro dispositivo Echo compatível em sua casa ou envie um aviso para todos os dispositivos Echo para chamar a família para jantar ou dizer para as crianças irem dormir. Deixe a sua vida mais fácil. \n\n \n\n“Alexa, toca MPB.”\n \n\nUse sua voz para tocar música, artista ou gênero com o Amazon Music, Apple Music, Spotify, Deezer e outros. Você pode tocar música em toda a sua casa com dispositivos Echo compatíveis em diferentes cômodos. Ouça também estações de rádio e suas playlists favoritas. * Alguns serviços podem exigir assinaturas ou taxas separadas.\n\n \n\nA Alexa tem skills\n \n\nA Alexa tem milhares de Skills, e continua desenvolvendo outras. As Skills são como aplicativos e te ajudam a fazer muito mais, como jogar Show do Milhão ou pedir uma comida no iFood. Novas Skills estão sendo adicionadas o tempo todo. Descubra-as na seção de Skills do aplicativo Alexa ou acesse a loja de Skills.\n\n \n\nEcho Dot 3 Criado para proteger sua privacidade\n \n\nOs dispositivos Alexa e Echo são desenvolvidos com múltiplas camadas de privacidade. Do controle do microfone à possibilidade de ver e apagar suas recordações de voz, você tem transparência e controle sobre sua experiência com a Alexa. Saiba mais sobre como os dispositivos Alexa e Echo funcionam.', '930131316.jpg', 274),
(26, 9, 'Rhino Fabric', 17, 'Rhino Fabric', 'Cadeira Gamer DT3Sports Rhino Fabric, com Almofada, Reclinável, Apoio de Braço 4D, Preto\n \n\nA costura com padrão hexagonal da Rhino complementa o estilo racing com um toque refinado e diferente. A Rhino tem estrutura mais larga e reforçada para suportar bastante peso. Com o encosto reclinável mais o ajuste do sistema frog, o modelo da Elite Series é construída da forma mais ergonômica possível para um melhor posicionamento durante o gameplay ou descanso durante os intervalos.', 'f29c5c8980e3ae554990239035d31ce9f4ac1a7a.jpeg', 3399.99),
(27, 9, 'Nero', 17, 'Nero', '- Acompanha 1 almofada de cabeça com ajuste magnético, sem necessidade de elásticos\r\n\r\n- Mecanismo de ajuste lombar, com 182 posições\r\n\r\n- Revestimento com Tecido DT3 Max2Weave. Qualidade, Conforto e Durabilidade.\r\n\r\n- Design moderno e elegante\r\n\r\n- Espuma injetada no assento e no encosto\r\n\r\n- Estrutura de aço reforçado no assento e encosto com 4 anos de garantia\r\n\r\n- Densidade de 55Kg/m³. Resistência e conforto para longas horas com seu jogo favorito.\r\n\r\n- Reclino de 168º + Rocking de 12º\r\n\r\n- Apoio de braço 3D\r\n\r\n- Base de alumínio leve e resistente. Alinhamento perfeito e super estável.\r\n\r\n- Cilindro de gás classe 4 SGS com 80mm\r\n\r\n- Rodinhas elegantes com 65mm', '92009_2_1526385601_gg.jpg', 1899.99),
(28, 5, 'Galaxy A7 Lite 4G', 4, 'SM-T225NZAPZTO', 'Galaxy Tab A7 Lite (4G) 32 GB, Projetado para ir aonde você for com gestos simples para usar com apenas uma mão e possui uma câmera para capturar seus momentos ao vivo Feito para ir aonde você for Não troque estilo por conveniência. O Galaxy Tab A7 Lite oferece os dois em uma estrutura fina. Com espessura de 8,0 mm e 371 g de peso, ele é super portátil e pode ser guardado com facilidade na bolsa sem pesar. Escolha entre as elegantes cores grafite ou prata. Uma câmera para capturar seus momentos ao vivo A câmera do Galaxy Tab A7 Lite está pronta para capturar e compartilhar seu momento. Não importa se tem interesse em retratos deslumbrantes ou paisagens de tirar o fôlego, este dispositivo tem o que você precisa. Com a câmera principal de 8 MP, suas memórias permanecem vivas, brilhantes e claras. O cinema mais perto no seu bolso O design com bordas finas significa um display maior de 8,7 polegadas em um tablet convenientemente compacto. Aproveite seus conteúdos favoritos em uma tela particular e improvisada no parque ou na cama com dois alto-falantes no modo paisagem que oferecem som estéreo rico. ** Medido na diagonal como um retângulo inteiro sem considerar os cantos arredondados. A área visível real é menor devido aos cantos arredondados. Armazene tudo o que você ama, com capacidade para cartão microSD de até 1 TB O Galaxy Tab A7 Lite está disponível com armazenamento de 32 GB integrado para todos os seus vídeos, fotos e arquivos de alta resolução. Você também pode expandi-lo com um cartão microSD e aproveitar até 1 TB. Armazene tudo o que você ama e exclua menos. Duração da bateria diferenciada O Galaxy Tab A7 Lite oferece muito mais autonomia de uso do que se imagina em um dispositivo tão elegante e fino. Sua bateria de 5.100 mAh* oferece a liberdade de esquecer o carregador durante muito tempo quando você precisar ir a algum lugar ou tiver muito para assistir. * Valor padrão testado em condições de laboratório terceirizado. O valor padrão é o valor médio estimado considerando o desvio na capacidade da bateria entre as amostras de bateria testadas sob o padrão IEC 61960. A capacidade nominal (mínima) é de 4.980 mAh. A duração real da bateria pode variar dependendo do ambiente de rede, padrões de uso e outros fatores.', 'tablet-samsung-galaxy-a7-lite-4g-32gb-android-11.jpg', 849),
(29, 7, 'Smart TV 55 QLED 4K', 4, 'QN55Q60BAGXZD', '100% de volume de cor\r\nDesfrute o máximo da qualidade de imagem em 4K, com 1 bilhão de cores vibrantes por muito mais tempo. As QLED TVs receberam da mundialmente reconhecida associação de certificação e testes Verband Deutscher Elektrotechniker (VDE) o reconhecimento na capacidade de reproduzir 100% do volume de cor. As QLED TVs da Samsung são baseadas na tecnologia de Pontos Quânticos.\r\n\r\n\r\nAproveite sua TV livre de preocupações\r\nAlgumas TVs absorvem as imagens estáticas que aparecem na tela por muito tempo, como placares ou mapas de jogos. O resultado é o burn in, ou seja, manchas permanentes na tela. Mas, com a QLED, você tem a melhor imagem e a garantia de 10 anos contra esse efeito.\r\n\r\n\r\nO Burn-in ocorre quando imagens estáticas são reproduzidas em uma TV, em média por 2 horas, e eventualmente a TV absorve este conteúdo gerando manchas definitivas na tela. A garantia de 10 anos abrange os produtos utilizados em ambientes domésticos normais apenas para Burn-in não intencionais, sendo elegível aos consumidores que tenham adquirido um dos produtos da TV Samsung QLED 2017 a 2021 oficialmente no Brasil\r\n\r\n\r\nO som acompanha a ação\r\nA experiência do som 3D permitirá que você fique totalmente imerso no áudio dos seus filmes e séries, como se estivesse no meio da ação', 'smart-tv-samsung-55-qled-4k-hdr-wifi-bluetooth-hdmi.jpg', 3249.99),
(30, 8, 'Inspiron I1200-m10', 11, 'I1200-m10', 'Computador All In One, Dell Inspiron I1200-m10 - Tela 24 FULL HD, I5 1235u, 8GB, SSD 256GB, Windows', 'Computador-All-In-One-Dell-Inspiron-I1200-m10.jpg', 7929.99);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos_has_pedidos`
--

CREATE TABLE `produtos_has_pedidos` (
  `id` int(11) NOT NULL,
  `pedidos_id` int(11) NOT NULL,
  `produtos_id` int(11) NOT NULL,
  `qt_produto` int(11) NOT NULL,
  `preco_produto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `rg` varchar(9) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_enderecos_usuarios1_idx` (`id_usuario`);

--
-- Índices de tabela `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_usuarios1_idx` (`id_usuario`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_produtos_categorias1_idx` (`id_categoria`),
  ADD KEY `fk_produtos_marcas1_idx` (`id_marca`);

--
-- Índices de tabela `produtos_has_pedidos`
--
ALTER TABLE `produtos_has_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_produtos_has_pedidos_pedidos1_idx` (`pedidos_id`),
  ADD KEY `fk_produtos_has_pedidos_produtos1_idx` (`produtos_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  ADD UNIQUE KEY `rg_UNIQUE` (`rg`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT de tabela `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de tabela `produtos_has_pedidos`
--
ALTER TABLE `produtos_has_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `fk_enderecos_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `fk_produtos_categorias1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `fk_produtos_marcas1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`);

--
-- Restrições para tabelas `produtos_has_pedidos`
--
ALTER TABLE `produtos_has_pedidos`
  ADD CONSTRAINT `fk_produtos_has_pedidos_pedidos1` FOREIGN KEY (`pedidos_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_produtos_has_pedidos_produtos1` FOREIGN KEY (`produtos_id`) REFERENCES `produtos` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
