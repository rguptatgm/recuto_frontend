import { useEffect, useState } from "react";
import Select from "react-select";
import classNames from "classnames";
import "./select.dropdown.component.scss";
import Row from "../../layout.components/row.component/row.component";
import { SmallText } from "../../text.components/small.text.component/small.text.component";
import Image from "../../general.components/image.component/image.component";

interface SelectDropDownProps {
  items: any[];
  onChange?: (value: any, actionMeta?: Select.ActionMeta<any>) => void;
  selectedItem?: any;
  isMulti?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  labelPropertyName?: string;
  valuePropertyName?: string;
  imagePropertyName?: string;
  className?: any;
  isLoading?: boolean;
  showBorder?: boolean;
  menuIsOpen?: boolean;
  validationMessage?: string;
  inputRef?: any;
}

const SelectDropDown = ({
  items,
  onChange,
  selectedItem,
  isMulti = false,
  label,
  placeholder = "Auswählen",
  disabled = false,
  labelPropertyName = "label",
  valuePropertyName = "value",
  imagePropertyName = "image",
  className,
  isLoading = false,
  menuIsOpen,
  validationMessage,
  inputRef,
}: SelectDropDownProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(selectedItem);

  const selectClass = classNames(
    {
      "select-container": true,
      "select-container--disabled": disabled,
    },
    className
  );

  // input label color on validation error
  const inputLabelClass = classNames({
    "select-label": label != null,
    "select-label--error":
      validationMessage != null && validationMessage !== "",
  });

  useEffect(() => {
    if (items == null) {
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (typeof item === "object" && "options" in item) {
        delete item.options;
      }
    }
  }, [items]);

  useEffect(() => {
    // Call initial if undefined
    if (onChange != null && selectedItem == null) {
      onChange(selectedItem);
    }
  }, [selectedItem]);

  const getOptionLabel = (option: any): any => {
    const image = option[imagePropertyName];
    return (
      <Row alignItems="center">
        {image && <Image imageUrl={image} className="mr-15 mt-5 mb-5" />}
        <span>{resolve(labelPropertyName, option)}</span>
      </Row>
    );
  };

  const resolve = (path: string, obj: any): any => {
    return path.split(".").reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, obj || self);
  };

  const buildSelect = (): JSX.Element => {
    return (
      <div className={selectClass}>
        <input {...inputRef} type="hidden" />
        {label != null && <div className={inputLabelClass}>{label}</div>}
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
          isLoading={isLoading}
          menuIsOpen={menuIsOpen}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          getOptionLabel={(option: any) => {
            return getOptionLabel(option);
          }}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          getOptionValue={(option: any) => {
            return resolve(valuePropertyName, option);
          }}
          className="select"
          classNamePrefix="dropdown-selection"
          value={selectedValue ?? null}
          onChange={(val: any) => {
            setSelectedValue(val);

            if (onChange != null) {
              onChange(val);
            }
          }}
          options={items}
          isMulti={isMulti}
          placeholder={placeholder}
          isDisabled={disabled}
        />
        {validationMessage != null && (
          <SmallText className="validation-message ml-5">
            {validationMessage}
          </SmallText>
        )}
      </div>
    );
  };

  return buildSelect();
};

export default SelectDropDown;
