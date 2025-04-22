import React, { useState, useCallback } from 'react';

const ImageOptimizer = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setOriginalSize(file.size);
        setOptimizedImage(null);
        setOptimizedSize(0);
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
            setOriginalImage(event.target.result);
            setOriginalSize(blob.size);
            setOptimizedImage(null);
            setOptimizedSize(0);
            setIsLoading(false);
          };
          reader.readAsDataURL(blob);
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  const optimizeImage = useCallback(() => {
    if (!originalImage) return;

    setIsLoading(true);
    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          setOptimizedImage(reader.result);
          setOptimizedSize(blob.size);
          setIsLoading(false);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', compressionLevel);
    };
  }, [originalImage, compressionLevel]);

  const downloadImage = useCallback(() => {
    if (!optimizedImage) return;
    
    const link = document.createElement('a');
    link.href = optimizedImage;
    link.download = `optimized-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [optimizedImage]);

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Optimizador de Imágenes</h2>
      
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">O pegar URL de imagen</label>
            <input
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              onChange={handleUrlChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de compresión: {Math.round(compressionLevel * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Máxima calidad</span>
              <span>Máxima compresión</span>
            </div>
          </div>
          
          <button
            onClick={optimizeImage}
            disabled={!originalImage || isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium ${(!originalImage || isLoading) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isLoading ? 'Optimizando...' : 'Optimizar Imagen'}
          </button>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Resultados</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Original</p>
                <p className="font-medium">{formatFileSize(originalSize)}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Optimizado</p>
                <p className="font-medium">{optimizedSize ? formatFileSize(optimizedSize) : '-'}</p>
              </div>
            </div>
            
            {optimizedImage && (
              <button
                onClick={downloadImage}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Descargar Imagen Optimizada
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {originalImage && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Original</p>
                <img src={originalImage} alt="Original" className="w-full h-auto rounded-lg border border-gray-200" />
              </div>
            )}
            {optimizedImage && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Optimizada</p>
                <img src={optimizedImage} alt="Optimizada" className="w-full h-auto rounded-lg border border-gray-200" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizer;