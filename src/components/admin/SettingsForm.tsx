import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteSettings, useSettingsMutations, SiteSetting } from '@/hooks/useSiteSettings';
import { Loader2 } from 'lucide-react';

export function SettingsForm() {
  const { data: settings, isLoading } = useSiteSettings();
  const { updateMultipleSettings } = useSettingsMutations();
  const [values, setValues] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      const initialValues: Record<string, string> = {};
      settings.forEach(s => {
        initialValues[s.key] = s.value;
      });
      setValues(initialValues);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates = Object.entries(values).map(([key, value]) => ({
      key,
      value,
    }));

    await updateMultipleSettings.mutateAsync(updates);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const getInputType = (type: string) => {
    switch (type) {
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      case 'phone':
        return 'tel';
      case 'number':
        return 'number';
      default:
        return 'text';
    }
  };

  const groupedSettings = {
    youtube: settings?.filter(s => s.key.startsWith('youtube')) || [],
    social: settings?.filter(s => ['instagram_url', 'facebook_url'].includes(s.key)) || [],
    contact: settings?.filter(s => ['whatsapp_number', 'contact_email', 'address'].includes(s.key)) || [],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vídeo da Homepage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {groupedSettings.youtube.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>{setting.label_pt}</Label>
              <Input
                id={setting.key}
                type={getInputType(setting.type)}
                value={values[setting.key] || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                placeholder={setting.label_en}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {groupedSettings.social.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>{setting.label_pt}</Label>
              <Input
                id={setting.key}
                type={getInputType(setting.type)}
                value={values[setting.key] || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                placeholder="https://..."
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {groupedSettings.contact.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>{setting.label_pt}</Label>
              <Input
                id={setting.key}
                type={getInputType(setting.type)}
                value={values[setting.key] || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={!hasChanges || updateMultipleSettings.isPending}>
          {updateMultipleSettings.isPending ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </div>
    </form>
  );
}
