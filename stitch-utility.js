"use strict";


/**
 * @description
 * Determines if a reference is undefined
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is undefined
 */
function isUndefined(value) {return typeof value === 'undefined';}

/**
 * @description
 * Determines if a reference is defined
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is defined
 */
function isDefined(value) {return typeof value !== 'undefined';}

/**
 * @description
 * Determines if a reference is an object
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is an object
 */
function isObject(value) {
    return value !== null && typeof value === "object";
}

/**
 * @description
 * Determines if value is an object with an empty prototype
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is an object with a blank prototype
 */
function isBlankObject(value) {
    return value !== null && typeof value === "object" && !Object.getPrototypeOf(value);
}

/**
 * @description
 * Determines if reference is a string
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is a string
 */
function isString(value) {
    return typeof value === "string";
}

/**
 * @description
 * Determines if reference is a number
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is a number
 */
function isNumber(value) {
    return typeof value === "number";
}

/***
 * @description
 * Determines if reference is a `Date`
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is a `Date`
 */
function isDate(value) {
    return String.toString(value) === '[object Date]';
}

/**
 * @description
 * Determines if reference is a `Function`
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is a `Function`
 */
function isFunction(value) {return typeof value === 'function';}

/**
 * @description
 * Determines if reference is an `Array`
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is an `Array`
 */
function isArray(value) {
    return Array.isArray(value);
}

/**
 * @description
 * Determines if reference is a primitive type
 * @param {*} value Reference to check
 * @returns {boolean} True if `value` is a primitive type
 */
function isPrimitive(value) {
    return typeof value !== "object" && (typeof value === "number" || typeof value === "string");
}

/**
 * @desc 
 * Extends `target` with properties from `source`.
 * This copies prototype as well.
 * @param {Object} target The object being extended
 * @param {Object} source The object used to extend `target`
 */
function extend(target, source) {
    for(var property in source) if(source.hasOwnProperty(property)) target[property] = source[property];
    function base() { this.constructor = d; }
    base.prototype = source.prototype;
    target.prototype = new base();
}