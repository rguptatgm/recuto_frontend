import React, { FC, useEffect, useState } from "react";
import "./multi.field.dropdown.editor.component.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import LinkButton from "../link.button.component/link.button.component";
import classNames from "classnames";
import Row from "../../layout.components/row.component/row.component";
import TitleText from "../../text.components/title.text.component/title.text.component";

interface MultiFieldDropdownEditorProps {
  label: string;
  items: any[];
  renderListItem: (item: any, index: number) => React.ReactNode;
  renderPopup: (item: any, index: number | null) => React.ReactNode;
  onSave?: () => Promise<boolean>;
  onAdd?: () => void;
  errorsForArray?: any;
}

const MultiFieldDropdownEditor: FC<MultiFieldDropdownEditorProps> = ({
  label,
  items,
  renderListItem,
  renderPopup,
  onSave,
  onAdd,
  errorsForArray: errors,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // if the user adds a new item, we want to open the popup for that item (the last item in the list)
  useEffect(() => {
    if (isAddingNew) {
      setSelectedIndex(items.length - 1);
      setIsPopupVisible(true);
      setIsAddingNew(false);
    }
  }, [items.length, isAddingNew]);

  const handleAddClick = (): void => {
    if (onAdd) {
      setIsAddingNew(true);
      onAdd();
    }
  };

  const handleListItemClick = (index: number): void => {
    setSelectedIndex(index);
    setIsPopupVisible(true);
  };

  const handleSave = async (): Promise<void> => {
    let shouldClose = true;

    if (onSave) {
      shouldClose = await onSave();
    }

    if (shouldClose) {
      setIsPopupVisible(false);
      setSelectedIndex(null);
    }
  };

  return (
    <div
      className={`multi-field-dropdown-wrapper ${
        selectedIndex === items.length - 1 ? "last-item-selected" : ""
      }`}
    >
      <Row
        className="multi-field-dropdown-header"
        alignItems="center"
        justifyContent="space-between"
      >
        <TitleText>{label}</TitleText>
        {onAdd && (
          <FontAwesomeIcon
            icon={faPlus}
            onClick={handleAddClick}
            style={{ cursor: "pointer" }}
          />
        )}
      </Row>
      {items.map((item, index) => {
        const fieldError = errors?.[index] != null;
        const dropdownItemClassName = classNames({
          "multi-field-dropdown-item": true,
          selected: index === selectedIndex,
          error: fieldError,
        });

        return (
          <div className={dropdownItemClassName} key={`${index}-dropdown-item`}>
            <div onClick={() => handleListItemClick(index)}>
              {renderListItem(item, index)}
            </div>

            {isPopupVisible && index === selectedIndex && (
              <div className="multi-field-popup">
                {renderPopup(item, selectedIndex)}
                <Row justifyContent="flex-end">
                  <LinkButton
                    className="multi-field-popup-save-button"
                    label="Save"
                    onClick={handleSave}
                    type="button"
                  />
                </Row>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiFieldDropdownEditor;
