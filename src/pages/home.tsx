import { ArrowRight, BookOpen, ChevronDown, ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, Timer, Volume, Volume2} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import fundo1 from '../assets/fundo1.png';
import fundo2 from '../assets/fundo2.png';
import fundo3 from '../assets/fundo3.png';
import fundo4 from '../assets/fundo4.png';
import fundo5 from '../assets/fundo5.png';
import fundo6 from '../assets/fundo6.png';
import fundo7 from '../assets/fundo7.png';
import fundo8 from '../assets/fundo8.png';
import facil from '../assets/facil.png';
import medio from '../assets/medio.png';
import dificil from '../assets/dificil.png';
import jesus from '../assets/jesus.png';
import biblia from '../assets/biblia.png';
import moises from '../assets/moises.png';
import jose from '../assets/jose.png';
import confetti from "canvas-confetti";
import menu from '../assets/musicas/menu.mp3';
import erro from '../assets/musicas/erro.wav';
import falhou from '../assets/musicas//falhou.wav';
import acerto from '../assets/musicas/acerto.wav';
import clique from '../assets/musicas/clique.wav';
import venceu from '../assets/musicas/venceu.mp3';


type pergunta = {
    pergunta: string,
    resposta: string,
    explicacao: string,
    versiculo: string,
    dif: string,
    tema: string,
}

export default function Home() {
const [tempoFinal, setTempoFinal] = useState(false);
const [timer, setTimer] = useState(10);
const [loading, setLoading] = useState(false);
const somMenu = useRef(new Audio(menu));
const audioMenu = somMenu.current;
const [pausarMusica, setPausarMusica] = useState(false);
audioMenu.volume = 0.032;
audioMenu.muted = false;
audioMenu.loop = true;
pausarMusica ?
    audioMenu.pause()
:
    audioMenu.play();

useEffect(() => {
    pausarMusica ?
        audioMenu.pause()
    :
        audioMenu.play().catch(() => {});
}, [pausarMusica]);

useEffect(() => {
    const pararAudio = () => {
        audioMenu.pause();
    };

    window.addEventListener("pagehide", pararAudio);

    const controlarVisibilidade = () => {
        if (document.hidden) {
            audioMenu.pause();
        } else if (!pausarMusica) {
            audioMenu.play().catch(() => {});
        }
    };

    document.addEventListener("visibilitychange", controlarVisibilidade);

    return () => {
        window.removeEventListener("pagehide", pararAudio);
        document.removeEventListener("visibilitychange", controlarVisibilidade);
        audioMenu.pause();
    };
}, []);

const somErro = useRef(new Audio(erro));
const somFalhou = useRef(new Audio(falhou));
const somAcerto = useRef(new Audio(acerto));
const somClique = useRef(new Audio(clique));
const somVenceu = useRef(new Audio(venceu));
const [mostrarTema, setMostrarTema] = useState(false);
const [jogoComecou, setJogoComecou] = useState(false);
const [mostrarDificuldade, setMostrarDificuldade] = useState(false);
const [difEscolhida, setDifEscolhida] = useState('');
const [jogoEncerrado, setJogoEncerrado] = useState(false);
const [sequencia, setSequencia] = useState(0);
const [pontos, setPontos] = useState(0);
const [recorde, setRecorde] = useState(() => {
    const recordeAtual = localStorage.getItem('recorde');
    return Number(recordeAtual) ?? 0;
});

const [indicePergunta, setIndicePergunta] = useState(0);

const perguntas: pergunta[] = [
{
pergunta: 'Jesus escreveu os Dez Mandamentos no Monte Sinai.',
resposta: 'amarrado',
explicacao: 'Os Dez Mandamentos foram entregues a Moisés.',
versiculo: 'Êxodo 31:18',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés abriu o Rio Jordão ao meio.',
resposta: 'amarrado',
explicacao: 'Moisés abriu o Mar Vermelho, não o Rio Jordão.',
versiculo: 'Êxodo 14:21',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Marta abriu o Mar Vermelho com a ajuda de Deus.',
resposta: 'amarrado',
explicacao: 'Quem abriu o Mar Vermelho foi Moisés.',
versiculo: 'Êxodo 14:21',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés foi colocado em um cesto no rio Nilo quando bebê.',
resposta: 'biblia',
explicacao: 'A mãe de Moisés o escondeu e o colocou em um cesto no rio para salvá-lo.',
versiculo: 'Êxodo 2:3',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés transformou pedras em pão no deserto.',
resposta: 'amarrado',
explicacao: 'Quem foi tentado a transformar pedras em pão foi Jesus.',
versiculo: 'Mateus 4:3',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Deus falou com Moisés através de uma sarça ardente.',
resposta: 'biblia',
explicacao: 'Deus apareceu a Moisés em uma sarça que queimava sem se consumir.',
versiculo: 'Êxodo 3:2',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés construiu a arca para escapar do dilúvio.',
resposta: 'amarrado',
explicacao: 'Quem construiu a arca foi Noé.',
versiculo: 'Gênesis 6:14',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'Moisés lançou seu cajado e ele virou serpente.',
resposta: 'biblia',
explicacao: 'Deus realizou esse sinal diante de Faraó através de Moisés.',
versiculo: 'Êxodo 7:10',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés derrotou Golias com uma funda.',
resposta: 'amarrado',
explicacao: 'Quem derrotou Golias foi Davi.',
versiculo: '1 Samuel 17:49',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés recebeu os Dez Mandamentos no Monte Sinai.',
resposta: 'biblia',
explicacao: 'Deus entregou as tábuas da Lei a Moisés no monte.',
versiculo: 'Êxodo 31:18',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés foi engolido por um grande peixe após fugir de Deus.',
resposta: 'amarrado',
explicacao: 'Quem foi engolido pelo peixe foi Jonas.',
versiculo: 'Jonas 1:17',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés feriu uma rocha e dela saiu água.',
resposta: 'biblia',
explicacao: 'Deus fez sair água da rocha para o povo no deserto.',
versiculo: 'Êxodo 17:6',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés dormiu na cova dos leões e saiu ileso.',
resposta: 'amarrado',
explicacao: 'Quem foi lançado na cova dos leões foi Daniel.',
versiculo: 'Daniel 6:16',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'Moisés conduziu o povo de Israel para fora do Egito.',
resposta: 'biblia',
explicacao: 'Moisés liderou o Êxodo do povo hebreu.',
versiculo: 'Êxodo 12:51',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés reconstruiu os muros de Jerusalém após o exílio.',
resposta: 'amarrado',
explicacao: 'Quem reconstruiu os muros foi Neemias.',
versiculo: 'Neemias 6:15',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'O rosto de Moisés brilhava após falar com Deus.',
resposta: 'biblia',
explicacao: 'Seu rosto resplandecia depois de descer do monte.',
versiculo: 'Êxodo 34:29',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés foi vendido como escravo por seus irmãos.',
resposta: 'amarrado',
explicacao: 'Quem foi vendido pelos irmãos foi José.',
versiculo: 'Gênesis 37:28',
dif: 'Fácil',
tema: 'Moisés'
},
{
pergunta: 'Moisés enviou doze espias para observar Canaã.',
resposta: 'biblia',
explicacao: 'Os espias foram enviados para analisar a terra prometida.',
versiculo: 'Números 13:1-2',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'Moisés venceu os profetas de Baal no Monte Carmelo.',
resposta: 'amarrado',
explicacao: 'Quem enfrentou os profetas de Baal foi Elias.',
versiculo: '1 Reis 18:20-39',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'Moisés ergueu uma serpente de bronze no deserto.',
resposta: 'biblia',
explicacao: 'Quem olhava para a serpente era curado.',
versiculo: 'Números 21:9',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés interpretou os sonhos do faraó sobre vacas magras.',
resposta: 'amarrado',
explicacao: 'Quem interpretou esses sonhos foi José.',
versiculo: 'Gênesis 41:25-27',
dif: 'Médio',
tema: 'Moisés'
},
{
pergunta: 'Moisés morreu antes de entrar na Terra Prometida.',
resposta: 'biblia',
explicacao: 'Deus permitiu que Moisés apenas visse a terra de longe.',
versiculo: 'Deuteronômio 34:4-5',
dif: 'Difícil',
tema: 'Moisés'
},
{
pergunta: 'Moisés sobreviveu dentro de uma fornalha ardente sem se queimar.',
resposta: 'amarrado',
explicacao: 'Quem sobreviveu à fornalha foram Sadraque, Mesaque e Abede-Nego.',
versiculo: 'Daniel 3:25',
dif: 'Fácil',
tema: 'Moisés'
},
/* MOISÉS */


{
pergunta: "Pedro encontrou duas moedas na boca do peixe para pagar o imposto.",
resposta: "amarrado",
explicacao: "Foi uma moeda só, não duas.",
versiculo: "Mateus 17:27",
dif: "Fácil",
tema: "Jesus",
},
{
pergunta: "Uma moeda foi encontrada na boca de um peixe para pagar um imposto.",
resposta: "biblia",
explicacao: "Jesus mandou Pedro pescar o peixe que tinha a moeda.",
versiculo: "Mateus 17:27",
dif: "Fácil",
tema: "Jesus",
},
{
pergunta: "Pilatos lavou as mãos com vinho antes de condenar Jesus.",
resposta: "amarrado",
explicacao: "Pilatos lavou as mãos com água, não com vinho.",
versiculo: "Mateus 27:24",
dif: "Fácil",
tema: "Jesus",
},
{
pergunta: "Jesus transformou água em vinho em um casamento.",
resposta: "biblia",
explicacao: "Esse foi o primeiro milagre de Jesus registrado em João.",
versiculo: "João 2:1-11",
dif: "Fácil",
tema: "Jesus",
},
{
pergunta: 'Pedro andou sobre as águas em direção a Jesus.',
resposta: 'biblia',
explicacao: 'Pedro caminhou sobre as águas enquanto teve fé.',
versiculo: 'Mateus 14:29',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Jesus nasceu na cidade de Nazaré.',
resposta: 'amarrado',
explicacao: 'Jesus nasceu em Belém.',
versiculo: 'Mateus 2:1',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Jesus alimentou cinco mil pessoas com cinco pães e dois peixes.',
resposta: 'biblia',
explicacao: 'Jesus multiplicou os pães e peixes para alimentar a multidão.',
versiculo: 'Mateus 14:17-21',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Paulo era cobrador de impostos antes de seguir Jesus.',
resposta: 'amarrado',
explicacao: 'Quem era cobrador de impostos era Mateus. Paulo era fariseu.',
versiculo: 'Filipenses 3:5',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Maria Madalena foi a primeira pessoa a ver Jesus ressuscitado.',
resposta: 'biblia',
explicacao: 'Jesus apareceu primeiro a Maria Madalena após ressuscitar.',
versiculo: 'João 20:14-16',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Jesus ficou 40 dias no deserto sendo tentado.',
resposta: 'biblia',
explicacao: 'Jesus jejuou e foi tentado no deserto por 40 dias.',
versiculo: 'Mateus 4:1-2',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Lázaro ficou quatro dias morto antes de Jesus ressuscitá-lo.',
resposta: 'biblia',
explicacao: 'Quando Jesus chegou, Lázaro já estava morto havia quatro dias.',
versiculo: 'João 11:39',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Jesus escolheu 12 apóstolos para segui-lo.',
resposta: 'biblia',
explicacao: 'Jesus chamou doze discípulos para serem seus apóstolos.',
versiculo: 'Lucas 6:13',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Pedro cortou a orelha de um soldado quando Jesus foi preso.',
resposta: 'biblia',
explicacao: 'Pedro atacou o servo do sumo sacerdote com uma espada.',
versiculo: 'João 18:10',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Judas traiu Jesus por 100 moedas de ouro.',
resposta: 'amarrado',
explicacao: 'Judas recebeu 30 moedas de prata.',
versiculo: 'Mateus 26:15',
dif: 'Fácil',
tema: 'Jesus'
},
{
pergunta: 'Jesus transformou pedras em pão no deserto.',
resposta: 'amarrado',
explicacao: 'Jesus recusou a tentação de transformar pedras em pão.',
versiculo: 'Mateus 4:3-4',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Estêvão foi apedrejado por pregar sobre Jesus.',
resposta: 'biblia',
explicacao: 'Estêvão foi o primeiro mártir cristão registrado na Bíblia.',
versiculo: 'Atos 7:58-60',
dif: 'Médio',
tema: 'Jesus'
},
{
pergunta: 'Jesus ressuscitou no terceiro dia e apareceu primeiro a Pilatos.',
resposta: 'amarrado',
explicacao: 'Jesus apareceu primeiro a Maria Madalena.',
versiculo: 'João 20:14-16',
dif: 'Médio',
tema: 'Jesus'
},
/* JESUS */


{
pergunta: "Absalão ficou preso pelos cabelos em um carvalho enquanto fugia.",
resposta: "biblia",
explicacao: "Ele ficou preso pelo cabelo e foi encontrado assim.",
versiculo: "2 Samuel 18:9",
dif: "Fácil",
tema: "",
},
{
pergunta: "Esaú vendeu sua primogenitura por um prato de carne assada.",
resposta: "amarrado",
explicacao: "Na Bíblia, ele vende por um prato de lentilhas.",
versiculo: "Gênesis 25:29-34",
dif: "Fácil",
tema: "",
},
{
pergunta: "Raquel escondeu os ídolos do pai na sela do camelo.",
resposta: "biblia",
explicacao: "Ela pegou os ídolos e os escondeu de forma bem discreta.",
versiculo: "Gênesis 31:34-35",
dif: "Fácil",
tema: "",
},
{
pergunta: "Mical colocou Davi na cama com lã para enganar os soldados.",
resposta: "amarrado",
explicacao: "Quem ela colocou foi um ídolo na cama, não lã.",
versiculo: "1 Samuel 19:12-13",
dif: "Fácil",
tema: "",
},
{
pergunta: "Jônatas provou mel e seus olhos se iluminaram.",
resposta: "biblia",
explicacao: "Depois de comer, ele recupera as forças.",
versiculo: "1 Samuel 14:27",
dif: "Fácil",
tema: "",
},
{
pergunta: "A filha de Jefté voltou para casa sem cumprir o voto do pai.",
resposta: "amarrado",
explicacao: "O texto mostra que o voto foi cumprido.",
versiculo: "Juízes 11:34-40",
dif: "Fácil",
tema: "",
},
{
pergunta: "Benaia matou um leão dentro de uma cova em dia de neve.",
resposta: "biblia",
explicacao: "É um dos feitos impressionantes dele.",
versiculo: "2 Samuel 23:20",
dif: "Médio",
tema: "",
},
{
pergunta: "Os ossos de Eliseu fizeram um morto voltar à vida.",
resposta: "biblia",
explicacao: "O contato com os ossos trouxe o homem de volta.",
versiculo: "2 Reis 13:21",
dif: "Médio",
tema: "",
},
{
pergunta: "Epafrodito foi um dos sete diáconos escolhidos em Atos.",
resposta: "amarrado",
explicacao: "Ele aparece em Filipenses, não nessa escolha de Atos.",
versiculo: "Filipenses 2:25-30",
dif: "Fácil",
tema: "",
},
{
pergunta: "Eutico caiu da janela durante a pregação e voltou à vida.",
resposta: "biblia",
explicacao: "Paulo o abraça e ele revive.",
versiculo: "Atos 20:9-12",
dif: "Fácil",
tema: "",
},
{
pergunta: "Um anjo do Senhor matou 185 mil soldados assírios durante a noite.",
resposta: "biblia",
explicacao: "O exército assírio foi derrotado por intervenção divina.",
versiculo: "2 Reis 19:35",
dif: "Médio",
tema: "",
},
{
pergunta: "Josué mandou o sol parar até Israel vencer a batalha.",
resposta: "biblia",
explicacao: "O texto diz que o sol e a lua ficaram parados.",
versiculo: "Josué 10:12-13",
dif: "Fácil",
tema: "",
},
{
pergunta: "Uma jumenta falou com Balaão para impedir sua viagem.",
resposta: "biblia",
explicacao: "Deus usou a jumenta para advertir Balaão.",
versiculo: "Números 22:28-30",
dif: "Fácil",
tema: "",
},
{
pergunta: "Gideão venceu os midianitas com apenas 300 homens.",
resposta: "biblia",
explicacao: "O exército foi reduzido antes da vitória.",
versiculo: "Juízes 7:7",
dif: "Fácil",
tema: "",
},
{
pergunta: "Abigail levou comida a Davi para evitar que ele atacasse Nabal.",
resposta: "biblia",
explicacao: "Ela agiu rápido para apaziguar Davi.",
versiculo: "1 Samuel 25:18-19",
dif: "Fácil",
tema: "",
},
{
pergunta: "Naamã foi curado depois de mergulhar sete vezes no Jordão.",
resposta: "biblia",
explicacao: "Ele obedeceu e ficou limpo da lepra.",
versiculo: "2 Reis 5:14",
dif: "Fácil",
tema: "",
},
{
pergunta: "Rute voltou sozinha para Moabe depois de ficar viúva.",
resposta: "amarrado",
explicacao: "Ela escolheu ficar com Noemi e ir para Belém.",
versiculo: "Rute 1:16-17",
dif: "Fácil",
tema: "",
},
{
pergunta: "Samuel foi criado no palácio de Davi desde pequeno.",
resposta: "amarrado",
explicacao: "Ele foi entregue ao serviço do Senhor em Siló.",
versiculo: "1 Samuel 1:27-28",
dif: "Fácil",
tema: "",
},
{
pergunta: "Ezequias recebeu um sinal quando a sombra avançou dez graus.",
resposta: "amarrado",
explicacao: "A sombra voltou para trás, não para frente.",
versiculo: "2 Reis 20:10-11",
dif: "Médio",
tema: "",
},
{
pergunta: "Ester pediu jejum de três dias antes de falar com o rei.",
resposta: "biblia",
explicacao: "Ela convocou o jejum antes de se apresentar.",
versiculo: "Ester 4:16",
dif: "Fácil",
tema: "",
},
{
pergunta: "Eúde matou um rei inimigo usando uma espada escondida na perna direita.",
resposta: "biblia",
explicacao: "Eúde escondeu a espada e matou o rei Eglom em segredo.",
versiculo: "Juízes 3:16-21",
dif: "Médio",
tema: "",
},
{
pergunta: "Neemias reconstruiu sozinho os muros de Jerusalém em apenas três dias.",
resposta: "amarrado",
explicacao: "O povo ajudou na reconstrução, que levou 52 dias.",
versiculo: "Neemias 6:15",
dif: "Fácil",
tema: "",
},
{
pergunta: "Eliseu fez um machado flutuar na água.",
resposta: "biblia",
explicacao: "O ferro do machado flutuou após Eliseu lançar um pedaço de madeira.",
versiculo: "2 Reis 6:5-7",
dif: "Médio",
tema: "",
},
{
pergunta: "A esposa de Jó foi transformada em estátua de sal por desobedecer a Deus.",
resposta: "amarrado",
explicacao: "Quem virou estátua de sal foi a esposa de Ló.",
versiculo: "Gênesis 19:26",
dif: "Fácil",
tema: "",
},
{
pergunta: "O rei Uzias ficou leproso após tentar oferecer incenso no templo.",
resposta: "biblia",
explicacao: "Uzias foi castigado por assumir uma função sacerdotal indevida.",
versiculo: "2 Crônicas 26:16-21",
dif: "Médio",
tema: "",
},
{
pergunta: "Timóteo era pescador antes de acompanhar Paulo em suas viagens.",
resposta: "amarrado",
explicacao: "A Bíblia não diz que Timóteo era pescador.",
versiculo: "Atos 16:1-3",
dif: "Fácil",
tema: "",
},
{
pergunta: "Ananias e Safira morreram após mentirem sobre uma oferta.",
resposta: "biblia",
explicacao: "O casal escondeu parte do valor da venda e mentiu.",
versiculo: "Atos 5:1-10",
dif: "Fácil",
tema: "",
},
{
pergunta: "Débora liderou Israel e julgava o povo debaixo de uma palmeira.",
resposta: "biblia",
explicacao: "Débora julgava Israel debaixo da chamada Palmeira de Débora.",
versiculo: "Juízes 4:4-5",
dif: "Fácil",
tema: "",
},
{
pergunta: "Isaías foi lançado na cova dos leões por se recusar a parar de orar.",
resposta: "amarrado",
explicacao: "Quem foi lançado na cova dos leões foi Daniel.",
versiculo: "Daniel 6:16",
dif: "Fácil",
tema: "",
},
{
pergunta: "Sansão matou mil filisteus com a queixada de um jumento.",
resposta: "biblia",
explicacao: "Sansão derrotou mil homens usando uma queixada de jumento.",
versiculo: "Juízes 15:15",
dif: "Fácil",
tema: "",
},
{
pergunta: "Jonas foi engolido por um crocodilo gigante.",
resposta: "amarrado",
explicacao: "A Bíblia fala de um grande peixe, não de um crocodilo.",
versiculo: "Jonas 1:17",
dif: "Fácil",
tema: "",
},
{
pergunta: 'Davi derrotou Golias usando uma espada desde o começo da luta.',
resposta: 'amarrado',
explicacao: 'Davi usou uma funda e uma pedra para derrubar Golias.',
versiculo: '1 Samuel 17:49-50',
dif: 'Fácil',
tema: ''
},
{
pergunta: 'Daniel foi jogado na cova dos leões por continuar orando a Deus.',
resposta: 'biblia',
explicacao: 'Daniel manteve sua fé mesmo após o decreto do rei.',
versiculo: 'Daniel 6:10-16',
dif: 'Fácil',
tema: ''
},
{
pergunta: 'Elias foi levado ao céu em um redemoinho com carros de fogo.',
resposta: 'biblia',
explicacao: 'Elias foi levado ao céu de forma sobrenatural.',
versiculo: '2 Reis 2:11',
dif: 'Médio',
tema: ''
},
{
pergunta: 'Noé levou três casais de cada animal para a arca.',
resposta: 'amarrado',
explicacao: 'Noé levou um casal de cada animal impuro e sete pares dos puros.',
versiculo: 'Gênesis 7:2-3',
dif: 'Difícil',
tema: ''
},
{
pergunta: 'O rei Salomão construiu a arca de Noé.',
resposta: 'amarrado',
explicacao: 'A arca foi construída por Noé muitos séculos antes de Salomão.',
versiculo: 'Gênesis 6:13-14',
dif: 'Fácil',
tema: ''
},
{
pergunta: 'A muralha de Jericó caiu após o povo rodear a cidade por sete dias.',
resposta: 'biblia',
explicacao: 'Deus derrubou as muralhas após a obediência do povo.',
versiculo: 'Josué 6:15-20',
dif: 'Médio',
tema: ''
},
{
pergunta: 'Deus enviou corvos para alimentar Elias no deserto.',
resposta: 'biblia',
explicacao: 'Os corvos levavam pão e carne para Elias.',
versiculo: '1 Reis 17:4-6',
dif: 'Difícil',
tema: ''
},
{
pergunta: 'Adão deu nome aos animais criados por Deus.',
resposta: 'biblia',
explicacao: 'Deus levou os animais até Adão para que ele lhes desse nome.',
versiculo: 'Gênesis 2:19-20',
dif: 'Fácil',
tema: ''
},
{
pergunta: 'Paulo sobreviveu após ser picado por uma cobra venenosa.',
resposta: 'biblia',
explicacao: 'Paulo foi picado, mas não sofreu nenhum mal.',
versiculo: 'Atos 28:3-5',
dif: 'Difícil',
tema: ''
},
/* RESTO */


{
pergunta: 'José interpretou os sonhos do faraó sobre vacas e espigas.',
resposta: 'biblia',
explicacao: 'José explicou os sonhos do faraó, prevendo anos de fartura e fome.',
versiculo: 'Gênesis 41:25-32',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José foi vendido como escravo pelos próprios irmãos.',
resposta: 'biblia',
explicacao: 'Os irmãos de José o venderam para mercadores por inveja.',
versiculo: 'Gênesis 37:28',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José fugiu do Egito montado em um cavalo branco após sair da prisão.',
resposta: 'amarrado',
explicacao: 'A Bíblia não menciona José fugindo do Egito nem usando um cavalo branco.',
versiculo: '',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'Os irmãos de José jogaram-no em uma cisterna antes de vendê-lo.',
resposta: 'biblia',
explicacao: 'Antes de ser vendido, José foi lançado em uma cisterna vazia.',
versiculo: 'Gênesis 37:24',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José se tornou rei do Egito depois da morte do faraó.',
resposta: 'amarrado',
explicacao: 'José se tornou governador, mas nunca rei do Egito.',
versiculo: '',
dif: 'Difícil',
tema: 'José'
},
{
pergunta: 'José ganhou uma túnica colorida de seu pai Jacó.',
resposta: 'biblia',
explicacao: 'Jacó presenteou José com uma túnica especial, causando inveja nos irmãos.',
versiculo: 'Gênesis 37:3',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José foi acusado injustamente pela esposa de Potifar.',
resposta: 'biblia',
explicacao: 'A esposa de Potifar mentiu sobre José após ele rejeitá-la.',
versiculo: 'Gênesis 39:14-20',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José derrotou guerreiros egípcios em uma batalha para proteger seus irmãos.',
resposta: 'amarrado',
explicacao: 'José nunca participou de batalhas militares na narrativa bíblica.',
versiculo: '',
dif: 'Difícil',
tema: 'José'
},
{
pergunta: 'José revelou sua identidade aos irmãos chorando diante deles.',
resposta: 'biblia',
explicacao: 'José se emocionou muito ao revelar quem era.',
versiculo: 'Gênesis 45:1-3',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José mandou prender Benjamin por roubar ouro do templo.',
resposta: 'amarrado',
explicacao: 'Benjamin foi acusado por causa do copo de prata de José, não ouro do templo.',
versiculo: '',
dif: 'Difícil',
tema: 'José'
},
{
pergunta: 'José administrou alimentos no Egito durante os anos de fome.',
resposta: 'biblia',
explicacao: 'José organizou os celeiros e distribuiu comida durante a fome.',
versiculo: 'Gênesis 41:48-49',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José tinha dezessete anos quando foi vendido pelos irmãos.',
resposta: 'biblia',
explicacao: 'A Bíblia informa a idade de José nesse momento.',
versiculo: 'Gênesis 37:2',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José construiu um barco para escapar da fome no Egito.',
resposta: 'amarrado',
explicacao: 'José nunca construiu barco algum; ele administrou mantimentos.',
versiculo: '',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José interpretou corretamente os sonhos de dois servos presos com ele.',
resposta: 'biblia',
explicacao: 'José interpretou os sonhos do copeiro e do padeiro.',
versiculo: 'Gênesis 40:5-22',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José foi vendido por trinta moedas de prata.',
resposta: 'amarrado',
explicacao: 'José foi vendido por vinte moedas de prata.',
versiculo: '',
dif: 'Difícil',
tema: 'José'
},
{
pergunta: 'O faraó colocou um anel em José como sinal de autoridade.',
resposta: 'biblia',
explicacao: 'José recebeu autoridade sobre o Egito através do anel do faraó.',
versiculo: 'Gênesis 41:42',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José proibiu seus irmãos de voltarem ao Egito após a primeira visita.',
resposta: 'amarrado',
explicacao: 'José permitiu que voltassem, mas exigiu que trouxessem Benjamin.',
versiculo: '',
dif: 'Médio',
tema: 'José'
},
{
pergunta: 'José deu o nome de Manassés ao seu primeiro filho.',
resposta: 'biblia',
explicacao: 'José chamou seu primeiro filho de Manassés.',
versiculo: 'Gênesis 41:51',
dif: 'Difícil',
tema: 'José'
},
{
pergunta: 'José foi criado pela filha do faraó dentro do palácio.',
resposta: 'amarrado',
explicacao: 'Isso aconteceu com Moisés, não com José.',
versiculo: '',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José perdoou os irmãos mesmo após tudo o que sofreu.',
resposta: 'biblia',
explicacao: 'José reconheceu que Deus transformou o mal em bem.',
versiculo: 'Gênesis 50:20-21',
dif: 'Fácil',
tema: 'José'
},
{
pergunta: 'José destruiu os celeiros do Egito após o fim da fome.',
resposta: 'amarrado',
explicacao: 'A Bíblia não relata José destruindo os celeiros.',
versiculo: '',
dif: 'Médio',
tema: 'José'
},
/* JOSÉ */



];

const [respostaAtual, setRespostaAtual] = useState('');

const acertou = () => {
        confetti({
            particleCount: 90,

            // abre pros lados
            spread: 180,

            // pequena força inicial
            // só pra espalhar
            startVelocity: 22,

            // queda suave
            gravity: 0.92,

            scalar: 1.2,

            ticks: 140,

            drift: 0.15,

            origin: {
            x: 0.5,
            y: 0.12,
            },
        });
};

function resetar() {
    window.location.reload();
}

const compartilharWhatsapp = async () => {
    window.open(
    `https://wa.me/?text=${encodeURIComponent(
        `Acabei de fazer ${pontos} pontos no https://ta-na-biblia.vercel.app/`
    )}`,
    "_blank"
    );
};

const allTemas = [
    fundo1,
    fundo2,
    fundo3,
    fundo4,
    fundo5,
    fundo6,
    fundo7,
    fundo8
];

const [temaAtual, setTemaAtual] = useState(fundo2);

const tocarClique = (som: HTMLAudioElement) => {
    audioMenu.volume = 0.02;
    som.currentTime = 0;
    som.volume = 0.1;
    som.play();
    setTimeout(() => {
        audioMenu.volume = 0.032;
    }, som.duration + 200);
}

const tocarBotao = () => {
    somClique.current.volume = 0.1;
    somClique.current.currentTime = 0;
    somClique.current.play();
}

useEffect(() => {
    if (!jogoComecou || jogoEncerrado || respostaAtual !== '') return;

    const timerInterval = setInterval(() => {
        setTimer(prev => {
            if (prev <= 1) {
                clearInterval(timerInterval);
                setTempoFinal(true);
                tocarClique(somErro.current);
                return 0;
            }

            return prev - 1;
        });
    }, 1000);

    return () => {
        clearInterval(timerInterval);
    };

}, [jogoComecou, jogoEncerrado, respostaAtual]);

const allDificuldades = [
    {
        img: facil,
        dif: 'Fácil'
    },
    {
        img: medio,
        dif: 'Médio'
    },
    {
        img: dificil,
        dif: 'Difícil'
    }
];

const allTopicos = [
    {
        img: jose,
        dif: 'José'
    },
    {
        img: biblia,
        dif: 'Todos'
    },
    {
        img: jesus,
        dif: 'Jesus'
    },
    {
        img: moises,
        dif: 'Moisés'
    },
];
const [topicoEscolhido, setTopicoEscolhido] = useState('');

const [pageTopicos, setPageTopicos] = useState(0);
const [topicosAtivos, setTopicosAtivos] = useState(allTopicos.slice(pageTopicos, pageTopicos + 3));
const total = allTopicos.length;

const pegarTopicos = (pagina: number) => {
    return [
        allTopicos[(pagina + total) % total],
        allTopicos[(pagina + 1) % total],
        allTopicos[(pagina + 2) % total],
    ];
};

const perguntasEmbaralhadas = useMemo(() => {
  let array = [...perguntas];
  if (difEscolhida !== '') {
    if (difEscolhida === 'Fácil') {
        array = array.filter((p) => p.dif === 'Fácil');
    } else if (difEscolhida === 'Médio') {
        array = array.filter((p) => p.dif !== 'Difícil');
    }
  }

  if (topicoEscolhido !== '' && topicoEscolhido !== 'Todos') {
    array = array.filter((p) => p.tema === topicoEscolhido);
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}, [difEscolhida, topicoEscolhido]);

const perguntaAtual = perguntasEmbaralhadas[indicePergunta];

function atualizarPergunta() {
    // impede passar do limite
    if (indicePergunta >= perguntasEmbaralhadas.length - 1) {
        console.log('acabaram as perguntas');
        return;
    }

    setIndicePergunta((prev) => prev + 1);
    setRespostaAtual('');
    setTimer(
        difEscolhida === 'Difícil' ?
            10
        :
        difEscolhida === 'Médio' ?
            15
        :
            20
    );
    setPontos((prev) => prev + 10);
    setSequencia((prev) => prev + 1);
    if (pontos + 10 >= recorde) {
        setRecorde(pontos + 10);
        localStorage.setItem('recorde', (pontos+10).toString());
    }
}



if (!perguntaAtual) return;


return (
<>
    {(respostaAtual !== '' || tempoFinal) &&
    <article className="z-3 max-w-100 min-w-full scale-90 sm:scale-100 sm:min-w-100 fixed top-1/2 left-1/2 -translate-1/2 border-6 border-slate-900 p-6 pt-7 rounded-2xl bg-[#fffbeb] flex flex-col items-center justify-center gap-5 font-display shadow-[8px_8px_0_0_#0F172A]">

        {respostaAtual === perguntaAtual.resposta ? (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
            overflow='visible'
            stroke="currentColor" 
            strokeWidth="2.7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-14 h-14 text-[#10b981]">

            <circle cx="12" cy="12" r="11.5" fill="#d1fae5" stroke="#10b981" /> 
            <path d="M8 12L11 15L16 9" />
            
        </svg>
        ) : (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
            overflow='visible'
            stroke="currentColor" 
            strokeWidth="2.7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-14 h-14 text-[#f43f5e]">

            <circle cx="12" cy="12" r="11.5" fill="#ffcad0" stroke="#f43f5e" /> 
            <path d="M8.6 8.6L15.4 15.4" /> <path d="M15.4 8.6L8.6 15.4" />
            
        </svg>
        )}

        <h1 className="font-black text-3xl text-slate-900">
            {tempoFinal ? 'Tempo Excedido!' : respostaAtual === perguntaAtual.resposta ? 'Correto!' : 'Errou!'}
        </h1>

        <div className="w-full h-0 border-t-4 border-dashed border-[#CBD5E1] rounded-full" />

        {!tempoFinal &&
        <>
        <h2 className={`text-md font-bold tracking-[2.5px] uppercase ${respostaAtual !== perguntaAtual.resposta ? 'text-red-600/80' : 'text-green-600'} text-shadow-xs text-shadow-black/2`}>
            {perguntaAtual.resposta === 'amarrado' ? 'Tá Amarrado' : 'Tá na Bíblia'}
        </h2>

        <p className="text-slate-700 text-center">
            {perguntaAtual.explicacao}
        </p>

        <span className="flex p-2 px-4 rounded-full border-2 border-slate-900 bg-gray-50 gap-2 items-center justify-center text-sm font-medium text-zinc-800 tracking-wide italic">
            <BookOpen size={18}/>
            {perguntaAtual.versiculo}
        </span>
        </>
        }

        {tempoFinal &&
        <p className="text-slate-700 text-center">
            Jogue mais rápido na próxima!
        </p>
        }

        <button 
        onClick={() => {
            if (tempoFinal) {
                setTempoFinal(false);
                setJogoEncerrado(true);
                tocarClique(indicePergunta < perguntas.length ? somFalhou.current : somVenceu.current);
                setPausarMusica(true);
                return;
            }
            else if (respostaAtual === perguntaAtual.resposta && indicePergunta < perguntasEmbaralhadas.length - 1) {
                atualizarPergunta();
                return;
            } else {
                setRespostaAtual('');
                setJogoEncerrado(true);
                setPontos((prev) => prev + 10);
                setSequencia((prev) => prev + 1);
                if (pontos + 10 >= recorde) {
                    setRecorde(pontos + 10);
                    localStorage.setItem('recorde', (pontos+10).toString());
                }
                tocarClique(indicePergunta+1 < perguntasEmbaralhadas.length ? somFalhou.current : somVenceu.current);
                setPausarMusica(true);
                return;
            }
        }}
        className="p-6 rounded-xl uppercase text-white/96 bg-slate-900 font-bold tracking-widest text-[20px] w-full cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-slate-800 group">
            {respostaAtual !== perguntaAtual.resposta ?
                'Ver Resultado'
                :
                'Continuar'
            }

            <ArrowRight className="group-hover:translate-x-1 -translate-y-px transition-transform duration-200" size={30}/>
        </button>

    </article>
    }

    {mostrarTema &&
        <div
        onClick={() => setMostrarTema(false)}
        className="max-lg:bg-black/32 max-lg:z-1000 max-lg:fixed max-lg:inset-0"
        />
    }

    <div 
    className={`min-h-screen relative flex flex-col justify-center items-center ${(respostaAtual !== '' || tempoFinal) && 'blur-xs'}`}>
        <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none bg-no-repeat"
        style={{ backgroundImage: `url(${temaAtual})` }}
        />
        <div
        className="bg-black/12 z-1 fixed inset-0"
        />

        {(respostaAtual !== '' || tempoFinal) &&
            <div
            className="bg-black/52 z-2 fixed inset-0"
            />
        }

        {/* TOPO */}
        <div className={`z-1000 max-w-100 items-start justify-center relative min-w-full lg:min-w-0 max-lg:mt-2.5 max-sm:gap-4 sm:gap-12 lg:gap-0 max-sm:scale-95 ${(!jogoEncerrado && !jogoComecou) ? 'flex' : 'max-lg:hidden flex'}`}>
            <div onClick={() => setPausarMusica(!pausarMusica)} className="lg:fixed lg:top-6 lg:right-50 lg:translate-x-0 flex items-center gap-1 justify-center max-w-26 bg-white border-4 border-black rounded-full px-4 py-1.5 shadow-[4px_4px_0_0_#000000] cursor-pointer z-999">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                Som
                </span>
                {pausarMusica ?
                    <Volume className="w-4 h-4 sm:h-6 sm:w-6"/>
                    :
                    <Volume2 className="w-4 h-4 sm:h-6 sm:w-6"/>
                }

            </div>

            {(!jogoEncerrado && !jogoComecou) &&
            <div className={`lg:mt-2.5 max-w-54 items-center gap-2 bg-white border-4 border-slate-900 rounded-full px-4 p-1.5 shadow-[4px_4px_0_0_#000000] flex sm:min-h-12 lg:min-h-0 ${mostrarDificuldade && 'lg:hidden'}`}>
                {/* BOOK ICON */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-rose-500"
                >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>

                <span className="text-[8px] text-center sm:text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                Tá Na Bíblia?
                </span>
            </div>
            }

            <div onClick={() => setMostrarTema(!mostrarTema)} className="relative lg:fixed lg:top-6 lg:right-20 lg:translate-x-0 flex flex-row-reverse items-center max-w-28 bg-white border-4 border-black rounded-full px-4 py-1.5 shadow-[4px_4px_0_0_#000000] cursor-pointer">
                <ChevronDown className={`${mostrarTema && 'rotate-180'} transition-transform duration-300 w-4 h-4 sm:h-6 sm:w-6`}/>

                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                Tema
                </span>

                <section className={`lg:fixed right-0 min-w-55 max-w-55 lg:top-14 absolute max-lg:-bottom-4 max-lg:translate-y-full bg-white border-3 border-black/90 rounded-xl overflow-hidden shadow-[6px_6px_0_0_#000000] flex flex-col items-center justify-center transition-all duration-300 ${mostrarTema ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    {allTemas.map((t, index) =>
                        <article onClick={() => {
                            setTemaAtual(t);
                            setMostrarTema(false);
                        }} key={index} className={`p-4 min-w-full transition-colors duration-200 hover:bg-slate-200 flex justify-between items-center gap-4 ${index + 1 < allTemas.length && 'border-b border-b-slate-900/10'}`}>
                            <span className="font-semibold">Tema {index + 1}</span>
                            <img className="max-w-15 max-h-15 rounded-sm" src={t} alt="" />
                        </article>
                    )}
                </section>
            </div>
        </div>

        {jogoEncerrado ?
        <div className="max-w-100 sm:min-w-100 flex flex-col justify-between min-h-screen py-2.5 pb-10 z-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 bg-white border-4 border-slate-90 rounded-full p-2 mx-auto px-4.5 text-center shadow-[4px_4px_0_0_#0F172A]">
            Fim de Jogo
            </span>

            <div className={`flex max-[375px]:scale-95 max-lg:scale-95 flex-col items-center w-full ${pontos < recorde ? 'mt-auto gap-5' : 'gap-5'}`}>
                <div className={`border-4 border-slate-900 rounded-3xl px-6 py-6 shadow-[10px_10px_0_0_#0F172A] w-full text-center ${indicePergunta < perguntasEmbaralhadas.length-1 ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                <h2 className="font-display text-4xl font-black text-white leading-none">
                    Acabou!
                </h2>

                <p className="mt-2 text-base font-bold text-rose-50">
                    {indicePergunta < perguntasEmbaralhadas.length-1 ?
                    'Você se confundiu... mas tenta de novo!'
                    :
                    'Parabéns! Você acertou todas as perguntas!'
                    }
                </p>
                </div>

                {pontos >= recorde &&
                <div
                className="bg-amber-300 border-4 border-slate-900 rounded-2xl px-4 py-3 shadow-[6px_6px_0_0_#0F172A] flex items-center gap-2 animate-wiggle"
                data-testid="new-record-badge"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trophy w-5 h-5 text-slate-900"
                        aria-hidden="true"
                    >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>

                    <span className="font-black uppercase tracking-wider text-slate-900">
                        Novo Recorde!
                    </span>
                </div>
                }

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="bg-white border-4 border-slate-900 rounded-2xl p-4 shadow-[6px_6px_0_0_#0F172A] flex flex-col items-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        Pontos
                        </span>

                        <span
                        className="font-display text-4xl font-black text-slate-900"
                        data-testid="final-score"
                        >
                        {pontos}
                        </span>
                    </div>

                    <div className="bg-white border-4 border-slate-900 rounded-2xl p-4 shadow-[6px_6px_0_0_#0F172A] flex flex-col items-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        Sequência
                        </span>

                        <div className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-flame w-7 h-7 text-orange-500 fill-orange-300"
                            aria-hidden="true"
                        >
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                        </svg>

                        <span
                            className="font-display text-4xl font-black text-slate-900"
                            data-testid="final-streak"
                        >
                            {sequencia}
                        </span>
                        </div>
                    </div>
                </div>

                <div
                className="flex items-center gap-2 bg-white border-4 border-slate-900 rounded-full px-5 py-2 shadow-[4px_4px_0_0_#0F172A]"
                data-testid="high-pontos"
                >
                {/* TROPHY ICON */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-amber-500"
                >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>

                <span className="font-black text-slate-900">
                    Melhor Pontuação: {recorde} pts
                </span>
                </div>
            </div>

            <div className={`flex flex-col gap-3 w-full max-[375px]:scale-95 max-lg:scale-95 ${pontos < recorde && 'mb-auto mt-8'}`}>
                <button
                    onClick={() => compartilharWhatsapp()}
                    type="button"
                    data-testid="share-whatsapp-button"
                    className="py-3 px-2 bg-emerald-500 hover:bg-emerald-400 text-white border-4 border-slate-900 rounded-2xl shadow-[0_6px_0_0_#0F172A] active:shadow-none active:translate-y-1.5 cursor-pointer transition-all font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-share2 lucide-share-2 w-5 h-5"
                        aria-hidden="true"
                    >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                    </svg>
                    WhatsApp
                </button>

                <button
                type="button"
                data-testid="restart-button"
                onClick={() => resetar()}
                className="w-full py-5 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 border-4 border-slate-900 rounded-2xl shadow-[0_8px_0_0_#0F172A] active:shadow-none active:translate-y-2 cursor-pointer transition-all flex items-center justify-center gap-3 font-black text-2xl uppercase tracking-wider"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-rotate-ccw w-6 h-6"
                    aria-hidden="true"
                >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                </svg>

                Jogar Novamente
                </button>
            </div>
        </div>

        :
        jogoComecou ?
            
        <div className="min-h-screen w-full flex flex-col px-5 py-2.5 pb-10 max-w-md mx-auto gap-6 justify-between relative z-2">

            <div className="flex items-center justify-between gap-3 z-1">
                {/* sequencia */}
                <div className="bg-white border-4 border-slate-900 rounded-full px-4 py-1.5 shadow-[4px_4px_0_0_#0F172A] flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="perguntaAtualColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-orange-500 fill-orange-400"
                    aria-hidden="true"
                >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>

                <span className="font-black text-slate-900">{sequencia}</span>
                </div>

                {/* pontos */}
                <div className="bg-amber-300 border-4 border-slate-900 rounded-full px-4 py-1.5 shadow-[4px_4px_0_0_#0F172A] flex items-center gap-2">
                <span className="font-black text-slate-900 text-lg">
                    {pontos} pts
                </span>
                </div>

                {/* HIGH pontos */}
                <div className="bg-white border-4 border-slate-900 rounded-full px-4 py-1.5 shadow-[4px_4px_0_0_#0F172A] flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-amber-500"
                    aria-hidden="true"
                >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>

                <span className="font-black text-slate-900">
                    {recorde}
                </span>
                </div>
            </div>

            {/* CARD */}
            <div className="flex flex-col items-center justify-center relative">

                <div className="w-full max-w-md mx-auto mb-5">
                <div className="relative overflow-hidden rounded-full border-4 border-slate-900 bg-slate-200 shadow-[5px_5px_0_0_#0F172A] h-14">

                    {/* Barra */}
                    <div
                    className={`
                        absolute rounded-full left-0 top-0 h-full transition-all duration-1000
                        ${
                        difEscolhida === 'Difícil' ?
                            timer > 7
                            ? 'bg-linear-to-r from-emerald-400 to-green-500'
                            : timer > 4
                            ? 'bg-linear-to-r animate-pulse from-yellow-300 to-amber-400'
                            : timer > 2
                            ? 'bg-linear-to-r from-orange-400 to-red-400'
                            : 'bg-linear-to-r from-red-500 to-red-700'
                        :
                        difEscolhida === 'Médio' ?
                            timer > 12
                            ? 'bg-linear-to-r from-emerald-400 to-green-500'
                            : timer > 8
                            ? 'bg-linear-to-r animate-pulse from-yellow-300 to-amber-400'
                            : timer > 4
                            ? 'bg-linear-to-r from-orange-400 to-red-400'
                            : 'bg-linear-to-r from-red-500 to-red-700'
                        :
                            timer > 16
                            ? 'bg-linear-to-r from-emerald-400 to-green-500'
                            : timer > 12
                            ? 'bg-linear-to-r animate-pulse from-yellow-300 to-amber-400'
                            : timer > 8
                            ? 'bg-linear-to-r from-orange-400 to-red-400'
                            : 'bg-linear-to-r from-red-500 to-red-700'
                        }
                    `}
                    style={{
                        width: `${(timer / (difEscolhida === 'Difícil' ? 10 : difEscolhida === 'Médio' ? 15 : 20)) * 100}%`,
                    }}
                    />

                    {/* Brilho */}
                    <div className="absolute inset-0 bg-white/10 pointer-events-none" />

                    {/* Texto */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                    <span
                        className={`
                        font-black text-2xl tracking-wide text-white drop-shadow-[2px_2px_0_#000]
                        ${timer <= 4 ? 'animate-bounce translate-y-1' : ''}
                        `}
                    >
                        {timer}s
                    </span>
                    </div>
                </div>
                </div>

                <div className="w-full bg-white border-4 border-slate-900 rounded-3xl p-7 sm:p-8 shadow-[8px_8px_0_0_#0F172A] relative overflow-hidden flex flex-col items-center justify-center text-center min-h-65 animate-pop">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="perguntaAtualColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-100"
                        aria-hidden="true"
                    >
                        <path d="M12 7v14" />
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                    </svg>

                    <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 mb-3">
                        Pergunta {indicePergunta + 1}
                    </span>

                    <p className="relative text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        “{perguntaAtual.pergunta}”
                    </p>
                       
                </div>

                <BookOpen size={120} className="absolute bottom-0 right-0 translate-2 translate-y-3 text-slate-900/3"/>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 z-1">
                <button
                onClick={() => {
                    setRespostaAtual('biblia');
                    perguntaAtual.resposta === 'biblia' && acertou();
                    tocarClique(perguntaAtual.resposta === 'biblia' ? somAcerto.current : somErro.current);
                }}
                type="button"
                className="w-full py-5 px-4 bg-emerald-400 hover:bg-emerald-300 text-white text-shadow-sm border-4 border-slate-900 rounded-2xl shadow-[0_8px_0_0_#0F172A] active:shadow-none active:translate-y-2 transition-all font-black text-xl sm:text-2xl uppercase tracking-wider disabled:opacity-60 cursor-pointer text-center"
                >
                📖 Tá na Bíblia
                </button>

                <button
                onClick={() => {
                    setRespostaAtual('amarrado');
                    perguntaAtual.resposta === 'amarrado' && acertou();
                    tocarClique(perguntaAtual.resposta === 'amarrado' ? somAcerto.current : somErro.current);
                }}
                type="button"
                className="w-full py-5 px-4 text-center bg-rose-500 hover:bg-rose-400 text-white border-4 border-slate-900 rounded-2xl shadow-[0_8px_0_0_#0F172A] active:shadow-none active:translate-y-2 transition-all font-black text-xl sm:text-2xl uppercase tracking-wider disabled:opacity-60 cursor-pointer"
                >
                🪢 Tá Amarrado
                </button>
            </div>
        </div>

        :
        mostrarDificuldade ?
        <div className="min-h-screen w-full flex flex-col px-5 py-2.5 pb-10 max-w-md mx-auto gap-6 relative z-2 items-center">
            
            <span className="flex justify-between gap-4 w-full">
                <div className="w-full h-0 border-t-4 mt-2 border-dashed border-slate-900 rounded-full" />

                <h2 className="tracking-widest text-2xl font-semibold text-slate-900">
                    DIFICULDADE
                </h2>

                <div className="w-full h-0 border-t-4 mt-2 border-dashed border-slate-900 rounded-full" />
            </span>

            <section className="grid grid-cols-3 gap-4 justify-items-center w-full">
                {allDificuldades.map((d, index) =>
                    <article onClick={() => setDifEscolhida(d.dif)} key={index} className={`flex max-lg:flex-col items-center justify-center cursor-pointer gap-0.75 border-3 border-slate-900 shadow-[6px_6px_0_0_#000000] rounded-xl p-2 w-full font-bold tracking-wider transition-all duration-200 hover:-translate-y-1 text-shadow-2xs ${d.dif === 'Fácil' ? 'hover:bg-green-500 hover:text-white' : d.dif === 'Médio' ? 'hover:bg-amber-500 hover:text-white' : 'hover:bg-red-500 hover:text-white'} ${(difEscolhida === 'Fácil' && d.dif === 'Fácil') ? 'bg-green-500 text-white' : (difEscolhida === 'Médio' && d.dif === 'Médio') ? 'bg-amber-500 text-white' : (difEscolhida === 'Difícil' && d.dif === 'Difícil') ? 'bg-red-500 text-white' : 'bg-white text-slate-900'}`}>
                        <img src={d.img} className={`object-cover w-12 h-12`} alt="" />
                        {d.dif}
                    </article>
                )}
            </section>

            <div className="lg:mt-2.5 max-w-54 items-center gap-2 bg-white border-4 border-slate-900 rounded-full px-4 p-1.5 shadow-[4px_4px_0_0_#000000] flex sm:min-h-12 lg:min-h-0">
                {/* BOOK ICON */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-rose-500"
                >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>

                <span className="text-[8px] text-center sm:text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                Tema
                </span>
            </div>

            <section className="grid grid-cols-3 grid-rows-1 w-full gap-4 justify-items-center relative max-lg:scale-85">
                {topicosAtivos.map((d, index) =>
                    <article onClick={() => {
                        if (index === 0) {
                            const novaPagina = (pageTopicos - 1 + total) % total;

                            setPageTopicos(novaPagina);
                            setTopicosAtivos(pegarTopicos(novaPagina));
                        } else if (index === 2) {
                            const novaPagina = (pageTopicos + 1) % total;

                            setPageTopicos(novaPagina);
                            setTopicosAtivos(pegarTopicos(novaPagina));
                        }
                        }} 
                        key={index} className={`flex items-center border-3 border-slate-900 shadow-[6px_6px_0_0_#000000] rounded-xl p-2 flex-col w-full font-semibold tracking-wider transition-all duration-200 text-shadow-2xs text-slate-900 ${index === 1 ? 'scale-115 bg-yellow-100' : 'scale-85 opacity-80 bg-white'}`}>
                        <img src={d.img} className={`object-cover w-25 h-25`} alt="" />
                        {d.dif}
                    </article>
                )}

                <ChevronLeft onClick={() => {
                    const novaPagina = (pageTopicos - 1 + total) % total;

                    setPageTopicos(novaPagina);
                    setTopicosAtivos(pegarTopicos(novaPagina));
                }} className="absolute max-lg:hidden -left-4 top-1/2 -translate-y-1/2 -translate-x-full cursor-pointer bg-white rounded-full p-0.5 pr-1 border-3 border-slate-900" size={40}/>

                <ChevronRight onClick={() => {
                    const novaPagina = (pageTopicos + 1) % total;

                    setPageTopicos(novaPagina);
                    setTopicosAtivos(pegarTopicos(novaPagina));
                }} className="absolute max-lg:hidden -right-4 top-1/2 -translate-y-1/2 translate-x-full cursor-pointer bg-white rounded-full p-0.5 pl-1 border-3 border-slate-900" size={40}/>
            </section>


            <button
            disabled={difEscolhida === ''}
            onClick={() => {
                setTopicoEscolhido(topicosAtivos[1].dif);
                setTimer(
                    difEscolhida === 'Difícil' ?
                        10
                    :
                    difEscolhida === 'Médio' ?
                        15
                    :
                        20
                );
                tocarBotao();
                setLoading(true);
                setTimeout(() => {
                    setJogoComecou(true);
                    setLoading(false);
                }, 500);
            }}
            type="button"
            data-testid="start-game-button"
            className="w-full mt-auto mb-10 py-5 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 border-4 border-slate-900 rounded-2xl shadow-[0_8px_0_0_#0F172A] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3 font-black text-2xl uppercase tracking-wider disabled:opacity-70 disabled:hover:bg-amber-400 disabled:active:shadow-[0_8px_0_0_#0F172A] disabled:active:translate-y-0 disabled:cursor-wait cursor-pointer"
            >
            {loading ?
                <>
                <ClipLoader color="000"/>
                Carregando...
                </>
            :
                <>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="perguntaAtualColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 fill-slate-900"
                >
                    <polygon points="6 3 20 12 6 21 6 3" />
                </svg>

                Começar
            </>
            }
            </button>
        </div>

        :
        <div
        className="flex-1 w-full flex flex-col items-center justify-between px-5 pb-8 lg:py-8 max-w-100 mx-auto z-2"
        data-testid="start-screen"
        >
            {/* TÍTULO */}
            <div className="flex flex-col items-center justify-center gap-12 flex-1 text-center">
                <div className="bg-amber-300 border-4 border-slate-900 rounded-3xl px-6 py-8 shadow-[10px_10px_0_0_#0F172A] animate-wiggle min-w-full">
                    <h1 className="font-display text-5xl sm:text-5xl font-black tracking-tight text-slate-900">
                        Tá na Bíblia
                        <br />
                        <span className="text-rose-600">ou Tá</span>
                        <br />
                        <span className="text-emerald-700">Amarrado?</span>
                    </h1>
                </div>

                {/* BOTÃO */}
                <div className="flex flex-col items-center gap-4 w-full">
                    
                    {/* pontos */}
                    <div
                    className="flex items-center gap-2 bg-white border-4 border-slate-900 rounded-full px-5 py-2 shadow-[4px_4px_0_0_#0F172A]"
                    data-testid="high-pontos"
                    >
                    {/* TROPHY ICON */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-amber-500"
                    >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>

                    <span className="font-black text-slate-900">
                        Melhor: {recorde} pts
                    </span>
                    </div>

                    {/* BOTÃO START */}
                    <button
                    onClick={() => {
                        tocarBotao();
                        setLoading(true);
                        setTimeout(() => {
                            setMostrarDificuldade(true);
                            setLoading(false);
                        }, 500);
                        
                    }}
                    type="button"
                    data-testid="start-game-button"
                    className="w-full py-5 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 border-4 border-slate-900 rounded-2xl shadow-[0_8px_0_0_#0F172A] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3 font-black text-2xl uppercase tracking-wider disabled:opacity-70 disabled:cursor-wait cursor-pointer"
                    >
                    {loading ?
                        <>
                        <ClipLoader color="000"/>
                        Carregando...
                        </>
                    :
                        <>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="perguntaAtualColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 fill-slate-900"
                        >
                            <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>

                        Começar
                    </>
                    }
                    </button>
                </div>
            </div>

            <div className="flex max-lg:mb-2 flex-col min-w-full gap-2">
                <p className="text-xs text-center font-black uppercase tracking-[0.2em] text-white text-shadow-sm bg-emerald-400 p-3 rounded-xl border-3 border-slate-900 shadow-[6px_6px_0_0_#0F172A] mt-2 min-w-full">
                + 10 pts por acerto
                </p>

                <p className="text-xs text-center font-black uppercase tracking-[0.2em] text-white text-shadow-sm bg-rose-500 p-3 rounded-xl border-3 border-slate-900 shadow-[6px_6px_0_0_#0F172A] mt-2 min-w-full">
                Errou, acabou!
                </p>
            </div>

        </div>
        }
    </div>
</>

);

}