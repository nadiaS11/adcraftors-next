"use client"

import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Clock } from "lucide-react"

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

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  isLoading: boolean
}

export function ConversationList({ conversations, selectedId, onSelect, isLoading }: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No conversations yet</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-2 space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedId === conversation.id ? "bg-muted border-2 border-primary/20" : "border border-transparent"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{conversation.user_name || conversation.user_email}</div>
                {conversation.user_name && (
                  <div className="text-xs text-muted-foreground truncate">{conversation.user_email}</div>
                )}
              </div>
              <Badge
                variant={
                  conversation.status === "active"
                    ? "default"
                    : conversation.status === "waiting"
                      ? "secondary"
                      : "outline"
                }
                className="text-xs ml-2"
              >
                {conversation.status}
              </Badge>
            </div>

            {conversation.last_message && (
              <div className="text-xs text-muted-foreground mb-2 line-clamp-2">{conversation.last_message}</div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
              </div>
              {conversation.message_count && <div className="text-xs">{conversation.message_count} messages</div>}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
