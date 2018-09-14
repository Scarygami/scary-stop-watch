import {LitElement, html} from '@polymer/lit-element';

/**
 * `scary-stopwatch`
 *
 * A simple stopwatch web-component.
 *
 * Most styling can happen directly on the element.
 * There's a custom property for the font-size of the milliseconds.
 *
 * ```
 * scary-stopwatch {
 *   font-size: 16px;
 *   --font-size-ms: 60%;
 * }
 * ```
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */
class ScaryStopwatch extends LitElement {

  static get is() {
    return 'scary-stopwatch';
  }

  static get properties() {
    return {
      _time: Number,
    };
  }

  /**
   * The current time displayed on the stopwatch in milliseconds
   *
   * @return {Number}
   */
  get time() {
    return this._time;
  }

  /**
   * Whether the stopwatch is currently running
   */
  get isRunning() {
    return this._running;
  }

  constructor() {
    super();
    this._time = 0;
    this._running = false;
    this._boundTimer = this._timer.bind(this);
  }


  render () {
    const style = html`
      <style>
        :host {
          display: block;
          font-size: 16px;
        }

        #ms {
          font-size: var(--font-size-ms, 60%);
        }
      </style>
    `;

    let time = this._time;
    const milliseconds = time % 1000;
    time = (time - milliseconds) / 1000;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    let display = '';
    if (hours > 0) {
      display = ('0' + hours.toString(10)).slice(-2) + ':';
    }
    display += ('0' + minutes.toString(10)).slice(-2) + ':' + ('0' + seconds.toString(10)).slice(-2) + '.'

    const displayMs = ('00' + milliseconds).slice(-3);

    return html`
      ${style}
      <span>${display}</span><span id="ms">${displayMs}</span>
    `;
  }

  /**
   * Resets the stopwatch to 0:00
   */
  reset() {
    this._time = 0;
    this._lastTime = Date.now();
  }

  /**
   * Starts the stopwatch
   *
   * @param {Boolean} resume If true, the stopwatch will continue from the current time, otherwise it will start from 0:00
   */
  start(resume) {
    if (this._running) {
      return;
    }
    if (!resume) {
      this._time = 0;
    }
    this._lastTime = Date.now();
    this._running = true;
    this._animationFrame = window.requestAnimationFrame(this._boundTimer);
  }

  _notify(time) {
    this.dispatchEvent(new CustomEvent('time-changed', {
      detail: {time}
    }));
  }

  /**
   * Stops the stopwatch
   */
  stop() {
    if (!this._running) {
      return;
    }
    this._running = false;
    const dif = Date.now() - this._lastTime
    if (dif != 0) {
      this._time += Date.now() - this._lastTime;
      this._notify(this._time);
    }

    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
  }

  _timer() {
    if (!this._running) {
      return;
    }
    const now = Date.now();
    const dif = Date.now() - this._lastTime
    if (dif != 0) {
      this._time += now - this._lastTime;
      this._notify(this._time);
      this._lastTime = now;
    }
    this._animationFrame = window.requestAnimationFrame(this._boundTimer);
  }
}

window.customElements.define(ScaryStopwatch.is, ScaryStopwatch);
