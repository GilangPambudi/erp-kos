import { Tenancy } from '@/types';
import { User } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Props {
    tenancies: Tenancy[];
}

export default function ActiveTenants({ tenancies }: Props) {
    return (
        <>
            {tenancies && tenancies.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Tenant</TableHead>
                            <TableHead>Since</TableHead>
                            <TableHead>Rent Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tenancies.map((tenancy, index) => (
                            <TableRow key={tenancy.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <Link href={route('tenancies.edit', tenancy.id)} className="hover:underline">
                                            {tenancy.tenant.full_name}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {new Date(tenancy.start_date).toLocaleDateString('en-GB')}
                                </TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tenancy.rent_price)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex h-[150px] flex-col items-center justify-center gap-2 text-muted-foreground">
                    <User className="h-8 w-8 opacity-50" />
                    <p>No active tenants</p>
                </div>
            )}
        </>
    );
}
