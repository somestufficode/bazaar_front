'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

interface ProductType {
  _id: string;
  name: string;
  description: string;
  media: string[];
  categories: string[];
  collection: string;
  price: number;
  sizes: { size: string; stock: number }[];
  colors: { colorName: string; colorCode?: string; stock: number }[];
  unitsInStock: number;
  dimensions: { length?: number; width?: number; height?: number; weight?: number };
  createdAt: string;
  updatedAt: string;
}

interface CategoryType {
  _id: string;
  title: string;
  image: string;
  products: ProductType[];
}

interface CollectionType {
  title: string;
  categories: CategoryType[];
}

export default function CollectionPage() {
  const params = useParams();
  const collectionSlug = params.collectionSlug as string;

  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionSlug) {
      fetch(`/api/collections/${collectionSlug}`)
        .then(response => response.json())
        .then((data: CollectionType) => {
          setCollection(data);
          return Promise.all(data.categories.map((category: CategoryType) => 
            fetch(`/api/collections/${collectionSlug}/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`)
              .then(response => response.json())
          ));
        })
        .then((categoriesData: CategoryType[]) => {
          const products = categoriesData.flatMap(category => category.products);
          setAllProducts(products);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [collectionSlug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!collection) {
    return <div className="flex justify-center items-center h-screen">Collection not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collection.categories.map((category: CategoryType) => (
            <div key={category._id} className="relative">
              <Image
                src={category.image}
                alt={category.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <Link href={`/collections/${collectionSlug}/${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="text-sm hover:underline">Shop Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center my-8">
          <h3 className="text-xl font-semibold">All {collection.title} Products</h3>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
          {allProducts.map((product: ProductType) => {
            const categoryTitle = collection.categories.find(cat => cat.products.some(p => p._id === product._id))?.title || '';
            return (
              <Link key={product._id} href={`/collections/${collectionSlug}/${categoryTitle.toLowerCase().replace(/\s+/g, '-')}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.media[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <h4 className="text-sm font-semibold truncate">{product.name}</h4>
                    <p className="text-xs">${product.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div> */}
      </main>

      <Footer />
    </div>
  );
}