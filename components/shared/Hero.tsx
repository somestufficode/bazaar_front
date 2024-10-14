'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CollectionType {
  _id: string;
  title: string;
  image: string;
}

export default function Hero() {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch collections data
    fetch('/api/collections')
      .then((response) => response.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching collections:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0">
      {collections.map((collection) => (
        <div key={collection._id} className="relative">
          <Image
            src={collection.image}
            alt={collection.title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl font-bold mb-2">{collection.title}</h2>
            <Link href={`/collections/${collection.title}`}>
              <span className="text-sm hover:underline">Explore Now</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
