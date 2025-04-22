import React from 'react';

const ToolSelector = ({ activeTool, setActiveTool }) => {
  return (
    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
      <button
        className={`px-4 py-2 font-medium whitespace-nowrap ${activeTool === 'comparator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTool('comparator')}
      >
        Comparador
      </button>
      <button
        className={`px-4 py-2 font-medium whitespace-nowrap ${activeTool === 'optimizer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTool('optimizer')}
      >
        Optimizador
      </button>
      <button
        className={`px-4 py-2 font-medium whitespace-nowrap ${activeTool === 'favicon' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTool('favicon')}
      >
        Favicon
      </button>
      <button
        className={`px-4 py-2 font-medium whitespace-nowrap ${activeTool === 'palette' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTool('palette')}
      >
        Paleta de Colores
      </button>
    </div>
  );
};

export default ToolSelector;