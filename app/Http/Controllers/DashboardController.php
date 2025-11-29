<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Property;
use App\Models\Tenancy;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Summary Cards
        $totalProperties = Property::count();
        $totalCapacity = Property::sum('total_capacity');
        
        $activeTenanciesCount = Tenancy::where('status', 'active')->count();
        $availableRooms = max(0, $totalCapacity - $activeTenanciesCount);

        $currentMonth = now()->startOfMonth();
        $monthlyRevenue = Payment::where('payment_date', '>=', $currentMonth)
            ->sum('amount');

        // Outstanding: Active tenancies that haven't paid for current month (simplified logic)
        // This is an estimation. A more robust system would track invoices.
        // For now, let's just sum rent_price of active tenancies and subtract monthlyRevenue (very rough)
        // Better approach: Sum rent_price of all active tenancies. This is "Potential Revenue".
        // Outstanding = Potential - Actual (if Actual < Potential, else 0).
        $potentialRevenue = Tenancy::where('status', 'active')->sum('rent_price');
        $outstandingPayments = max(0, $potentialRevenue - $monthlyRevenue);


        // 2. Charts & Analysis
        
        // Revenue Trend (Last 6 Months)
        $revenueTrend = Payment::select(
            DB::raw('DATE_FORMAT(payment_date, "%Y-%m") as month'),
            DB::raw('SUM(amount) as total')
        )
        ->where('payment_date', '>=', now()->subMonths(6)->startOfMonth())
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        // Room Status per Property
        $propertyStats = Property::withCount(['tenancies' => function($q) {
            $q->where('status', 'active');
        }])->get()->map(function($property) {
            return [
                'name' => $property->name,
                'occupied' => $property->tenancies_count,
                'available' => max(0, $property->total_capacity - $property->tenancies_count),
            ];
        });


        // 3. Activity & Alerts
        
        // Expiring Leases (Next 30 Days)
        $expiringLeases = Tenancy::with(['tenant', 'property'])
            ->where('status', 'active')
            ->whereBetween('end_date', [now(), now()->addDays(30)])
            ->orderBy('end_date')
            ->take(5)
            ->get();

        // Recent Payments
        $recentPayments = Payment::with(['tenancy.tenant', 'tenancy.property'])
            ->orderBy('payment_date', 'desc')
            ->take(5)
            ->get();

        // New Tenants (This Month)
        $newTenants = Tenancy::with(['tenant', 'property'])
            ->where('start_date', '>=', $currentMonth)
            ->orderBy('start_date', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'summary' => [
                'totalProperties' => $totalProperties,
                'totalCapacity' => $totalCapacity,
                'availableRooms' => $availableRooms,
                'monthlyRevenue' => $monthlyRevenue,
                'outstandingPayments' => $outstandingPayments,
            ],
            'charts' => [
                'revenueTrend' => $revenueTrend,
                'propertyStats' => $propertyStats,
            ],
            'activity' => [
                'expiringLeases' => $expiringLeases,
                'recentPayments' => $recentPayments,
                'newTenants' => $newTenants,
            ],
        ]);
    }
}
