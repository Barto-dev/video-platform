import { create } from 'zustand';
import { createSelectors } from './selector'

export const enum ChatVariant {
  CHAT = 'chat',
  COMMUNITY = 'creator',
}

interface ChatSidebar {
  variant: ChatVariant;
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

const useChatSidebarStore = create<ChatSidebar>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));

export const useChatSidebar = createSelectors(useChatSidebarStore);
