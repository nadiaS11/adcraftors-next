"use client"

import { useState, useEffect, useCallback } from "react"

interface Message {
  id: string
  content: string
  sender_type: "user" | "agent"
  sender_name?: string
  created_at: string
  conversation_id: string
}

interface Conversation {
  id: string
  user_email: string
  user_name?: string
  status: string
  created_at: string
  updated_at: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(false)

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client")
        const supabase = createClient()
        setIsSupabaseAvailable(true)
        console.log("[v0] Supabase client created successfully")
      } catch (err) {
        console.log("[v0] Supabase not available:", err)
        setIsSupabaseAvailable(false)
        setError("Chat service is currently unavailable")
      }
    }
    checkSupabase()
  }, [])

  // Start or get existing conversation
  const startConversation = useCallback(
    async (userEmail: string, userName?: string) => {
      if (!isSupabaseAvailable) {
        throw new Error("Chat service is currently unavailable")
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/chat/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: userEmail, user_name: userName }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to start conversation")
        }

        setConversation(data.conversation)
        return data.conversation
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to start conversation"
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [isSupabaseAvailable],
  )

  // Send message
  const sendMessage = useCallback(
    async (content: string, userEmail: string, userName?: string) => {
      if (!isSupabaseAvailable) {
        throw new Error("Chat service is currently unavailable")
      }

      setError(null)

      try {
        let currentConversation = conversation

        // Start conversation if it doesn't exist
        if (!currentConversation) {
          currentConversation = await startConversation(userEmail, userName)
        }

        const response = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: currentConversation?.id,
            content,
            sender_type: "user",
            sender_name: userName,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message")
        }

        // Message will be added via real-time subscription
        return data.message
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send message"
        setError(errorMessage)
        throw err
      }
    },
    [conversation, startConversation, isSupabaseAvailable],
  )

  // Load existing messages
  const loadMessages = useCallback(
    async (conversationId: string) => {
      if (!isSupabaseAvailable) return

      try {
        const response = await fetch(`/api/chat/messages?conversation_id=${conversationId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to load messages")
        }

        setMessages(data.messages)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load messages"
        setError(errorMessage)
      }
    },
    [isSupabaseAvailable],
  )

  // Set up real-time subscriptions
  useEffect(() => {
    if (!conversation || !isSupabaseAvailable) return

    const setupSubscriptions = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client")
        const supabase = createClient()

        // Load existing messages
        loadMessages(conversation.id)

        // Subscribe to new messages
        const messagesChannel = supabase
          .channel(`messages:${conversation.id}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "messages",
              filter: `conversation_id=eq.${conversation.id}`,
            },
            (payload) => {
              const newMessage = payload.new as Message
              setMessages((prev) => {
                // Avoid duplicates
                if (prev.some((msg) => msg.id === newMessage.id)) {
                  return prev
                }
                return [...prev, newMessage]
              })

              // Show typing indicator for agent messages
              if (newMessage.sender_type === "agent") {
                setIsTyping(false)
              }
            },
          )
          .subscribe()

        // Subscribe to conversation updates (for typing indicators)
        const conversationChannel = supabase
          .channel(`conversation:${conversation.id}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "conversations",
              filter: `id=eq.${conversation.id}`,
            },
            (payload) => {
              const updatedConversation = payload.new as Conversation
              setConversation(updatedConversation)
            },
          )
          .subscribe()

        return () => {
          supabase.removeChannel(messagesChannel)
          supabase.removeChannel(conversationChannel)
        }
      } catch (err) {
        console.log("[v0] Failed to setup subscriptions:", err)
      }
    }

    setupSubscriptions()
  }, [conversation, isSupabaseAvailable, loadMessages])

  // Simulate typing indicator (in a real app, this would be triggered by agent activity)
  const simulateTyping = useCallback(() => {
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 3000)
  }, [])

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return {
    messages,
    conversation,
    isLoading,
    error,
    isTyping,
    isOnline,
    isSupabaseAvailable,
    sendMessage,
    startConversation,
    simulateTyping,
  }
}
