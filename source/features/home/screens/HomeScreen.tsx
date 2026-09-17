import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSkeleton } from '../components/HomeSkeleton';
import { StatusBanner } from '../components/StatusBanner';
import { ProfileCard } from '../components/ProfileCard';
import { PortfolioPagesSection } from '../components/PortfolioPagesSection';
import { QuickActionsSection } from '../components/QuickActionsSection';
import { RecentActivitySection } from '../components/RecentActivitySection';
import { INITIAL_ACTIVITY } from '../data';
import type { ActivityItem } from '../data';
import ActivityPublish from '../../../assets/svg/ActivityPublish.svg';
import { colors, spacing } from '../../../shared/theme';

const PROJECT_NAME = 'Nameless Portfolio';
const DOMAIN = 'devendra.design';
const ITEM_COUNT = 34;

type Status = 'loading' | 'unsaved' | 'publishing' | 'published';

export default function HomeScreen() {
  const [status, setStatus] = useState<Status>('loading');
  const [unsavedCount, setUnsavedCount] = useState(3);
  const [lastPublishedLabel, setLastPublishedLabel] = useState('');
  const [activity, setActivity] = useState<ActivityItem[]>(INITIAL_ACTIVITY);

  useEffect(() => {
    const timer = setTimeout(() => setStatus('unsaved'), 900);
    return () => clearTimeout(timer);
  }, []);

  function publish() {
    setStatus('publishing');
    setTimeout(() => {
      setUnsavedCount(0);
      setLastPublishedLabel('just now');
      setActivity(current => [
        {
          key: `published-${Date.now()}`,
          label: `Published “${PROJECT_NAME}”`,
          timestamp: 'Just now',
          Icon: ActivityPublish,
        },
        ...current,
      ]);
      setStatus('published');
    }, 900);
  }

  function unavailable(feature: string) {
    Alert.alert(
      `${feature} unavailable`,
      `${feature} is not available yet. Please try again later.`,
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {status === 'loading' ? (
          <HomeSkeleton />
        ) : (
          <View style={styles.content}>
            <HomeHeader
              projectName={PROJECT_NAME}
              domain={DOMAIN}
              itemCount={ITEM_COUNT}
              initials="DD"
              onSwitchProject={() => unavailable('Switching projects')}
              onSearch={() => unavailable('Search')}
              onAccount={() => unavailable('Account')}
            />
            <StatusBanner
              unsavedCount={unsavedCount}
              publishing={status === 'publishing'}
              lastPublishedLabel={lastPublishedLabel}
              onPublish={publish}
            />
            <ProfileCard
              initials="DD"
              name="Devendra Deokar"
              role="Senior UX/UI Designer"
              onEdit={() => unavailable('Editing profile')}
            />
            <PortfolioPagesSection />
            <QuickActionsSection />
            <RecentActivitySection
              items={activity}
              caption={
                unsavedCount === 0 ? 'All changes saved' : 'Publish pending'
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.gutter, paddingBottom: spacing.xl },
  content: { gap: spacing.lg, paddingTop: spacing.sm },
});
