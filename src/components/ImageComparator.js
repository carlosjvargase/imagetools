import React, { useState, useRef, useEffect, useCallback } from 'react';
import ImageUploader from './ImageUploader';
import EmbedCodeGenerator from './EmbedCodeGenerator';
import BrandingControls from './BrandingControls';

const ImageComparator = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [image1, setImage1] = useState({ url: null, label: 'Antes' });
  const [image2, setImage2] = useState({ url: null, label: 'Después' });
  const [logo, setLogo] = useState(null);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [showLabels, setShowLabels] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - containerRect.left, containerRect.width));
    const percent = (x / containerRect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleImage1Change = useCallback((imgData) => {
    setImage1(prev => ({
      ...prev,
      url: imgData?.url || null,
      label: imgData?.label || prev.label
    }));
  }, []);

  const handleImage2Change = useCallback((imgData) => {
    setImage2(prev => ({
      ...prev,
      url: imgData?.url || null,
      label: imgData?.label || prev.label
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => handleMove(e);
    const handleMouseUpGlobal = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Comparador Profesional</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader 
              label="Imagen Antes" 
              onImageChange={handleImage1Change}
              initialValue={image1}
              defaultLabel="Antes"
              onLabelChange={(label) => setImage1(prev => ({...prev, label}))}
            />
            <ImageUploader 
              label="Imagen Después" 
              onImageChange={handleImage2Change}
              initialValue={image2}
              defaultLabel="Después"
              onLabelChange={(label) => setImage2(prev => ({...prev, label}))}
            />
          </div>

          <BrandingControls
            onDateChange={setDate}
            onLogoChange={setLogo}
            onToggleLabels={setShowLabels}
            onToggleDate={setShowDate}
            onToggleLogo={setShowLogo}
            onDescriptionChange={setDescription}
            onToggleDescription={setShowDescription}
            initialValues={{
              showLabels,
              showDate,
              showLogo,
              showDescription,
              date,
              description
            }}
          />

          {image1.url && image2.url && (
            <>
              <div className="relative max-w-4xl mx-auto mb-8">
                <div 
                  ref={containerRef}
                  className="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg"
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={image1.url}
                    alt="Imagen Antes"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                    <img
                      src={image2.url}
                      alt="Imagen Después"
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                      }}
                    />
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                      </svg>
                    </div>
                  </div>

                  {showLabels && (
                    <>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                        {image1.label}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                        {image2.label}
                      </div>
                    </>
                  )}

                  {showDate && date && (
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
                      {new Date(date).toLocaleDateString()}
                    </div>
                  )}

                  {showLogo && logo && (
                    <div className="absolute top-4 right-4">
                      <img src={logo} alt="Logo" className="h-10 opacity-90" />
                    </div>
                  )}

                  {showDescription && description && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md max-w-xs text-center text-sm">
                      {description}
                    </div>
                  )}
                </div>
              </div>

              <EmbedCodeGenerator 
                image1={image1.url} 
                image2={image2.url} 
                label1={image1.label}
                label2={image2.label}
                date={date}
                logo={logo}
                description={description}
                showLabels={showLabels}
                showDate={showDate}
                showLogo={showLogo}
                showDescription={showDescription}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageComparator;

// DONE