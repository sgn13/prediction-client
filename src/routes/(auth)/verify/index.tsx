import { createFileRoute } from '@tanstack/react-router'
import { SuccessfulVerification } from '@/features/auth/message-pages/SuccessfulVerification'

export const Route = createFileRoute('/(auth)/verify/')({
  component: SuccessfulVerification,
})
