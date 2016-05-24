
"use strict";

function $EventQueue() {
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
    this._queue = [];

    this.scheduleChanges = createChangeSchedule(function () {
        me.applyChanges();
    });
}

/**
 * @description
 * Adds a `Watch` to the queue to have its changes digested
 * @param {Object} watch The `Watch` that was responsible for observing the change
 */
$EventQueue.prototype.queueTask = function (task) {

    if (this._queue.length < 1) this.scheduleChanges();
    this._queue.push(task);
}

/**
 * @description 
 * Applies queued changes
 */
$EventQueue.prototype.applyChanges = function () {
    var queue = this._queue;
    var index = 0, task;
    while (index < queue.length) {
        task = queue[index];
        // affect change
        task.run();
        index++;
    }

    // reset
    queue.length = 0;
}