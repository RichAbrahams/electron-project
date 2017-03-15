import mongoRetrieveDocument from '../../mongoController/mongoRetrieveDocument';

export function asyncValidateConsignment(data) {
  const toCheck = {
    collection: 'consignments',
    index: { consignmentID: data.consignmentID },
  };
  return mongoRetrieveDocument(toCheck).then((result) => {
    if (result.success.length !== 0) {
      throw { consignmentID: 'That consignmentID is taken' };
    }
  });
}
