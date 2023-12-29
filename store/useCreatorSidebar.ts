import { create } from 'zustand';
import { createSelectors } from './selector'

interface CreatorSidebar {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const useCreatorSidebarStore = create<CreatorSidebar>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));

export const useCreatorSidebar = createSelectors(useCreatorSidebarStore);
