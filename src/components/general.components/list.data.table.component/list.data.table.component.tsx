import React from "react";
import classNames from "classnames";
import "./list.data.table.component.scss";
import Skeleton from "react-loading-skeleton";
import Column from "../../layout.components/column.component/column.component";
import Row from "../../layout.components/row.component/row.component";
import Spacer from "../../layout.components/spacer.component/spacer.component";
import { LargeTextSkeleton } from "../../text.components/large.text.component/large.text.component";
import { RunningText } from "../../text.components/running.text.component/running.text.component";
import { SmallTextSkeleton } from "../../text.components/small.text.component/small.text.component";
import SortableList from "../sortable.list.component/sortable.list.component";

interface DataTableHeader {
  flex?: number;
  child?: JSX.Element;
}

interface DataRow {
  children: DataTableRowCell[];
  className?: string;
  key: string;
}

interface DataTableRowCell {
  child: JSX.Element;
  className?: string;
}

interface ListDataTableProps<T> {
  data: T[];
  columns: DataTableHeader[];
  dataTableItemBuilder: (data: T, index: number) => DataRow;
  itemClassName?: string;
  tableClassName?: string;
  onClick?: (data: T) => void;
  gap?: number;
  disableHeader?: boolean;
  sortable?: boolean;
  onSortEnd?: (oldIndex: number, newIndex: number) => void;
  noDataMessage?: string;
  isLoading?: boolean;
}

const ListDataTable = <T extends unknown>({
  data,
  columns,
  gap = 0,
  dataTableItemBuilder,
  itemClassName,
  tableClassName,
  onClick,
  disableHeader = false,
  sortable = false,
  onSortEnd,
  noDataMessage,
  isLoading,
}: ListDataTableProps<T>): JSX.Element => {
  const listDataTableClassName = classNames(
    {
      "list-data-table": true,
    },
    tableClassName
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _prepareHeader = (): JSX.Element => {
    const headersAreSet = columns.find((column) => column.child != null);

    if (!headersAreSet) {
      return <></>;
    }

    return (
      <div className="list-data-table-header" style={{ gap: gap ?? 0 }}>
        {columns.map((column, index) => {
          return (
            <div
              key={index}
              className={"list-data-table-header-item"}
              style={{
                flex: column.flex ?? 1,
              }}
            >
              {column.child}
            </div>
          );
        })}
      </div>
    );
  };

  const _prepareRows = (): JSX.Element => {
    return (
      <div className="list-data-table-body">
        <div className="list-data-table-body-item-wrapper">
          {isLoading && <SkeletonListDataTableItem count={4} />}

          {!isLoading &&
            noDataMessage != null &&
            (data == null || data.length === 0) && (
              <div className="list-data-table-body-item">
                <RunningText>{noDataMessage}</RunningText>
              </div>
            )}

          {!isLoading &&
            data.map((dataItem: any, index) => {
              if (dataItem == null) {
                return <></>;
              }
              return (
                <React.Fragment key={dataItem.key || index}>
                  {_prepareDataTableItem(
                    dataTableItemBuilder(dataItem, index),
                    dataItem
                  )}
                  {index !== data.length - 1 && (
                    <div className="list-data-table-body-item-separator" />
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  };

  const _prepareSortableRows = (): JSX.Element => {
    if (data == null) {
      return <></>;
    }
    return (
      <div className="list-data-table-body">
        <div className="list-data-table-body-item-wrapper">
          <SortableList
            data={data}
            onSortEnd={onSortEnd}
            itemBuilder={(dataItem, index) => {
              return (
                <>
                  <div style={{ zIndex: 100 }}>
                    {_prepareDataTableItem(
                      dataTableItemBuilder(dataItem, index),
                      dataItem
                    )}
                  </div>
                  <Spacer />
                </>
              );
            }}
          />
        </div>
      </div>
    );
  };

  const _prepareDataTableItem = (
    dataRow: DataRow,
    dataItem: any,
    dragHandle?: any
  ): JSX.Element => {
    return (
      <div
        key={dataRow.key}
        className={classNames(
          { "list-data-table-body-item": true },
          dataRow.className
        )}
        style={{ gap: gap ?? 0 }}
        onClick={() => {
          if (onClick != null) {
            onClick(dataItem);
          }
        }}
      >
        {dataRow.children.map((dataRowItem, index) => {
          return (
            <div
              className={classNames({
                "list-data-table-body-item-cell": true,
                [dataRowItem?.className ?? ""]: true,
              })}
              key={index}
              style={{
                flex: columns[index].flex ?? 1,
              }}
            >
              {dataRowItem.child}
            </div>
          );
        })}
        {dragHandle && (
          <div className="list-data-table-body-item-drag-handle">
            {dragHandle}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={listDataTableClassName}>
      {!isLoading &&
        data != null &&
        data?.length !== 0 &&
        !disableHeader &&
        _prepareHeader()}
      {!sortable && _prepareRows()}
      {sortable && _prepareSortableRows()}
    </div>
  );
};

export default ListDataTable;

export const SkeletonSelectionListDataTableItem = ({
  count = 1,
}: {
  count?: number;
}): JSX.Element => {
  return (
    <>
      {Array(count)
        .fill(count)
        .map((_, i) => {
          return (
            <>
              <Row
                key={`row-${i}`}
                justifyContent="space-between"
                className="full-width pl-50 pr-50 pt-15 pb-15"
              >
                <Skeleton count={1} width={60} height={60} className="mr-15" />
                <Column key={`column-${i}`} justifyContent="center">
                  <LargeTextSkeleton className="full-width" />
                  <SmallTextSkeleton />
                </Column>
              </Row>
              <Spacer key={`spacer-${i}`} width="100%" />
            </>
          );
        })}
    </>
  );
};

export const SkeletonListDataTableItem = ({
  count = 1,
}: {
  count?: number;
}): JSX.Element => {
  return (
    <>
      {Array(count)
        .fill(count)
        .map((_, i) => {
          return (
            <Column key={`column--${i}`} alignItems="center">
              <div className="skeleton-list-data-item-wrapper">
                <div>
                  <Skeleton count={1} width={40} height={40} />
                </div>
                <div className="skeleton-list-data-item-text-container">
                  <LargeTextSkeleton />
                  <SmallTextSkeleton />
                </div>
              </div>
              <Spacer width="100%" />
            </Column>
          );
        })}
    </>
  );
};
