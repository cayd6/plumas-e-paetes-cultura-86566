import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import LanguageControls from '@/components/LanguageControls';
import PlumasEmNumeros from '@/components/PlumasEmNumeros';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Trophy, Star, Calendar, MapPin, Users, Award, Crown, 
  Sparkles, Heart, Target, Scale, Eye, Building,
  Music, ChevronRight, ExternalLink
} from 'lucide-react';

const EdicoesEnhanced = () => {
  const { language } = useLanguage();

  const mainCategories = [
    'Aderecista', 'Alegoria', 'Alegorista', 'Artesão de Costeiro', 'Bordadeira',
    'Cabeça de Boneco', 'Carpinteiro', 'Chapelaria', 'Costureira', 'Destaque Masculino',
    'Destaque Feminino', 'Destaque de Chão', 'Diretoria', 'Diretor de Ala de Baianas',
    'Diretor de Barracão', 'Diretor de Bateria', 'Diretor de Carnaval', 'Diretor de Harmonia',
    'Eletricista', 'Escultor', 'Ferreiro', 'Figurinista', 'Iluminador de Carro',
    'Intérprete', 'Maquiador', 'Mestre de Bateria', 'Mestre-Sala', 'Passista',
    'Pintor de Carro', 'Pintor de Fantasia', 'Pintor Decorativo', 'Porta-Bandeira',
    'Primeiro Casal de Mestre-Sala e Porta-Bandeira', 'Produtor de Carnaval',
    'Rainha de Bateria', 'Rei Momo', 'Ritmista', 'Samplers', 'Serralheiro',
    'Soldador', 'Samba de Enredo', 'Carnavalesco'
  ];

  const specialAwards = [
    'Assessor de Imprensa', 'Assessor de Marketing', 'Fotógrafo', 'Gestor de Mídias',
    'Jornalista', 'Roteirista de Vídeos', 'Sapateiro', '"Eu Sou o Samba"', '"Vem de Lá"', 'Personalidade do Carnaval'
  ];

  const personalidadesHomenageadas = [
    { edicao: '1ª', ano: '2005', nome: 'Clóvis Bornay', titulo: language === 'pt' ? 'Personalidade imortal do carnaval' : 'Immortal carnival personality', resumo: language === 'pt' ? 'Carnavalesco, destaque de luxo e idealizador do Baile de Gala do Theatro Municipal.' : 'Carnival designer and creator of the Municipal Theatre Gala Ball.', biografiaCompleta: language === 'pt' ? 'Clóvis Bornay (1916-2005) foi um museólogo, figurinista, carnavalesco e destaque de luxo brasileiro. Considerado uma das maiores personalidades do carnaval carioca, foi o idealizador do tradicional Baile de Gala do Theatro Municipal do Rio de Janeiro. Venceu o concurso de fantasias do baile por 25 vezes consecutivas.' : 'Clóvis Bornay (1916-2005) was a Brazilian museologist, costume designer and carnival artist. He won the costume contest 25 consecutive times.', imagem: '/lovable-uploads/edicao-2005-clovis-bornay.jpg' },
    { edicao: '2ª', ano: '2006', nome: 'Xangô da Mangueira', titulo: language === 'pt' ? 'Mestre da bateria verde e rosa' : 'Master of the green and pink drums', resumo: language === 'pt' ? 'Lendário mestre de bateria da Estação Primeira de Mangueira.' : 'Legendary drum master of Mangueira.', biografiaCompleta: language === 'pt' ? 'Xangô da Mangueira foi um dos mais respeitados mestres de bateria da história do carnaval carioca. Conduziu a bateria da Mangueira com maestria, criando o som característico da escola.' : 'Xangô da Mangueira was one of the most respected drum masters in carnival history.', imagem: '/lovable-uploads/edicao-2005-marcela-xango.jpg' },
    { edicao: '3ª', ano: '2007', nome: 'Braguinha', titulo: language === 'pt' ? 'O poeta das marchinhas' : 'The poet of carnival marches', resumo: language === 'pt' ? 'Compositor de clássicos como "Copacabana" e "Balancê".' : 'Composer of classics like "Copacabana".', biografiaCompleta: language === 'pt' ? 'João de Barro, conhecido como Braguinha (1907-2006), foi um dos maiores compositores da música popular brasileira. Suas marchinhas de carnaval se tornaram parte do patrimônio cultural brasileiro.' : 'Braguinha was one of the greatest composers of Brazilian popular music.', imagem: '/placeholder.svg' },
    { edicao: '4ª', ano: '2008', nome: 'Cartola', titulo: language === 'pt' ? 'O poeta do morro' : 'The poet of the hill', resumo: language === 'pt' ? 'Fundador da Mangueira e autor de obras-primas do samba.' : 'Founder of Mangueira and samba masterpiece author.', biografiaCompleta: language === 'pt' ? 'Angenor de Oliveira, o Cartola (1908-1980), foi compositor, cantor e um dos fundadores da Mangueira. Criou obras-primas como "O Mundo é um Moinho" e "As Rosas Não Falam".' : 'Cartola was a composer and one of the founders of Mangueira.', imagem: '/placeholder.svg' },
    { edicao: '5ª', ano: '2009', nome: 'Noel Rosa', titulo: language === 'pt' ? 'O filósofo do samba' : 'The philosopher of samba', resumo: language === 'pt' ? 'Gênio da música brasileira, autor de "Com Que Roupa?".' : 'Genius of Brazilian music.', biografiaCompleta: language === 'pt' ? 'Noel de Medeiros Rosa (1910-1937) compôs mais de 250 músicas que se tornaram clássicos eternos como "Com Que Roupa?" e "Conversa de Botequim".' : 'Noel Rosa composed over 250 songs that became eternal classics.', imagem: '/placeholder.svg' },
    { edicao: '6ª', ano: '2010', nome: 'Oswaldo Sargentelli', titulo: language === 'pt' ? 'O showman do samba' : 'The samba showman', resumo: language === 'pt' ? 'Apresentador e divulgador do samba no mundo.' : 'Presenter and promoter of samba worldwide.', biografiaCompleta: language === 'pt' ? 'Oswaldo Sargentelli (1924-2002) foi apresentador e um dos maiores divulgadores do samba e da cultura brasileira.' : 'Sargentelli was one of the greatest promoters of samba.', imagem: '/placeholder.svg' },
    { edicao: '7ª', ano: '2011', nome: 'Arlindo Rodrigues', titulo: language === 'pt' ? 'O mestre dos carnavalescos' : 'The master of carnival designers', resumo: language === 'pt' ? 'Carnavalesco revolucionário das escolas de samba.' : 'Revolutionary carnival designer.', biografiaCompleta: language === 'pt' ? 'Arlindo Rodrigues (1931-1987) revolucionou a estética das escolas de samba com criações luxuosas e inovadoras.' : 'Arlindo Rodrigues revolutionized samba school aesthetics.', imagem: '/placeholder.svg' },
    { edicao: '8ª', ano: '2012', nome: 'Donga', titulo: language === 'pt' ? 'O pai do samba gravado' : 'The father of recorded samba', resumo: language === 'pt' ? 'Autor de "Pelo Telefone", primeiro samba gravado.' : 'Author of the first recorded samba.', biografiaCompleta: language === 'pt' ? 'Donga (1890-1974) é reconhecido como autor de "Pelo Telefone" (1917), considerado o primeiro samba gravado da história.' : 'Donga is recognized as author of the first recorded samba.', imagem: '/placeholder.svg' },
    { edicao: '9ª', ano: '2013', nome: 'Chiquinha Gonzaga', titulo: language === 'pt' ? 'A maestrina pioneira' : 'The pioneering conductor', resumo: language === 'pt' ? 'Primeira mulher a reger uma orquestra no Brasil.' : 'First woman to conduct an orchestra in Brazil.', biografiaCompleta: language === 'pt' ? 'Chiquinha Gonzaga (1847-1935) foi a primeira mulher a reger uma orquestra no Brasil e autora de "Ô Abre Alas" (1899).' : 'Chiquinha Gonzaga was the first woman to conduct an orchestra in Brazil.', imagem: '/placeholder.svg' },
    { edicao: '10ª', ano: '2014', nome: 'Rainhas do Rádio', titulo: language === 'pt' ? 'As vozes que encantaram o Brasil' : 'The voices that enchanted Brazil', resumo: language === 'pt' ? 'Homenagem coletiva às grandes cantoras da Era do Rádio.' : 'Collective tribute to Radio Era singers.', biografiaCompleta: language === 'pt' ? 'Na 10ª edição, homenagem coletiva às Rainhas do Rádio - Emilinha Borba, Marlene, Dalva de Oliveira, Ângela Maria e outras.' : 'Collective tribute to the Radio Queens.', imagem: '/placeholder.svg' },
    { edicao: '11ª', ano: '2015', nome: 'Elza Soares', titulo: language === 'pt' ? 'A voz do milênio' : 'The voice of the millennium', resumo: language === 'pt' ? 'Eleita a cantora brasileira do milênio pela BBC.' : 'Elected Brazilian singer of the millennium by BBC.', biografiaCompleta: language === 'pt' ? 'Elza Soares (1930-2022) foi eleita a cantora brasileira do milênio pela BBC de Londres.' : 'Elza Soares was elected Brazilian singer of the millennium by BBC London.', imagem: '/placeholder.svg' },
    { edicao: '12ª', ano: '2016', nome: 'Monarco', titulo: language === 'pt' ? 'O guardião da Velha Guarda' : 'The guardian of the Old Guard', resumo: language === 'pt' ? 'Presidente de honra da Portela.' : 'Honorary president of Portela.', biografiaCompleta: language === 'pt' ? 'Monarco (1933-2021) foi compositor, cantor e presidente de honra da Portela, guardião da tradição do samba.' : 'Monarco was a composer and honorary president of Portela.', imagem: '/placeholder.svg' },
    { edicao: '13ª', ano: '2017', nome: 'Zé Katimba', titulo: language === 'pt' ? 'O mestre dos mestres' : 'The master of masters', resumo: language === 'pt' ? 'Lendário mestre de bateria do carnaval carioca.' : 'Legendary drum master of Rio carnival.', biografiaCompleta: language === 'pt' ? 'Zé Katimba é um dos mais respeitados mestres de bateria da história do carnaval carioca.' : 'Zé Katimba is one of the most respected drum masters in carnival history.', imagem: '/placeholder.svg' },
    { edicao: '14ª', ano: '2018', nome: 'Wilson Moreira', titulo: language === 'pt' ? 'O poeta do partido-alto' : 'The poet of partido-alto', resumo: language === 'pt' ? 'Compositor de clássicos como "Coisa da Antiga".' : 'Composer of classics like "Coisa da Antiga".', biografiaCompleta: language === 'pt' ? 'Wilson Moreira (1936-2018) foi um dos maiores compositores de samba do Brasil, mestre do partido-alto.' : 'Wilson Moreira was one of the greatest samba composers in Brazil.', imagem: '/placeholder.svg' },
    { edicao: '15ª', ano: '2019', nome: 'Aluísio Machado', titulo: language === 'pt' ? 'A voz da Portela' : 'The voice of Portela', resumo: language === 'pt' ? 'Intérprete histórico e compositor da Portela.' : 'Historic interpreter of Portela.', biografiaCompleta: language === 'pt' ? 'Aluísio Machado (1927-2016) foi um dos maiores intérpretes da história da Portela.' : 'Aluísio Machado was one of the greatest interpreters in Portela history.', imagem: '/placeholder.svg' },
    { edicao: '16ª', ano: '2020/2021', nome: 'Maurício Mattos', titulo: language === 'pt' ? 'O olhar do carnaval' : 'The eye of carnival', resumo: language === 'pt' ? 'Fotógrafo icônico do carnaval carioca.' : 'Iconic carnival photographer.', biografiaCompleta: language === 'pt' ? 'Maurício Mattos foi um dos mais importantes fotógrafos do carnaval carioca, registrando décadas de história visual.' : 'Maurício Mattos was one of the most important carnival photographers.', imagem: '/placeholder.svg' },
    { edicao: '17ª', ano: '2022/2023', nome: 'Fernando Pamplona', titulo: language === 'pt' ? 'O revolucionário do carnaval' : 'The carnival revolutionary', resumo: language === 'pt' ? 'Carnavalesco visionário que revolucionou a arte.' : 'Visionary carnival designer.', biografiaCompleta: language === 'pt' ? 'Fernando Pamplona (1926-2013) revolucionou o carnaval ao introduzir temas afro-brasileiros e sociais nas escolas.' : 'Fernando Pamplona revolutionized carnival with Afro-Brazilian themes.', imagem: '/placeholder.svg' },
    { edicao: '18ª', ano: '2024', nome: 'Noca da Portela', titulo: language === 'pt' ? 'O poeta maior da Portela' : 'The greatest poet of Portela', resumo: language === 'pt' ? 'Compositor legendário de sambas-enredo.' : 'Legendary samba-enredo composer.', biografiaCompleta: language === 'pt' ? 'Noca da Portela (1932-2023) foi um dos maiores compositores de samba-enredo da história.' : 'Noca da Portela was one of the greatest samba-enredo composers.', imagem: '/placeholder.svg' },
    { edicao: '19ª/20ª', ano: '2025', nome: 'Maria Augusta', titulo: language === 'pt' ? 'A dama do samba' : 'The lady of samba', resumo: language === 'pt' ? 'Compositora dedicada à preservação do samba.' : 'Composer dedicated to samba preservation.', biografiaCompleta: language === 'pt' ? 'Maria Augusta é uma das grandes damas do samba brasileiro, dedicada à preservação e divulgação do samba como patrimônio cultural.' : 'Maria Augusta is one of the great ladies of Brazilian samba.', imagem: '/placeholder.svg' }
  ];

  const editions = [
    { edition: '20ª', year: '2025', homenageado: 'Maria Augusta', status: language === 'pt' ? 'Próxima' : 'Next' },
    { edition: '19ª', year: '2024', homenageado: 'Noca da Portela', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '17ª', year: '2022/2023', homenageado: 'Fernando Pamplona', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '16ª', year: '2020/2021', homenageado: 'Maurício Mattos', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '15ª', year: '2019', homenageado: 'Aluísio Machado', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '14ª', year: '2018', homenageado: 'Wilson Moreira', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '13ª', year: '2017', homenageado: 'Zé Katimba', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '12ª', year: '2016', homenageado: 'Monarco', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '11ª', year: '2015', homenageado: 'Elza Soares', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '10ª', year: '2014', homenageado: 'Rainhas do Rádio', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '9ª', year: '2013', homenageado: 'Chiquinha Gonzaga', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '8ª', year: '2012', homenageado: 'Donga', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '7ª', year: '2011', homenageado: 'Arlindo Rodrigues', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '6ª', year: '2010', homenageado: 'Oswaldo Sargentelli', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '5ª', year: '2009', homenageado: 'Noel Rosa', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '4ª', year: '2008', homenageado: 'Cartola', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '3ª', year: '2007', homenageado: 'Braguinha', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '2ª', year: '2006', homenageado: 'Xangô da Mangueira', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '1ª', year: '2005', homenageado: 'Clóvis Bornay', status: language === 'pt' ? 'Realizada' : 'Completed' },
  ];

  const locaisCerimonias = [
    { nome: 'Teatro Carlos Gomes', icone: Building },
    { nome: 'Scala Rio', icone: Building },
    { nome: 'Cidade do Samba', icone: Music },
    { nome: 'Centro Cultural Cartola', icone: Music },
    { nome: 'Quadra da Portela', icone: Music },
    { nome: 'Quadra da Vila Isabel', icone: Music },
  ];

  const propositos = [
    { icone: Heart, titulo: language === 'pt' ? 'Autoestima' : 'Self-esteem', descricao: language === 'pt' ? 'Aumentar a autoestima dos trabalhadores do carnaval.' : 'Increase carnival workers self-esteem.' },
    { icone: Eye, titulo: language === 'pt' ? 'Visibilidade' : 'Visibility', descricao: language === 'pt' ? 'Dar visibilidade aos artífices dos bastidores.' : 'Give visibility to behind-the-scenes artisans.' },
    { icone: Target, titulo: language === 'pt' ? 'Oportunidades' : 'Opportunities', descricao: language === 'pt' ? 'Criar oportunidades no mercado de trabalho.' : 'Create job market opportunities.' },
    { icone: Users, titulo: language === 'pt' ? 'Integração' : 'Integration', descricao: language === 'pt' ? 'Promover a aproximação entre os trabalhadores.' : 'Promote connection between workers.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-ppc-purple/5">
      <SEO title={language === 'pt' ? 'Prêmio Plumas & Paetês Cultural' : 'Plumas & Paetês Cultural Award'} description={language === 'pt' ? '20 anos premiando a excelência do carnaval carioca' : '20 years awarding Rio carnival excellence'} />
      <Navigation />
      <LanguageControls />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ppc-purple via-ppc-magenta to-ppc-orange opacity-90" />
          <div className="absolute inset-0 bg-[url('/lovable-uploads/hero-background.jpg')] bg-cover bg-center mix-blend-overlay opacity-30" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === 'pt' ? '20 Anos de História' : '20 Years of History'}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
              {language === 'pt' ? 'Prêmio Plumas & Paetês' : 'Plumas & Paetês Award'}
              <span className="block text-ppc-yellow">Cultural</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {language === 'pt' ? 'Celebrando a excelência dos artífices que fazem a magia do carnaval carioca acontecer' : 'Celebrating the excellence of artisans who make Rio carnival magic happen'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-ppc-yellow">1462</div>
                <div className="text-sm opacity-80">{language === 'pt' ? 'Laureados' : 'Laureates'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-ppc-yellow">52</div>
                <div className="text-sm opacity-80">{language === 'pt' ? 'Categorias' : 'Categories'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-ppc-yellow">20</div>
                <div className="text-sm opacity-80">{language === 'pt' ? 'Edições' : 'Editions'}</div>
              </div>
            </div>
            <Button size="lg" className="bg-ppc-yellow text-ppc-purple hover:bg-ppc-yellow/90 text-lg px-8" onClick={() => window.open('https://wa.me/5521989392920', '_blank')}>
              <Award className="w-5 h-5 mr-2" />
              {language === 'pt' ? 'Inscreva-se para 2025' : 'Register for 2025'}
            </Button>
          </div>
        </section>

        <Breadcrumbs />

        {/* O PRÊMIO Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ppc-purple/10 text-ppc-purple border-ppc-purple/20"><Trophy className="w-4 h-4 mr-2" />{language === 'pt' ? 'O Prêmio' : 'The Award'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-ppc-purple mb-6">{language === 'pt' ? 'Uma História de Reconhecimento' : 'A History of Recognition'}</h2>
            </div>
            <div className="bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 rounded-2xl p-8 border border-ppc-purple/10">
              <p className="text-gray-700 leading-relaxed mb-6">
                {language === 'pt' ? 'Há 20 anos, objetivamos o interesse de levar os holofotes aos artistas dos bastidores do carnaval, que costumavam ser invisibilizados. Idealizado por José Antônio Rodrigues Filho, o Prêmio Plumas & Paetês Cultural nasceu da necessidade de criar um evento que exaltasse estes trabalhadores fundamentais para a magia do carnaval carioca.' : 'For 20 years, we have aimed to bring the spotlight to behind-the-scenes carnival artists. The Plumas & Paetês Cultural Award was born from the need to celebrate these workers who are fundamental to Rio carnival magic.'}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {language === 'pt' ? 'O Instituto Plumas e Paetês Cultural tem como missão o reconhecimento, a valorização e a conscientização dos artífices da economia criativa do carnaval. O samba, patrimônio imaterial que salvaguardamos, é celebrado através da premiação de aproximadamente 100 profissionais a cada ano, distribuídos em 52 categorias.' : 'The Institute has the mission of recognizing and valuing carnival creative economy artisans. Samba, the intangible heritage we safeguard, is celebrated through awarding approximately 100 professionals each year across 52 categories.'}
              </p>
            </div>
          </div>
        </section>

        {/* PROPÓSITOS Section */}
        <section className="py-20 bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ppc-orange/10 text-ppc-orange border-ppc-orange/20"><Target className="w-4 h-4 mr-2" />{language === 'pt' ? 'Propósitos' : 'Purposes'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-ppc-purple mb-4">{language === 'pt' ? 'Nossos Objetivos' : 'Our Goals'}</h2>
              <p className="text-gray-600">{language === 'pt' ? 'Uma premiação anual sem fins lucrativos, realizada em evento temático pós-carnaval.' : 'An annual non-profit award held at a themed post-carnival event.'}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {propositos.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-ppc-purple to-ppc-magenta rounded-xl flex items-center justify-center mb-4">
                    <p.icone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ppc-purple mb-2">{p.titulo}</h3>
                  <p className="text-gray-600 text-sm">{p.descricao}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-ppc-purple mb-6 text-center"><MapPin className="w-5 h-5 inline mr-2" />{language === 'pt' ? 'Locais das Cerimônias' : 'Ceremony Venues'}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {locaisCerimonias.map((l, i) => (
                  <div key={i} className="px-4 py-2 bg-gradient-to-r from-ppc-purple/5 to-ppc-magenta/5 rounded-full border border-ppc-purple/20 flex items-center gap-2">
                    <l.icone className="w-4 h-4 text-ppc-purple" />
                    <span className="text-sm font-medium text-gray-700">{l.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REGULAMENTO Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ppc-magenta/10 text-ppc-magenta border-ppc-magenta/20"><Scale className="w-4 h-4 mr-2" />{language === 'pt' ? 'Regulamento' : 'Regulations'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-ppc-purple mb-4">{language === 'pt' ? 'Como Funciona a Escolha' : 'How Selection Works'}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 rounded-2xl p-6 border border-ppc-purple/10">
                <div className="w-12 h-12 bg-ppc-purple rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
                <h3 className="text-lg font-bold text-ppc-purple mb-2">{language === 'pt' ? 'Visitas Técnicas' : 'Technical Visits'}</h3>
                <p className="text-gray-600 text-sm">{language === 'pt' ? 'Visitas aos barracões e ateliês dos profissionais.' : 'Visits to workshops and professional studios.'}</p>
              </div>
              <div className="bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 rounded-2xl p-6 border border-ppc-purple/10">
                <div className="w-12 h-12 bg-ppc-orange rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
                <h3 className="text-lg font-bold text-ppc-purple mb-2">{language === 'pt' ? 'Observação nos Desfiles' : 'Parade Observation'}</h3>
                <p className="text-gray-600 text-sm">{language === 'pt' ? 'Avaliação nos desfiles do Grupo Especial, Série Ouro, Prata e Bronze.' : 'Evaluation during Special Group and Series parades.'}</p>
              </div>
              <div className="bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 rounded-2xl p-6 border border-ppc-purple/10">
                <div className="w-12 h-12 bg-ppc-magenta rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
                <h3 className="text-lg font-bold text-ppc-purple mb-2">{language === 'pt' ? 'Equipe Qualificada' : 'Qualified Team'}</h3>
                <p className="text-gray-600 text-sm">{language === 'pt' ? 'Julgadores com experiência em segmentos culturais e artísticos.' : 'Judges with cultural and artistic experience.'}</p>
              </div>
            </div>
          </div>
        </section>

        <PlumasEmNumeros />

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ppc-yellow/20 text-ppc-purple border-ppc-yellow/30"><Award className="w-4 h-4 mr-2" />{language === 'pt' ? 'Categorias' : 'Categories'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-ppc-purple mb-4">{language === 'pt' ? 'Categorias Premiadas' : 'Award Categories'}</h2>
              <p className="text-lg text-ppc-purple font-semibold">{language === 'pt' ? '52 Categorias Premiadas' : '52 Award Categories'}</p>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-bold text-ppc-purple mb-6 text-center">{language === 'pt' ? '42 Categorias Principais' : '42 Main Categories'}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {mainCategories.map((c, i) => (
                  <div key={i} className="px-4 py-2 bg-gradient-to-r from-ppc-purple/5 to-ppc-magenta/5 rounded-full border border-ppc-purple/20 hover:border-ppc-purple/40 transition-all hover:-translate-y-1 cursor-default">
                    <span className="text-sm font-medium text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ppc-yellow to-ppc-orange rounded-full mb-4">
                <Star className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">{language === 'pt' ? '10 Prêmios Especiais' : '10 Special Awards'}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {specialAwards.map((a, i) => (
                <div key={i} className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 hover:border-ppc-orange/30 group cursor-default">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-ppc-orange transition-colors">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PERSONALIDADES HOMENAGEADAS Section */}
        <section className="py-20 bg-gradient-to-br from-ppc-purple via-ppc-magenta to-ppc-orange">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border-white/30"><Crown className="w-4 h-4 mr-2" />{language === 'pt' ? 'Homenageados' : 'Honorees'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{language === 'pt' ? 'Personalidades Homenageadas' : 'Honored Personalities'}</h2>
              <p className="text-white/80 max-w-2xl mx-auto">{language === 'pt' ? 'Em cada edição, uma personalidade que marcou a história do carnaval é homenageada' : 'In each edition, a personality who marked carnival history is honored'}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {personalidadesHomenageadas.map((p, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-1">
                      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/10">
                        <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
                      </div>
                      <div className="text-center">
                        <div className="text-ppc-yellow font-bold text-sm mb-1">{p.edicao} - {p.ano}</div>
                        <h3 className="text-white font-semibold text-sm leading-tight">{p.nome}</h3>
                      </div>
                      <div className="flex justify-center mt-2"><ChevronRight className="w-4 h-4 text-white/60 group-hover:text-ppc-yellow transition-colors" /></div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <Badge variant="outline" className="border-ppc-purple text-ppc-purple w-fit mb-2">{p.edicao} Edição - {p.ano}</Badge>
                      <DialogTitle className="text-2xl text-ppc-purple">{p.nome}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ppc-orange mb-1">{p.titulo}</h4>
                        <p className="text-gray-600 text-sm mb-4">{p.resumo}</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-ppc-purple mb-2">{language === 'pt' ? 'Biografia' : 'Biography'}</h5>
                          <p className="text-gray-700 text-sm leading-relaxed">{p.biografiaCompleta}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ppc-purple/10 text-ppc-purple border-ppc-purple/20"><Calendar className="w-4 h-4 mr-2" />{language === 'pt' ? 'Edições' : 'Editions'}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-ppc-purple mb-4">{language === 'pt' ? '20 Anos de História' : '20 Years of History'}</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {editions.map((e, i) => (
                <div key={i} className={`bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 rounded-xl p-4 border border-ppc-purple/10 flex items-center justify-between ${e.status === (language === 'pt' ? 'Próxima' : 'Next') ? 'ring-2 ring-ppc-yellow' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-ppc-purple to-ppc-magenta rounded-full flex items-center justify-center text-white font-bold text-sm">{e.edition}</div>
                    <div>
                      <span className="text-lg font-bold text-ppc-purple">{e.year}</span>
                      <div className="text-sm text-gray-600">{e.homenageado}</div>
                    </div>
                  </div>
                  {e.status === (language === 'pt' ? 'Próxima' : 'Next') && <Badge className="bg-ppc-yellow text-ppc-purple">{e.status}</Badge>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-ppc-purple to-ppc-magenta">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{language === 'pt' ? 'Faça Parte da 20ª Edição!' : 'Be Part of the 20th Edition!'}</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">{language === 'pt' ? 'Inscreva-se e concorra ao maior prêmio do carnaval carioca' : 'Register and compete for the biggest award in Rio carnival'}</p>
            <Button size="lg" className="bg-ppc-yellow text-ppc-purple hover:bg-ppc-yellow/90 text-lg px-8" onClick={() => window.open('https://wa.me/5521989392920', '_blank')}>
              <ExternalLink className="w-5 h-5 mr-2" />
              {language === 'pt' ? 'Inscreva-se pelo WhatsApp' : 'Register via WhatsApp'}
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EdicoesEnhanced;
