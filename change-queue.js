"use strict";

function $ChangeQueue() {
    var me = this;
    /**
     * @description
     * Tries to schedule changes in browser's task queue
     * @param {Function} applyChangeDelegate The task that flushes the queue
     * @return {Function} `Function` that initiates scheduled request
     */
    function createChangeSchedule(applyChangeDelegate) {

        return function initiate() {
            var timeoutId = setTimeout(apply, 0);
            var intervalId = setInterval(apply, 40);
            /**
             * @description
             * Applies changes of queued watchers
             */
            function apply() {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
                applyChangeDelegate();
            }
        }
    }

    /**
     * @description 
     * Array of changes
     * @type {Array}
     */
    this._changes = [];

    this.scheduleChanges = createChangeSchedule(function () {
        me.applyChanges();
    });
}

/**
 * @description
 * Adds a `Watch` to the queue to have its changes digested
 * @param {Object} watch The `Watch` that was responsible for observing the change
 */
$ChangeQueue.prototype.add = function (watch) {

    if (this._changes.length < 1) this.scheduleChanges();
    this._changes.push(watch);
}

/**
 * @description 
 * Applies queued changes
 */
$ChangeQueue.prototype.applyChanges = function () {
    var watchers = this._changes;
    var index = 0, watcher;
    while (index < watchers.length) {
        watcher = watchers[index];
        // affect change
        watcher.digest();
        index++;
    }

    // reset
    watchers.length = 0;
};
