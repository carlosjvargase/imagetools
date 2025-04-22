import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold">VisualTools</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Herramientas interactivas inspiradas en Knight Lab para narrativas visuales impactantes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Herramientas</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentación</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Licencia</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} VisualTools. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;