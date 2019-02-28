module.exports = (params) => {
  let pos;
  // eslint-disable-next-line prefer-destructuring
  if (!params.modifiers || !params.modifiers.pos) { pos = 'uAPI'; } else { pos = params.modifiers.pos; }
  return {
    'common:BillingPointOfSaleInfo': {
      attributes: {
        OriginApplication: pos,
      },

    },
  };
};
