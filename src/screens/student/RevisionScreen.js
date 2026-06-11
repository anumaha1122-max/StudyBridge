import React from "react";
import { COLORS } from "../../utils/colors";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticsScreenWrapper, {
  AnalyticsGrid,
  AnalyticsSection,
  InsightBox,
  ProgressRow,
} from "../../components/AnalyticsScreenWrapper";
import BaseListCard from "../../components/BaseListCard";

const topics = [
  { id: 1, title: "Mathematics", subtitle: "Algebra, Geometry, Trigonometry", progress: 72 },
  { id: 2, title: "Science", subtitle: "Physics, Chemistry, Biology", progress: 65 },
  { id: 3, title: "English", subtitle: "Grammar, Writing, Reading", progress: 80 },
  { id: 4, title: "Social", subtitle: "History, Geography, Civics", progress: 58 },
];

export default function RevisionScreen({ navigation }) {
  const average =
    Math.round(topics.reduce((sum, item) => sum + item.progress, 0) / topics.length);

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Revision Zone"
      subtitle="Revise subjects and improve weak areas."
      icon="refresh-circle-outline"
      color={COLORS.secondary}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Average"
          value={average + "%"}
          subtitle="Revision completion"
          icon="trending-up-outline"
          color={COLORS.secondary}
        />

        <AnalyticsCard
          title="Subjects"
          value={topics.length}
          subtitle="Revision subjects"
          icon="library-outline"
          color={COLORS.primary}
        />
      </AnalyticsGrid>

      <AnalyticsSection title="Revision Progress" subtitle="Track your revision subject-wise.">
        {topics.map((item) => (
          <ProgressRow
            key={item.id}
            label={item.title}
            value={item.progress}
            color={item.progress >= 70 ? COLORS.success : COLORS.warning}
          />
        ))}

        <InsightBox
          title="Revision Tip"
          message="Revise weak subjects first, then attempt mock tests to check improvement."
          color={COLORS.secondary}
        />
      </AnalyticsSection>

      <AnalyticsSection title="Subjects" subtitle="Open subjects and revise important topics.">
        {topics.map((item) => (
          <BaseListCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            meta={"Progress: " + item.progress + "%"}
            status="REVISION"
            icon="book-outline"
            color={COLORS.secondary}
            onPress={() => navigation.navigate("WeakTopics")}
          />
        ))}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
