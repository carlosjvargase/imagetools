import React, { useState, useCallback } from 'react';

const FaviconGenerator = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [favicons, setFavicons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target.result);
        setFavicons([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleUrlChange = useCallback((e) => {
    const url = e.target.value;
    if (url) {
      setIsLoading(true);
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = (event) => {
            setSourceImage(event.target.result);
            setFavicons([]);
            setIsLoading(false);
          };
          reader.readAsDataURL(blob);
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  const generateFavicons = useCallback(() => {
    if (!sourceImage) return;

    setIsLoading(true);
    
    // Simulación de generación de favicons (en un caso real usarías una librería)
    setTimeout(() => {
      const generatedFavicons = [
        { type: 'ico', size: '16x16', url: 'data:image/x-icon;base64,...' },
        { type: 'png', size: '16x16', url: 'data:image/png;base64,...' },
        { type: 'png', size: '32x32', url: 'data:image/png;base64,...' },
        { type: 'png', size: '180x180', url: 'data:image/png;base64,...' }
      ];

      setFavicons(generatedFavicons);
      
      const code = `
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      `.trim();
      
      setHtmlCode(code);
      setIsLoading(false);
    }, 1500);
  }, [sourceImage]);

  const downloadFavicon = useCallback((favicon) => {
    const link = document.createElement('a');
    link.href = favicon.url;
    link.download = `favicon${favicon.size ? '-' + favicon.size : ''}.${favicon.type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const downloadAll = useCallback(() => {
    // En una implementación real, esto generaría un ZIP con todos los favicons
    favicons.forEach(favicon => {
      downloadFavicon(favicon);
    });
    
    // Descargar instrucciones HTML
    const blob = new Blob([htmlCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'favicon-instructions.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [favicons, htmlCode, downloadFavicon]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generador de Favicons</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subir imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">O pegar URL de imagen</label>
            <input
              type="text"
              placeholder="https://ejemplo.com/logo.png"
              onChange={handleUrlChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <button
            onClick={generateFavicons}
            disabled={!sourceImage || isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium ${(!sourceImage || isLoading) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isLoading ? 'Generando...' : 'Generar Favicons'}
          </button>
          
          {sourceImage && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Vista previa</h3>
              <div className="flex items-center space-x-4">
                <img src={sourceImage} alt="Original" className="w-16 h-16 rounded-lg border border-gray-200" />
                <span className="text-gray-500">→</span>
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {favicons.length > 0 ? (
                    <img src={favicons[0].url} alt="Favicon" className="w-8 h-8" />
                  ) : (
                    <span className="text-gray-400">?</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          {favicons.length > 0 && (
            <>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Favicons generados</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {favicons.map((favicon, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                        <img src={favicon.url} alt={`Favicon ${favicon.size}`} className="max-w-full max-h-full" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">.${favicon.type}</p>
                        <p className="text-xs text-gray-500">{favicon.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFavicon(favicon)}
                      className="mt-2 w-full py-1 px-2 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                    >
                      Descargar
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Código HTML para incluir</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {htmlCode}
                </pre>
              </div>
              
              <button
                onClick={downloadAll}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Descargar Todo (ZIP)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;