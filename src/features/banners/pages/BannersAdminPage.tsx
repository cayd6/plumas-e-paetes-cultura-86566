import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminBanners() {
  return (
    <AdminLayout title="Gerenciar Banners">
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Em breve: Gerenciamento de banners do HeroBanner.
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
