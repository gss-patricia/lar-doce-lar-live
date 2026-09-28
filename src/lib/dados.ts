// "Banco de dados" em memória da imobiliária Lar Doce Lar.
// Tudo aqui é fictício — feito para a demo da live.

export type Imovel = {
  id: string;
  tipo: "Casa" | "Apartamento" | "Chalé" | "Studio";
  titulo: string;
  bairro: string;
  cidade: string;
  preco: number;
  condominio: number;
  iptu: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  imagem: string;
  selo?: string;
  descricao: string;
  comodidades: string[];
  // ⚠️ Campos internos: nunca deveriam chegar ao navegador
  precoMinimoAceito: number;
  anunciante: { nome: string; cpf: string; telefonePessoal: string };
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  passwordHash: string;
  role: "cliente" | "corretor" | "admin";
  tokenSessao: string;
  notasInternas: string;
};

export const imoveis: Imovel[] = [
  {
    id: "1",
    tipo: "Casa",
    titulo: "Casa com varanda e jardim",
    bairro: "Vila Madalena",
    cidade: "São Paulo, SP",
    preco: 1_250_000,
    condominio: 0,
    iptu: 420,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    area: 180,
    imagem: "/imoveis/vila-madalena.jpg",
    selo: "Destaque",
    descricao:
      "Casa clássica com varanda envolvente, jardim amplo e muita luz natural. Rua tranquila e arborizada, a 5 minutos do metrô e dos melhores cafés do bairro.",
    comodidades: ["Jardim", "Varanda", "Churrasqueira", "Aceita pets", "Perto do metrô"],
    precoMinimoAceito: 1_050_000,
    anunciante: { nome: "Carlos Mendes", cpf: "123.456.789-00", telefonePessoal: "(11) 98765-4321" },
  },
  {
    id: "2",
    tipo: "Apartamento",
    titulo: "Apartamento iluminado perto da praia",
    bairro: "Copacabana",
    cidade: "Rio de Janeiro, RJ",
    preco: 980_000,
    condominio: 1_100,
    iptu: 310,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    area: 85,
    imagem: "/imoveis/copacabana.jpg",
    descricao:
      "Sala integrada, janelas amplas e decoração acolhedora. A duas quadras da praia, com portaria 24h e academia no prédio.",
    comodidades: ["Portaria 24h", "Academia", "Mobiliado", "Varanda"],
    precoMinimoAceito: 870_000,
    anunciante: { nome: "Juliana Rocha", cpf: "987.654.321-00", telefonePessoal: "(21) 99876-5432" },
  },
  {
    id: "3",
    tipo: "Chalé",
    titulo: "Chalé com lareira na serra",
    bairro: "Planalto",
    cidade: "Gramado, RS",
    preco: 720_000,
    condominio: 350,
    iptu: 180,
    quartos: 2,
    banheiros: 2,
    vagas: 2,
    area: 110,
    imagem: "/imoveis/gramado.jpg",
    selo: "Novo",
    descricao:
      "Chalé em madeira com pé-direito alto, lareira e deck com vista para o vale. Condomínio fechado com trilhas e muito verde.",
    comodidades: ["Lareira", "Deck", "Condomínio fechado", "Vista para o vale"],
    precoMinimoAceito: 610_000,
    anunciante: { nome: "Roberto Klein", cpf: "456.789.123-00", telefonePessoal: "(54) 99123-4567" },
  },
  {
    id: "4",
    tipo: "Casa",
    titulo: "Casa moderna com piscina",
    bairro: "Jurerê Internacional",
    cidade: "Florianópolis, SC",
    preco: 3_400_000,
    condominio: 900,
    iptu: 1_200,
    quartos: 4,
    banheiros: 5,
    vagas: 3,
    area: 320,
    imagem: "/imoveis/jurere.jpg",
    selo: "Exclusivo",
    descricao:
      "Arquitetura contemporânea, piscina com borda infinita e integração total entre sala e área externa. A 300 m da praia.",
    comodidades: ["Piscina", "Área gourmet", "Energia solar", "Casa inteligente", "Perto da praia"],
    precoMinimoAceito: 2_950_000,
    anunciante: { nome: "Marina Duarte", cpf: "741.852.963-00", telefonePessoal: "(48) 99654-3210" },
  },
  {
    id: "5",
    tipo: "Studio",
    titulo: "Studio compacto e funcional",
    bairro: "Pinheiros",
    cidade: "São Paulo, SP",
    preco: 540_000,
    condominio: 650,
    iptu: 140,
    quartos: 1,
    banheiros: 1,
    vagas: 0,
    area: 38,
    imagem: "/imoveis/pinheiros.jpg",
    descricao:
      "Studio com cozinha americana, janelão e acabamento novo. Prédio com lavanderia, coworking e bicicletário.",
    comodidades: ["Coworking", "Lavanderia", "Bicicletário", "Perto do metrô"],
    precoMinimoAceito: 480_000,
    anunciante: { nome: "Pedro Almeida", cpf: "852.963.741-00", telefonePessoal: "(11) 97777-1234" },
  },
  {
    id: "6",
    tipo: "Casa",
    titulo: "Casa contemporânea no verde",
    bairro: "Vale dos Cristais",
    cidade: "Nova Lima, MG",
    preco: 2_150_000,
    condominio: 1_400,
    iptu: 800,
    quartos: 4,
    banheiros: 4,
    vagas: 4,
    area: 290,
    imagem: "/imoveis/nova-lima.jpg",
    descricao:
      "Projeto com fachada de vidro, jardim com árvore centenária e ambientes que se abrem para o verde. Condomínio com segurança 24h.",
    comodidades: ["Jardim", "Segurança 24h", "Home office", "Lareira"],
    precoMinimoAceito: 1_890_000,
    anunciante: { nome: "Fernanda Lima", cpf: "369.258.147-00", telefonePessoal: "(31) 98888-5678" },
  },
];

export const usuarioLogado: Usuario = {
  id: "u1",
  nome: "Ana Souza",
  email: "ana.souza@email.com",
  cpf: "321.654.987-00",
  telefone: "(11) 91234-5678",
  passwordHash: "$2b$10$Xq8Z3k1vR7mYpL2nW9eT0uJbQ4cF6hA5sD8gK1lM3oN7pR2tU4vW6",
  role: "cliente",
  tokenSessao: "sess_7f2a9c4e1b8d3f6a0e5c",
  notasInternas: "Cliente com pressa de comprar. Aceita pagar até 10% acima do anunciado.",
};

export function buscarImovel(id: string) {
  return imoveis.find((i) => i.id === id);
}

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
