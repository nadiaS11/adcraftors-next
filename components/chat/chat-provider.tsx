"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
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
}

interface ChatContextType {
  messages: Message[]
  conversation: Conversation | null
  isTyping: boolean
  isOnline: boolean
  sendMessage: (content: string, userEmail: string, userName?: string) => Promise<void>
  startConversation: (userEmail: string, userName?: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const supabase = createClient()

  const startConversation = async (userEmail: string, userName?: string) => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_email: userEmail,
          user_name: userName,
          status: "active",
        })
        .select()
        .single()

      if (error) throw error
      setConversation(data)
    } catch (error) {
      console.error("Error starting conversation:", error)
    }
  }

  const sendMessage = async (content: string, userEmail: string, userName?: string) => {
    try {
      const currentConversation = conversation

      if (!currentConversation) {
        await startConversation(userEmail, userName)
        // Wait for conversation to be set
        return
      }

      const { error } = await supabase.from("messages").insert({
        conversation_id: currentConversation.id,
        sender_type: "user",
        sender_name: userName,
        content,
      })

      if (error) throw error
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // Subscribe to real-time messages
  useEffect(() => {
    if (!conversation) return

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversation, supabase])

  // Load existing messages when conversation is set
  useEffect(() => {
    if (!conversation) return

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Error loading messages:", error)
        return
      }

      setMessages(data || [])
    }

    loadMessages()
  }, [conversation, supabase])

  const value: ChatContextType = {
    messages,
    conversation,
    isTyping,
    isOnline,
    sendMessage,
    startConversation,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
