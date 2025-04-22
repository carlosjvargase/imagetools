import React from 'react';

const HeroSection = ({ onTryTools }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explora herramientas visuales interactivas</h1>
          <p className="text-xl text-gray-600 mb-8">
            Creado con el mismo espíritu de innovación que Knight Lab, nuestras herramientas te ayudarán a contar historias visuales impactantes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onTryTools}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Probar herramientas
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Aprender más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;