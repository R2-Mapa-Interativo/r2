import { Order } from "@/domain/models/types";

export const mockOrders: Order[] = [
  {
    id: "NP-9823",
    restaurantName: "Pizzaria do Mar",
    restaurantColor: "from-[#db98c5] to-[#8f5c87]",
    status: "PRONTO",
    date: "17 de Mai, 2026",
    time: "20:45",
    total: 74.00,
    items: [
      { name: "Margherita", quantity: 2, price: "R$ 32" },
      { name: "Refrigerante", quantity: 1, price: "R$ 10" }
    ]
  },
  {
    id: "NP-9822",
    restaurantName: "Burger Litoral",
    restaurantColor: "from-[#f0eadf] to-[#b8afa0]",
    status: "CINCO_MINUTOS",
    date: "17 de Mai, 2026",
    time: "20:30",
    total: 82.00,
    items: [
      { name: "Cheeseburger Clássico", quantity: 2, price: "R$ 31" },
      { name: "Chá gelado", quantity: 2, price: "R$ 12" }
    ]
  },
  {
    id: "NP-9810",
    restaurantName: "Boteco da Praia",
    restaurantColor: "from-[#f4f36f] to-[#9f9b32]",
    status: "RETIRADO",
    date: "16 de Mai, 2026",
    time: "19:15",
    total: 46.00,
    items: [
      { name: "Pastel de camarão", quantity: 1, price: "R$ 24" },
      { name: "Caipirinha Clássica", quantity: 1, price: "R$ 22" }
    ]
  },
  {
    id: "NP-9799",
    restaurantName: "Açaí da Areia",
    restaurantColor: "from-[#823612] to-[#4d1f0c]",
    status: "CANCELADO",
    date: "15 de Mai, 2026",
    time: "14:20",
    total: 27.00,
    items: [
      { name: "Açaí 500 ml", quantity: 1, price: "R$ 27" }
    ]
  }
];