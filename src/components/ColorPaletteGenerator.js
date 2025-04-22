import React, { useState, useCallback, useEffect, useRef } from 'react';

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const paletteRef = useRef(null);

  const generateVibrantColor = useCallback(() => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30);
    const lightness = 40 + Math.floor(Math.random() * 30);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, []);

  const generateNewPalette = useCallback(() => {
    const newPalette = palette.map((color, index) => {
      return lockedColors.includes(index) ? color : generateVibrantColor();
    });
    
    if (newPalette.length === 0) {
      setPalette(Array(5).fill().map(() => generateVibrantColor()));
    } else {
      setPalette(newPalette);
    }
  }, [palette, lockedColors, generateVibrantColor]);

  const toggleLockColor = useCallback((index) => {
    setLockedColors(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  }, []);

  const copyToClipboard = useCallback((color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleDragStart = useCallback((index) => {
    if (lockedColors.includes(index)) {
      setDraggedIndex(index);
    }
  }, [lockedColors]);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newPalette = [...palette];
    const draggedColor = newPalette[draggedIndex];
    
    newPalette.splice(draggedIndex, 1);
    newPalette.splice(index, 0, draggedColor);
    
    setPalette(newPalette);
    setLockedColors(prev => {
      const newLocked = [...prev];
      const draggedPos = newLocked.indexOf(draggedIndex);
      if (draggedPos !== -1) {
        newLocked.splice(draggedPos, 1);
        newLocked.push(index);
        return newLocked.sort((a, b) => a - b);
      }
      return prev;
    });
    
    setDraggedIndex(index);
  }, [draggedIndex, palette]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const downloadPaletteAsImage = useCallback(() => {
    alert('En una implementación completa, esto generaría una imagen de la paleta');
  }, []);

  const exportPaletteAsText = useCallback(() => {
    const paletteText = palette.map((color, index) => 
      `Color ${index + 1}: ${color} ${lockedColors.includes(index) ? '(Bloqueado)' : ''}`
    ).join('\n');
    
    const blob = new Blob([paletteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'paleta-de-colores.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [palette, lockedColors]);

  useEffect(() => {
    generateNewPalette();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generador de Paletas de Colores</h2>
      
      <div className="mb-6">
        <div 
          ref={paletteRef}
          className="flex h-40 rounded-lg overflow-hidden shadow-lg"
        >
          {palette.map((color, index) => (
            <div 
              key={index}
              className={`flex-1 relative group transition-all duration-200 ${draggedIndex === index ? 'scale-105 z-10 shadow-xl' : ''}`}
              style={{ backgroundColor: color }}
              draggable={lockedColors.includes(index)}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <button
                onClick={() => toggleLockColor(index)}
                className={`absolute top-2 right-2 p-2 rounded-full ${lockedColors.includes(index) ? 'bg-white text-gray-900' : 'bg-gray-900 bg-opacity-30 text-white'}`}
              >
                {lockedColors.includes(index) ? '🔒' : '🔓'}
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center">
                <button 
                  onClick={() => copyToClipboard(color, index)}
                  className="text-sm font-medium"
                >
                  {copiedIndex === index ? '¡Copiado!' : color}
                </button>
              </div>

              {lockedColors.includes(index) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    Arrastra para mover
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={generateNewPalette}
          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
        >
          Generar Nueva Paleta
        </button>
        
        <button
          onClick={downloadPaletteAsImage}
          className="py-3 px-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
        >
          Descargar como Imagen
        </button>
        
        <button
          onClick={exportPaletteAsText}
          className="py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
        >
          Exportar como Texto
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Guía Rápida</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🔓 Click en el candado para bloquear/desbloquear un color</li>
          <li>🖱️ Click en el código de color para copiarlo</li>
          <li>↔️ Arrastra colores bloqueados para reordenarlos</li>
          <li>🎨 Los colores se generan automáticamente en tonos vibrantes</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;

// DONE