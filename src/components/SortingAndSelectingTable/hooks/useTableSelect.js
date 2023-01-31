import { useCallback } from "react";

/**
 *
 * @param {* state variable} selected
 * @param {* state dispatcher} setSelected
 * @param {* state variable} rows
 * @returns
 */

export default function useTableSelect(
    selected,
    setSelected,
    rows,
    setAllItemSelected
) {
    const handleSelectAllClick = useCallback(
        (event) => {
            if (event.target.checked) {
                const newSelected = rows.map((n) => n.id);
                setSelected(newSelected);
                return;
            }
            setSelected([]);
            setAllItemSelected?.(0);
        },
        [rows, setAllItemSelected, setSelected]
    );

    const handleClick = useCallback(
        (_event, id, type, index) => {
            const selectedIndex = selected.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);

                if (type === "group") {
                    const selectedRows = rows
                        .filter((row) => row.group?.includes(id))
                        .map((n) => n.id);
                    newSelected = newSelected.concat(selected, selectedRows);
                }
            } else {
                if (type === "group") {
                    let selectedRows = [];

                    selectedRows = rows
                        .filter((row) => row.group?.includes(id))
                        .map((n) => n.id);
                    selectedRows = [id, ...selectedRows];

                    newSelected = selected.filter(
                        (selectedItem) => !selectedRows.includes(selectedItem)
                    );
                } else {
                    newSelected = selected
                        .filter((_, i) => i !== selectedIndex)
                        .filter(
                            (selectedItem) =>
                                !rows[index]?.group?.includes(selectedItem)
                        );
                }
            }

            const uniqueSelected = [...new Set(newSelected)];
            setSelected(uniqueSelected);
            setAllItemSelected?.(0);
        },
        [selected, setSelected, setAllItemSelected, rows]
    );

    return {
        handleClick,
        handleSelectAllClick,
    };
}
