'use client';

import { useParams, useRouter } from 'next/navigation'; // Use `useParams` and `useRouter`
import { useEffect, useState } from 'react';
import CategoryCard from '@/components/shared/CategoryCard';
import Navbar from '@/components/shared/Navbar';

interface CategoryType {
  _id: string;
  title: string;
  description: string;
  image: string | null;
}

interface CollectionType {
  title: string;
  description: string;
  categories: CategoryType[];  // Array of full Category objects after populate
}

export default function CollectionPage() {
  const params = useParams();  // Get the route parameters
  const collectionSlug = params.collectionSlug;  // Access `collectionSlug` from params
  const router = useRouter();  // Get the router for navigation

  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionSlug) {
      // Fetch the collection data by its slug
      fetch(`/api/collections/${collectionSlug}`)
        .then(response => response.json())
        .then(data => {
          setCollection(data);  // Set the collection including populated categories
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching collection:', error);
          setLoading(false);  // Handle error and stop loading
        });
    }
  }, [collectionSlug]);

  const handleCategoryClick = (categorySlug: string) => {
    // Navigate to /collections/[collectionSlug]/[categorySlug]
    router.push(`/collections/${collectionSlug}/${categorySlug}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <Navbar/>
      {/* <h1>{collection.title}</h1>
      <p>{collection.description}</p> */}
      <div className="grid grid-cols-1 md:grid-cols-3 m-10">
        {collection.categories.map((category) => (
          <div key={category._id} onClick={() => handleCategoryClick(category.title.toLowerCase().replace(/\s+/g, '-'))}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
