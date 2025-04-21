"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { toast } from "sonner";
import DeleteConfirmModal from "@/app/components/DeleteConfirmModal";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "read" | "unread";
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // ... existing fetchMessages function ...

  // ... existing toggleMessageStatus function ...

  // Updated delete message function
  const deleteMessage = async (id: string) => {
    setMessageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!messageToDelete) return;

    const promise = fetch(`/api/messages?id=${messageToDelete}`, {
      method: "DELETE",
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete message");
      }
      setMessages(messages.filter((msg) => msg.id !== messageToDelete));
    });

    toast.promise(promise, {
      loading: "Deleting message...",
      success: "Message deleted successfully",
      error: (err) => err.message || "Failed to delete message",
    });

    setMessageToDelete(null);
  };

  // ... rest of the existing code ...

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border ${
                message.status === "unread"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* ... existing message content ... */}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMessageToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        itemType="message"
      />
    </div>
  );
}
