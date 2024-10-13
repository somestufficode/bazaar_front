import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ProductType } from '@/lib/types';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative group border p-4 rounded-lg shadow-lg max-w-sm h-[500px] flex flex-col justify-between">
      {/* Display the first image from media */}
      {product.media && product.media.length > 0 ? (
        <Image
          src={product.media[0]}  // Use the first media image as a thumbnail
          alt={product.name}
          width={400}
          height={300}  // Set fixed height for images
          className="w-full object-cover rounded-t-lg h-[250px]"  // Ensure consistent height
        />
      ) : (
        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center rounded-t-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="mt-4 space-y-2 flex-grow">
        <h2 className="text-lg font-bold line-clamp-1">{product.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="text-sm text-gray-500">
          In Stock: <span className="font-medium">{product.unitsInStock}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="sm">
          Add to Cart
        </Button>
        <Link href={`/products/${product._id}`} passHref>
          <Button variant="secondary" size="lg" className="font-semibold">
            View Details
          </Button>
        </Link>
      </div>

      <div className="text-xs text-gray-400 mt-2">
        <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
