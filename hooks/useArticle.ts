import { supabase } from "@/config/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AddArticleProps {
  value: string;
  user_id: string;
  topic?: string;
  id: string;
}

export default function useArticle(id?: string) {
  const router = useRouter();

  const { data: articleData, isLoading: articleDataLoading } = useQuery({
    queryKey: ["get-articles"],
    queryFn: async () => {
      const { error, data } = await supabase
        .from("article")
        .select(`*, users ( * )`);
      if (error) throw error;
      return data;
    },
  });

  const { data: articleById, isLoading: articleByIdLoading } = useQuery({
    queryKey: ["get-articles-by-id"],
    queryFn: async () => {
      const { error, data } = await supabase
        .from("article")
        .select(`*`)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    retry: 1,
  });

  const {
    mutate: addArticle,
    isPending: addArticleLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ value, user_id, topic, id }: AddArticleProps) => {
      // get user pre-exisiting article
      const { data: existingArticle } = await supabase
        .from("article")
        .select(`*`)
        .eq("id", id)
        .single();

      if (existingArticle) {
        const { error } = await supabase
          .from("article")
          .update({ content: value, topic })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error, data } = await supabase
          .from("article")
          .insert({ user_id, content: value, topic });
        if (error) throw error;
        router.push("/");
      }
    },
  });

  return {
    articleData,
    articleDataLoading,
    addArticle,
    addArticleLoading,
    isSuccess,

    articleById,
    articleByIdLoading,
  };
}
