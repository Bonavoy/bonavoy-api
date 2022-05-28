/**
 * in-order traverse and extract the values given by key into arr
 *
 * @param {object} graph
 * @param {'places' || 'dayPlan' || 'spotsOfInterests'} key
 * @param {array} arr
 */
export const extractTripValues = (obj, key, arr) => {
  // base
  if (obj[key]) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item) => {
        arr.push(item);
      });
    } else {
      arr.push(obj[key]);
    }
  }

  // recursive
  else if (obj['places']) {
    obj['places'].forEach((place) => extractTripValues(place, key, arr));
  } else if (obj['dayPlan']) {
    extractTripValues(obj['dayPlan'], key, arr);
  }
};
