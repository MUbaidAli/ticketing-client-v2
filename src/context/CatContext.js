import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CatContext = createContext();
export function CatProvider({ children }) {
  const [cat, setCat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCat() {
      try {
        setIsLoading(true);
        const { data } = await axios.get("all/categories");
        setCat(data.categories);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCat();
  }, []);

  return (
    <CatContext.Provider value={[cat, setCat, isLoading]}>
      {children}
    </CatContext.Provider>
  );
}

function useCatContext() {
  const context = useContext(CatContext);
  if (context === undefined) throw new Error("context is used before provider");
  return context;
}

export { CatContext, useCatContext };
