import { create } from 'zustand';
import { createSelectors } from './selector'

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));

export const useSidebar = createSelectors(useSidebarStore);
