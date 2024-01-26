import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./sortable.item.component";

interface SortableListProps<T> {
  data: T[];
  itemBuilder: (data: T, index: number) => JSX.Element;
  onSortStart?: () => void;
  onSortEnd?: (oldIndex: number, newIndex: number) => void;
}

const SortableList = <T extends unknown>({
  data,
  itemBuilder,
  onSortStart,
  onSortEnd,
}: SortableListProps<T>): JSX.Element => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: any): void => {
    if (onSortStart) {
      onSortStart();
    }
  };

  const handleDragEnd = (event: any): void => {
    const { active, over } = event;

    if (active.id !== over.id && onSortEnd) {
      const oldIndex = data.findIndex(
        (dataItem: any) => dataItem?.id === active.id
      );
      const newIndex = data.findIndex(
        (dataItem: any) => dataItem?.id === over.id
      );

      return onSortEnd(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={data as any}>
        {data.map((data: any, index: number) => (
          <SortableItem key={data.id} id={data.id}>
            {itemBuilder(data, index)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
