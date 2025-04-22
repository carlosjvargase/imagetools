import React, { useState, useCallback } from 'react';

const BrandingControls = ({ 
  onDateChange, 
  onLogoChange, 
  onToggleLabels, 
  onToggleDate, 
  onToggleLogo,
  onDescriptionChange,
  onToggleDescription,
  initialValues
}) => {
  const [showLabels, setShowLabels] = useState(initialValues.showLabels);
  const [showDate, setShowDate] = useState(initialValues.showDate);
  const [showLogo, setShowLogo] = useState(initialValues.showLogo);
  const [showDesc, setShowDesc] = useState(initialValues.showDescription);
  const [date, setDate] = useState(initialValues.date);
  const [description, setDescription] = useState(initialValues.description);

  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [onLogoChange]);

  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
    onDateChange(e.target.value);
  }, [onDateChange]);

  const handleToggleLabels = useCallback(() => {
    const newValue = !showLabels;
    setShowLabels(newValue);
    onToggleLabels(newValue);
  }, [showLabels, onToggleLabels]);

  const handleToggleDate = useCallback(() => {
    const newValue = !showDate;
    setShowDate(newValue);
    onToggleDate(newValue);
  }, [showDate, onToggleDate]);

  const handleToggleLogo = useCallback(() => {
    const newValue = !showLogo;
    setShowLogo(newValue);
    onToggleLogo(newValue);
  }, [showLogo, onToggleLogo]);

  const handleToggleDescription = useCallback(() => {
    const newValue = !showDesc;
    setShowDesc(newValue);
    onToggleDescription(newValue);
  }, [showDesc, onToggleDescription]);

  const handleDescriptionChange = useCallback((e) => {
    const value = e.target.value;
    setDescription(value);
    onDescriptionChange(value);
  }, [onDescriptionChange]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Opciones de Branding</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-3 mb-4">
            <input 
              type="checkbox" 
              checked={showLabels}
              onChange={handleToggleLabels}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Mostrar etiquetas</span>
          </label>

          <label className="flex items-center space-x-3 mb-4">
            <input 
              type="checkbox" 
              checked={showDate}
              onChange={handleToggleDate}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Mostrar fecha</span>
          </label>

          {showDate && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de comparación</label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-3 mb-4">
            <input 
              type="checkbox" 
              checked={showLogo}
              onChange={handleToggleLogo}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Mostrar logo</span>
          </label>

          {showLogo && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subir logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full"
              />
            </div>
          )}

          <label className="flex items-center space-x-3 mb-4">
            <input 
              type="checkbox" 
              checked={showDesc}
              onChange={handleToggleDescription}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Mostrar descripción</span>
          </label>

          {showDesc && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandingControls;