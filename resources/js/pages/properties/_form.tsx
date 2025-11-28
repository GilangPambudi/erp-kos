import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Property } from '@/types';
import { Form, Link } from '@inertiajs/react';

type Props = {
    action: string;
    method: 'post' | 'patch' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    initial?: Partial<Pick<Property, 'name' | 'address' | 'total_capacity' | 'standard_monthly_rate' | 'facility_description'>>;
};

export default function PropertyForm({ action, method, submitLabel = 'Save', cancelHref = route('properties.index'), initial }: Props) {
    return (
        <Form method={method} action={action} options={{ preserveScroll: true }} className="space-y-6 max-w-xl">
            {({ processing, recentlySuccessful, errors }) => (
                <>
                    <div className="gap-2 grid">
                        <Label htmlFor="name">Property Name</Label>
                        <Input id="name" name="name" defaultValue={initial?.name ?? ''} required placeholder="e.g., Kos Putri Melati" />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="gap-2 grid">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            defaultValue={initial?.address ?? ''}
                            required
                            placeholder="e.g., Jalan Dokter Wahidin Sudirohusodo Gang Manggis I Nomor 2"
                            className="min-h-[80px]"
                        />
                        <InputError className="mt-2" message={errors.address} />
                    </div>

                    <div className="gap-2 grid">
                        <Label htmlFor="total_capacity">Total Capacity (Rooms)</Label>
                        <Input
                            id="total_capacity"
                            name="total_capacity"
                            type="number"
                            defaultValue={initial?.total_capacity ?? ''}
                            required
                            min="1"
                            placeholder="e.g., 10"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <InputError className="mt-2" message={errors.total_capacity} />
                    </div>

                    <div className="gap-2 grid">
                        <Label htmlFor="standard_monthly_rate">Standard Monthly Rate (IDR)</Label>
                        <Input
                            id="standard_monthly_rate"
                            name="standard_monthly_rate"
                            type="number"
                            defaultValue={initial?.standard_monthly_rate ?? ''}
                            required
                            min="0"
                            step="0.01"
                            placeholder="e.g., 550000"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <InputError className="mt-2" message={errors.standard_monthly_rate} />
                    </div>

                    <div className="gap-2 grid">
                        <Label htmlFor="facility_description">Facility Description (Optional)</Label>
                        <Textarea
                            id="facility_description"
                            name="facility_description"
                            defaultValue={initial?.facility_description ?? ''}
                            placeholder="e.g., AC, WiFi, Kamar mandi dalam, Kasur, Lemari"
                            className="min-h-[80px]"
                        />
                        <InputError className="mt-2" message={errors.facility_description} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="sm" disabled={processing}>
                            {submitLabel}
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href={cancelHref}>Cancel</Link>
                        </Button>
                        {recentlySuccessful && <p className="text-muted-foreground text-sm">Saved</p>}
                    </div>
                </>
            )}
        </Form>
    );
}
