import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PropertyForm from './_form';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Properties', href: route('properties.index') },
    { title: 'Create', href: '#' },
];

export default function PropertiesCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Property" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto p-4">
                <Heading title="Create New Property" />
                <div className="w-full md:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Property Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PropertyForm action={route('properties.store')} method="post" submitLabel="Save" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
