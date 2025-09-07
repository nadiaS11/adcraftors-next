"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConversationList } from "./conversation-list"
import { ChatInterface } from "./chat-interface"
import { useAdminChat } from "@/hooks/use-admin-chat"

interface AdminChatDashboardProps {
  agentId: string
  agentName: string
}

export function AdminChatDashboard({ agentId, agentName }: AdminChatDashboardProps) {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const { conversations, messages, isLoading, sendMessage, updateConversationStatus, stats } = useAdminChat(
    agentId,
    selectedConversationId,
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Stats Cards */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Waiting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.waiting}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                {conversations.length} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversationId}
              onSelect={setSelectedConversationId}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-full">
          {selectedConversationId ? (
            <ChatInterface
              conversationId={selectedConversationId}
              messages={messages}
              agentName={agentName}
              onSendMessage={sendMessage}
              onUpdateStatus={updateConversationStatus}
              conversation={conversations.find((c) => c.id === selectedConversationId)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">Select a conversation</div>
                <div className="text-sm">Choose a conversation from the list to start chatting</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
