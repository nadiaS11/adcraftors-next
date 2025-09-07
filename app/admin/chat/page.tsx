import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminChatDashboard } from "@/components/admin/admin-chat-dashboard"

export default async function AdminChatPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Check if user is an agent
  const { data: agent } = await supabase.from("agents").select("*").eq("id", user.id).single()

  if (!agent) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Chat Dashboard</h1>
          <p className="text-muted-foreground">Manage customer conversations and support requests</p>
        </div>
        <AdminChatDashboard agentId={user.id} agentName={agent.name} />
      </div>
    </div>
  )
}
