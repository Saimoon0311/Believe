const useAffiliate = ({navigation, route}) => {
  const data = route.params;
  // console.log('useReminders', data);
  const viewRefer = () => navigation.navigate('AffiliateReferral');
  return {data, viewRefer};
};

export default useAffiliate;
