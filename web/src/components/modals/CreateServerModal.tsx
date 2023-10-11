'use client'

import { useModal } from '@/hooks/useModal'

export const CreateServerModal = () => {
  const {isOpen, closeModal} = useModal('CreateServer')
  return (
    <div>CreateServerModal</div>
  )
}
