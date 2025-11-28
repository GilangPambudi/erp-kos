import { router } from '@inertiajs/react';
import type { SortingState } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from './use-debounce';

type Dir = 'asc' | 'desc';
type Initial = { q?: string; per_page?: number; sort?: string; dir?: Dir };

export function useIndexList(routeName: string, routeParams?: string, initial?: Initial, getExtra?: () => Record<string, unknown> | undefined) {
    const [q, setQ] = useState(initial?.q ?? '');
    const [perPage, setPerPage] = useState<number>(Number(initial?.per_page ?? 10));
    const [sorting, setSorting] = useState<SortingState>(
        initial?.sort ? [{ id: String(initial.sort), desc: (initial.dir ?? 'asc') === 'desc' }] : [],
    );
    const [loading, setLoading] = useState(false);

    const debouncedQ = useDebounce(q, 300);
    const firstLoad = useRef(true);
    const prevDebouncedQ = useRef(debouncedQ);
    const getExtraRef = useRef(getExtra);

    useEffect(() => {
        getExtraRef.current = getExtra;
    }, [getExtra]);

    const baseParams = useMemo(() => {
        const sort = sorting[0]?.id;
        const dir: Dir = sorting[0]?.desc ? 'desc' : 'asc';
        return { ...(sort ? { sort, dir } : {}) };
    }, [sorting]);

    const submit = useCallback(
        (page = 1, extra?: Record<string, unknown>) => {
            router.get(
                route(routeName, routeParams),
                {
                    q: debouncedQ,
                    per_page: perPage,
                    page,
                    ...(getExtraRef.current ? getExtraRef.current() : {}),
                    ...baseParams,
                    ...(extra ?? {}),
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onStart: () => setLoading(true),
                    onFinish: () => setLoading(false),
                },
            );
        },
        [debouncedQ, perPage, baseParams, routeName, routeParams],
    );

    // Auto-submit only when search query changes (debounced)
    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            prevDebouncedQ.current = debouncedQ;
            return;
        }

        // Only submit if debouncedQ actually changed
        if (prevDebouncedQ.current === debouncedQ) {
            return;
        }

        prevDebouncedQ.current = debouncedQ;

        router.get(
            route(routeName, routeParams),
            {
                q: debouncedQ,
                per_page: perPage,
                page: 1,
                ...(getExtraRef.current ? getExtraRef.current() : {}),
                ...baseParams,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    }, [debouncedQ, routeName, routeParams, perPage, baseParams]);

    const onSortingChange = (next: SortingState) => {
        setSorting(next);
        const sort = next[0]?.id;
        const dir: Dir = next[0]?.desc ? 'desc' : 'asc';
        router.get(
            route(routeName, routeParams),
            {
                q: debouncedQ,
                per_page: perPage,
                page: 1,
                ...(getExtra ? getExtra() : {}),
                ...(sort ? { sort, dir } : {}),
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    return { q, setQ, perPage, setPerPage, sorting, submit, onSortingChange, loading };
}
