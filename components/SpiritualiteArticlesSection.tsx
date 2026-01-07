import ContentWrapper from '@/components/spiritualite/ContentWrapper';
import FeaturedArticle from '@/components/spiritualite/FeaturedArticle';
import ArticlesGrid from '@/components/spiritualite/ArticlesGrid';
import { formatDate } from '@/lib/functions';

export default function SpiritualiteArticlesSection({
  featuredArticle,
  regularArticles,
  setSearchQuery,
  setSelectedCategory,
}: {
  featuredArticle: any;
  regularArticles: any[];
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
}) {
  return (
    <div className="space-y-8 sm:space-y-12">
      {featuredArticle && (
        <ContentWrapper>
          <section aria-label="Article en vedette">
            <FeaturedArticle
              article={{
                ...featuredArticle,
                formattedDate: formatDate(featuredArticle.createdAt),
              }}
              formatDate={formatDate}
            />
          </section>
        </ContentWrapper>
      )}
      {regularArticles.length > 0 && (
        <ContentWrapper>
          <section aria-label="Tous les articles">
            <h2 className="sr-only">Articles récents</h2>
            <ArticlesGrid
              articles={regularArticles.map((article) => ({
                ...article,
                formattedDate: formatDate(article.createdAt),
              }))}
              formatDate={formatDate}
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
            />
          </section>
        </ContentWrapper>
      )}
    </div>
  );
}
