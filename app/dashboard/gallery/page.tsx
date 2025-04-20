"use client";

import { useState, useEffect } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { toast } from "sonner";

type Size = "small" | "medium" | "large";
type Position =
  | "top-left"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-right";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  size: Size;
  position: Position;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    size: "medium" as Size,
    position: "top-left" as Position,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchGalleryItems = async (pageNum = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/gallery?page=${pageNum}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }
      const data = await response.json();
      const validItems = data.images
        .filter((item: any) => item.category && item.category.trim() !== "")
        .map((item: any) => ({
          ...item,
          size: item.size || "medium",
          position: item.position || "center",
          category: item.category || "uncategorized",
        }));

      if (pageNum === 1) {
        setGalleryItems(validItems);
      } else {
        setGalleryItems((prev) => [...prev, ...validItems]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch gallery items";
      console.error("Error fetching gallery items:", error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
    await fetchGalleryItems(page + 1);
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    if (
      !formData.title.trim() ||
      !formData.image.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      image: formData.image,
      description: formData.description.trim(),
      category: formData.category.trim(),
      size: formData.size || "medium",
      position: formData.position || "center",
    };

    const promise = fetch("/api/gallery", {
      method: editingItem?._id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        editingItem?._id ? { ...submitData, id: editingItem._id } : submitData
      ),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save gallery item");
      }
      await fetchGalleryItems();
      setIsModalOpen(false);
      setEditingItem(null);
      resetForm();
    });

    toast.promise(promise, {
      loading: editingItem?._id
        ? "Updating gallery item..."
        : "Creating gallery item...",
      success: editingItem?._id
        ? "Gallery item updated successfully!"
        : "Gallery item created successfully!",
      error: (err) => err.message || "Failed to save gallery item",
    });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    const promise = fetch(`/api/gallery?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchGalleryItems();
    });

    toast.promise(promise, {
      loading: "Deleting gallery item...",
      success: "Gallery item deleted successfully!",
      error: (err) => err.message || "Failed to delete gallery item",
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image,
      description: item.description,
      category: item.category,
      size: item.size || "medium",
      position: item.position || "top-left",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      image: "",
      description: "",
      category: "",
      size: "medium",
      position: "top-left",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Gallery</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Gallery Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <span className="px-2 py-1 bg-black/50 text-white rounded text-sm">
                  {item.category}
                </span>
                {item.size && (
                  <span className="px-2 py-1 bg-black/50 text-white rounded text-sm">
                    {item.size}
                  </span>
                )}
                {item.position && (
                  <span className="px-2 py-1 bg-black/50 text-white rounded text-sm">
                    {item.position}
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={editingItem?.size || "medium"}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev!,
                      size: e.target.value as Size,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  value={editingItem?.position || "center"}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev!,
                      position: e.target.value as Position,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="center">Center</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image Upload
                  </label>
                  <div className="mt-1">
                    <UploadButton<OurFileRouter, "imageUploader">
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          setFormData((prev) => ({
                            ...prev,
                            image: res[0].url,
                          }));
                        }
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                        setError("Upload failed: " + error.message);
                      }}
                      appearance={{
                        button:
                          "bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700",
                        allowedContent: "text-gray-600 text-sm",
                      }}
                    />
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 w-auto object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
