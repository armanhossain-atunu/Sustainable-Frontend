import { useState } from "react";

type ImgBbResponse = {
  success?: boolean;
  data?: {
    display_url?: string;
    url?: string;
  };
  error?: {
    message?: string;
  };
};

export function useImageUrl() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadSingle(file: File) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = (await response.json()) as ImgBbResponse;
    const uploadedUrl = data.data?.display_url || data.data?.url;

    if (!response.ok || !data.success || !uploadedUrl) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return uploadedUrl;
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError(null);
    setImageUrl(null);

    try {
      const uploadedUrl = await uploadSingle(file);
      setImageUrl(uploadedUrl);
      return uploadedUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }

  async function uploadImages(files: File[]) {
    setUploading(true);
    setError(null);

    try {
      const uploadedUrls = await Promise.all(files.map((file) => uploadSingle(file)));
      if (uploadedUrls.length > 0) {
        setImageUrl(uploadedUrls[0]);
      }
      return uploadedUrls;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }

  return { uploadImage, uploadImages, imageUrl, uploading, error };
}
