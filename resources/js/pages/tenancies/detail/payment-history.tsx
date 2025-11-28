import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Payment } from '@/types';
import PaymentModal from '../../payments/payment-modal';

interface Props {
    tenancyId: number;
    rentPrice: number;
    payments: Payment[];
}

export default function PaymentHistory({ tenancyId, rentPrice, payments }: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment History</CardTitle>
                <PaymentModal tenancyId={tenancyId} defaultAmount={rentPrice} />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{format(new Date(payment.payment_date), 'dd MMM yyyy')}</TableCell>
                                    <TableCell className="capitalize">{payment.payment_type.replace('_', ' ')}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(payment.amount)}
                                    </TableCell>
                                    <TableCell>{payment.notes || '-'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No payment history found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
