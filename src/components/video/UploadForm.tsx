import { useState } from "react";
import axios from "axios";

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (thumbnail) setPreview(thumbnail);
  }, [thumbnail]);

  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState("");

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (thumbnail) setPreview(thumbnail);
  }, [thumbnail]);

  
    if (!file) return alert("Please select a video file.");
    
    formData.append("file", file);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    try {
      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + typeof window !== "undefined" && localStorage.getItem("token")
        }
      });
      alert("Upload successful!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4 border rounded bg-white shadow-md">
      <input value={title} onChange={e => setTitle(e.target.value)} ="Video Title" required className="border px-2 py-1 mr-2" />
      <input value={thumbnail} onBlur={() => setPreview(thumbnail)} onChange={e => setThumbnail(e.target.value)} ="Thumbnail URL" required className="border px-2 py-1 mr-2" />
      <input type="file" accept="video/mp4" onChange={e => setFile(e.target.files?.[0] || null)} required className="mr-2" />
      <button type="submit" type="submit" className="bg-purple-600 text-white px-3 py-1">Upload</button>
    {preview && <img src={preview} alt="Thumbnail preview" className="w-40 h-auto mt-2" />}
</form>
  );
};

export default UploadForm;