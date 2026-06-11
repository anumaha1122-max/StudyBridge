import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import NotesCard from "../../components/NotesCard";
import AnalyticsScreenWrapper, {
  AnalyticsGrid,
  AnalyticsSection,
  InsightBox,
  ProgressRow,
} from "../../components/AnalyticsScreenWrapper";
import AnalyticsCard from "../../components/AnalyticsCard";

export default function StudyMaterialProgressScreen({ navigation }) {
  const app = useApp();

  const notes = app.notes || app.studyMaterials || [];
  const readProgress = app.materialReads || [];

  const totalMaterials = notes.length;
  const readCount = readProgress.length;
  const readPercent =
    totalMaterials > 0 ? Math.round((readCount / totalMaterials) * 100) : 0;

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Material Progress"
      subtitle="Track student reading progress for uploaded study materials."
      icon="document-text-outline"
      color={COLORS.secondary}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Materials"
          value={totalMaterials}
          subtitle="Uploaded notes"
          icon="document-text-outline"
          color={COLORS.secondary}
        />

        <AnalyticsCard
          title="Reads"
          value={readCount}
          subtitle="Student read actions"
          icon="checkmark-circle-outline"
          color={COLORS.success}
        />

        <AnalyticsCard
          title="Progress"
          value={readPercent + "%"}
          subtitle="Overall read progress"
          icon="trending-up-outline"
          color={COLORS.purple}
        />

        <AnalyticsCard
          title="Pending"
          value={Math.max(totalMaterials - readCount, 0)}
          subtitle="Unread materials"
          icon="time-outline"
          color={COLORS.warning}
        />
      </AnalyticsGrid>

      <AnalyticsSection
        title="Reading Progress"
        subtitle="Understand how much material students have completed."
      >
        <ProgressRow
          label="Material Completion"
          value={readPercent}
          color={COLORS.secondary}
        />

        <InsightBox
          title="Progress Insight"
          message={
            readPercent >= 70
              ? "Good material reading progress. Keep uploading clear notes."
              : "Reading progress is low. Remind students to complete study materials."
          }
          color={readPercent >= 70 ? COLORS.success : COLORS.warning}
        />
      </AnalyticsSection>

      <AnalyticsSection
        title="Uploaded Materials"
        subtitle="Recently shared study materials."
      >
        {notes.length === 0 ? (
          <InsightBox
            title="No Materials"
            message="Uploaded study materials will appear here."
            color={COLORS.muted}
          />
        ) : (
          notes.slice(0, 10).map((item) => (
            <NotesCard key={item.id} item={item} />
          ))
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
