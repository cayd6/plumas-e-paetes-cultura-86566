import { AdminLayout } from '@/components/admin/AdminLayout';
import { SettingsForm } from '@/components/admin/SettingsForm';

export default function AdminSettings() {
  return (
    <AdminLayout title="Configurações do Site">
      <SettingsForm />
    </AdminLayout>
  );
}
