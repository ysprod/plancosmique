import CategoryCard from "@/components/profil/CategoryCard";

export interface CategoryType {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string;
  badge: string;
  badgeColor: string;
  description: string;
  link: string;
  stats: string;
}

interface Props {
  categories: CategoryType[];
}

const ProfilCategories = ({ categories }: Props) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
    {categories.map((category, index) => (
      <CategoryCard key={category.id} category={category} index={index} />
    ))}
  </div>
);

export default ProfilCategories;