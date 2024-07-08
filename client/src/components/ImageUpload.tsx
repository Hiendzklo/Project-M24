// src/user/ImageUpload.tsx
import React, { useState } from 'react';
import { storage } from '../config/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        }, 
        (error) => {
          console.error(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Upload Image
      </button>
      <div className="mt-4">
        {progress > 0 && <progress value={progress} max="100">{progress}%</progress>}
        {url && <div>Uploaded Image: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>}
      </div>
    </div>
  );
};

export default ImageUpload;
