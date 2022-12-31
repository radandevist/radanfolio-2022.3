import { Column } from "react-table";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import { CellWrapper } from "./CellWrapper";

type Params<D extends ObjectWithId> = {
  // items: Post[];
  // selectedItems: Post[];
  items: string[];
  selectedItems: string[];
  // setSelectedItems: (items: string[]) => void;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onPreview?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void; 
  columns: Column<D>[];
};

export function getTableColumns<D extends ObjectWithId>({
  items,
  selectedItems,
  onSelect,
  onSelectAll,
  onPreview,
  onEdit,
  onDelete,
  columns,
}: Params<D>): Column<D>[] {
  return [
    {
      id: "selection-check-box",
      accessor: "id",
      Header: () => {
        const allSelected = selectedItems.length >= items.length;
  
        const handleSelectAll = () => {
          onSelectAll();
        };
  
        return (
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select all</span>
              <input
                className="form-checkbox"
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </label>
          </div>);
      },
      Cell: ({ value: id }: { value: string }) => {
        // const isSelected = selectedItems.some((item) => item.id === id);
        // const isSelected = selectedItems.some((itemId) =>  itemId === id);
        const isSelected = selectedItems.includes(id);

        const handleSelect = () => {
          onSelect(id);
        };
  
        return (
          <CellWrapper>
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={id}
                className="form-checkbox"
                type="checkbox"
                onChange={handleSelect}
                checked={isSelected}
              />
            </label>
          </CellWrapper>
        );
      },
    },
    ...columns,
    ...((!!onPreview || !!onEdit || !!onDelete)
      ? [
        {
          id: "actions-menu-column",
          accessor: "id",
          Header: () => <span className="sr-only">Actions menu</span>,
          Cell: ({ value: id }: { value: string }) => (
            <CellWrapper className="justify-end">
              {onPreview && (
                <FiEye
                  className="h-5 w-5 ml-2 text-bo-gray-500 hover:text-bo-gray-700 cursor-pointer"
                  onClick={() => onPreview(id)}
                />
              )}
              {onEdit && (
                <FiEdit
                  className="h-5 w-5 ml-2 text-bo-gray-500 hover:text-bo-gray-700 cursor-pointer"
                  onClick={() => onEdit(id)}
                />
              )}
              {onDelete && (
                <MdDelete
                  className="h-5 w-5 ml-2 text-bo-gray-500 cursor-pointer hover:text-rose-400"
                  onClick={() => onDelete(id)}
                />
              )}
            </CellWrapper>
          ),
        },
      ]
      : []),
  ];
}
