var $wrap = $("#numWrap"), $strip = $("#strip"),
    $leftArrow = $(".wrapper > .arrows").first(),
    wrapWidth = $wrap.width() + $leftArrow.width(),
    margin = 10;

fill(20); select($(".numberItem").first());

$strip.on("click", ".numberItem", function() { select($(this)); });

function select($elem) {
    $(".numberItem").removeClass("selected");
    $elem.addClass("visited").addClass("selected");
    focus($elem[0]);
}

function focus(elem) {
    var stripPos = $strip.position(),
        numPos = $(elem).offset(),
        elemWidth = $(elem).width() + margin,
        numRight = numPos.left + elemWidth;

    if (numRight > wrapWidth) {
        $strip.css({"left": stripPos.left - elemWidth});
    }
    if (numPos.left < (margin + $leftArrow.width()))  {
        $strip.css({"left": stripPos.left + elemWidth});
    }
}

$(".wrapper").on("click", "a.arrow", function() {
    var stripPos = $strip.position();
    if (this.id == "lft") {
        $strip.css({"left": stripPos.left + (wrapWidth / 2)});
    } else {
        $strip.css({"left": stripPos.left - (wrapWidth / 2)});
    }
});

$(".controls").on("click", "a.arrow", function() {
    var $sel = $(".selected"), numPos, $sel, elemWidth;
      $elem = $sel.length > 0 ? $sel.first() : $(".numberItem").first();
    if (this.id == "lft") {
        $sel = $elem.prev().length > 0 ? $elem.prev() : $elem;
        select($sel);
    } else {
        $sel = $elem.next().length > 0 ? $elem.next() : $elem;
        select($sel);
    }
    numPos = $sel.offset(); elemWidth = $sel.width() + margin;
    numRight = numPos.left + elemWidth;
    if (numPos.left > wrapWidth) {
        $strip.css({"left": -($sel.text()) * $sel.width() });
    }
    if (numRight < 0) {
        $strip.css({"left": +($sel.text()) * $sel.width() });
    }
});

function fill(num){
    for (var i = 1; i <= num; i++) {
        var $d = $("<a href='#' class='numberItem'>" + i + "</a>");
        $strip.append($d);
    }
}
