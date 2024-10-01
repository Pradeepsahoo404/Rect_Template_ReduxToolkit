import React, { useState, useRef } from 'react';

function ImageDnD({ onImagesChange }) {
  const [images, setImages] = useState([]);
  const [imageDragging, setImageDragging] = useState(null);
  const [imageDropping, setImageDropping] = useState(null);
  const dndRef = useRef(null);

  const humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    onImagesChange(updatedImages);  // Notify parent
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const updatedImages = [...images];
    const removedImage = updatedImages.splice(imageDragging, 1);
    updatedImages.splice(imageDropping, 0, ...removedImage);

    setImages(updatedImages);
    setImageDragging(null);
    setImageDropping(null);
    onImagesChange(updatedImages);  // Notify parent
  };

  const handleDragEnter = (index) => {
    setImageDropping(index);
  };

  const handleDragStart = (index) => {
    setImageDragging(index);
  };

  const loadFile = (file) => {
    return URL.createObjectURL(file);
  };

  const handleAddImages = (e) => {
    const newImages = Array.from(e.target.files).filter((file) =>
      file.type.includes('image/')
    );
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);  // Notify parent
  };

  return (
    <div className="bg-white p-7 rounded w-9/12 mx-auto">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
        <div
          ref={dndRef}
          className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
          onDragOver={(e) => {
            e.preventDefault();
            dndRef.current.classList.add('border-blue-400', 'ring-4', 'ring-inset');
          }}
          onDragLeave={() => {
            dndRef.current.classList.remove('border-blue-400', 'ring-4', 'ring-inset');
          }}
          onDrop={(e) => {
            handleAddImages(e);
            dndRef.current.classList.remove('border-blue-400', 'ring-4', 'ring-inset');
          }}
        >
          <input
            accept="image/*"
            type="file"
            multiple
            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            onChange={handleAddImages}
          />

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              className="w-6 h-6 mr-1 text-current-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="m-0">Drag your image files here or click in this area.</p>
          </div>
        </div>

        {images.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none`}
                style={{ paddingTop: '100%' }}
                draggable="true"
                onDragStart={() => handleDragStart(index)}
                onDragEnd={() => setImageDragging(null)}
                onDragEnter={() => handleDragEnter(index)}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                  type="button"
                  onClick={() => removeImage(index)}
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                <img
                  className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                  src={loadFile(image)}
                  alt="preview"
                />

                <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                  <span className="w-full font-bold text-gray-900 truncate">{image.name}</span>
                  <span className="text-xs text-gray-900">{humanFileSize(image.size)}</span>
                </div>

                {imageDropping === index && imageDragging !== index && (
                  <div className="absolute inset-0 z-40 transition-colors duration-300 bg-blue-200 bg-opacity-80"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageDnD;
