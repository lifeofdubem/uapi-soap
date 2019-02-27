module.exports = (params) => {
  let pos;
  if (!params.modifiers || !params.modifiers.pos) { pos = 'uAPI'; } else { pos = params.modifiers.pos; }
  return {
    'common:BillingPointOfSaleInfo': {
      attributes: {
        OriginApplication: pos,
      },

    },
  };
};
