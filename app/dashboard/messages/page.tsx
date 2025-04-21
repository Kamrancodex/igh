"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { toast } from "sonner";
import DeleteConfirmModal from "@/app/components/DeleteConfirmModal";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "read" | "unread";
  isArchived: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch messages");
      }

      setMessages(data.messages || []);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch messages";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMessageStatus = async (
    messageId: string,
    currentStatus: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const newStatus = currentStatus === "read" ? "unread" : "read";
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: messageId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message status");
      }

      setMessages(
        messages.map((msg) =>
          msg._id === messageId ? { ...msg, status: newStatus } : msg
        )
      );

      toast.success(`Message marked as ${newStatus}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update message status";
      toast.error(errorMessage);
    }
  };

  const handleConfirmDelete = async () => {
    if (!messageToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: messageToDelete,
          isArchived: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to archive message");
      }

      setMessages(messages.filter((msg) => msg._id !== messageToDelete));
      toast.success("Message archived successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to archive message";
      toast.error(errorMessage);
    } finally {
      setMessageToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) return <div className="p-6">Loading messages...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-4 rounded-lg border ${
                message.status === "unread"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{message.name}</h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  {message.phone && (
                    <p className="text-sm text-gray-600">{message.phone}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      toggleMessageStatus(message._id, message.status)
                    }
                    className="text-gray-600 hover:text-blue-600"
                    title={
                      message.status === "read"
                        ? "Mark as unread"
                        : "Mark as read"
                    }
                  >
                    {message.status === "read" ? (
                      <FaEnvelopeOpen size={18} />
                    ) : (
                      <FaEnvelope size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setMessageToDelete(message._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-gray-600 hover:text-red-600"
                    title="Archive message"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMessageToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Archive Message"
        message="Are you sure you want to archive this message? You can view archived messages in the archive section."
        itemType="message"
      />
    </div>
  );
}
