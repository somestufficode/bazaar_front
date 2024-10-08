import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ProductType } from '@/lib/types';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative group border p-4 rounded-lg shadow-lg">
      {product.media && product.media.length > 0 ? (
        <Image
          src={product.media[0]}
          alt={product.title}
          width={400}
          height={600}
          className="w-full h-auto object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-t-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
        <Link href={`/products/${product._id}`} passHref>
          <Button variant="secondary" size="lg" className="font-semibold">
            View Details
          </Button>
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-bold line-clamp-1">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          {/* <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p> */}
          <Button variant="outline" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}