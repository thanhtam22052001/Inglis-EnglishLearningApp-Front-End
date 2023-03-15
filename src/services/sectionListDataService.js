import moment from 'moment';
export const toSectionListData = DATA => {
  const obj = DATA.reduce((group, folder) => {
    const {updatedAt} = folder;
    group[updatedAt] = group[updatedAt] ?? [];
    group[updatedAt].push(folder);
    return group;
  }, {});
  const processedData = Object.keys(obj).map(key => {
    return {
      title:
        key === moment().format('DD / MM / YYYY').toString() ? 'TODAY' : key,
      data: obj[key],
    };
  });

  return processedData;
};
