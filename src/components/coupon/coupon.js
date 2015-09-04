
Coupon = {}
// Callback-style component

Coupon.controller = function (options) {
  var ctrl = this;
  ctrl.code = m.prop('');
  ctrl.error = m.prop(null);

  ctrl.submit = function (e) {
    e.preventDefault();
    ctrl.error(null); //reset to null before each submit
    validateCoupon(ctrl.code())
      .then(options.onSuccess, ctrl.error) // <-- this makes it callback-style
  }
}

Coupon.view = function (ctrl) {
  return m('form', { onsubmit: ctrl.submit }, [
    ctrl.error() ? [
      m('.error', "Invalid coupon.")
    ] : null,
    m('label', 'Enter coupon (if you have one):'),
    m('input[type=text]', {
      value: ctrl.code(),
      onchange: m.withAttr('value', ctrl.code)
    }),
    m('button[type=submit]', 'Validate coupon')
  ])
}

function validateCoupon (code) {
  var isValid = (code === 'happy') // This should be done on the server
  var discount = 0.20;  // And this
  var deferred = m.deferred() // Mock AJAX call
  if ( isValid ) { deferred.resolve(discount) }
  else           { deferred.reject('invalid_code') }
  return deferred.promise;
}