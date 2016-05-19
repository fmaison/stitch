
function ensure(obj, name, factoryFn) {
    return obj[name] || (obj[name] = factoryFn());
}

// esnure library is on window
var stitch = ensure(window, "stitch", Object);

