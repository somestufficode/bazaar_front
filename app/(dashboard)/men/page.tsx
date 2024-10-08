'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ProductType, CollectionType } from '@/lib/types';
import ProductCard from '@/components/shared/ProductCard';

const Page = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Get the current path

  const collectionSlug = pathname.split('/').pop(); // Extract the last part of the URL as the collection slug (e.g., 'women', 'men')

  console.log("Collection Slug:", collectionSlug);

  const getProductsByCollection = async () => {
    try {
      const res = await fetch(`/api/collections/${collectionSlug}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: CollectionType = await res.json();
      console.log("Fetched Collection:", data);

      if (data && data.products) {
        setProducts(data.products); // Set the products directly from the API response
        setCollectionTitle(data.title);
      } else {
        setProducts([]);
      }

      setLoading(false);
    } catch (err: any) { // Type 'any' for error to access 'message'
      console.error(`[${collectionSlug}_products_GET]`, err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionSlug === "men") { // Ensure we only load products for "men" collection
      setLoading(true);
      getProductsByCollection();
    }
  }, [collectionSlug]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {collectionTitle && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{collectionTitle} Collection</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))
        ) : (
          <p className="text-center text-xl mt-8">No products found in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
