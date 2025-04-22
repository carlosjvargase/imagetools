import React, { useState, useCallback, useEffect } from 'react';

const ImageUploader = ({ label, onImageChange, initialValue, defaultLabel, onLabelChange }) => {
  const [imageUrl, setImageUrl] = useState(initialValue?.url || '');
  const [preview, setPreview] = useState(initialValue?.url || null);
  const [customLabel, setCustomLabel] = useState(initialValue?.label || defaultLabel);

  useEffect(() => {
    if (initialValue) {
      setImageUrl(initialValue.url || '');
      setPreview(initialValue.url || null);
      setCustomLabel(initialValue.label || defaultLabel);
    }
  }, [initialValue, defaultLabel]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = {
          url: reader.result,
          label: customLabel
        };
        setPreview(reader.result);
        onImageChange(imageData);
      };
      reader.readAsDataURL(file);
    }
  }, [customLabel, onImageChange]);

  const handleUrlChange = useCallback((e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      const imageData = {
        url: url,
        label: customLabel
      };
      setPreview(url);
      onImageChange(imageData);
    } else {
      setPreview(null);
      onImageChange(null);
    }
  }, [customLabel, onImageChange]);

  const handleLabelChange = useCallback((e) => {
    const newLabel = e.target.value;
    setCustomLabel(newLabel);
    if (preview) {
      onImageChange({
        url: preview,
        label: newLabel
      });
    }
    onLabelChange(newLabel);
  }, [preview, onImageChange, onLabelChange]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="text"
          placeholder="Etiqueta"
          value={customLabel}
          onChange={handleLabelChange}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md w-32"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Pega la URL de la imagen"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={imageUrl}
          onChange={handleUrlChange}
        />
        <div className="text-center text-sm text-gray-500">o</div>
        <div className="flex items-center justify-center">
          <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 w-full">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm text-gray-600">Seleccionar archivo</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;