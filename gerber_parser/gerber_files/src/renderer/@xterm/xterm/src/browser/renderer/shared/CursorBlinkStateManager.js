"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorBlinkStateManager = void 0;
/**
 * The time between cursor blinks.
 */
const BLINK_INTERVAL = 600;
class CursorBlinkStateManager {
    constructor(_renderCallback, _coreBrowserService) {
        this._renderCallback = _renderCallback;
        this._coreBrowserService = _coreBrowserService;
        this.isCursorVisible = true;
        if (this._coreBrowserService.isFocused) {
            this._restartInterval();
        }
    }
    get isPaused() { return !(this._blinkStartTimeout || this._blinkInterval); }
    dispose() {
        if (this._blinkInterval) {
            this._coreBrowserService.window.clearInterval(this._blinkInterval);
            this._blinkInterval = undefined;
        }
        if (this._blinkStartTimeout) {
            this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout);
            this._blinkStartTimeout = undefined;
        }
        if (this._animationFrame) {
            this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame);
            this._animationFrame = undefined;
        }
    }
    restartBlinkAnimation() {
        if (this.isPaused) {
            return;
        }
        // Save a timestamp so that the restart can be done on the next interval
        this._animationTimeRestarted = Date.now();
        // Force a cursor render to ensure it's visible and in the correct position
        this.isCursorVisible = true;
        if (!this._animationFrame) {
            this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
                this._renderCallback();
                this._animationFrame = undefined;
            });
        }
    }
    _restartInterval(timeToStart = BLINK_INTERVAL) {
        // Clear any existing interval
        if (this._blinkInterval) {
            this._coreBrowserService.window.clearInterval(this._blinkInterval);
            this._blinkInterval = undefined;
        }
        // Setup the initial timeout which will hide the cursor, this is done before
        // the regular interval is setup in order to support restarting the blink
        // animation in a lightweight way (without thrashing clearInterval and
        // setInterval).
        this._blinkStartTimeout = this._coreBrowserService.window.setTimeout(() => {
            // Check if another animation restart was requested while this was being
            // started
            if (this._animationTimeRestarted) {
                const time = BLINK_INTERVAL - (Date.now() - this._animationTimeRestarted);
                this._animationTimeRestarted = undefined;
                if (time > 0) {
                    this._restartInterval(time);
                    return;
                }
            }
            // Hide the cursor
            this.isCursorVisible = false;
            this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
                this._renderCallback();
                this._animationFrame = undefined;
            });
            // Setup the blink interval
            this._blinkInterval = this._coreBrowserService.window.setInterval(() => {
                // Adjust the animation time if it was restarted
                if (this._animationTimeRestarted) {
                    // calc time diff
                    // Make restart interval do a setTimeout initially?
                    const time = BLINK_INTERVAL - (Date.now() - this._animationTimeRestarted);
                    this._animationTimeRestarted = undefined;
                    this._restartInterval(time);
                    return;
                }
                // Invert visibility and render
                this.isCursorVisible = !this.isCursorVisible;
                this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
                    this._renderCallback();
                    this._animationFrame = undefined;
                });
            }, BLINK_INTERVAL);
        }, timeToStart);
    }
    pause() {
        this.isCursorVisible = true;
        if (this._blinkInterval) {
            this._coreBrowserService.window.clearInterval(this._blinkInterval);
            this._blinkInterval = undefined;
        }
        if (this._blinkStartTimeout) {
            this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout);
            this._blinkStartTimeout = undefined;
        }
        if (this._animationFrame) {
            this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame);
            this._animationFrame = undefined;
        }
    }
    resume() {
        // Clear out any existing timers just in case
        this.pause();
        this._animationTimeRestarted = undefined;
        this._restartInterval();
        this.restartBlinkAnimation();
    }
}
exports.CursorBlinkStateManager = CursorBlinkStateManager;
