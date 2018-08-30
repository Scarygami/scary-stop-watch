# \<scary-stopwatch\>

A simple stopwatch web-component.

Most styling can happen directly on the element.

There's a custom property for the font-size of the milliseconds.

```
scary-stopwatch {
  font-size: 16px;
  --font-size-ms: 60%;
}
```

Supported methods of the element are:

`.start(resume)` - Starts the stopwatch. If `resume` is true the time will continue from when it was last stopped. Otherwise it will start from 00:00

`.stop()` - Stops the stopwatch.

`.reset()` - Resets the time to 00:00.

The current time (in ms) can be read from the `.time` property.
