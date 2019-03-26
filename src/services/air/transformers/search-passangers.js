module.exports = (params) => {
  const searchPassenger = {
    'common:SearchPassenger': [],
  };

  // Minimum of 1 Adult required
  const passengers = params.passengers || {};

  if (!passengers.adt) { passengers.adt = 1; }
  const {
    adt, cnn, inf, ins,
  } = passengers;
  /* eslint-disable no-plusplus */

  // Add Adults
  for (let i = 0; i < adt; i++) {
    searchPassenger['common:SearchPassenger'].push({
      attributes: {
        Code: 'ADT',
      },
    });
  }

  // Add Childrens
  let isArray = Array.isArray(cnn);
  let count = isArray ? cnn.length : cnn;
  for (let i = 0; i < count; i++) {
    // Set Age 2 - 11
    let { age } = isArray ? cnn[i] : 9;
    age = (age > 1 && age < 12) ? age : 9;
    searchPassenger['common:SearchPassenger'].push({
      attributes: {
        Code: 'CNN',
        Age: age,
      },
    });
  }

  // Add Infant
  isArray = Array.isArray(inf);
  count = isArray ? inf.length : inf;
  for (let i = 0; i < count; i++) {
    // Set Age 0 - 1
    let { age } = isArray ? inf[i] : 1;
    age = (age >= 0 && age < 2) ? age : 1;
    searchPassenger['common:SearchPassenger'].push({
      attributes: {
        Code: 'INF',
        Age: age,
      },
    });
  }

  // Add Infants with seat
  isArray = Array.isArray(ins);
  count = isArray ? ins.length : ins;
  for (let i = 0; i < count; i++) {
    // Set Age 0 - 1
    let { age } = isArray ? ins[i] : 1;
    age = (age >= 0 && age < 2) ? age : 1;

    searchPassenger['common:SearchPassenger'].push({
      attributes: {
        Code: 'INS',
        Age: age,
      },
    });
  }
  return searchPassenger;
};
