module.exports = params => ({
  'common:BillingPointOfSaleInfo': {
    attributes: {
      OriginApplication: params.application || 'uAPI',
    },

  },
});
