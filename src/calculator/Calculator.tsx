import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
interface IProps {
  navigation?: any;
}
interface IState {
  value: string;
  displayValue: string;
  result: string;
  occurance: boolean;
  history: any[];
  count: boolean;
  number: number;
}
class Calculator extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      displayValue: '',
      result: '',
      occurance: false,
      history: [],
      count: false,
      number: 0,
    };
  }
  handleClear = () => {
    this.setState({
      displayValue: '',
      result: '',
    });
  };
  handleOperation = (num: string) => {
    const string = '+-/*%.';
    if (num == '.') {
      this.setState({count: true, number: 1});
    }
    if (isNaN(num)) {
      if (this.state.number === 1) {
        this.setState({count: false});
      }
      this.setState({occurance: true, count: true});
    } else {
      this.setState({occurance: false});
    }
    const result = this.state.displayValue;
    this.setState(prev => ({displayValue: prev.displayValue + num}));
  };

  storeHistory = () => {
    const data = {
      displayvalue: this.state.displayValue,
      result: this.state.result,
    };
    this.setState({
      history: [...this.state.history, data],
    });
  };
  calculate = () => {
    try {
      const checkSign = (value: string, sign: string) =>
        value.split(sign).length > 2;
      const valid = checkSign(this.state.displayValue, '.');
      if (valid) {
        Alert.alert("cann't find this value");
      } else {
        const result = eval(this.state.displayValue);
        this.setState(
          {
            result: result,
          },
          this.storeHistory,
        );
      }
    } catch (err) {
      console.log('error:', err);
    }
  };
  backSpace = () => {
    this.setState({
      displayValue: this.state.displayValue.slice(
        0,
        this.state.displayValue.length - 1,
      ),
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.screenSection}>
          <Text style={styles.displayValue}>{this.state.displayValue}</Text>
          <Text style={styles.result}>{this.state.result}</Text>
        </View>
        <View style={styles.buttonSection}>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => this.handleClear()}
              style={[styles.actionButton, styles.clearbtn]}>
              <Text style={[styles.butonText]}>Ac</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.occurance}
              onPress={() => this.handleOperation('%')}
              style={styles.actionButton}>
              <Text style={styles.butonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.occurance}
              onPress={() => this.handleOperation('/')}
              style={styles.actionButton}>
              <Text style={styles.butonText}>/</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.calculate()}
              style={styles.actionButton}>
              <Text style={styles.butonText}>=</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => this.handleOperation('7')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('8')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('9')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.occurance}
              onPress={() => this.handleOperation('*')}
              style={styles.actionButton}>
              <Text style={styles.butonText}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => this.handleOperation('4')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('5')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('6')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.occurance}
              onPress={() => this.handleOperation('-')}
              style={styles.actionButton}>
              <Text style={styles.butonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => this.handleOperation('1')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('2')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('3')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.occurance}
              onPress={() => this.handleOperation('+')}
              style={styles.actionButton}>
              <Text style={styles.butonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => this.handleOperation('0')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleOperation('00')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.count}
              onPress={() => this.handleOperation('.')}
              style={[styles.actionButton, styles.numberBtn]}>
              <Text style={[styles.butonText, styles.numberValue]}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.backSpace()}
              style={[styles.actionButton, styles.deletebtn]}>
              <Text style={styles.butonText}>Del</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Calculator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    position: 'relative',
  },
  header: {
    position: 'relative',
  },
  historybutton: {
    alignItems: 'flex-end',
    width: 120,
    position: 'absolute',
    right: 0,
  },
  historyBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  screenSection: {
    marginTop: responsiveHeight(3),
    height: responsiveHeight(25),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayValue: {
    color: 'white',
    fontSize: responsiveFontSize(3),
    fontWeight: '500',
  },
  result: {
    color: 'white',
    fontSize: responsiveFontSize(4),
    textAlign: 'right',
    fontWeight: '700',
    marginTop: responsiveHeight(3),
  },
  buttonSection: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(100),
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: responsiveWidth(17),
    height: responsiveHeight(8),
    backgroundColor: '#4B5EFC',
    margin: responsiveWidth(3),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  butonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  numberBtn: {
    backgroundColor: 'white',
    borderRadius: 40,
  },
  numberValue: {
    color: 'black',
  },
  clearbtn: {
    backgroundColor: '#2E2F38',
  },
  deletebtn: {
    backgroundColor: '#E66666',
  },
});
