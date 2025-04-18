import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";

const EdicaoDetalhe = () => {
  const { id } = useParams();
  const { translate } = useLanguage();

  if (id !== "19") {
    return <div>Edição não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png"
                alt="19º Prêmio Instituto Plumas e Paetês Cultural"
                className="w-full object-contain rounded-xl"
              />
            </div>
            
            <h1 className="text-4xl font-bold mb-6">19º Prêmio Instituto Plumas e Paetês Cultural</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl mb-6">
                Primeira premiação de carnaval voltada aos profissionais dos bastidores do carnaval, 
                o Instituto Plumas e Paetês Cultural chega à sua 19ª edição, que será realizada na Cidade do Samba, 
                com apresentação do projeto Flores em Vida - Volume 01 - Noca da Portela, do cantor e 
                produtor musical Ciraninho.
              </p>

              <p className="mb-4">
                Os preparativos para o Carnaval 2025 estão a todo vapor e, enquanto nas quadras o samba pulsa, 
                nos barracões, o ritmo começa a acelerar. Criado há 19 anos com o objetivo de reconhecer e 
                valorizar o trabalho de quem atua nos bastidores da criação, produção, realização e cobertura 
                do carnaval carioca, o Prêmio Instituto Plumas e Paetês Cultural já contemplou mais de mil profissionais 
                de 51 categorias, em uma grande celebração em torno da Economia Criativa do Carnaval.
              </p>

              <p className="mb-4">
                Este ano, aproximadamente 100 profissionais serão contemplados com o troféu em homenagem a 
                Oswaldo Alves Pereira (Noca da Portela), cantor, compositor e instrumentista brasileiro, cuja 
                história de vida se entrelaça com o samba. Noca da Portela, junta-se à galeria das personalidades 
                como Elza Soares e Fernando Pamplona, este, reverenciado na edição do Prêmio em 2023.
              </p>

              <p className="mb-4">
                Noca, que completa 92 anos em dezembro, é autor de mais de 300 músicas, muitas delas famosas, 
                como "Caciqueando", "Celular" e "Virada", que foi um dos hinos do movimento Diretas Já! 
                Algumas delas, foram gravadas por nomes consagrados da música, como Paulinho da Viola, Beth 
                Carvalho e Maria Bethânia e serviram de inspiração para que Ciraninho, cantor, compositor e 
                produtor musical, lançasse a coleção "Flores em Vida", cujo primeiro volume traz grandes nomes 
                da MPB cantando sucessos ao lado do sambista.
              </p>

              <p className="mb-4">
                No evento, somente para convidados, além de toda a emoção dos premiados, o samba é quem dará 
                o ritmo a esta festa. Na abertura, Marcelo Guimarães apresentará o Show Natural da Batucada. 
                Apresentações da Comissão de Frente da Mocidade Independente, coreografada pelo premiado Paulo 
                Pinna, e do grupo Samballet, dirigido Renata Monnier e Márcio Vasconcelos estão entre os 
                destaques desta edição, Após a premiação, Ciraninho e Noca Neto subirão ao palco para encerrar 
                a festa em grande estilo, apresentando a coletânea em homenagem ao Noca. Os amantes do samba 
                poderão acompanhar todos os momentos do Prêmio ao vivo pelo canal Fita Amarela ( YouTube), 
                responsável pela transmissão oficial do evento.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Sobre o Prêmio</h2>

              <p className="mb-4">
                A produtora, Instituto Plumas e Paetês Produções Culturais, chancelada, desde 2012, pela Organização 
                dos Estados Ibero-americanos – (OEI) e diplomada pela Comissão de Cultura da ALERJ, com o 
                Diploma Heloneida Studart em 2015, por considerarem a sua relevante contribuição exercida 
                com excelência no contexto da produção cultural há quase duas décadas, tem como missão a 
                valorização e o reconhecimento dos trabalhadores e artífices da economia criativa do carnaval 
                carioca, que em sua maioria ainda atua na informalidade. Tem como principais projetos 
                idealizados: O Prêmio e a Revista Instituto Plumas e Paetês Cultural, cuja edição anual é totalmente 
                gratuita e retrata os bastidores da maior festa cultural do país.
              </p>

              <p className="mb-4">
                Somando-se à sua missão de promover cultura, enaltecer os profissionais que atuam na criação, 
                planejamento e execução do evento, o Prêmio homenageia expoentes do segmento, eternizando sua 
                contribuição para a sociedade brasileira.
              </p>

              <p className="mb-4">
                Ao longo de suas 19 edições, o Instituto Plumas e Paetês Cultural totalizou 1344 premiados, em 51 categorias 
                diferentes contemplando escolas de samba do Grupo Especial, Séries Ouro e Prata, que fazem 
                parte deste universo criativo com inúmeros prestadores de serviços diretos e indiretos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdicaoDetalhe;
