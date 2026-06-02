export interface MenuItem {
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  wait: number;
  distance: string;
  color: string;
  tags: string[];
  imageUrl: string;
  coverUrl: string;
  menu: MenuSection[];
}

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
  imageUrl?: string;
}

export interface CartState {
  restaurantId: string | null;
  items: CartItem[];
}

export type OrderStatus = 'CONFIRMADO' | 'EM_PREPARO' | 'CINCO_MINUTOS' | 'PRONTO' | 'RETIRADO' | 'CANCELADO';

export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantColor: string;
  status: OrderStatus;
  date: string;
  time: string;
  total: number;
  items: OrderItem[];
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}