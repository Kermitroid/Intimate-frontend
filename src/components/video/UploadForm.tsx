import { useState } from 'react';
import { uploadVideo } from '../../lib/api/videos';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', file);

    try {
      await uploadVideo(formData);
      navigate('/');
    } catch (err) {
      alert('Video upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;