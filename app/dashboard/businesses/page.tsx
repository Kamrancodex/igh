"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import DeleteConfirmModal from "@/app/components/DeleteConfirmModal";

interface Brand {
  _id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    link: "",
    socials: {
      instagram: "",
      facebook: "",
      twitter: "",
      website: "",
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    console.log("fetching brands");

    try {
      const res = await fetch("/api/businesses");
      if (!res.ok) {
        throw new Error("Failed to fetch brands");
      }
      const data = await res.json();
      // Ensure we're getting an array and mapping the data correctly
      const validBrands = Array.isArray(data) ? data : [];
      setBrands(
        validBrands.map((brand: any) => ({
          _id: brand._id,
          name: brand.name,
          image: brand.image,
          description: brand.description,
          link: brand.link,
          socials: brand.socials || {},
        }))
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load brands";
      toast.error(errorMessage);
      setError(errorMessage);
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.link.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      image: formData.image,
      description: formData.description.trim(),
      link: formData.link.trim(),
      socials: formData.socials,
    };

    const promise = fetch("/api/businesses", {
      method: editingBrand ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        editingBrand ? { ...submitData, id: editingBrand._id } : submitData
      ),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await fetchBrands();
      setIsModalOpen(false);
      resetForm();
    });

    toast.promise(promise, {
      loading: editingBrand ? "Updating brand..." : "Creating brand...",
      success: editingBrand
        ? "Brand updated successfully!"
        : "Brand created successfully!",
      error: (err) => err.message || "Operation failed",
    });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    setBrandToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!brandToDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    const promise = fetch(`/api/businesses?id=${brandToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchBrands();
    });

    toast.promise(promise, {
      loading: "Deleting brand...",
      success: "Brand deleted successfully!",
      error: (err) => err.message || "Failed to delete brand",
    });
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      image: brand.image,
      description: brand.description,
      link: brand.link,
      socials: {
        instagram: brand.socials?.instagram || "",
        facebook: brand.socials?.facebook || "",
        twitter: brand.socials?.twitter || "",
        website: brand.socials?.website || "",
      },
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingBrand(null);
    setFormData({
      name: "",
      image: "",
      description: "",
      link: "",
      socials: {
        instagram: "",
        facebook: "",
        twitter: "",
        website: "",
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Brand
        </button>
      </div>

      {brands.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No brands found. Add your first brand!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.socials?.website && (
                    <a
                      href={brand.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  )}
                  {brand.socials?.instagram && (
                    <a
                      href={brand.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                  {brand.socials?.facebook && (
                    <a
                      href={brand.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                  {brand.socials?.twitter && (
                    <a
                      href={brand.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingBrand ? "Edit Brand" : "Add Brand"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image Upload
                </label>
                <div className="mt-1">
                  <UploadButton<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        setFormData((prev) => ({ ...prev, image: res[0].url }));
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.socials.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          instagram: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={formData.socials.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          facebook: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={formData.socials.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          twitter: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="text"
                    value={formData.socials.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: {
                          ...formData.socials,
                          website: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
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
                  {editingBrand ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBrandToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Brand"
        message="Are you sure you want to delete this brand? This action cannot be undone."
        itemType="brand"
      />
    </div>
  );
}
