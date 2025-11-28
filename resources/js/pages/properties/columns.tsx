import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Property } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef, type Row } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';

export const columns: ColumnDef<Property>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <div onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex justify-between items-center cursor-pointer">
                Property Name
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </div>
        ),
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <div onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex justify-between items-center cursor-pointer">
                Address
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </div>
        ),
    },
    {
        accessorKey: 'total_capacity',
        header: ({ column }) => (
            <div onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex justify-between items-center cursor-pointer">
                Total Capacity
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </div>
        ),
        cell: ({ row }) => {
            const capacity = row.getValue('total_capacity') as number;
            return <div>{capacity} rooms</div>;
        },
    },
    {
        accessorKey: 'standard_monthly_rate',
        header: ({ column }) => (
            <div onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex justify-between items-center cursor-pointer">
                Standard Monthly Rate
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </div>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('standard_monthly_rate'));
            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
    // {
    //     accessorKey: 'facility_description',
    //     header: ({ column }) => (
    //         <div onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex justify-between items-center cursor-pointer">
    //             Facility Description
    //             <ArrowUpDown className="ml-2 w-4 h-4" />
    //         </div>
    //     ),
    // },
    {
        id: 'actions',
        cell: ({ row }) => <PropertyActionsCell row={row} />,
    },
];

function PropertyActionsCell({ row }: { row: Row<Property> }) {
    const property = row.original;

    return (
        <div className="flex justify-end items-center gap-2">
            <Button asChild size="sm" variant="outline">
                <Link href={route('properties.edit', property.id)}>
                    <Eye />
                    Detail
                </Link>
            </Button>
        </div>
    );
}
