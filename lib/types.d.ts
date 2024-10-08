export type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[]; // Array of products in the collection
    createdAt: Date;
    updatedAt: Date;
  };
  
export type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: string[]; // Array of image URLs
    category: string;
    collections: CollectionType[]; // Array of collections the product belongs to
    price: number; // Price of the product
    createdAt: Date;
    updatedAt: Date;
  };
  
 export type OrderColumnType = {
    _id: string;
    customer: string;
    products: number; // Number of products in the order
    totalAmount: number; // Total amount of the order
    createdAt: string; // Date of order creation
  };
  
  export type OrderItemType = {
    product: ProductType; // The product in the order
    color: string; // Color chosen by the customer
    size: string; // Size chosen by the customer
    quantity: number; // Quantity ordered
  };
  
  type CustomerType = {
    clerkId: string; // Clerk's unique identifier for the customer
    name: string;
    email: string;
  };
  