import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// Define the type for a category
interface CategoryType {
  _id: string;
  title: string;
  description: string;
  image: string | null;  // Assuming a category may or may not have an image
}

interface CategoryCardProps {
  category: CategoryType;
}

const createSlug = (title: string): string => {
  return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categorySlug = createSlug(category.title);  // Convert title to slug

  return (
    <div className="relative group border p-4 rounded-lg shadow-lg max-w-sm h-[400px] flex flex-col justify-between">
      {category.image ? (
        <Image
          src={category.image}
          alt={category.title}
          width={400}
          height={300}
          className="w-full object-cover rounded-t-lg h-[250px]"  // Ensure consistent image height
        />
      ) : (
        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center rounded-t-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
        <Link href={`/collections/${categorySlug}`} passHref>
          <Button variant="secondary" size="lg" className="font-semibold">
            View Category
          </Button>
        </Link>
      </div>
      <div className="mt-4 space-y-2 flex-grow">
        <h2 className="text-lg font-bold line-clamp-1">{category.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
      </div>
    </div>
  );
}
