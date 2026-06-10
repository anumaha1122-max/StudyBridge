import React from "react";
import EmptyState from "./EmptyState";
import { COLORS } from "../utils/colors";

export default function SearchEmptyState({
  query,
  onClear,
}) {
  return (
    <EmptyState
      icon="search-outline"
      title="No results found"
      message={
        query
          ? "No results matched '" + query + "'. Try another keyword."
          : "Start searching to find records quickly."
      }
      actionTitle={query && onClear ? "Clear Search" : undefined}
      onAction={query && onClear ? onClear : undefined}
      color={COLORS.secondary}
    />
  );
}
