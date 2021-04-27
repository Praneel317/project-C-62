import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';

export default class homeScreen extends Component {
  constructor() {
    super();
    this.state = {
      totalStudentsName: [],
      presentStudentNames: [],
      absentStudentNames: [],
      bgColor: 'yellow',
    };
  }

  componentDidMount() {
    var newClassList = [];
    var class_ref = db.ref('classname/');
    class_ref.on('value', (data) => {
      var classList = data.val();
      console.log(classList);
      for (var i in classList) {
        newClassList.push(classList[i]);
      }
      newClassList.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      console.log(newClassList);
      this.setState({ totalStudentsName: newClassList });
    });
  }

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  render() {
    return (
      <View>
        <AppHeader />
        <View>
          {this.state.totalStudentsName.map((input) => {
            return (
              <View>
                <Text style={styles.displayText}>{input.name}</Text>
                <TouchableOpacity
                  style={[
                    styles.presentButton,
                    { backgroundColor: 'green' },
                  ]}
                  onPress={() => {
                      var presentStudentNames = this.state.presentStudentNames;
                      presentStudentNames.push(input);
                      this.setState({ presentStudentNames: presentStudentNames });
                      console.log(presentStudentNames)
                  }}>
                  <Text> Present </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.absentButton,
                    { backgroundColor: 'red' },
                  ]}
                  onPress={() => {
                    var absentStudentNames = this.state.presentStudentNames;
                     absentStudentNames.push(input);
                      this.setState({ absentStudentNames: absentStudentNames });
                      console.log(absentStudentNames)
                  }}>
                  <Text> Absent </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayText: {
    fontSize: 30,
    color: 'black',
    fontFamily:'comic sans ms',
    fontWeight: 'bold',
    marginLeft:120,
    marginTop:20
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 4,
    marginLeft:120,
    marginTop:20
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 4,
    marginLeft:120
  },
});
