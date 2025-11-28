import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Property } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useIndexList } from '@/hooks/use-index-list';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Properties', href: '#' },
];

type Paginator<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

type Props = {
    properties: Paginator<Property>;
    filters: { q?: string; per_page?: number; sort?: string; dir?: 'asc' | 'desc' };
};

export default function PropertiesIndex({ properties, filters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const { q, setQ, perPage, setPerPage, sorting, submit, onSortingChange, loading } = useIndexList(
        'properties.index',
        undefined,
        filters,
    );

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash?.success, flash?.error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Properties" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto p-4">
                <div className="flex justify-between items-center">
                    <Heading title="Properties" description="Manage Properties" />
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm">
                            <Link href={route('properties.create')}>
                                <Plus />
                                Add New
                            </Link>
                        </Button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={properties.data}
                    searchValue={q}
                    onSearchChange={setQ}
                    onSearchSubmit={() => submit(1)}
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                    page={properties.current_page}
                    pageCount={properties.last_page}
                    onPrev={() => submit(Math.max(1, properties.current_page - 1))}
                    onNext={() => submit(Math.min(properties.last_page, properties.current_page + 1))}
                    onPageChange={(p) => submit(p)}
                    canPrev={properties.current_page > 1}
                    canNext={properties.current_page < properties.last_page}
                    perPage={perPage}
                    onPerPageChange={(n) => {
                        setPerPage(n);
                        submit(1, { per_page: n });
                    }}
                    loading={loading}
                />
            </div>
        </AppLayout>
    );
}