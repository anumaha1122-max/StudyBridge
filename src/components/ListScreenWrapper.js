import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";
import ScreenHeader from "./ScreenHeader";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import EmptyState from "./EmptyState";
import SearchEmptyState from "./SearchEmptyState";

export default function ListScreenWrapper({
  navigation,
  title,
  subtitle,
  icon,
  color = COLORS.primary,
  data = [],
  searchKeys = [],
  filters = ["ALL"],
  getFilterValue,
  renderItem,
  emptyTitle = "No data found",
  emptyMessage = "There is nothing to show right now.",
  searchPlaceholder = "Search...",
  showBack = true,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(filters[0] || "ALL");

  const filteredData = useMemo(() => {
    let list = Array.isArray(data) ? data : [];

    if (filter !== "ALL" && getFilterValue) {
      list = list.filter((item) => getFilterValue(item) === filter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();

      list = list.filter((item) =>
        searchKeys.some((key) =>
          String(item?.[key] || "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    return list;
  }, [data, query, filter, searchKeys, getFilterValue]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader
          navigation={navigation}
          title={title}
          subtitle={subtitle}
          icon={icon}
          color={color}
          showBack={showBack}
        />

        <View style={styles.controlBox}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            onClear={() => setQuery("")}
          />

          {filters.length > 1 ? (
            <FilterChips
              options={filters}
              value={filter}
              onChange={setFilter}
              color={color}
            />
          ) : null}
        </View>

        {filteredData.length === 0 ? (
          query ? (
            <SearchEmptyState query={query} onClear={() => setQuery("")} />
          ) : (
            <EmptyState title={emptyTitle} message={emptyMessage} color={color} />
          )
        ) : (
          filteredData.map((item, index) => renderItem(item, index))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  controlBox: {
    marginBottom: 4,
  },
});
