import React from 'react';
import BarCard from '@/components/BarCard';
import Heading from '@/components/Headings';
import CardContainer from './CardContainer';
import FadeCard from '@/components/FadeCard';
import {boxData} from '@/utils/helper/LocalDb';

const Footer = props => {
  /* Destructuring the props object. */
  const {
    viewGoals,
    viewReminders,
    recentAchievements,
    reminderDetail,
    reminders,
    recommended_audios,
    playAudio,
    viewAll,
    recent_achievement_total,
    current_achievements,
  } = props;
  /* A template literal. */
  const heading = `${current_achievements}/${recent_achievement_total}`;
  const hasReminders = Boolean(reminders?.length);
  return (
    <>
      <CardContainer
        {...{
          boxData: [
            {
              ...boxData[0],
              heading,
            },
            boxData[1],
          ],
          viewGoals,
          recentAchievements,
        }}
      />
      <>
        <Heading
          {...{
            title: 'My Reminders',
            view: true,
            remind: true,
            viewReminders,
          }}
        />
        {hasReminders && (
          <BarCard {...{data: reminders, reminderDetail, viewReminders}} />
        )}
      </>
      <Heading
        {...{
          viewAll,
          view: true,
          data: recommended_audios,
          title: 'Recommended For You',
          requestParam: 'recommended-audios',
        }}
      />
      <FadeCard
        {...{
          newData: true,
          onPress: playAudio,
          data: recommended_audios,
        }}
      />
    </>
  );
};

export default Footer;
