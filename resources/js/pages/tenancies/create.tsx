import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PropertyForm from './_form';
import Heading from '@/components/heading';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tenancies', href: route('tenancies.index') },
    { title: 'Create', href: '#' },
];

interface Property {
    id: number;
    name: string;
    standard_monthly_rate: number;
}


interface Props {
    properties: Property[];
    preselected_property_id?: number;
}

export default function TenanciesCreate({ properties, preselected_property_id }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Tenancy" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto p-4">
                <Heading title="Create New Tenancy" />
                <PropertyForm
                    action={route('tenancies.store')}
                    method="post"
                    submitLabel="Check-in"
                    properties={properties}
                    preselected_property_id={preselected_property_id}
                />
            </div>
        </AppLayout>
    );
}
