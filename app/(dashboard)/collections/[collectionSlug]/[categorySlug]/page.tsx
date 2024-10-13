'use client';

import { useParams } from 'next/navigation'; // Get route params
import { useEffect, useState } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import Navbar from '@/components/shared/Navbar';

export interface ProductType {
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
  }
  

interface CategoryType {
  _id: string;
  title: string;
  description: string;
  products: ProductType[];  // Array of product objects
}

export default function CategoryPage() {
  const params = useParams();  // Get the route parameters
  const { collectionSlug, categorySlug } = params;  // Access both collectionSlug and categorySlug

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      // Fetch the category data along with products based on the slug
      fetch(`/api/collections/${collectionSlug}/categories/${categorySlug}`)
        .then(response => response.json())
        .then(data => {
          setCategory(data);  // Set the category data, including products
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
          setLoading(false);  // Handle error and stop loading
        });
    }
  }, [categorySlug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <Navbar/>
      {/* <h1>{category.title}</h1>
      <p>{category.description}</p> */}
      <div className="grid grid-cols-1 md:grid-cols-3 m-10">
        {category.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
