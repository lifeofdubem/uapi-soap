const _ = require('lodash');

module.exports = (params) => {
  if (!params.pricing) { return {}; }

  const {
    eTicketability, currency, sellCheck, discountCard, promoCodes,
  } = params.pricing;

  const pricingModifiers = {
    AirPricingModifiers: {
      attributes: {
        FaresIndicator: 'PublicFaresOnly',
      },
    },
  };

  // Add Currency
  if (currency) {
    if (currency.length !== 3) {
      // TODO Add custom error class
      throw new Error('Currency Code sholud be 3 character');
    }
    _.assign(pricingModifiers.AirPricingModifiers.attributes, {
      CurrencyType: currency,
    });
  }

  // Add ETicketability
  if (eTicketability) {
    if (!['Yes', 'No', 'Required,', 'Ticketless'].includes(eTicketability)) {
      // TODO Add Custom Error Class
      throw new Error('ETicketability permitted value ["Yes", "No", "Required", "Ticketless"]');
    }
    _.assign(pricingModifiers.AirPricingModifiers.attributes, {
      ETicketability: eTicketability,
    });
  }

  // Add sellCheck
  if (sellCheck) {
    _.assign(pricingModifiers.AirPricingModifiers.attributes, {
      SellCheck: sellCheck,
    });
  }

  // // Add Discount Card
  // if (discountCard) {
  //   const {
  //     code, key, description, number,
  //   } = discountCard;
  //   if (!code) {
  //     throw new Error('Discount code is required');
  //   }
  //   _.assign(pricingModifiers.AirPricingModifiers, {
  //     DiscountCard: {
  //       attributes: {
  //         Code: code,
  //       },
  //     },
  //   });
  //   if (key) {
  //     _.assign(pricingModifiers.AirPricingModifiers.DiscountCard.attributes, { Key: key });
  //   }
  //   if (description) {
  //     _.assign(pricingModifiers.AirPricingModifiers.DiscountCard.attributes,
  //         { Description: description });
  //   }
  //   if (number) {
  //     _.assign(pricingModifiers.AirPricingModifiers.DiscountCard.attributes, { Number: number });
  //   }
  // }

  // Add Promo Codes
  if (promoCodes && promoCodes.length > 0) {
    pricingModifiers.AirPricingModifiers.PromoCodes = {
      PromoCode: [],
    };
    promoCodes.forEach((promoCode) => {
      const { code, provider, supplier } = promoCode;
      if (!code || !provider || !supplier) {
        // TODO add custom error class
        throw new Error('Promo Code missing required param');
      }
      pricingModifiers.AirPricingModifiers.PromoCodes.PromoCode.push({
        attributes: {
          Code: code,
          ProviderCode: provider,
          SupplierCode: supplier,
        },
      });
    });
  }

  // Add Point of Sale
  if (params.pcc) {
    pricingModifiers.PCC = {
      'common:OverridePCC': {
        attributes: {
          PseudoCityCode: params.pcc,
          ProviderCode: params.provider,
        },
      },
    };
  }

  return pricingModifiers;
};
