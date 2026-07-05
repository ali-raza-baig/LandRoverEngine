import React from "react";

interface Column<T> {
    key: keyof T | string;
    title: string;
    render?: (row: T, index: number) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    rowKey?: (row: T, index: number) => string | number;
}

const Table = <T extends Record<string, any>>({
    columns,
    data,
    emptyMessage = "No data found",
    rowKey,
}: TableProps<T>) => {
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-golden">
            <table className="w-full border-collapse">
                <thead className="bg-[#111827]">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.title}
                                className={`px-4 py-3 text-left text-sm font-semibold text-golden border-b border-[#2A2A2A] ${column.className}`}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowKey ? rowKey(row, rowIndex) : rowIndex}
                                className="border-b border-[#2A2A2A] hover:bg-[#151515]"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.title}
                                        className="px-4 py-3 text-sm text-gray-300"
                                    >
                                        {column.render
                                            ? column.render(row, rowIndex)
                                            : row[column.key as keyof T]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="py-6 text-center text-gray-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;