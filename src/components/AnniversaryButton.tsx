
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

const AnniversaryButton = () => {
  const { translate } = useLanguage();
  const [showParticles, setShowParticles] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const colors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#800080"];

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const handleButtonClick = () => {
    setShowParticles(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {showParticles && (
        <Particles
          id="anniversary-particles"
          init={particlesInit}
          options={{
            fullScreen: false,
            style: {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              pointerEvents: "none",
              zIndex: 5,
            },
            emitters: {
              direction: "top",
              position: { x: 50, y: 100 },
              rate: { quantity: 20, delay: 0.2 },
              size: { width: 0, height: 0 },
              life: { duration: 0.5, count: 1 },
            },
            particles: {
              number: { value: 0 },
              color: { value: colors },
              shape: {
                type: ["circle", "square", "polygon"],
                options: {
                  polygon: {
                    sides: 5,
                  },
                },
              },
              opacity: {
                value: 0.8,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
              size: {
                value: { min: 4, max: 8 },
              },
              move: {
                enable: true,
                speed: { min: 5, max: 15 },
                direction: "top",
                outModes: { default: "destroy" },
                gravity: { enable: true, acceleration: 10 },
                drift: { min: -2, max: 2 },
                random: true,
              },
            },
          }}
          className="w-40 h-40 absolute bottom-0 right-0"
        />
      )}

      <button
        onClick={handleButtonClick}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden hover:scale-105 transition-transform shadow-lg focus:outline-none ring-2 ring-yellow-400 hover:ring-4 focus:ring-4"
        aria-label="20 anos Prêmio Plumas & Paetês Cultural"
      >
        <img
          src="/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png"
          alt="20 anos Prêmio Plumas & Paetês Cultural"
          className="w-full h-full object-contain"
        />
      </button>

      {showMessage && (
        <div className="absolute bottom-32 right-0 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center w-60 transform translate-y-2 animate-fade-in">
          <p className="text-lg font-bold mb-2">{translate("parabens20Anos")}</p>
          <a
            href="/edicoes/20-anos"
            className="inline-block px-4 py-2 bg-ppc-purple text-white rounded-full text-sm hover:bg-ppc-purple/90 transition-colors"
          >
            {translate("saibaMais")}
          </a>
        </div>
      )}
    </div>
  );
};

export default AnniversaryButton;
