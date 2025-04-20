"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { toast } from "sonner";

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

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      const errorMessage = "Failed to load messages";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark message as read/unread
  const toggleMessageStatus = async (
    id: string,
    currentStatus: "read" | "unread"
  ) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";
    const promise = fetch(`/api/messages?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update message status");
      }
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
    });

    toast.promise(promise, {
      loading: "Updating message status...",
      success: `Message marked as ${newStatus}`,
      error: (err) => err.message || "Failed to update message status",
    });
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const promise = fetch(`/api/messages?id=${id}`, {
      method: "DELETE",
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete message");
      }
      setMessages(messages.filter((msg) => msg.id !== id));
    });

    toast.promise(promise, {
      loading: "Deleting message...",
      success: "Message deleted successfully",
      error: (err) => err.message || "Failed to delete message",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={fetchMessages}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

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
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{message.name}</h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      toggleMessageStatus(message.id, message.status)
                    }
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title={
                      message.status === "read"
                        ? "Mark as unread"
                        : "Mark as read"
                    }
                  >
                    {message.status === "read" ? (
                      <FaEnvelopeOpen className="text-gray-600" />
                    ) : (
                      <FaEnvelope className="text-blue-600" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors"
                    title="Delete message"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </div>

              {message.subject && (
                <p className="font-medium mb-2">{message.subject}</p>
              )}

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
    </div>
  );
}
