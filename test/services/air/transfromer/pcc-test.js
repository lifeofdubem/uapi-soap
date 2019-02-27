const chai = require('chai');

const pccTransformer = require('../../../../src/services/air/transformers/pcc');

const { expect } = chai;

describe('#PCC Transformer', () => {
  it('should add PCC to root attribtes', () => {
    const params = { pcc: 'pcc', pricing: {} };
    const expected = {
      PCC: {
        'common:OverridePCC': {
          attributes: {
            ProviderCode: undefined,
            PseudoCityCode: 'pcc',
          },
        },
      },
    };

    expect(pccTransformer(params)).to.be.deep.equal(expected);
  });

  it('should return an empty object if pcc is undefined', () => {
    expect(pccTransformer({})).to.be.deep.equal({});
    expect(pccTransformer({ pcc: '' })).to.be.deep.equal({});
    expect(pccTransformer({ pcc: undefined })).to.be.deep.equal({});
  });
});
