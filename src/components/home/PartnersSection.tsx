import { useLanguage } from "@/contexts/LanguageContext";

interface Partner { name: string; logo?: string; }
interface PartnerGroup {
  keyPt: string;
  keyEn: string;
  partners: Partner[];
}

const groups: PartnerGroup[] = [
  {
    keyPt: 'Institucionais',
    keyEn: 'Institutional',
    partners: [
      { name: 'OEI — Organização dos Estados Ibero-americanos' },
      { name: 'ALERJ — Assembleia Legislativa do Rio de Janeiro' },
    ],
  },
  {
    keyPt: 'Poder público',
    keyEn: 'Public partners',
    partners: [
      { name: 'Prefeitura do Rio de Janeiro' },
      { name: 'Prefeitura de Niterói' },
      { name: 'Prefeitura de Maricá' },
      { name: 'Secretaria de Cultura do DF' },
    ],
  },
];

const PartnersSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-primary mb-4 font-medium">
            {language === 'pt' ? '— Rede de apoio' : '— Support network'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            {language === 'pt'
              ? 'Parceiros que sustentam o carnaval como política cultural.'
              : 'Partners who sustain carnival as cultural policy.'}
          </h2>
        </div>

        <div className="space-y-10">
          {groups.map((g) => (
            <div key={g.keyPt}>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 pb-2 border-b border-border">
                {language === 'pt' ? g.keyPt : g.keyEn}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                {g.partners.map((p) => (
                  <span
                    key={p.name}
                    className="text-sm md:text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
