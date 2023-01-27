import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Accordion from 'react-native-collapsible/Accordion';
import {Colors, FontFamily} from '@/theme/Variables';
import AccordionCard from './AccordionCard';
import {downArrow} from '@/Assets/Images';

const CollapsibleAccordion = ({data, onRefresh, showPage}) => {
  const [activeSections, setActiveSections] = useState([]);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animated.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text
          style={[
            styles.headerText,
            {
              fontSize: isActive ? 18 : 16,
              fontFamily: isActive ? FontFamily.medium : FontFamily.regular,
            },
          ]}>
          {section?.title}
        </Text>
        <Image source={downArrow} />
      </Animated.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    const contentData = section?.lesson_content;
    return (
      <Animated.View
        duration={400}
        style={[
          styles.content,
          isActive ? styles.activeContent : styles.inactiveContent,
        ]}
        transition="backgroundColor">
        {contentData.map((item, index) => {
          return (
            <View key={index}>
              <AccordionCard {...{item, index, onPress: showPage}} />
            </View>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }>
      <Accordion
        sections={data}
        activeSections={activeSections}
        touchableComponent={TouchableWithoutFeedback}
        expandMultiple={false}
        sectionContainerStyle={{marginBottom: 20}}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={setSections}
      />
    </ScrollView>
  );
};

export default CollapsibleAccordion;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  headerText: {
    width: '90%',
    textAlign: 'left',
    color: Colors.white,
  },
  content: {
    padding: 20,
    backgroundColor: Colors.fadeBlue,
  },
  active: {
    padding: 20,
    borderRadius: 10,
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  inactive: {
    padding: 20,
    borderRadius: 10,
  },
  activeContent: {
    borderRadius: 10,
    borderTopWidth: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  inactiveContent: {
    borderRadius: 10,
  },
});
