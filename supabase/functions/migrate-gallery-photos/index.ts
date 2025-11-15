import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PhotoData {
  src: string;
  year: string;
  type: string;
  title: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Static photos data to migrate
    const photos: PhotoData[] = [
      { src: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png", year: "2024", type: "desfile", title: "Desfile Carnaval 2024" },
      { src: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png", year: "2024", type: "premiacao", title: "Cerimônia de Premiação" },
      { src: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png", year: "2024", type: "premiacao", title: "19º Prêmio Plumas & Paetês" },
      { src: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png", year: "2024", type: "oficina", title: "Oficina de Fantasias" },
      { src: "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png", year: "2023", type: "desfile", title: "Carnaval de Rua 2023" },
      { src: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", year: "2023", type: "oficina", title: "Oficina de Percussão" },
      { src: "/lovable-uploads/edicao-2005-robert-clovis.jpg", year: "2005", type: "premiacao", title: "1ª Edição 2005 - Homenagem a Clovis Bornay" },
      { src: "/lovable-uploads/edicao-2005-loia-zeza.jpg", year: "2005", type: "premiacao", title: "Premiados 2005 - Loia e Zeza" },
      { src: "/lovable-uploads/edicao-2005-m-leroy.jpg", year: "2005", type: "premiacao", title: "Premiação 2005 - Fantasia de Destaque" },
      { src: "/lovable-uploads/edicao-2005-marcela-xango.jpg", year: "2005", type: "premiacao", title: "Premiados 2005 - Marcela e Xangô" },
      { src: "/lovable-uploads/edicao-2005-tania.jpg", year: "2005", type: "premiacao", title: "Cerimônia de Premiação 2005" },
      { src: "/lovable-uploads/edicao-2005-ronaldo-barros.jpg", year: "2005", type: "desfile", title: "Desfile 2005 - Ronaldo Barros" },
      { src: "/lovable-uploads/edicao-2005-sandro.jpg", year: "2005", type: "premiacao", title: "Premiação 2005 - Sandro" },
      { src: "/lovable-uploads/edicao-2005-trofeu.jpg", year: "2005", type: "premiacao", title: "Troféu Plumas de Destaque 2005" },
      { src: "/lovable-uploads/edicao-2005-louzada.jpg", year: "2005", type: "premiacao", title: "Equipe Louzada - Edição 2005" },
      { src: "/lovable-uploads/edicao-2005-clovis-bornay.jpg", year: "2005", type: "premiacao", title: "Clovis Bornay - Homenageado 2005" },
      { src: "/lovable-uploads/edicao-2005-eduardo-leal.jpg", year: "2005", type: "premiacao", title: "Eduardo Leal - Mangueira 2005" },
      { src: "/lovable-uploads/edicao-2005-jarf-trofeus.jpg", year: "2005", type: "premiacao", title: "JARF e os Troféus 2005" },
      { src: "/lovable-uploads/premio-2025-01.jpg", year: "2025", type: "premiacao", title: "20º Prêmio Plumas & Paetês - 2025" },
      { src: "/lovable-uploads/premio-2025-02.jpg", year: "2025", type: "premiacao", title: "Cerimônia de Premiação 2025" },
      { src: "/lovable-uploads/premio-2025-03.jpg", year: "2025", type: "premiacao", title: "Premiados 2025" },
      { src: "/lovable-uploads/premio-2025-04.jpg", year: "2025", type: "premiacao", title: "Troféu Plumas 2025" },
      { src: "/lovable-uploads/premio-2025-05.jpg", year: "2025", type: "premiacao", title: "Evento 20º Prêmio Plumas & Paetês" },
      { src: "/lovable-uploads/premio-2025-06.jpg", year: "2025", type: "premiacao", title: "Apresentação Cultural 2025" },
      { src: "/lovable-uploads/premio-2025-07.jpg", year: "2025", type: "premiacao", title: "Performance 20º Prêmio" },
      { src: "/lovable-uploads/premio-2025-08.jpg", year: "2025", type: "premiacao", title: "Dança Cultural 2025" },
      { src: "/lovable-uploads/premio-2025-09.jpg", year: "2025", type: "premiacao", title: "Show Musical 2025" },
      { src: "/lovable-uploads/premio-2025-10.jpg", year: "2025", type: "premiacao", title: "Premiados Categoria Cultural 2025" },
      { src: "/lovable-uploads/premio-2025-11.jpg", year: "2025", type: "premiacao", title: "Celebração 20 Anos" },
      { src: "/lovable-uploads/premio-2025-12.jpg", year: "2025", type: "premiacao", title: "Evento Especial 2025" },
      { src: "/lovable-uploads/premio-2025-13.jpg", year: "2025", type: "premiacao", title: "Apresentação Artística 2025" },
      { src: "/lovable-uploads/premio-2025-14.jpg", year: "2025", type: "premiacao", title: "Homenageados 2025" },
      { src: "/lovable-uploads/premio-2025-15.jpg", year: "2025", type: "premiacao", title: "Noite de Gala 2025" },
      { src: "/lovable-uploads/premio-2025-16.jpg", year: "2025", type: "premiacao", title: "Performance de Dança 2025" },
      { src: "/lovable-uploads/premio-2025-17.jpg", year: "2025", type: "premiacao", title: "Cerimônia Oficial 2025" },
      { src: "/lovable-uploads/premio-2025-18.jpg", year: "2025", type: "premiacao", title: "Momento Cultural 2025" },
      { src: "/lovable-uploads/premio-2025-19.jpg", year: "2025", type: "premiacao", title: "Festa de Celebração 2025" },
      { src: "/lovable-uploads/premio-2025-20.jpg", year: "2025", type: "premiacao", title: "Encerramento Prêmio 2025" },
    ];

    console.log(`Starting migration of ${photos.length} photos...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      
      try {
        // Check if photo already exists
        const { data: existing } = await supabase
          .from('gallery_photos')
          .select('id')
          .eq('title', photo.title)
          .eq('year', photo.year)
          .maybeSingle();

        if (existing) {
          console.log(`Photo "${photo.title}" already exists, skipping...`);
          continue;
        }

        // Insert photo record (using public URLs directly, no need to re-upload)
        const fullUrl = `${supabaseUrl.replace('.supabase.co', '')}.supabase.co${photo.src}`;
        
        const { error: insertError } = await supabase
          .from('gallery_photos')
          .insert({
            title: photo.title,
            year: photo.year,
            type: photo.type,
            image_url: fullUrl,
            storage_path: photo.src,
            rotation: 0,
            display_order: i + 1,
          });

        if (insertError) {
          console.error(`Error inserting photo "${photo.title}":`, insertError);
          errorCount++;
        } else {
          console.log(`Successfully migrated: ${photo.title}`);
          successCount++;
        }
      } catch (error) {
        console.error(`Error processing photo "${photo.title}":`, error);
        errorCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Migration completed. Success: ${successCount}, Errors: ${errorCount}`,
        details: {
          total: photos.length,
          successful: successCount,
          failed: errorCount,
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Migration error:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
