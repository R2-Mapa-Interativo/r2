import { Restaurant } from "@/domain/models/types";

export const restaurants: Restaurant[] = [
  {
    id: "boteco",
    name: "Boteco da Praia",
    category: "Petiscos e drinks",
    wait: 10,
    distance: "80 m",
    color: "from-[#f4f36f] to-[#9f9b32]",
    tags: ["Bares", "Lanches Rápidos", "Sem Álcool"],
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=500&auto=format&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop",
    menu: [
      {
        section: "Petiscos",
        items: [
          { 
            name: "Pastel de camarão", 
            description: "Massa artesanal super crocante, frita na hora, com recheio cremoso de camarões selecionados e toque de catupiry.", 
            price: "R$ 24",
            imageUrl: "https://images.unsplash.com/photo-1541525284411-eb658510825f?q=80&w=500&auto=format&fit=crop"
          },
          { 
            name: "Batata da casa", 
            description: "Porção generosa de batatas rústicas com tempero especial da casa e molho de ervas finas.", 
            price: "R$ 18",
            imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
      {
        section: "Drinks",
        items: [
          { 
            name: "Caipirinha Clássica", 
            description: "Autêntica caipirinha brasileira com limão tahiti amassado na hora, cachaça artesanal envelhecida e gelo triturado.", 
            price: "R$ 22",
            imageUrl: "https://images.unsplash.com/photo-1536934331404-f698ed6c0757?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
    ],
  },
  {
    id: "pizzaria",
    name: "Pizzaria do Mar",
    category: "Pizzas individuais",
    wait: 15,
    distance: "120 m",
    color: "from-[#db98c5] to-[#8f5c87]",
    tags: ["Restaurantes", "Lanches Rápidos", "Vegano/Vegetariano", "Sem Álcool"],
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop",
    menu: [
      {
        section: "Pizzas",
        items: [
          { 
            name: "Margherita", 
            description: "Massa de fermentação natural, molho de tomate pelati, mozzarella de búfala fresca e folhas de manjericão.", 
            price: "R$ 32",
            imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop"
          },
          { 
            name: "Calabresa Artesanal", 
            description: "Fatias finas de calabresa defumada, cebola roxa marinada e azeitonas pretas sobre base de mozzarella.", 
            price: "R$ 34",
            imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
      {
        section: "Bebidas",
        items: [
          { 
            name: "Refrigerante", 
            description: "Lata 350ml servida estupidamente gelada.", 
            price: "R$ 10",
            imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
    ],
  },
  {
    id: "acai",
    name: "Açaí da Areia",
    category: "Açaí e sobremesas",
    wait: 5,
    distance: "45 m",
    color: "from-[#823612] to-[#4d1f0c]",
    tags: ["Sobremesas", "Vegano/Vegetariano", "Sem Álcool"],
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=500&auto=format&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920&auto=format&fit=crop",
    menu: [
      {
        section: "Açaí",
        items: [
          { 
            name: "Açaí 300 ml", 
            description: "Creme de açaí puro batido na hora, acompanhado de rodelas de banana prata fresca e granola artesanal.", 
            price: "R$ 19",
            imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=500&auto=format&fit=crop"
          },
          { 
            name: "Açaí 500 ml", 
            description: "Nossa versão turbo com leite em pó premium, fatias de morango fresco e um toque de mel silvestre.", 
            price: "R$ 27",
            imageUrl: "https://images.unsplash.com/photo-1626075191838-8e6840d16ed3?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
      {
        section: "Sobremesas",
        items: [
          { 
            name: "Taça de Cupuaçu", 
            description: "Creme gelado e aveludado de cupuaçu da amazônia, finalizado com castanhas de caju trituradas.", 
            price: "R$ 21",
            imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
    ],
  },
  {
    id: "burger",
    name: "Burger Litoral",
    category: "Hambúrgueres",
    wait: 20,
    distance: "160 m",
    color: "from-[#f0eadf] to-[#b8afa0]",
    tags: ["Restaurantes", "Lanches Rápidos", "Sem Álcool"],
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1920&auto=format&fit=crop",
    menu: [
      {
        section: "Hambúrgueres",
        items: [
          { 
            name: "Cheeseburger Clássico", 
            description: "Blend bovino de 160g grelhado na chapa, duplo queijo prato derretido, maionese defumada no pão brioche tostado.", 
            price: "R$ 31",
            imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop"
          },
          { 
            name: "Smash Duplo", 
            description: "Dois discos de carne de 90g ultra prensados, crosta perfeita, cheddar inglês derretido e picles da casa.", 
            price: "R$ 39",
            imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
      {
        section: "Bebidas",
        items: [
          { 
            name: "Chá gelado", 
            description: "Refrescante chá preto batido com limão siciliano ou calda de pêssego, servido com muito gelo.", 
            price: "R$ 12",
            imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop"
          },
        ],
      },
    ],
  },
];