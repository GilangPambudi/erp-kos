import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tenant } from '@/types';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';


export default function TenantDetail({ tenantId, initial }: { tenantId: number, initial: Partial<Tenant> }) {
    return (
        <div className="space-y-6">
            <div className="gap-4 grid md:grid-cols-2">
                <div className="gap-2 grid">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                        id="full_name"
                        value={initial.full_name || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                        id="gender"
                        value={initial.gender === 'male' ? 'Male' : initial.gender === 'female' ? 'Female' : initial.gender || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                        id="date_of_birth"
                        value={initial.date_of_birth ? format(new Date(initial.date_of_birth), 'dd MMMM yyyy') : ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="origin_city">Origin City</Label>
                    <Input
                        id="origin_city"
                        value={initial.origin_city || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                        id="occupation"
                        value={initial.occupation || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="workplace_name">Workplace Name</Label>
                    <Input
                        id="workplace_name"
                        value={initial.workplace_name || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>

                <div className="gap-2 grid">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                        id="phone_number"
                        value={initial.phone_number || ''}
                        readOnly
                        disabled
                        className="bg-secondary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button size="sm" asChild>
                    <Link href={route('tenants.edit', tenantId)}><Eye />Detail</Link>
                </Button>
            </div>
        </div>
    );
}
