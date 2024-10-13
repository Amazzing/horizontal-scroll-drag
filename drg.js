$(document).ready(function () {
    if ('ontouchstart' in window) {
        return;
    }
    var drg = {
        data: {},
        dragThreshold: 5,
        eventSuffix: '.drg',
        init: function () {
            $('.drag-x').on('mousedown', function (e) {
                drg.bindEvents($(this), e.pageX);
            });
        },
        bindEvents: function ($el, pageX) {
            drg.data = {
                startX: pageX - $el.offset().left,
                offsetLeft: $el.offset().left,
                scrollLeft: $el.scrollLeft(),
                blockedEvents: {},
            };
            $(document).on('mousemove'+drg.eventSuffix, function (e) {
                e.preventDefault();
                let x = e.pageX - drg.data.offsetLeft,
                    walk = x - drg.data.startX;
                if (Math.abs(walk) > drg.dragThreshold) {
                    drg.blockDefaultEvent('click');
                    $el.scrollLeft(drg.data.scrollLeft - walk);
                }
            }).on('mouseup'+drg.eventSuffix, function (e) {
                setTimeout(function () {
                    drg.unbindEvents();
                }, 0); // Keep click events blocked if necessary
            });
            drg.blockDefaultEvent('dragstart');
        },
        unbindEvents: function () {
            drg.data = {};
            $(document).off(drg.eventSuffix);
        },
        blockDefaultEvent: function (type) {
            if (!drg.data.blockedEvents[type]) {
                $(document).on(type+drg.eventSuffix, function (e) {
                    return false;
                });
                drg.data.blockedEvents[type] = 1;
            }
        },
    };
    drg.init();
});
