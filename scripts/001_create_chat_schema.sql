-- Drop existing tables if they exist (to restart cleanly)
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.agents CASCADE;

-- Drop function if exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create chat conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'waiting')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'agent')),
  sender_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agents table for admin users
CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Anyone can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own conversations" ON public.conversations
  FOR SELECT USING (
    user_email = current_setting('request.jwt.claims', true)::json->>'email' 
    OR EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = auth.uid() AND agents.is_active = true
    )
  );

CREATE POLICY "Agents can update conversations" ON public.conversations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = auth.uid() AND agents.is_active = true
    )
  );

-- RLS Policies for messages
CREATE POLICY "Anyone can create messages" ON public.messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view messages in their conversations" ON public.messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
    OR EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = auth.uid() AND agents.is_active = true
    )
  );

-- RLS Policies for agents (FIXED - no more infinite recursion)
CREATE POLICY "Authenticated users can view active agents" ON public.agents
  FOR SELECT USING (auth.uid() IS NOT NULL AND is_active = true);

CREATE POLICY "Agents can insert themselves" ON public.agents
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Agents can update themselves" ON public.agents
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_email ON public.conversations(user_email);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON public.conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON public.conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON public.agents(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_conversations_updated_at 
  BEFORE UPDATE ON public.conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();