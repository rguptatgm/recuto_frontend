import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";

export enum ModalType {
  INVISIBLE = "INVISIBLE",
  CONFIRM_MODAL = "CONFIRM_MODAL",
}

export enum ModalSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface NavigateData {
  path: string;
  navigate: NavigateFunction;
  title: string;
  description: string;
}

export class ModalStore {
  //! Properties
  currentModal: ModalType = ModalType.INVISIBLE;
  size: ModalSize = ModalSize.MEDIUM;
  customData: any;
  navigateData: NavigateData | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  //! Methods
  openModal = (
    type: ModalType,
    size: ModalSize = ModalSize.MEDIUM,
    customData?: any
  ): void => {
    this.currentModal = type;
    this.customData = customData;
    this.size = size;
  };

  closeModal = (): void => {
    this.currentModal = ModalType.INVISIBLE;
  };

  showConfirmAlert = (args: {
    onConfirm: () => void | Promise<void>;
    confirmLabel: string;
    title: string;
    description: string;
    onCancel?: () => void;
    cancelLabel?: string;
  }): void => {
    this.currentModal = ModalType.CONFIRM_MODAL;
    this.customData = {
      onConfirm: args.onConfirm,
      confirmLabel: args.confirmLabel,
      title: args.title,
      description: args.description,
      onCancel: args.onCancel,
      cancelLabel: args.cancelLabel,
    };
    this.size = ModalSize.SMALL;
  };
}
