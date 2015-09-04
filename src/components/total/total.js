
Total = {}
// This is a stateless component (no controller)

Total.pricePerCount = 10;
Total.calcPrice = function (discount, count) {
  var total = count * Total.pricePerCount;
  return roundCents(total - total * discount);
};

Total.view = function (ctrl, options) {
  return m('.total', [
    m('label', 'Total: '),
    m('b', "$" + Total.calcPrice(options.discount, options.count))
  ]);
};

function roundCents (num) {
  return Math.round(num * 100) / 100;
};