import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import NotesCard from "../../components/NotesCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentNotesScreen({ navigation }) {
  const app = useApp();
  const notes = app.notes || app.studyMaterials || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Study Notes"
      subtitle="Read notes, PDFs, links and learning materials."
      icon="document-text-outline"
      color={COLORS.secondary}
      data={notes}
      searchKeys={["title", "subject", "description", "type"]}
      filters={["ALL", "PDF", "VIDEO", "LINK", "IMAGE", "TEXT"]}
      getFilterValue={(item) => item.type || "PDF"}
      emptyTitle="No notes"
      emptyMessage="Teacher uploaded notes will appear here."
      searchPlaceholder="Search notes..."
      renderItem={(item) => (
        <NotesCard
          key={item.id}
          item={item}
          onPress={() => {
            if (app.markMaterialRead) {
              app.markMaterialRead(item.id);
            }
          }}
        />
      )}
    />
  );
}
