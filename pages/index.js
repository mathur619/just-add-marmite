import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items } = await client.getEntries({ content_type: "recipe" });

  return {
    props: { recipes: items },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  console.log("🚀 ~ file: index.js ~ line 21 ~ Recipes ~ recipes", recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.sys.id} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
