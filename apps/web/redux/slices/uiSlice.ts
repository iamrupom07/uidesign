import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

export interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalData?: any;
}

export interface UiState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  notifications: Notification[];
  activeModal: ModalState;
}

const initialState: UiState = {
  theme: "system",
  sidebarOpen: true,
  notifications: [],
  activeModal: {
    isOpen: false,
    modalType: null,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UiState["theme"]>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      const id = Date.now().toString();
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    openModal: (state, action: PayloadAction<{ modalType: string; modalData?: any }>) => {
      state.activeModal = {
        isOpen: true,
        modalType: action.payload.modalType,
        modalData: action.payload.modalData,
      };
    },
    closeModal: (state) => {
      state.activeModal = {
        isOpen: false,
        modalType: null,
        modalData: undefined,
      };
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
