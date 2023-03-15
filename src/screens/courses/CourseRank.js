import {StyleSheet, Text, View, FlatList} from 'react-native';
import {containers} from '../../styles';
import React from 'react';
import StudentCourseListItem from '../../components/listItems/StudentCourseListItem';
const header = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      elevation: 10,
    }}>
    <StudentCourseListItem
      isUser
      id={1}
      name={'Lê Trần Bảo Lộc'}
      wordCorrect={496}
      timeCompleted={1224}
    />
    <Text
      style={{
        textAlign: 'left',
        width: '95%',
        fontSize: 18,
        fontFamily: 'Nunito-Black',
        paddingBottom: 10,
      }}>
      Top 20
    </Text>
  </View>
);
const renderItem = ({item, index}) => (
  <StudentCourseListItem
    id={item.id}
    name={item.name}
    wordCorrect={item.wordCorrect}
    timeCompleted={item.timeCompleted}
  />
);
const CourseRank = () => {
  const STUDENTS = [
    {id: 1, name: 'Dư Ngân', wordCorrect: 496, timeCompleted: 1224, rank: 'A0'},
    {
      id: 2,
      name: 'Nguyễn Hoàng Duy',
      wordCorrect: 496,
      timeCompleted: 1278,
      rank: 'A0',
    },
    {
      id: 3,
      name: 'Phong Thanh Phan',
      wordCorrect: 496,
      timeCompleted: 1303,
      rank: 'A0',
    },
    {
      id: 4,
      name: 'Thuỳ Linh',
      wordCorrect: 496,
      timeCompleted: 1366,
      rank: 'A0',
    },
    {id: 5, name: 'Phan Vi', wordCorrect: 496, timeCompleted: 1384, rank: 'A0'},
    {id: 6, name: 'Bùi Như', wordCorrect: 496, timeCompleted: 1396, rank: 'A0'},
    {
      id: 7,
      name: 'Vũ Thị Minh Ánh',
      wordCorrect: 496,
      timeCompleted: 1417,
      rank: 'A0',
    },
    {
      id: 8,
      name: 'Hằng Trần Thu',
      wordCorrect: 496,
      timeCompleted: 1427,
      rank: 'A0',
    },
    {
      id: 9,
      name: 'Trần Thị Thu Thảo',
      wordCorrect: 496,
      timeCompleted: 1470,
      rank: 'A0',
    },
    {
      id: 10,
      name: 'Huyền Vân',
      wordCorrect: 496,
      timeCompleted: 1470,
      rank: 'A0',
    },
    {
      id: 12,
      name: 'Hoài Thu',
      wordCorrect: 496,
      timeCompleted: 1594,
      rank: 'A0',
    },
    {
      id: 13,
      name: 'Nguyễn Lê Hoàng Khang',
      wordCorrect: 496,
      timeCompleted: 1620,
    },
    {
      id: 14,
      name: 'Kim Ngọc',
      wordCorrect: 496,
      timeCompleted: 1640,
      rank: 'A0',
    },
    {
      id: 15,
      name: 'Mai Duy Phương',
      wordCorrect: 496,
      timeCompleted: 1710,
      rank: 'A0',
    },
    {
      id: 16,
      name: 'Lê Thu Thảo',
      wordCorrect: 496,
      timeCompleted: 1786,
      rank: 'A0',
    },
    {
      id: 17,
      name: 'Văn Thuý Tâm',
      wordCorrect: 496,
      timeCompleted: 1802,
      rank: 'A0',
    },
    {
      id: 18,
      name: 'Tân Tân',
      wordCorrect: 496,
      timeCompleted: 1914,
      rank: 'A0',
    },
    {
      id: 19,
      name: 'Bích Lệ',
      wordCorrect: 496,
      timeCompleted: 1962,
      rank: 'A0',
    },
    {
      id: 20,
      name: 'Lê Tiến Phương',
      wordCorrect: 496,
      timeCompleted: 2480,
      rank: 'A0',
    },
  ];
  return (
    <FlatList
      style={{backgroundColor: 'white'}}
      removeClippedSubviews={true}
      data={STUDENTS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={header}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CourseRank;

const styles = StyleSheet.create({});
