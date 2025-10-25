
import React from 'react';

const AnniversaryBanner = () => {
  return (
    <div className="inline-block animate-scale-in">
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full animate-pulse" />
        <div className="relative">
          <div className="text-center">
            <div className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-pulse-slow">
              20
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 tracking-[0.3em] drop-shadow-lg">
              ANOS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryBanner;
