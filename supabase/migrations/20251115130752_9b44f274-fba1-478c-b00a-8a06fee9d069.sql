-- Create enum for user roles
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- RLS policy for user_roles
create policy "Users can view their own roles"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Create gallery_photos table
create table public.gallery_photos (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    year text not null,
    type text not null,
    image_url text not null,
    storage_path text not null,
    rotation integer default 0 check (rotation in (0, 90, 180, 270)),
    display_order integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id)
);

alter table public.gallery_photos enable row level security;

-- Create indexes for performance
create index idx_gallery_photos_year on public.gallery_photos(year);
create index idx_gallery_photos_type on public.gallery_photos(type);
create index idx_gallery_photos_order on public.gallery_photos(display_order);

-- RLS policies for gallery_photos
create policy "Fotos são públicas"
on public.gallery_photos for select
to public using (true);

create policy "Admins podem inserir fotos"
on public.gallery_photos for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins podem atualizar fotos"
on public.gallery_photos for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins podem deletar fotos"
on public.gallery_photos for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for automatic timestamp updates
create trigger update_gallery_photos_updated_at
before update on public.gallery_photos
for each row
execute function public.update_updated_at_column();

-- Configure storage bucket for gallery
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

-- RLS policies for storage
create policy "Fotos da galeria são públicas"
on storage.objects for select
to public using (bucket_id = 'gallery');

create policy "Admins podem fazer upload"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'gallery' 
  and public.has_role(auth.uid(), 'admin')
);

create policy "Admins podem deletar fotos do storage"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'gallery' 
  and public.has_role(auth.uid(), 'admin')
);