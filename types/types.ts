export interface Product {
  id: string;
  name: string;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: number;
  sku: number;
  categoryId: string;
  category: Category
  createdAt: Date;
  updatedAt: Date;
  images : Image[]
  CartItem?: CartItem
  orderItems?: OrderItem[]
}

export interface Image {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  qty: number;
  cart: Cart
  product: Product
}

export interface Cart {
  id: string;
  userId: string;
  CartItem: CartItem[]
  user: User
}

export interface Order {
  id:         string;
  isPaid:     boolean;
  phone:      string;    
  address:    string;   
  createdAt:  Date;   
  updatedAt:  Date;      
  userId:     string | null;
  user: User;
  total:      number;
  orderItems: OrderItem[]
}

export interface User {
  id: string;
  clerkId: string;
  fullName: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[]
  cart: Cart
}

export interface OrderItem {
  id:        string
  qty:       number
  orderId:   string
  order: Order
  productId: string
  product: Product
}

export interface Category {
  id: string
  category: string
  createdAt: Date
  updatedAt: Date
  description: string
  products: Product[]
}