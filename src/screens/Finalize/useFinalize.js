import moment from 'moment';

const useFinalize = ({navigation, route}) => {
  const data = route.params;
  console.log('useFinalize', data);
  const GoNext = () => navigation.replace('MainTabScreen');

  const meditateMoment = data?.momentView?.title;
  const meditateTime = moment(data?.time).format('hh:mm A');

  return {data, meditateMoment, meditateTime, GoNext};
};

export default useFinalize;
