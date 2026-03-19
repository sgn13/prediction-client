import { createFileRoute } from '@tanstack/react-router'
import { Verification } from '@/features/auth/message-pages/Verification'

export const Route = createFileRoute('/(auth)/verify/$token')({
  component: Verification,
})
