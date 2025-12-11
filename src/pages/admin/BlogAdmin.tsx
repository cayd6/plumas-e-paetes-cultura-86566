import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { 
  useBlogCategories,
  useBlogPosts,
  useBlogMutations,
  BlogCategory,
  BlogPost
} from '@/hooks/useBlogData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BlogAdmin() {
  const { data: categories, isLoading: loadingCategories } = useBlogCategories();
  const { data: posts, isLoading: loadingPosts } = useBlogPosts();
  const mutations = useBlogMutations();

  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name_pt: '', name_en: '', slug: '' });
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id' | 'created_at' | 'category'>>({
    title_pt: '',
    title_en: '',
    slug: '',
    content_pt: '',
    content_en: '',
    excerpt_pt: null,
    excerpt_en: null,
    image_url: null,
    category_id: null,
    author_name: null,
    published: false,
    published_at: null
  });

  const handleAddCategory = () => {
    mutations.addCategory.mutate(newCategory);
    setNewCategory({ name_pt: '', name_en: '', slug: '' });
    setDialogOpen(null);
  };

  const handleAddPost = () => {
    mutations.addPost.mutate({
      ...newPost,
      published_at: newPost.published ? new Date().toISOString() : null
    });
    setNewPost({
      title_pt: '',
      title_en: '',
      slug: '',
      content_pt: '',
      content_en: '',
      excerpt_pt: null,
      excerpt_en: null,
      image_url: null,
      category_id: null,
      author_name: null,
      published: false,
      published_at: null
    });
    setDialogOpen(null);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return (
    <AdminLayout title="Blog">
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Posts do Blog</CardTitle>
              <Dialog open={dialogOpen === 'post'} onOpenChange={(open) => setDialogOpen(open ? 'post' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Post</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título (PT)</Label>
                      <Input 
                        value={newPost.title_pt} 
                        onChange={(e) => {
                          setNewPost(p => ({ 
                            ...p, 
                            title_pt: e.target.value,
                            slug: generateSlug(e.target.value)
                          }));
                        }} 
                      />
                    </div>
                    <div>
                      <Label>Título (EN)</Label>
                      <Input value={newPost.title_en} onChange={(e) => setNewPost(p => ({ ...p, title_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Slug (URL)</Label>
                      <Input value={newPost.slug} onChange={(e) => setNewPost(p => ({ ...p, slug: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <Select value={newPost.category_id || ''} onValueChange={(value) => setNewPost(p => ({ ...p, category_id: value || null }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name_pt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Autor</Label>
                      <Input value={newPost.author_name || ''} onChange={(e) => setNewPost(p => ({ ...p, author_name: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>URL da Imagem</Label>
                      <Input value={newPost.image_url || ''} onChange={(e) => setNewPost(p => ({ ...p, image_url: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>Resumo (PT)</Label>
                      <Textarea value={newPost.excerpt_pt || ''} onChange={(e) => setNewPost(p => ({ ...p, excerpt_pt: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>Resumo (EN)</Label>
                      <Textarea value={newPost.excerpt_en || ''} onChange={(e) => setNewPost(p => ({ ...p, excerpt_en: e.target.value || null }))} />
                    </div>
                    <div className="col-span-2">
                      <Label>Conteúdo (PT)</Label>
                      <Textarea 
                        value={newPost.content_pt} 
                        onChange={(e) => setNewPost(p => ({ ...p, content_pt: e.target.value }))} 
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Conteúdo (EN)</Label>
                      <Textarea 
                        value={newPost.content_en} 
                        onChange={(e) => setNewPost(p => ({ ...p, content_en: e.target.value }))} 
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Switch 
                        checked={newPost.published} 
                        onCheckedChange={(checked) => setNewPost(p => ({ ...p, published: checked }))}
                      />
                      <Label>Publicar imediatamente</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddPost} className="w-full mt-4">Criar Post</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingPosts ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-3">
                  {posts?.map((post) => (
                    <PostRow key={post.id} post={post} mutations={mutations} categories={categories || []} />
                  ))}
                  {posts?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhum post cadastrado</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Categorias</CardTitle>
              <Dialog open={dialogOpen === 'category'} onOpenChange={(open) => setDialogOpen(open ? 'category' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Categoria
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Categoria</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome (PT)</Label>
                      <Input 
                        value={newCategory.name_pt} 
                        onChange={(e) => setNewCategory(c => ({ 
                          ...c, 
                          name_pt: e.target.value,
                          slug: generateSlug(e.target.value)
                        }))} 
                      />
                    </div>
                    <div>
                      <Label>Nome (EN)</Label>
                      <Input value={newCategory.name_en} onChange={(e) => setNewCategory(c => ({ ...c, name_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input value={newCategory.slug} onChange={(e) => setNewCategory(c => ({ ...c, slug: e.target.value }))} />
                    </div>
                    <Button onClick={handleAddCategory} className="w-full">Criar Categoria</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingCategories ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <CategoryRow key={category.id} category={category} mutations={mutations} />
                  ))}
                  {categories?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhuma categoria cadastrada</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

function CategoryRow({ category, mutations }: { category: BlogCategory; mutations: ReturnType<typeof useBlogMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(category);

  const save = () => {
    mutations.updateCategory.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded">
        <Input value={data.name_pt} onChange={(e) => setData(d => ({ ...d, name_pt: e.target.value }))} placeholder="Nome PT" />
        <Input value={data.name_en} onChange={(e) => setData(d => ({ ...d, name_en: e.target.value }))} placeholder="Nome EN" />
        <Input value={data.slug} onChange={(e) => setData(d => ({ ...d, slug: e.target.value }))} placeholder="Slug" />
        <Button size="sm" onClick={save}>Salvar</Button>
        <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span>{category.name_pt}</span>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteCategory.mutate(category.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function PostRow({ post, mutations, categories }: { post: BlogPost; mutations: ReturnType<typeof useBlogMutations>; categories: BlogCategory[] }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(post);

  const save = () => {
    mutations.updatePost.mutate(data);
    setEditing(false);
  };

  const togglePublish = () => {
    mutations.updatePost.mutate({
      id: post.id,
      published: !post.published,
      published_at: !post.published ? new Date().toISOString() : post.published_at
    });
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.title_pt} onChange={(e) => setData(d => ({ ...d, title_pt: e.target.value }))} placeholder="Título PT" />
          <Input value={data.title_en} onChange={(e) => setData(d => ({ ...d, title_en: e.target.value }))} placeholder="Título EN" />
          <Input value={data.slug} onChange={(e) => setData(d => ({ ...d, slug: e.target.value }))} placeholder="Slug" />
          <Select value={data.category_id || ''} onValueChange={(value) => setData(d => ({ ...d, category_id: value || null }))}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name_pt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input value={data.author_name || ''} onChange={(e) => setData(d => ({ ...d, author_name: e.target.value || null }))} placeholder="Autor" />
          <Input value={data.image_url || ''} onChange={(e) => setData(d => ({ ...d, image_url: e.target.value || null }))} placeholder="URL da Imagem" />
          <Textarea value={data.content_pt} onChange={(e) => setData(d => ({ ...d, content_pt: e.target.value }))} placeholder="Conteúdo PT" className="col-span-2" />
          <Textarea value={data.content_en} onChange={(e) => setData(d => ({ ...d, content_en: e.target.value }))} placeholder="Conteúdo EN" className="col-span-2" />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Salvar</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded">
      <div className="flex items-center gap-3">
        {post.published ? (
          <Eye className="h-4 w-4 text-green-500" />
        ) : (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        )}
        <div>
          <span className="font-bold">{post.title_pt}</span>
          {post.category && (
            <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">{post.category.name_pt}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={togglePublish}>
          {post.published ? 'Despublicar' : 'Publicar'}
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deletePost.mutate(post.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
