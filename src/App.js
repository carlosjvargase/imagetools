import React, { useState } from 'react';
import ImageComparator from './components/ImageComparator';
import ImageOptimizer from './components/ImageOptimizer';
import FaviconGenerator from './components/FaviconGenerator';
import ColorPaletteGenerator from './components/ColorPaletteGenerator';
import ToolSelector from './components/ToolSelector';

const App = () => {
  const [activeTool, setActiveTool] = useState('comparator');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Ultimate Image Tools</h1>
        <p className="text-center text-gray-600 mb-8">Suite profesional para diseño y desarrollo web</p>
        
        <ToolSelector activeTool={activeTool} setActiveTool={setActiveTool} />
        
        {activeTool === 'comparator' && <ImageComparator />}
        {activeTool === 'optimizer' && <ImageOptimizer />}
        {activeTool === 'favicon' && <FaviconGenerator />}
        {activeTool === 'palette' && <ColorPaletteGenerator />}
      </div>
    </div>
  );
};

export default App;

// DONE