"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PropertyFilters } from "@/types/property";

function toNum(v: string | null): number | undefined {
  const n = Number(v);
  return v && !isNaN(n) ? n : undefined;
}

export function usePropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: PropertyFilters = {
    q: searchParams.get("q") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    district: searchParams.get("district") ?? undefined,
    neighborhood: searchParams.get("neighborhood") ?? undefined,
    minPrice: toNum(searchParams.get("minPrice")),
    maxPrice: toNum(searchParams.get("maxPrice")),
    minSqm: toNum(searchParams.get("minSqm")),
    maxSqm: toNum(searchParams.get("maxSqm")),
    rooms: searchParams.get("rooms")?.split(",").filter(Boolean) ?? undefined,
    bathrooms: searchParams.get("bathrooms") ?? undefined,
    heatingType: searchParams.get("heatingType") ?? undefined,
    balcony: searchParams.get("balcony") ?? undefined,
    balconyType: searchParams.get("balconyType") ?? undefined,
    insideSite: searchParams.get("insideSite") ?? undefined,
    buildingStatus: searchParams.get("buildingStatus") ?? undefined,
    usageStatus: searchParams.get("usageStatus") ?? undefined,
    titleDeedStatus: searchParams.get("titleDeedStatus") ?? undefined,
    mortgageEligible: searchParams.get("mortgageEligible") ?? undefined,
    furnishedStatus: searchParams.get("furnishedStatus") ?? undefined,
    listedBy: searchParams.get("listedBy") ?? undefined,
    listingDate: searchParams.get("listingDate") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
  };

  // Count active filters (excluding sort)
  const activeCount = Object.entries(filters).filter(([k, v]) => {
    if (k === "sort") return false;
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== "";
  }).length;

  const setFilter = useCallback(
    (key: keyof PropertyFilters, value: string | string[] | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, String(value));
      }
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const clearAll = useCallback(() => {
    router.push("/properties", { scroll: false });
  }, [router]);

  return { filters, setFilter, clearAll, activeCount };
}
