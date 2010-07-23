jqDnR-touch - Minimalistic Drag'n'Resize for jQuery
===================================================

based on [jqDnr](http://dev.iceburg.net/jquery/jqDnR/) &copy; 2007 Brice Burgess &lt;bhb@iceburg.net&gt;

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

#### This version was heavily modified by [@gaarf](http://gaarf.info) for:

 * jQuery 1.4 support
 * touch events (works on iOS devices)
 * z-index upping
 * legibility

#### usage:

if box is a DOM node that should be draggable:

    $(box).jqDrag();

if box is a DOM node that should be both draggable and resizable:

    $(box).jqDrag(moveHandle).jqResize(resizeHandle);

where moveHandle/resizeHandle are optional DOM elements. if not defined, the whole box will be used as handle.
  
#### jQuery synthesized events triggered:

 * `jqDnRstart`: drag/resize operation starts
 * `jqDnRend`: drag/resize operation ends
 * `jqDnRtop`: element brought to top (via click or touch) without drag

