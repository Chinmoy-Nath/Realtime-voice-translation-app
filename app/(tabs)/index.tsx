import { StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (<div>
    <h1 style={{ color: 'white', fontSize: 400 }}>HelloWave</h1>
  </div>);
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
