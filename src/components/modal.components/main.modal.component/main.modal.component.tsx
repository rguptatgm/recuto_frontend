import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from "mobx-react";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import "./main.modal.component.scss";
import { ModalStore, ModalType } from "../../../stores/modal.store";
import classNames from "classnames";
import ConfirmModal from "../confirm.modal.component/confirm.modal.component";

interface MainModalProps {
  modalStore?: ModalStore;
}

const MainModal = ({ modalStore }: MainModalProps): JSX.Element => {
  const mainModalClassName = classNames({
    "main-modal-container": true,
    [`main-modal-container-${modalStore?.size ?? "medium"}`]: true,
  });

  const getComponentForPath = (): JSX.Element => {
    switch (modalStore?.currentModal) {
      case ModalType.CONFIRM_MODAL:
        return <ConfirmModal />;

      // Add more modals here

      default:
        return <></>;
    }
  };

  if (modalStore?.currentModal === ModalType.INVISIBLE) {
    return <></>;
  }

  return (
    <div className="main-modal-background-container">
      <div className="main-modal-background-container-blur">
        <div className={mainModalClassName}>
          <FontAwesomeIcon
            onClick={() => {
              modalStore?.closeModal();
            }}
            className="main-modal-container-close-icon"
            icon={faXmark}
          />
          {getComponentForPath()}
        </div>
      </div>
    </div>
  );
};

export default inject("modalStore")(observer(MainModal));
