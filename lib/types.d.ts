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
    name: string;
    description: string;
    media: string[];  // Array of image URLs
    categories: string[];  // Array of category ObjectIds (can be populated if needed)
    collection: string;  // Collection ObjectId or populated collection name
    price: number;
    sizes: { size: string; stock: number }[];  // Array of size and stock objects
    colors: { colorName: string; colorCode?: string; stock: number }[];  // Array of color variants
    unitsInStock: number;  // Total units in stock across all variants
    dimensions: { length?: number; width?: number; height?: number; weight?: number };
    createdAt: string;
    updatedAt: string;
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
  