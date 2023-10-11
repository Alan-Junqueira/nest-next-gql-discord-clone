import { TModal, useGeneralStore } from "@/store/generalStore";

export const useModal = (modalType: TModal) => {
  const [activeModal, setActiveModal] = useGeneralStore((state) => [
    state.state.modal,
    state.actions.setActiveModal,
  ]);

  const isOpen = activeModal === modalType;

  const openModal = () => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);
  return {
    isOpen,
    openModal,
    closeModal,
  };
};
