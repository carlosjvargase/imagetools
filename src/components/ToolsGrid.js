import React from 'react';

const ToolsGrid = ({ onSelectTool }) => {
  const tools = [
    {
      id: 1,
      title: 'Comparador de Imágenes',
      description: 'Compara dos imágenes en un mismo marco con un control deslizante.',
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Línea de Tiempo',
      description: 'Crea líneas de tiempo interactivas para narrativas históricas.',
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestras Herramientas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => onSelectTool(tool.id)}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;