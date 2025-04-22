import React, { useState, useRef, useEffect } from 'react';

const EmbedCodeGenerator = ({ 
  image1, 
  image2, 
  label1,
  label2,
  date,
  logo,
  description,
  showLabels,
  showDate,
  showLogo
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef(null);
  const [iframeCode, setIframeCode] = useState('');

  useEffect(() => {
    if (image1 && image2) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('img1', image1);
      currentUrl.searchParams.set('img2', image2);
      currentUrl.searchParams.set('label1', label1);
      currentUrl.searchParams.set('label2', label2);
      if (date) currentUrl.searchParams.set('date', date);
      if (logo) currentUrl.searchParams.set('logo', logo);
      if (description) currentUrl.searchParams.set('description', description);
      currentUrl.searchParams.set('showLabels', showLabels);
      currentUrl.searchParams.set('showDate', showDate);
      currentUrl.searchParams.set('showLogo', showLogo);
      currentUrl.pathname = '/embed';
      
      const code = `<iframe src="${currentUrl.toString()}" width="800" height="500" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;" allowfullscreen></iframe>`;
      setIframeCode(code);
    }
  }, [image1, image2, label1, label2, date, logo, description, showLabels, showDate, showLogo]);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(iframeCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Compartir Comparador</h3>
      <div className="relative">
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code ref={codeRef}>{iframeCode}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-colors ${
            isCopied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCopied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Copia este código y pégalo en tu sitio web para incrustar el comparador con tu configuración actual.
      </p>
    </div>
  );
};

export default EmbedCodeGenerator;

// DONE