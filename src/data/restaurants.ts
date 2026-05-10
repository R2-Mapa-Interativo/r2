export const restaurants = [
  {
    id: "boteco",
    name: "Boteco da Praia",
    category: "Petiscos e drinks",
    wait: 10,
    distance: "80 m",
    color: "from-[#f4f36f] to-[#9f9b32]",
    menu: [
      { name: "Pastel de camar\u00E3o", description: "Massa crocante e recheio cremoso.", price: "R$ 24" },
      { name: "Batata da casa", description: "Por\u00E7\u00E3o com molho especial.", price: "R$ 18" },
      { name: "Caipirinha", description: "Lim\u00E3o, gelo e cacha\u00E7a.", price: "R$ 22" },
    ],
  },
  {
    id: "pizzaria",
    name: "Pizzaria do Mar",
    category: "Pizzas individuais",
    wait: 15,
    distance: "120 m",
    color: "from-[#db98c5] to-[#8f5c87]",
    menu: [
      { name: "Margherita", description: "Tomate, queijo e manjeric\u00E3o.", price: "R$ 32" },
      { name: "Calabresa", description: "Calabresa fatiada e cebola roxa.", price: "R$ 34" },
      { name: "Refrigerante", description: "Lata gelada.", price: "R$ 10" },
    ],
  },
  {
    id: "acai",
    name: "A\u00E7a\u00ED da Areia",
    category: "A\u00E7a\u00ED e sobremesas",
    wait: 5,
    distance: "45 m",
    color: "from-[#823612] to-[#4d1f0c]",
    menu: [
      { name: "A\u00E7a\u00ED 300 ml", description: "Com banana e granola.", price: "R$ 19" },
      { name: "A\u00E7a\u00ED 500 ml", description: "Com leite em p\u00F3 e morango.", price: "R$ 27" },
      { name: "Cupua\u00E7u", description: "Creme gelado com castanha.", price: "R$ 21" },
    ],
  },
  {
    id: "burger",
    name: "Burger Litoral",
    category: "Hamb\u00FArgueres",
    wait: 20,
    distance: "160 m",
    color: "from-[#f0eadf] to-[#b8afa0]",
    menu: [
      { name: "Cheeseburger", description: "P\u00E3o, queijo e blend da casa.", price: "R$ 31" },
      { name: "Smash duplo", description: "Dois burgers prensados e cheddar.", price: "R$ 39" },
      { name: "Ch\u00E1 gelado", description: "Lim\u00E3o ou p\u00EAssego.", price: "R$ 12" },
    ],
  },
] as const;

export type Restaurant = (typeof restaurants)[number];
