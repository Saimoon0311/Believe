import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {deleteIcon, newEdit} from '@/Assets/Images';
import {normal} from '@/Assets/lottie';
import PageHeading from '@/components/PageHeading';
import ReminderCard from '@/components/ReminderCard';
import AddReminderCard from '@/components/AddReminderCard';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors, FontFamily, modalStyles, overlayStyle} from '@/theme/Variables';
import {Modalize} from 'react-native-modalize';
import ClockModal from '@/components/ClockModal';
import useReminders from './useReminders';
import {styles} from './styles';
// import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Reminders = ({navigation, route}) => {
  const {
    data,
    title,
    listData,
    disabled,
    modalizeRef,
    isDatePickerVisible,
    onOpen,
    onClose,
    closeRow,
    deleteRow,
    onRefresh,
    onRowOpen,
    reminderDetail,
    hideDatePicker,
    showDatePicker,
    setDisabled,
    setTitle,
    onSave,
    time,
    onEdit,
    setTime,
  } = useReminders(navigation, route);

  const renderItem = useCallback(
    ({item}) => <ReminderCard {...{item, reminderDetail}} />,
    [listData],
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styled.rowBack}>
      <TouchableOpacity
        style={[styled.backRightBtn, styled.backRightBtnLeft]}
        onPress={() => onEdit(rowMap, data?.index)}>
        <Image source={newEdit} style={{tintColor: Colors.greenFaded}} />
        <Text style={styled.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styled.backRightBtn, styled.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data?.index)}>
        <Image source={deleteIcon} style={{tintColor: Colors.redFade}} />
        <Text style={styled.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const headingTitle = data?.title;

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: headingTitle, navigation, backButton: true}} />
      <AddReminderCard {...{title: 'Add Reminder', onPress: onOpen}} />
      <View style={styles.container}>
        <SwipeListView
          useFlatList={true}
          data={listData}
          disableRightSwipe={true}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-120}
          previewRowKey={'0'}
          previewOpenValue={0}
          previewOpenDelay={3000}
          onRowOpen={onRowOpen}
          keyExtractor={keyExtractor}
          refreshing={false}
          onRefresh={onRefresh}
          // ListEmptyComponent={
          //   <EmptyComponent
          //     title="Ooopss!"
          //     description="Reminders"
          //     onRefresh={onRefresh}
          //   />
          // }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        withHandle={false}
        closeOnOverlayTap={true}
        modalStyle={[modalStyles, {flex: 0.9}]}
        overlayStyle={overlayStyle}>
        <ClockModal
          {...{
            onClose,
            showDatePicker,
            hideDatePicker,
            isDatePickerVisible,
            setDisabled,
            disabled,
            setTitle,
            title,
            onSave,
            time,
            setTime,
          }}
        />
      </Modalize>
    </AnimatedBackground>
  );
};

export default React.memo(Reminders);

const styled = StyleSheet.create({
  editText: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.greenFaded,
    fontFamily: FontFamily.regular,
  },
  deleteText: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.redFade,
    fontFamily: FontFamily.regular,
  },
  rowBack: {
    width: '100%',
    height: 85,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'flex-end',
    backgroundColor: '#07385C',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    height: 80,
    width: 60,
  },
  backRightBtnLeft: {
    right: 60,
  },
  backRightBtnRight: {
    right: 0,
  },
});

// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

// import 'prop-types';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       basic: true,
//       listViewData: Array(20)
//         .fill('')
//         .map((_, i) => `item #${i}`),
//     };
//   }

//   deleteRow(secId, rowId, rowMap) {
//     rowMap[`${secId}${rowId}`].closeRow();
//     const newData = [...this.state.listViewData];
//     newData.splice(rowId, 1);
//     this.setState({listViewData: newData});
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.standalone}>
//           <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
//             <View style={styles.standaloneRowBack}>
//               <Text style={styles.backTextWhite}>Left</Text>
//               <Text style={styles.backTextWhite}>Right</Text>
//             </View>
//             <View style={styles.standaloneRowFront}>
//               <Text>I am a standalone SwipeRow</Text>
//             </View>
//           </SwipeRow>
//         </View>

//         <View style={styles.controls}>
//           <View style={styles.switchContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.switch,
//                 {backgroundColor: this.state.basic ? 'grey' : 'white'},
//               ]}
//               onPress={_ => this.setState({basic: true})}>
//               <Text>Basic</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.switch,
//                 {backgroundColor: this.state.basic ? 'white' : 'grey'},
//               ]}
//               onPress={_ => this.setState({basic: false})}>
//               <Text>Advanced</Text>
//             </TouchableOpacity>
//           </View>
//           {!this.state.basic && <Text>(per row behavior)</Text>}
//         </View>

//         {this.state.basic && (
//           <SwipeListView
//             data={this.state.listViewData}
//             renderRow={data => (
//               <TouchableHighlight
//                 onPress={_ => console.log('You touched me')}
//                 style={styles.rowFront}
//                 underlayColor={'#AAA'}>
//                 <View>
//                   <Text>I am {data} in a SwipeListView</Text>
//                 </View>
//               </TouchableHighlight>
//             )}
//             renderHiddenRow={(data, secId, rowId, rowMap) => (
//               <View style={styles.rowBack}>
//                 <Text>Left</Text>
//                 <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
//                   <Text style={styles.backTextWhite}>Right</Text>
//                 </View>
//                 <TouchableOpacity
//                   style={[styles.backRightBtn, styles.backRightBtnRight]}
//                   onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                   <Text style={styles.backTextWhite}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             leftOpenValue={75}
//             rightOpenValue={-150}
//           />
//         )}

//         {!this.state.basic && (
//           <SwipeListView
//             data={this.state.listViewData}
//             renderRow={(data, secId, rowId, rowMap) => (
//               <SwipeRow
//                 disableLeftSwipe={parseInt(rowId) % 2 === 0}
//                 leftOpenValue={20 + Math.random() * 150}
//                 rightOpenValue={-150}>
//                 <View style={styles.rowBack}>
//                   <Text>Left</Text>
//                   <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
//                     <Text style={styles.backTextWhite}>Right</Text>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.backRightBtn, styles.backRightBtnRight]}
//                     onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                     <Text style={styles.backTextWhite}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TouchableHighlight
//                   onPress={_ => console.log('You touched me')}
//                   style={styles.rowFront}
//                   underlayColor={'#AAA'}>
//                   <View>
//                     <Text>I am {data} in a SwipeListView</Text>
//                   </View>
//                 </TouchableHighlight>
//               </SwipeRow>
//             )}
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   standalone: {
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   standaloneRowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     justifyContent: 'center',
//     height: 50,
//   },
//   standaloneRowBack: {
//     alignItems: 'center',
//     backgroundColor: '#8BC645',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },
//   rowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     justifyContent: 'center',
//     height: 50,
//   },
//   rowBack: {
//     alignItems: 'center',
//     backgroundColor: '#DDD',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
//   },
//   backRightBtn: {
//     alignItems: 'center',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
//   },
//   backRightBtnLeft: {
//     backgroundColor: 'blue',
//     right: 75,
//   },
//   backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 0,
//   },
//   controls: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 5,
//   },
//   switch: {
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'black',
//     paddingVertical: 10,
//     width: 100,
//   },
// });

// export default App;
