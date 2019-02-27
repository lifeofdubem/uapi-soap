const _ = require('lodash');

module.exports = (params) => {
  if (!params.pricing) { return {}; }

  const {
    eTicketability, currency, sellCheck, promoCodes,
  } = params.pricing;

  const root = {
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
      throw new Error('pricing.currency length should be equal 3');
    }
    _.assign(root.AirPricingModifiers.attributes, {
      CurrencyType: currency,
    });
  }

  // Add ETicketability
  if (eTicketability) {
    if (!['YES', 'NO', 'REQUIRED', 'TICKETLESS'].includes(eTicketability.toUpperCase())) {
      // TODO Add Custom Error Class
      throw new Error('pricing.eTicketability permitted value ["Yes", "No", "Required", "Ticketless"]');
    }
    _.assign(root.AirPricingModifiers.attributes, {
      ETicketability: eTicketability,
    });
  }

  // Add SellCheck
  if (sellCheck) {
    _.assign(root.AirPricingModifiers.attributes, {
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
    root.AirPricingModifiers.PromoCodes = {
      PromoCode: [],
    };
    promoCodes.forEach((promoCode) => {
      const { code, provider, supplier } = promoCode;
      if (!code) {
        // TODO add custom error class
        throw new Error('pricing.promoCodes[]: promo code is required');
      }
      if (!provider) {
        // TODO add custom error class
        throw new Error('pricing.promoCodes[]: promo provider is required');
      }
      if (!supplier) {
        // TODO add custom error class
        throw new Error('pricing.promoCodes[]: promo supplier is required');
      }
      root.AirPricingModifiers.PromoCodes.PromoCode.push({
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
    root.PCC = {
      'common:OverridePCC': {
        attributes: {
          PseudoCityCode: params.pcc,
          ProviderCode: params.provider,
        },
      },
    };
  }

  return root;
};
