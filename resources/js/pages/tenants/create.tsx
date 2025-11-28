import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import TenantForm from './_form';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Data Master', href: '/dashboard' },
    { title: 'Tenants', href: route('tenants.index') },
    { title: 'Create', href: '#' },
];

export default function TenantsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Tenant" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto p-4">
                <Heading title="Add New Tenant" />
                <div className="w-full md:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tenant Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TenantForm action={route('tenants.store')} method="post" submitLabel="Save" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout >
    );
}
