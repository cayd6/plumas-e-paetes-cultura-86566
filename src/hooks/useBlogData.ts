import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BlogCategory {
  id: string;
  name_pt: string;
  name_en: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  content_pt: string;
  content_en: string;
  excerpt_pt: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  category_id: string | null;
  author_name: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  category?: BlogCategory;
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name_pt');
      if (error) throw error;
      return data as BlogCategory[];
    },
  });
}

export function useBlogPosts(onlyPublished = false) {
  return useQuery({
    queryKey: ['blog-posts', onlyPublished],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*, category:blog_categories(*)')
        .order('created_at', { ascending: false });
      
      if (onlyPublished) {
        query = query.eq('published', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useBlogMutations() {
  const queryClient = useQueryClient();

  const addCategory = useMutation({
    mutationFn: async (category: Omit<BlogCategory, 'id'>) => {
      const { error } = await supabase.from('blog_categories').insert(category);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('Categoria criada');
    },
    onError: () => toast.error('Erro ao criar categoria'),
  });

  const updateCategory = useMutation({
    mutationFn: async (category: BlogCategory) => {
      const { error } = await supabase
        .from('blog_categories')
        .update(category)
        .eq('id', category.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('Categoria atualizada');
    },
    onError: () => toast.error('Erro ao atualizar categoria'),
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('Categoria removida');
    },
    onError: () => toast.error('Erro ao remover categoria'),
  });

  const addPost = useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at' | 'category'>) => {
      const { error } = await supabase.from('blog_posts').insert(post);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Post criado');
    },
    onError: () => toast.error('Erro ao criar post'),
  });

  const updatePost = useMutation({
    mutationFn: async (post: Partial<BlogPost> & { id: string }) => {
      const { category, ...postData } = post;
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Post atualizado');
    },
    onError: () => toast.error('Erro ao atualizar post'),
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Post removido');
    },
    onError: () => toast.error('Erro ao remover post'),
  });

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    addPost,
    updatePost,
    deletePost,
  };
}
