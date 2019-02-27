module.exports = (params) => {
  if (!params.pcc) return {};
  // Add Point of Sale

  return {
    PCC: {
      'common:OverridePCC': {
        attributes: {
          PseudoCityCode: params.pcc,
          ProviderCode: params.provider,
        },
      },
    },
  };
};
