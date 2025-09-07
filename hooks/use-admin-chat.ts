"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

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
  message_count?: number
  last_message?: string
}

interface ChatStats {
  active: number
  waiting: number
  closed: number
  total: number
}

export function useAdminChat(agentId: string, selectedConversationId: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<ChatStats>({ active: 0, waiting: 0, closed: 0, total: 0 })

  const supabase = createClient()

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          *,
          messages(content, created_at)
        `,
        )
        .order("updated_at", { ascending: false })

      if (error) throw error

      const conversationsWithStats = data.map((conv: any) => ({
        ...conv,
        message_count: conv.messages?.length || 0,
        last_message: conv.messages?.[conv.messages.length - 1]?.content || null,
      }))

      setConversations(conversationsWithStats)

      // Calculate stats
      const newStats = conversationsWithStats.reduce(
        (acc: ChatStats, conv: Conversation) => {
          acc.total++
          if (conv.status === "active") acc.active++
          else if (conv.status === "waiting") acc.waiting++
          else if (conv.status === "closed") acc.closed++
          return acc
        },
        { active: 0, waiting: 0, closed: 0, total: 0 },
      )

      setStats(newStats)
    } catch (error) {
      console.error("Error loading conversations:", error)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  // Load messages for selected conversation
  const loadMessages = useCallback(
    async (conversationId: string) => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error("Error loading messages:", error)
      }
    },
    [supabase],
  )

  // Send message as agent
  const sendMessage = useCallback(
    async (content: string) => {
      if (!selectedConversationId) return

      try {
        const response = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: selectedConversationId,
            content,
            sender_type: "agent",
            sender_name: "Support Agent",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to send message")
        }
      } catch (error) {
        console.error("Error sending message:", error)
        throw error
      }
    },
    [selectedConversationId],
  )

  // Update conversation status
  const updateConversationStatus = useCallback(
    async (status: string) => {
      if (!selectedConversationId) return

      try {
        const { error } = await supabase
          .from("conversations")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("id", selectedConversationId)

        if (error) throw error

        // Update local state
        setConversations((prev) =>
          prev.map((conv) => (conv.id === selectedConversationId ? { ...conv, status } : conv)),
        )
      } catch (error) {
        console.error("Error updating conversation status:", error)
        throw error
      }
    },
    [selectedConversationId, supabase],
  )

  // Set up real-time subscriptions
  useEffect(() => {
    loadConversations()

    // Subscribe to conversation changes
    const conversationsChannel = supabase
      .channel("admin-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          loadConversations()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(conversationsChannel)
    }
  }, [supabase, loadConversations])

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      loadMessages(selectedConversationId)

      // Subscribe to messages for selected conversation
      const messagesChannel = supabase
        .channel(`admin-messages-${selectedConversationId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversationId}`,
          },
          (payload) => {
            const newMessage = payload.new as Message
            setMessages((prev) => {
              if (prev.some((msg) => msg.id === newMessage.id)) {
                return prev
              }
              return [...prev, newMessage]
            })
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(messagesChannel)
      }
    }
  }, [selectedConversationId, supabase, loadMessages])

  return {
    conversations,
    messages,
    isLoading,
    stats,
    sendMessage,
    updateConversationStatus,
  }
}
