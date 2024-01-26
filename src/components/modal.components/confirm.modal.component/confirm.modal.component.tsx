import { inject, observer } from "mobx-react";
import { ModalStore } from "../../../stores/modal.store";
import Column from "../../layout.components/column.component/column.component";
import Row from "../../layout.components/row.component/row.component";
import FilledButton from "../../input.components/filled.button.component/filled.button.component";
import ModalHeader from "../modal.header.component/modal.header.component";

interface ConfirmModalProps {
  modalStore?: ModalStore;
}

const ConfirmModal = ({ modalStore }: ConfirmModalProps): JSX.Element => {
  const { onConfirm, confirmLabel, title, description, onCancel, cancelLabel } =
    modalStore?.customData || {};

  return (
    <Column>
      <ModalHeader title={title} description={description}>
        <Row justifyContent="flex-end" alignItems="center">
          {onCancel != null && cancelLabel != null && (
            <FilledButton
              className="mr-10"
              label={cancelLabel}
              onClick={() => {
                if (cancelLabel) onCancel();
                modalStore?.closeModal();
              }}
            />
          )}
          <FilledButton
            color={
              onCancel != null && cancelLabel != null ? "primary" : "secondary"
            }
            label={confirmLabel}
            onClick={() => {
              if (onConfirm) onConfirm();
              modalStore?.closeModal();
            }}
          />
        </Row>
      </ModalHeader>
    </Column>
  );
};

export default inject("modalStore")(observer(ConfirmModal));
