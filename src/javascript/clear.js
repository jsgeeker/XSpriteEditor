;define('clear',function(){
    function Clear(){
        this.init();
    };
    Clear.prototype = {
        init:function(){
            this.elm = document.getElementsById();
        }
    };
    return Clear;
});
function showHand() {
    $("body").first().css("cursor", "url(image/handcursor.cur),url(image/handcursor.png),auto")
}
function hidHand() {
    $("body").first().css("cursor", "url(image/cursor.cur),url(image/cursor.png),auto")
}
function init(n) {
    anmCanvas = document.getElementById("anmCanvas"), canvas = document.getElementById("testCanvas"), canvas.height = n.height, canvas.width = n.width, bcr = canvas.getBoundingClientRect(), shapeContainer = new Container, canvas.addEventListener("mousedown", onCanvasMouseDown, !1), canvas.addEventListener("mousemove", onCanvasMouseMove, !1), canvas.addEventListener("mouseup", onCanvasMouseUp, !1), stage = new Stage(canvas), anmStage = new Stage(anmCanvas);
    var t = new Shape;
    anmStage.addChild(t), t.graphics.setStrokeStyle(1).beginStroke("#000").mt(anmCanvas.width / 2, 0).lt(anmCanvas.width / 2, anmCanvas.width).mt(0, anmCanvas.width / 2).lt(anmCanvas.width, anmCanvas.width / 2).endStroke(), clipContainer = new Container, clipContainer.x = anmCanvas.width / 2, clipContainer.y = anmCanvas.width / 2, anmStage.addChild(clipContainer), Touch.isSupported() && Touch.enable(stage), allBitmap = new Bitmap(n), stage.enableMouseOver(10), shapeContainer2 = new Container, stage.addChild(allBitmap, shapeContainer, shapeContainer2), stage.update(), imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), Ticker.setFPS(10), Ticker.addListener(window)
}
function tick() {
    anmStage.update(), stage.update()
}
function createRectangularSelection() {
    var n = new Shape;
    shapeContainer2.addChild(n), n.alpha = .2, n.graphics.setStrokeStyle(1).beginFill("#000").drawRect(startXY.x, startXY.y, endXY.x - startXY.x, endXY.y - startXY.y).endFill();
    var t = startXY.x,
        i = startXY.y,
        r = endXY.x,
        u = endXY.y;
    n.onPress = function (f) {
        shapeContainerOnPress = !0, mouseDown = !1;
        var e = {
            x: n.x - f.stageX,
            y: n.y - f.stageY
        };
        f.onMouseMove = function (f) {
            n.x = f.stageX + e.x, n.y = f.stageY + e.y, startXY.x = t + n.x, startXY.y = i + n.y, endXY.x = r + n.x, endXY.y = u + n.y
        }
    }, n.onMouseOut = function () {
        shapeContainerOnPress = !1
    }, n.onMouseOver = function () {
        shapeContainerOnPress = !0
    }, n.onDoubleClick = function () {
        anmPlaying || createFrame()
    }
}
function onCanvasMouseDown(n) {
    if (!anmPlaying) if ($("input[name='clipModel']").first().attr("checked")) {
        if (bcr = canvas.getBoundingClientRect(), clickPoint.x = n.clientX - bcr.left, clickPoint.y = n.clientY - bcr.top, isPointTransparent(clickPoint)) return;
        var t = searchTransparentRectByCenterPoint(clickPoint);
        startXY = t[0], endXY = t[1], createFrame(), createRectangularSelection()
    } else bcr = canvas.getBoundingClientRect(), shapeContainerOnPress || (mouseDown = !0, startXY.x = n.clientX - bcr.left, startXY.y = n.clientY - bcr.top)
}
function onCanvasMouseMove(n) {
    if (!anmPlaying) if ($("input[name='clipModel']").first().attr("checked")) bcr = canvas.getBoundingClientRect(), isPointTransparent({
        x: n.clientX - bcr.left,
        y: n.clientY - bcr.top
    }) ? hidHand() : showHand();
    else if (bcr = canvas.getBoundingClientRect(), mouseDown && !shapeContainerOnPress) {
        endXY.x = n.clientX - bcr.left, endXY.y = n.clientY - bcr.top, shapeContainer.removeAllChildren();
        var t = new Shape;
        t.alpha = .2, shapeContainer.addChild(t), t.graphics.setStrokeStyle(1).beginFill("#000").drawRect(startXY.x, startXY.y, endXY.x - startXY.x, endXY.y - startXY.y).endFill()
    }
    $("#mouseMeg").html("X:" + (n.clientX - bcr.left) + "__Y:" + (n.clientY - bcr.top) + "__FramesCount:" + anm.length / 6)
}
function onCanvasMouseUp(n) {
    anmPlaying || $("input[name='clipModel']").last().attr("checked") && (shapeContainerOnPress || (shapeContainer.removeAllChildren(), endXY.x = n.clientX - bcr.left, endXY.y = n.clientY - bcr.top, mouseDown = !1, createRectangularSelection()))
}
function showFrameInAnmStage(n) {
    clipContainer.removeAllChildren();
    var t = allBitmap.clone();
    t.sourceRect = new Rectangle(anm[(n - 1) * 6], anm[(n - 1) * 6 + 1], anm[(n - 1) * 6 + 2], anm[(n - 1) * 6 + 3]), t.regX = anm[(n - 1) * 6 + 4], t.regY = anm[(n - 1) * 6 + 5], clipContainer.addChild(t)
}
function createFrame() {
    startXY.x = startXY.x < 0 ? 0 : startXY.x, startXY.y = startXY.y < 0 ? 0 : startXY.y, anm.push(startXY.x), anm.push(startXY.y), anm.push(endXY.x - startXY.x), anm.push(endXY.y - startXY.y), anm.push((endXY.x - startXY.x) / 2), anm.push(endXY.y - startXY.y), currentFrameIndex = anm.length / 6 - 1, currentFrameIndex++, showFrameInAnmStage(currentFrameIndex), resetFrameInfo(), setTableSeleteStyle(currentFrameIndex)
}
function resetFrameInfo() {
    $("#frameInfo tbody").html("");
    for (var n = 0; n < anm.length; n += 6) $("#frameInfo tbody").append("<tr><td>Frame" + (Math.round(n / 6) + 1) + "<\/td><td>" + anm[n] + "_" + anm[n + 1] + "<\/td><td>" + anm[n + 2] + "_" + anm[n + 3] + "<\/td><td > " + anm[n + 4] + "<\/td><td >" + anm[n + 5] + "<\/td><td ><a href='javascript:deleteFrame(" + Math.round(n / 6) + ")'>Delete<\/a><\/td><\/tr>")
}
function setTableSeleteStyle(n) {
    $("#frameInfo tbody tr").each(function (t) {
        t + 1 === n ? $(this).css("background-color", "#fff") : $(this).css("background-color", "#E6EAE9")
    })
}
function deleteFrame(n) {
    anmPlaying || (anm.splice(n * 6, 6), $("#frameInfo tbody tr").eq(n).remove(), currentFrameIndex === n + 1 && currentFrameIndex > 0 && (currentFrameIndex--, currentFrameIndex === 0 && anm.length > 5 && currentFrameIndex++, showFrameInAnmStage(currentFrameIndex), setTableSeleteStyle(currentFrameIndex)), currentFrameIndex > n + 1 && (resetFrameInfo(), currentFrameIndex--, setTableSeleteStyle(currentFrameIndex), showFrameInAnmStage(currentFrameIndex)))
}
function play() {
    var i, n, t, r;
    if (anm.length !== 6) {
        for (anmPlaying = !0, clipContainer.removeAllChildren(), i = [], n = 0; n < anm.length; n += 6) t = allBitmap.clone(), t.sourceRect = new Rectangle(anm[n], anm[n + 1], anm[n + 2], anm[n + 3]), t.regX = anm[n + 4], t.regY = anm[n + 5], i.push(t);
        anmStage.addChild(clipContainer), r = new TweenAnimation(i, clipContainer, setTableSeleteStyle), r.play()
    }
}
function exportCode() {
    for (var t = "[", n = 0; n < anm.length; n += 6) t += "[" + anm[n] + "," + anm[n + 1] + "," + anm[n + 2] + "," + anm[n + 3] + ",0," + anm[n + 4] + "," + anm[n + 5] + "]", n !== anm.length - 6 && (t += ",");
    t += "]", $("#codeTxa").val(t)
}
function stop() {
    anmPlaying = !1, Tween.removeTweens(clipContainer), currentFrameIndex = 1, showFrameInAnmStage(1), setTableSeleteStyle(currentFrameIndex)
}
function goToPreFrame() {
    currentFrameIndex > 1 && (currentFrameIndex--, showFrameInAnmStage(currentFrameIndex), setTableSeleteStyle(currentFrameIndex))
}
function goToNextFrame() {
    currentFrameIndex < Math.round(anm.length / 6) && (currentFrameIndex++, setTableSeleteStyle(currentFrameIndex), showFrameInAnmStage(currentFrameIndex))
}
function upCurrentFrameRegY() {
    if (anmPlaying) {
        for (var n = 0; n < anm.length / 6; n++) anm[n * 6 + 5]++, window.frameInfo.rows[n + 1].cells[4].innerHTML = anm[n * 6 + 5];
        stop(), play()
    } else anm[(currentFrameIndex - 1) * 6 + 5]++, showFrameInAnmStage(currentFrameIndex), window.frameInfo.rows[currentFrameIndex].cells[4].innerHTML = clipContainer.getChildAt(0).regY
}
function leftCurrentFrameRegX() {
    if (anmPlaying) {
        for (var n = 0; n < anm.length / 6; n++) anm[n * 6 + 4]++, window.frameInfo.rows[n + 1].cells[3].innerHTML = anm[n * 6 + 4];
        stop(), play()
    } else anm[(currentFrameIndex - 1) * 6 + 4]++, showFrameInAnmStage(currentFrameIndex), window.frameInfo.rows[currentFrameIndex].cells[3].innerHTML = clipContainer.getChildAt(0).regX
}
function rightCurrentFrameRegX() {
    if (anmPlaying) {
        for (var n = 0; n < anm.length / 6; n++) anm[n * 6 + 4]--, window.frameInfo.rows[n + 1].cells[3].innerHTML = anm[n * 6 + 4];
        stop(), play()
    } else anm[(currentFrameIndex - 1) * 6 + 4]--, showFrameInAnmStage(currentFrameIndex), window.frameInfo.rows[currentFrameIndex].cells[3].innerHTML = clipContainer.getChildAt(0).regX
}
function downCurrentFrameRegY() {
    if (anmPlaying) {
        for (var n = 0; n < anm.length / 6; n++) anm[n * 6 + 5]--, window.frameInfo.rows[n + 1].cells[4].innerHTML = anm[n * 6 + 5];
        stop(), play()
    } else anm[(currentFrameIndex - 1) * 6 + 5]--, showFrameInAnmStage(currentFrameIndex), window.frameInfo.rows[currentFrameIndex].cells[4].innerHTML = clipContainer.getChildAt(0).regY
}
function clearFrame() {
    confirm("are  you sure?") && (currentFrameIndex = 0, clipContainer.removeAllChildren(), $("#frameInfo tbody").html(""), anm.length = 0)
}
function getRGBAByPosition(n) {
    var t = getImageDataStartIndexByPosition(n)
}
function isPointTransparent(n) {
    var t = canvas.getContext("2d").getImageData(n.x, n.y, 1, 1),
        i = t.data[0] + t.data[1] + t.data[2] + t.data[3];
    return i === 0 || i === 1020 ? !0 : !1
}
function isXLineTransparent(n, t) {
    var f, r, i, u;
    for (correctionPosition(n), correctionPosition(t), f = t.y, r = n.x; r < t.x + 1; r++) if (i = getImageDataStartIndexByPosition({
        x: r,
        y: f
    }), u = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3], u !== 0 && u !== 1020) return !1;
    return !0
}
function isYLineTransparent(n, t) {
    var f, r, i, u;
    for (correctionPosition(n), correctionPosition(t), f = t.x, r = n.y; r < t.y + 1; r++) if (i = getImageDataStartIndexByPosition({
        x: f,
        y: r
    }), u = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3], u !== 0 && u !== 1020) return !1;
    return !0
}
function getImageDataStartIndexByPosition(n) {
    return n.y * canvas.width * 4 + n.x * 4 + 1
}
function correctionPosition(n) {
    n.x < 0 && (n.x = 0), n.y < 0 && (n.y = 0), n.x > canvas.width && (n.x = canvas.width), n.y > canvas.height && (n.y = canvas.height)
}
function searchTransparentRectByCenterPoint(n) {
    var t = {
        x: n.x - leftIncreasePixel,
        y: n.y - upIncreasePixel
    },
        r = {
            x: n.x + rightIncreasePixel,
            y: n.y - upIncreasePixel
        },
        i = {
            x: n.x + rightIncreasePixel,
            y: n.y + downIncreasePixel
        },
        u = {
            x: n.x - leftIncreasePixel,
            y: n.y + downIncreasePixel
        },
        f = !0;
    return isXLineTransparent(t, r) || (t.y > 0 ? (upIncreasePixel += increasePixel, f = !1) : (t.y = 0, r.y = 0)), isYLineTransparent(r, i) || (r.x < canvas.width ? (f = !1, rightIncreasePixel += increasePixel) : (r.x = canvas.width, i.x = canvas.width)), isXLineTransparent(u, i) || (i.y < canvas.height ? (f = !1, downIncreasePixel += increasePixel) : (i.y = canvas.height, u.y = canvas.height)), isYLineTransparent(t, u) || (u.x > 0 ? (f = !1, leftIncreasePixel += increasePixel) : (t.x = 0, u.x = 0)), f ? (leftIncreasePixel = 2, rightIncreasePixel = 2, upIncreasePixel = 2, downIncreasePixel = 2, [t, i]) : searchTransparentRectByCenterPoint(n)
}
function handleKeyDown(n) {
    if (!n) var n = window.event;
    switch (n.keyCode) {
    case KEYCODE_A:
    case KEYCODE_LEFT:
        leftCurrentFrameRegX();
        break;
    case KEYCODE_D:
    case KEYCODE_RIGHT:
        rightCurrentFrameRegX();
        break;
    case KEYCODE_W:
    case KEYCODE_UP:
        upCurrentFrameRegY();
        break;
    case KEYCODE_S:
    case KEYCODE_DOWN:
        downCurrentFrameRegY()
    }
}
function handleKeyUp() {}(function (n) {
    (function () {
        if (!n.featureTests.allPassed) {
            document.documentElement.className += " not-supported";
            return
        }
        var t = $(".canvas-inner"),
            u = $(".code-container"),
            i = $(".tutorial"),
            r = new n.ImgInput(t, t, i.attr("href"));
        r.bind("load", function (n) {
            $(".container").hide(), $("#mainpanel").show(), $("body").css("background", "#E6EAE9"), init(n)
        }), i.click(function (n) {
            r.loadImgUrl(this.href), n.preventDefault()
        })
    })()
})(spriteCow), function (n) {
    var t = function () {
            throw "UID cannot be instantiated";
        };
    t._nextID = 0, t.get = function () {
        return t._nextID++
    }, n.UID = t
}(window), function (n) {
    var t = function () {
            throw "Ticker cannot be instantiated.";
        };
    t.useRAF = null, t.animationTarget = null, t._listeners = null, t._pauseable = null, t._paused = !1, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTickers = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._rafActive = !1, t._timeoutID = null, t.addListener = function (n, i) {
        n != null && (t._inited || t.init(), t.removeListener(n), t._pauseable[t._listeners.length] = i == null ? !0 : i, t._listeners.push(n))
    }, t.init = function () {
        t._inited = !0, t._times = [], t._tickTimes = [], t._pauseable = [], t._listeners = [], t._times.push(t._lastTime = t._startTime = t._getTime()), t.setInterval(t._interval)
    }, t.removeListener = function (n) {
        t._listeners != null && (n = t._listeners.indexOf(n), n != -1 && (t._listeners.splice(n, 1), t._pauseable.splice(n, 1)))
    }, t.removeAllListeners = function () {
        t._listeners = [], t._pauseable = []
    }, t.setInterval = function (n) {
        t._interval = n, t._inited && t._setupTick()
    }, t.getInterval = function () {
        return t._interval
    }, t.setFPS = function (n) {
        t.setInterval(1e3 / n)
    }, t.getFPS = function () {
        return 1e3 / t._interval
    }, t.getMeasuredFPS = function (n) {
        return t._times.length < 2 ? -1 : (n == null && (n = t.getFPS() | 0), n = Math.min(t._times.length - 1, n), 1e3 / ((t._times[0] - t._times[n]) / n))
    }, t.setPaused = function (n) {
        t._paused = n
    }, t.getPaused = function () {
        return t._paused
    }, t.getTime = function (n) {
        return t._getTime() - t._startTime - (n ? t._pausedTime : 0)
    }, t.getTicks = function (n) {
        return t._ticks - (n ? t._pausedTickers : 0)
    }, t._handleAF = function (n) {
        n - t._lastTime >= t._interval - 1 && t._tick(), t._rafActive = !1, t._setupTick()
    }, t._handleTimeout = function () {
        t._tick(), t.timeoutID = null, t._setupTick()
    }, t._setupTick = function () {
        if (!(t._rafActive || t.timeoutID != null)) {
            if (t.useRAF) {
                var i = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame;
                if (i) {
                    i(t._handleAF, t.animationTarget), t._rafActive = !0;
                    return
                }
            }
            t.timeoutID = setTimeout(t._handleTimeout, t._interval)
        }
    }, t._tick = function () {
        var n;
        t._ticks++;
        var i = t._getTime(),
            f = i - t._lastTime,
            r = t._paused;
        r && (t._pausedTickers++, t._pausedTime += f), t._lastTime = i;
        for (var o = t._pauseable, e = t._listeners.slice(), s = e ? e.length : 0, u = 0; u < s; u++) n = e[u], n == null || r && o[u] || (n.tick ? n.tick(f, r) : n instanceof Function && n(f, r));
        for (t._tickTimes.unshift(t._getTime() - i); t._tickTimes.length > 100;) t._tickTimes.pop();
        for (t._times.unshift(i); t._times.length > 100;) t._times.pop()
    }, t._getTime = function () {
        return (new Date).getTime()
    }, n.Ticker = t
}(window), function (n) {
    var i = function (n, t, i, r, u) {
            this.initialize(n, t, i, r, u)
        },
        t = i.prototype;
    t.stageX = 0, t.stageY = 0, t.type = null, t.nativeEvent = null, t.onMouseMove = null, t.onMouseUp = null, t.target = null, t.initialize = function (n, t, i, r, u) {
        this.type = n, this.stageX = t, this.stageY = i, this.target = r, this.nativeEvent = u
    }, t.clone = function () {
        return new i(this.type, this.stageX, this.stageY, this.target, this.nativeEvent)
    }, t.toString = function () {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    }, n.MouseEvent = i
}(window), function (n) {
    var i = function (n, t, i, r, u, f) {
            this.initialize(n, t, i, r, u, f)
        },
        t = i.prototype;
    i.identity = null, i.DEG_TO_RAD = Math.PI / 180, t.a = 1, t.b = 0, t.c = 0, t.d = 1, t.tx = 0, t.ty = 0, t.alpha = 1, t.shadow = null, t.compositeOperation = null, t.initialize = function (n, t, i, r, u, f) {
        n != null && (this.a = n), this.b = t || 0, this.c = i || 0, r != null && (this.d = r), this.tx = u || 0, this.ty = f || 0
    }, t.prepend = function (n, t, i, r, u, f) {
        var s = this.tx,
            e, o;
        (n != 1 || t != 0 || i != 0 || r != 1) && (e = this.a, o = this.c, this.a = e * n + this.b * i, this.b = e * t + this.b * r, this.c = o * n + this.d * i, this.d = o * t + this.d * r), this.tx = s * n + this.ty * i + u, this.ty = s * t + this.ty * r + f
    }, t.append = function (n, t, i, r, u, f) {
        var e = this.a,
            o = this.b,
            s = this.c,
            h = this.d;
        this.a = n * e + t * s, this.b = n * o + t * h, this.c = i * e + r * s, this.d = i * o + r * h, this.tx = u * e + f * s + this.tx, this.ty = u * o + f * h + this.ty
    }, t.prependMatrix = function (n) {
        this.prepend(n.a, n.b, n.c, n.d, n.tx, n.ty), this.prependProperties(n.alpha, n.shadow, n.compositeOperation)
    }, t.appendMatrix = function (n) {
        this.append(n.a, n.b, n.c, n.d, n.tx, n.ty), this.appendProperties(n.alpha, n.shadow, n.compositeOperation)
    }, t.prependTransform = function (n, t, r, u, f, e, o, s, h) {
        if (f % 360) var c = f * i.DEG_TO_RAD,
            f = Math.cos(c),
            c = Math.sin(c);
        else f = 1, c = 0;
        (s || h) && (this.tx -= s, this.ty -= h), e || o ? (e *= i.DEG_TO_RAD, o *= i.DEG_TO_RAD, this.prepend(f * r, c * r, -c * u, f * u, 0, 0), this.prepend(Math.cos(o), Math.sin(o), -Math.sin(e), Math.cos(e), n, t)) : this.prepend(f * r, c * r, -c * u, f * u, n, t)
    }, t.appendTransform = function (n, t, r, u, f, e, o, s, h) {
        if (f % 360) var c = f * i.DEG_TO_RAD,
            f = Math.cos(c),
            c = Math.sin(c);
        else f = 1, c = 0;
        e || o ? (e *= i.DEG_TO_RAD, o *= i.DEG_TO_RAD, this.append(Math.cos(o), Math.sin(o), -Math.sin(e), Math.cos(e), n, t), this.append(f * r, c * r, -c * u, f * u, 0, 0)) : this.append(f * r, c * r, -c * u, f * u, n, t), (s || h) && (this.tx -= s * this.a + h * this.c, this.ty -= s * this.b + h * this.d)
    }, t.rotate = function (n) {
        var t = Math.cos(n),
            n = Math.sin(n),
            i = this.a,
            r = this.c,
            u = this.tx;
        this.a = i * t - this.b * n, this.b = i * n + this.b * t, this.c = r * t - this.d * n, this.d = r * n + this.d * t, this.tx = u * t - this.ty * n, this.ty = u * n + this.ty * t
    }, t.skew = function (n, t) {
        n *= i.DEG_TO_RAD, t *= i.DEG_TO_RAD, this.append(Math.cos(t), Math.sin(t), -Math.sin(n), Math.cos(n), 0, 0)
    }, t.scale = function (n, t) {
        this.a *= n, this.d *= t, this.tx *= n, this.ty *= t
    }, t.translate = function (n, t) {
        this.tx += n, this.ty += t
    }, t.identity = function () {
        this.alpha = this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this.shadow = this.compositeOperation = null
    }, t.invert = function () {
        var t = this.a,
            i = this.b,
            r = this.c,
            u = this.d,
            f = this.tx,
            n = t * u - i * r;
        this.a = u / n, this.b = -i / n, this.c = -r / n, this.d = t / n, this.tx = (r * this.ty - u * f) / n, this.ty = -(t * this.ty - i * f) / n
    }, t.isIdentity = function () {
        return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1
    }, t.decompose = function (n) {
        n == null && (n = {}), n.x = this.tx, n.y = this.ty, n.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), n.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var r = Math.atan2(-this.c, this.d),
            t = Math.atan2(this.b, this.a);
        return r == t ? (n.rotation = t / i.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (n.rotation += n.rotation <= 0 ? 180 : -180), n.skewX = n.skewY = 0) : (n.skewX = r / i.DEG_TO_RAD, n.skewY = t / i.DEG_TO_RAD), n
    }, t.reinitialize = function (n, t, i, r, u, f, e, o, s) {
        return this.initialize(n, t, i, r, u, f), this.alpha = e || 1, this.shadow = o, this.compositeOperation = s, this
    }, t.appendProperties = function (n, t, i) {
        this.alpha *= n, this.shadow = t || this.shadow, this.compositeOperation = i || this.compositeOperation
    }, t.prependProperties = function (n, t, i) {
        this.alpha *= n, this.shadow = this.shadow || t, this.compositeOperation = this.compositeOperation || i
    }, t.clone = function () {
        var n = new i(this.a, this.b, this.c, this.d, this.tx, this.ty);
        return n.shadow = this.shadow, n.alpha = this.alpha, n.compositeOperation = this.compositeOperation, n
    }, t.toString = function () {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    }, i.identity = new i(1, 0, 0, 1, 0, 0), n.Matrix2D = i
}(window), function (n) {
    var i = function (n, t) {
            this.initialize(n, t)
        },
        t = i.prototype;
    t.x = 0, t.y = 0, t.initialize = function (n, t) {
        this.x = n == null ? 0 : n, this.y = t == null ? 0 : t
    }, t.clone = function () {
        return new i(this.x, this.y)
    }, t.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    }, n.Point = i
}(window), function (n) {
    var i = function (n, t, i, r) {
            this.initialize(n, t, i, r)
        },
        t = i.prototype;
    t.x = 0, t.y = 0, t.width = 0, t.height = 0, t.initialize = function (n, t, i, r) {
        this.x = n == null ? 0 : n, this.y = t == null ? 0 : t, this.width = i == null ? 0 : i, this.height = r == null ? 0 : r
    }, t.clone = function () {
        return new i(this.x, this.y, this.width, this.height)
    }, t.toString = function () {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    }, n.Rectangle = i
}(window), function (n) {
    var i = function (n, t, i, r) {
            this.initialize(n, t, i, r)
        },
        t = i.prototype;
    i.identity = null, t.color = null, t.offsetX = 0, t.offsetY = 0, t.blur = 0, t.initialize = function (n, t, i, r) {
        this.color = n, this.offsetX = t, this.offsetY = i, this.blur = r
    }, t.toString = function () {
        return "[Shadow]"
    }, t.clone = function () {
        return new i(this.color, this.offsetX, this.offsetY, this.blur)
    }, i.identity = new i("transparent", 0, 0, 0), n.Shadow = i
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype;
    t.complete = !0, t._animations = null, t._frames = null, t._images = null, t._data = null, t._loadCount = 0, t._frameHeight = 0, t._frameWidth = 0, t._numFrames = 0, t._regX = 0, t._regY = 0, t.initialize = function (n) {
        var r, i, u, t, f, e;
        if (n != null) {
            if (n.images && (i = n.images.length) > 0) for (u = this._images = [], r = 0; r < i; r++) f = n.images[r], f instanceof Image || (t = f, f = new Image, f.src = t), u.push(f), f.getContext || f.complete || (this._loadCount++, this.complete = !1, function (n) {
                f.onload = function () {
                    n._handleImageLoad()
                }
            }(this));
            if (n.frames != null) if (n.frames instanceof Array) for (this._frames = [], u = n.frames, r = 0, i = u.length; r < i; r++) t = u[r], this._frames.push({
                image: this._images[t[4] ? t[4] : 0],
                rect: new Rectangle(t[0], t[1], t[2], t[3]),
                regX: t[5] || 0,
                regY: t[6] || 0
            });
            else i = n.frames, this._frameWidth = i.width, this._frameHeight = i.height, this._regX = i.regX || 0, this._regY = i.regY || 0, this._numFrames = i.count, this._loadCount == 0 && this._calculateFrames();
            if ((i = n.animations) != null) {
                this._animations = [], this._data = {};
                for (e in i) {
                    if (n = {
                        name: e
                    }, t = i[e], isNaN(t)) if (t instanceof Array) for (n.frequency = t[3], n.next = t[2], u = n.frames = [], r = t[0]; r <= t[1]; r++) u.push(r);
                    else n.frequency = t.frequency, n.next = t.next, u = n.frames = t.frames.slice(0);
                    else u = n.frames = [t];
                    n.next = u.length < 2 || n.next == !1 ? null : n.next == null || n.next == !0 ? e : n.next, n.frequency || (n.frequency = 1), this._animations.push(e), this._data[e] = n
                }
            }
        }
    }, t.getNumFrames = function (n) {
        return n == null ? this._frames ? this._frames.length : this._numFrames : (n = this._data[n], n == null ? 0 : n.frames.length)
    }, t.getAnimations = function () {
        return this._animations.slice(0)
    }, t.getAnimation = function (n) {
        return this._data[n]
    }, t.getFrame = function (n) {
        return this.complete && this._frames && (frame = this._frames[n]) ? frame : null
    }, t.toString = function () {
        return "[SpriteSheet]"
    }, t.clone = function () {
        var n = new i;
        return n.complete = this.complete, n._animations = this._animations, n._frames = this._frames, n._images = this._images, n._data = this._data, n._frameHeight = this._frameHeight, n._frameWidth = this._frameWidth, n._numFrames = this._numFrames, n._loadCount = this._loadCount, n
    }, t._handleImageLoad = function () {
        --this._loadCount == 0 && (this._calculateFrames(), this.complete = !0)
    }, t._calculateFrames = function () {
        if (!(this._frames || this._frameWidth == 0)) {
            this._frames = [];
            for (var r = 0, u = this._frameWidth, f = this._frameHeight, e = 0, s = this._images; e < s.length; e++) {
                for (var o = s[e], t = (o.width + 1) / u | 0, n = (o.height + 1) / f | 0, n = this._numFrames > 0 ? Math.min(this._numFrames - r, t * n) : t * n, i = 0; i < n; i++) this._frames.push({
                    image: o,
                    rect: new Rectangle(i % t * u, (i / t | 0) * f, u, f),
                    regX: this._regX,
                    regY: this._regY
                });
                r += n
            }
            this._numFrames = r
        }
    }, n.SpriteSheet = i
}(window), function (n) {
    function i(n, t) {
        this.f = n, this.params = t
    }
    i.prototype.exec = function (n) {
        this.f.apply(n, this.params)
    };
    var r = function () {
            this.initialize()
        },
        t = r.prototype;
    r.getRGB = function (n, t, i, r) {
        return n != null && i == null && (r = t, i = n & 255, t = n >> 8 & 255, n = n >> 16 & 255), r == null ? "rgb(" + n + "," + t + "," + i + ")" : "rgba(" + n + "," + t + "," + i + "," + r + ")"
    }, r.getHSL = function (n, t, i, r) {
        return r == null ? "hsl(" + n % 360 + "," + t + "%," + i + "%)" : "hsla(" + n % 360 + "," + t + "%," + i + "%," + r + ")"
    }, r.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
    }, r.STROKE_CAPS_MAP = ["butt", "round", "square"], r.STROKE_JOINTS_MAP = ["miter", "round", "bevel"], r._ctx = document.createElement("canvas").getContext("2d"), r.beginCmd = new i(r._ctx.beginPath, []), r.fillCmd = new i(r._ctx.fill, []), r.strokeCmd = new i(r._ctx.stroke, []), t._strokeInstructions = null, t._strokeStyleInstructions = null, t._fillInstructions = null, t._instructions = null, t._oldInstructions = null, t._activeInstructions = null, t._active = !1, t._dirty = !1, t.initialize = function () {
        this.clear(), this._ctx = r._ctx
    }, t.draw = function (n) {
        this._dirty && this._updateInstructions();
        for (var i = this._instructions, t = 0, r = i.length; t < r; t++) i[t].exec(n)
    }, t.moveTo = function (n, t) {
        return this._activeInstructions.push(new i(this._ctx.moveTo, [n, t])), this
    }, t.lineTo = function (n, t) {
        return this._dirty = this._active = !0, this._activeInstructions.push(new i(this._ctx.lineTo, [n, t])), this
    }, t.arcTo = function (n, t, r, u, f) {
        return this._dirty = this._active = !0, this._activeInstructions.push(new i(this._ctx.arcTo, [n, t, r, u, f])), this
    }, t.arc = function (n, t, r, u, f, e) {
        return this._dirty = this._active = !0, e == null && (e = !1), this._activeInstructions.push(new i(this._ctx.arc, [n, t, r, u, f, e])), this
    }, t.quadraticCurveTo = function (n, t, r, u) {
        return this._dirty = this._active = !0, this._activeInstructions.push(new i(this._ctx.quadraticCurveTo, [n, t, r, u])), this
    }, t.bezierCurveTo = function (n, t, r, u, f, e) {
        return this._dirty = this._active = !0, this._activeInstructions.push(new i(this._ctx.bezierCurveTo, [n, t, r, u, f, e])), this
    }, t.rect = function (n, t, r, u) {
        return this._dirty = this._active = !0, this._activeInstructions.push(new i(this._ctx.rect, [n, t, r, u])), this
    }, t.closePath = function () {
        return this._active && (this._dirty = !0, this._activeInstructions.push(new i(this._ctx.closePath, []))), this
    }, t.clear = function () {
        return this._instructions = [], this._oldInstructions = [], this._activeInstructions = [], this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null, this._active = this._dirty = !1, this
    }, t.beginFill = function (n) {
        return this._active && this._newPath(), this._fillInstructions = n ? [new i(this._setProp, ["fillStyle", n])] : null, this
    }, t.beginLinearGradientFill = function (n, t, r, u, f, e) {
        for (this._active && this._newPath(), r = this._ctx.createLinearGradient(r, u, f, e), u = 0, f = n.length; u < f; u++) r.addColorStop(t[u], n[u]);
        return this._fillInstructions = [new i(this._setProp, ["fillStyle", r])], this
    }, t.beginRadialGradientFill = function (n, t, r, u, f, e, o, s) {
        for (this._active && this._newPath(), r = this._ctx.createRadialGradient(r, u, f, e, o, s), u = 0, f = n.length; u < f; u++) r.addColorStop(t[u], n[u]);
        return this._fillInstructions = [new i(this._setProp, ["fillStyle", r])], this
    }, t.beginBitmapFill = function (n, t) {
        this._active && this._newPath();
        var r = this._ctx.createPattern(n, t || "");
        return this._fillInstructions = [new i(this._setProp, ["fillStyle", r])], this
    }, t.endFill = function () {
        return this.beginFill(), this
    }, t.setStrokeStyle = function (n, t, u, f) {
        return this._active && this._newPath(), this._strokeStyleInstructions = [new i(this._setProp, ["lineWidth", n == null ? "1" : n]), new i(this._setProp, ["lineCap", t == null ? "butt" : isNaN(t) ? t : r.STROKE_CAPS_MAP[t]]), new i(this._setProp, ["lineJoin", u == null ? "miter" : isNaN(u) ? u : r.STROKE_JOINTS_MAP[u]]), new i(this._setProp, ["miterLimit", f == null ? "10" : f])], this
    }, t.beginStroke = function (n) {
        return this._active && this._newPath(), this._strokeInstructions = n ? [new i(this._setProp, ["strokeStyle", n])] : null, this
    }, t.beginLinearGradientStroke = function (n, t, r, u, f, e) {
        for (this._active && this._newPath(), r = this._ctx.createLinearGradient(r, u, f, e), u = 0, f = n.length; u < f; u++) r.addColorStop(t[u], n[u]);
        return this._strokeInstructions = [new i(this._setProp, ["strokeStyle", r])], this
    }, t.beginRadialGradientStroke = function (n, t, r, u, f, e, o, s) {
        for (this._active && this._newPath(), r = this._ctx.createRadialGradient(r, u, f, e, o, s), u = 0, f = n.length; u < f; u++) r.addColorStop(t[u], n[u]);
        return this._strokeInstructions = [new i(this._setProp, ["strokeStyle", r])], this
    }, t.beginBitmapStroke = function (n, t) {
        this._active && this._newPath();
        var r = this._ctx.createPattern(n, t || "");
        return this._strokeInstructions = [new i(this._setProp, ["strokeStyle", r])], this
    }, t.endStroke = function () {
        return this.beginStroke(), this
    }, t.curveTo = t.quadraticCurveTo, t.drawRect = t.rect, t.drawRoundRect = function (n, t, i, r, u) {
        return this.drawRoundRectComplex(n, t, i, r, u, u, u, u), this
    }, t.drawRoundRectComplex = function (n, t, r, u, f, e, o, s) {
        this._dirty = this._active = !0;
        var h = Math.PI,
            c = this._ctx.arc,
            l = this._ctx.lineTo;
        return this._activeInstructions.push(new i(this._ctx.moveTo, [n + f, t]), new i(l, [n + r - e, t]), e >= 0 ? new i(c, [n + r - e, t + e, e, -h / 2, 0]) : new i(c, [n + r, t, -e, h, h / 2, !0]), new i(l, [n + r, t + u - o]), s >= 0 ? new i(c, [n + r - o, t + u - o, o, 0, h / 2]) : new i(c, [n + r, t + u, -o, -h / 2, h, !0]), new i(l, [n + s, t + u]), s >= 0 ? new i(c, [n + s, t + u - s, s, h / 2, h]) : new i(c, [n, t + u, -s, 0, -h / 2, !0]), new i(l, [n, t + f]), f >= 0 ? new i(c, [n + f, t + f, f, h, -h / 2]) : new i(c, [n, t, -f, h / 2, 0, !0])), this
    }, t.drawCircle = function (n, t, i) {
        return this.arc(n, t, i, 0, Math.PI * 2), this
    }, t.drawEllipse = function (n, t, r, u) {
        this._dirty = this._active = !0;
        var f = r / 2 * .5522848,
            e = u / 2 * .5522848,
            o = n + r,
            s = t + u,
            r = n + r / 2,
            u = t + u / 2;
        return this._activeInstructions.push(new i(this._ctx.moveTo, [n, u]), new i(this._ctx.bezierCurveTo, [n, u - e, r - f, t, r, t]), new i(this._ctx.bezierCurveTo, [r + f, t, o, u - e, o, u]), new i(this._ctx.bezierCurveTo, [o, u + e, r + f, s, r, s]), new i(this._ctx.bezierCurveTo, [r - f, s, n, u + e, n, u])), this
    }, t.drawPolyStar = function (n, t, r, u, f, e) {
        var o, s;
        for (this._dirty = this._active = !0, f == null && (f = 0), f = 1 - f, e == null ? e = 0 : e /= 180 / Math.PI, o = Math.PI / u, this._activeInstructions.push(new i(this._ctx.moveTo, [n + Math.cos(e) * r, t + Math.sin(e) * r])), s = 0; s < u; s++) e += o, f != 1 && this._activeInstructions.push(new i(this._ctx.lineTo, [n + Math.cos(e) * r * f, t + Math.sin(e) * r * f])), e += o, this._activeInstructions.push(new i(this._ctx.lineTo, [n + Math.cos(e) * r, t + Math.sin(e) * r]));
        return this
    }, t.p = t.decodePath = function (n) {
        for (var l, a = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo], u = 0, v = n.length, o = [], s = 0, h = 0, e = r.BASE_64; u < v;) {
            var f = e[n.charAt(u)],
                i = f >> 3,
                c = a[i];
            if (!c || f & 3) throw "bad path data";
            for (l = [2, 2, 4, 6][i], i || (s = h = 0), o.length = 0, u++, f = (f >> 2 & 1) + 2, i = 0; i < l; i++) {
                var t = e[n.charAt(u)],
                    y = t >> 5 ? -1 : 1,
                    t = (t & 31) << 6 | e[n.charAt(u + 1)];
                f == 3 && (t = t << 6 | e[n.charAt(u + 2)]), t = y * t / 10, i % 2 ? s = t += s : h = t += h, o[i] = t, u += f
            }
            c.apply(this, o)
        }
        return this
    }, t.clone = function () {
        var n = new r;
        return n._instructions = this._instructions.slice(), n._activeInstructions = this._activeInstructions.slice(), n._oldInstructions = this._oldInstructions.slice(), this._fillInstructions && (n._fillInstructions = this._fillInstructions.slice()), this._strokeInstructions && (n._strokeInstructions = this._strokeInstructions.slice()), this._strokeStyleInstructions && (n._strokeStyleInstructions = this._strokeStyleInstructions.slice()), n._active = this._active, n._dirty = this._dirty, n
    }, t.toString = function () {
        return "[Graphics]"
    }, t.mt = t.moveTo, t.lt = t.lineTo, t.at = t.arcTo, t.bt = t.bezierCurveTo, t.qt = t.quadraticCurveTo, t.a = t.arc, t.r = t.rect, t.cp = t.closePath, t.c = t.clear, t.f = t.beginFill, t.lf = t.beginLinearGradientFill, t.rf = t.beginRadialGradientFill, t.bf = t.beginBitmapFill, t.ef = t.endFill, t.ss = t.setStrokeStyle, t.s = t.beginStroke, t.ls = t.beginLinearGradientStroke, t.rs = t.beginRadialGradientStroke, t.bs = t.beginBitmapStroke, t.es = t.endStroke, t.dr = t.drawRect, t.rr = t.drawRoundRect, t.rc = t.drawRoundRectComplex, t.dc = t.drawCircle, t.de = t.drawEllipse, t.dp = t.drawPolyStar, t._updateInstructions = function () {
        this._instructions = this._oldInstructions.slice(), this._instructions.push(r.beginCmd), this._fillInstructions && this._instructions.push.apply(this._instructions, this._fillInstructions), this._strokeInstructions && (this._instructions.push.apply(this._instructions, this._strokeInstructions), this._strokeStyleInstructions && this._instructions.push.apply(this._instructions, this._strokeStyleInstructions)), this._instructions.push.apply(this._instructions, this._activeInstructions), this._fillInstructions && this._instructions.push(r.fillCmd), this._strokeInstructions && this._instructions.push(r.strokeCmd)
    }, t._newPath = function () {
        this._dirty && this._updateInstructions(), this._oldInstructions = this._instructions, this._activeInstructions = [], this._active = this._dirty = !1
    }, t._setProp = function (n, t) {
        this[n] = t
    }, n.Graphics = r
}(window), function (n) {
    var i = function () {
            this.initialize()
        },
        t = i.prototype;
    i.suppressCrossDomainErrors = !1, i._hitTestCanvas = document.createElement("canvas"), i._hitTestCanvas.width = i._hitTestCanvas.height = 1, i._hitTestContext = i._hitTestCanvas.getContext("2d"), i._nextCacheID = 1, t.alpha = 1, t.cacheCanvas = null, t.id = -1, t.mouseEnabled = !0, t.name = null, t.parent = null, t.regX = 0, t.regY = 0, t.rotation = 0, t.scaleX = 1, t.scaleY = 1, t.skewX = 0, t.skewY = 0, t.shadow = null, t.visible = !0, t.x = 0, t.y = 0, t.compositeOperation = null, t.snapToPixel = !1, t.onPress = null, t.onClick = null, t.onDoubleClick = null, t.onMouseOver = null, t.onMouseOut = null, t.tick = null, t.filters = null, t.cacheID = 0, t._cacheOffsetX = 0, t._cacheOffsetY = 0, t._cacheDataURLID = 0, t._cacheDataURL = null, t._matrix = null, t.initialize = function () {
        this.id = UID.get(), this._matrix = new Matrix2D
    }, t.isVisible = function () {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0
    }, t.draw = function (n, t) {
        return t || !this.cacheCanvas ? !1 : (n.drawImage(this.cacheCanvas, this._cacheOffsetX, this._cacheOffsetY), !0)
    }, t.cache = function (n, t, r, u) {
        this.cacheCanvas == null && (this.cacheCanvas = document.createElement("canvas"));
        var f = this.cacheCanvas.getContext("2d");
        this.cacheCanvas.width = r, this.cacheCanvas.height = u, f.clearRect(0, 0, r + 1, u + 1), f.setTransform(1, 0, 0, 1, -n, -t), this.draw(f, !0, this._matrix.reinitialize(1, 0, 0, 1, -n, -t)), this._cacheOffsetX = n, this._cacheOffsetY = t, this._applyFilters(), this.cacheID = i._nextCacheID++
    }, t.updateCache = function (n) {
        if (this.cacheCanvas == null) throw "cache() must be called before updateCache()";
        var t = this.cacheCanvas.getContext("2d");
        t.setTransform(1, 0, 0, 1, -this._cacheOffsetX, -this._cacheOffsetY), n ? t.globalCompositeOperation = n : t.clearRect(0, 0, this.cacheCanvas.width + 1, this.cacheCanvas.height + 1), this.draw(t, !0), n && (t.globalCompositeOperation = "source-over"), this._applyFilters(), this.cacheID = i._nextCacheID++
    }, t.uncache = function () {
        this._cacheDataURL = this.cacheCanvas = null, this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0
    }, t.getCacheDataURL = function () {
        return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null
    }, t.getStage = function () {
        for (var n = this; n.parent;) n = n.parent;
        return n instanceof Stage ? n : null
    }, t.localToGlobal = function (n, t) {
        var i = this.getConcatenatedMatrix(this._matrix);
        return i == null ? null : (i.append(1, 0, 0, 1, n, t), new Point(i.tx, i.ty))
    }, t.globalToLocal = function (n, t) {
        var i = this.getConcatenatedMatrix(this._matrix);
        return i == null ? null : (i.invert(), i.append(1, 0, 0, 1, n, t), new Point(i.tx, i.ty))
    }, t.localToLocal = function (n, t, i) {
        return n = this.localToGlobal(n, t), i.globalToLocal(n.x, n.y)
    }, t.setTransform = function (n, t, i, r, u, f, e, o, s) {
        this.x = n || 0, this.y = t || 0, this.scaleX = i == null ? 1 : i, this.scaleY = r == null ? 1 : r, this.rotation = u || 0, this.skewX = f || 0, this.skewY = e || 0, this.regX = o || 0, this.regY = s || 0
    }, t.getConcatenatedMatrix = function (n) {
        n ? n.identity() : n = new Matrix2D;
        for (var t = this; t != null;) n.prependTransform(t.x, t.y, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.regX, t.regY), n.prependProperties(t.alpha, t.shadow, t.compositeOperation), t = t.parent;
        return n
    }, t.hitTest = function (n, t) {
        var r = i._hitTestContext,
            u = i._hitTestCanvas;
        return r.setTransform(1, 0, 0, 1, -n, -t), this.draw(r), r = this._testHit(r), u.width = 0, u.width = 1, r
    }, t.clone = function () {
        var n = new i;
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]"
    }, t.cloneProps = function (n) {
        n.alpha = this.alpha, n.name = this.name, n.regX = this.regX, n.regY = this.regY, n.rotation = this.rotation, n.scaleX = this.scaleX, n.scaleY = this.scaleY, n.shadow = this.shadow, n.skewX = this.skewX, n.skewY = this.skewY, n.visible = this.visible, n.x = this.x, n.y = this.y, n.mouseEnabled = this.mouseEnabled, n.compositeOperation = this.compositeOperation, this.cacheCanvas && (n.cacheCanvas = this.cacheCanvas.cloneNode(!0), n.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0, 0, this.cacheCanvas.width, this.cacheCanvas.height), 0, 0))
    }, t.applyShadow = function (n, t) {
        t = t || Shadow.identity, n.shadowColor = t.color, n.shadowOffsetX = t.offsetX, n.shadowOffsetY = t.offsetY, n.shadowBlur = t.blur
    }, t._tick = function (n) {
        if (this.onTick) this.onTick(n)
    }, t._testHit = function (n) {
        try {
            var t = n.getImageData(0, 0, 1, 1).data[3] > 1
        } catch (r) {
            if (!i.suppressCrossDomainErrors) throw "An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return t
    }, t._applyFilters = function () {
        if (this.filters && this.filters.length != 0 && this.cacheCanvas) for (var t = this.filters.length, i = this.cacheCanvas.getContext("2d"), r = this.cacheCanvas.width, u = this.cacheCanvas.height, n = 0; n < t; n++) this.filters[n].applyFilter(i, 0, 0, r, u)
    }, n.DisplayObject = i
}(window), function (n) {
    var i = function () {
            this.initialize()
        },
        t = i.prototype = new DisplayObject;
    t.children = null, t.DisplayObject_initialize = t.initialize, t.initialize = function () {
        this.DisplayObject_initialize(), this.children = []
    }, t.isVisible = function () {
        return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0
    }, t.DisplayObject_draw = t.draw, t.draw = function (n, t, r) {
        var s = Stage._snapToPixelEnabled,
            f, e, u;
        if (this.DisplayObject_draw(n, t)) return !0;
        for (var r = r || this._matrix.reinitialize(1, 0, 0, 1, 0, 0, this.alpha, this.shadow, this.compositeOperation), t = this.children.length, h = this.children.slice(0), o = 0; o < t; o++) f = h[o], f.isVisible() && (e = !1, u = f._matrix.reinitialize(r.a, r.b, r.c, r.d, r.tx, r.ty, r.alpha, r.shadow, r.compositeOperation), u.appendTransform(f.x, f.y, f.scaleX, f.scaleY, f.rotation, f.skewX, f.skewY, f.regX, f.regY), u.appendProperties(f.alpha, f.shadow, f.compositeOperation), f instanceof i && f.cacheCanvas == null || (s && f.snapToPixel && u.a == 1 && u.b == 0 && u.c == 0 && u.d == 1 ? n.setTransform(u.a, u.b, u.c, u.d, u.tx + .5 | 0, u.ty + .5 | 0) : n.setTransform(u.a, u.b, u.c, u.d, u.tx, u.ty), n.globalAlpha = u.alpha, n.globalCompositeOperation = u.compositeOperation || "source-over", (e = u.shadow) && this.applyShadow(n, e)), f.draw(n, !1, u), e && this.applyShadow(n));
        return !0
    }, t.addChild = function (n) {
        var t, i;
        if (n == null) return n;
        if (t = arguments.length, t > 1) {
            for (i = 0; i < t; i++) this.addChild(arguments[i]);
            return arguments[t - 1]
        }
        return n.parent && n.parent.removeChild(n), n.parent = this, this.children.push(n), n
    }, t.addChildAt = function (n, t) {
        var r = arguments.length,
            t, i;
        if (r > 2) {
            for (t = arguments[i - 1], i = 0; i < r - 1; i++) this.addChildAt(arguments[i], t + i);
            return arguments[r - 2]
        }
        return n.parent && n.parent.removeChild(n), n.parent = this, this.children.splice(t, 0, n), n
    }, t.removeChild = function (n) {
        var r = arguments.length,
            t, i;
        if (r > 1) {
            for (t = !0, i = 0; i < r; i++) t = t && this.removeChild(arguments[i]);
            return t
        }
        return this.removeChildAt(this.children.indexOf(n))
    }, t.removeChildAt = function (n) {
        var i = arguments.length,
            r, u, t;
        if (i > 1) {
            for (r = [], t = 0; t < i; t++) r[t] = arguments[t];
            for (r.sort(function (n, t) {
                return t - n
            }), u = !0, t = 0; t < i; t++) u = u && this.removeChildAt(r[t]);
            return u
        }
        return n < 0 || n > this.children.length - 1 ? !1 : (i = this.children[n], i != null && (i.parent = null), this.children.splice(n, 1), !0)
    }, t.removeAllChildren = function () {
        for (var n = this.children; n.length;) n.pop().parent = null
    }, t.getChildAt = function (n) {
        return this.children[n]
    }, t.sortChildren = function (n) {
        this.children.sort(n)
    }, t.getChildIndex = function (n) {
        return this.children.indexOf(n)
    }, t.getNumChildren = function () {
        return this.children.length
    }, t.swapChildrenAt = function (n, t) {
        var i = this.children,
            r = i[n],
            u = i[t];
        r && u && (i[n] = u, i[t] = r)
    }, t.swapChildren = function (n, t) {
        for (var r = this.children, u, f, i = 0, e = r.length; i < e; i++) if (r[i] == n && (u = i), r[i] == t && (f = i), u != null && f != null) return;
        i != e && (r[u] = t, r[f] = n)
    }, t.setChildIndex = function (n, t) {
        for (var r = this.children, i = 0, u = r.length; i < u; i++) if (r[i] == n) break;
        i == u || t < 0 || t > u || i == t || (r.splice(t, 1), t < i && i--, r.splice(n, i, 0))
    }, t.contains = function (n) {
        for (; n;) {
            if (n == this) return !0;
            n = n.parent
        }
        return !1
    }, t.hitTest = function (n, t) {
        return this.getObjectUnderPoint(n, t) != null
    }, t.getObjectsUnderPoint = function (n, t) {
        var i = [],
            r = this.localToGlobal(n, t);
        return this._getObjectsUnderPoint(r.x, r.y, i), i
    }, t.getObjectUnderPoint = function (n, t) {
        var i = this.localToGlobal(n, t);
        return this._getObjectsUnderPoint(i.x, i.y)
    }, t.clone = function (n) {
        var t = new i,
            u;
        if (this.cloneProps(t), n) for (var f = t.children = [], r = 0, e = this.children.length; r < e; r++) u = this.children[r].clone(n), u.parent = t, f.push(u);
        return t
    }, t.toString = function () {
        return "[Container (name=" + this.name + ")]"
    }, t._tick = function (n) {
        for (var i, t = this.children.length - 1; t >= 0; t--) i = this.children[t], i._tick && i._tick(n);
        if (this.onTick) this.onTick(n)
    }, t._getObjectsUnderPoint = function (n, t, r, u) {
        var o = DisplayObject._hitTestContext,
            s = DisplayObject._hitTestCanvas,
            e = this._matrix,
            h = u & 1 && (this.onPress || this.onClick || this.onDoubleClick) || u & 2 && (this.onMouseOver || this.onMouseOut),
            c, f;
        if (this.cacheCanvas) if (this.getConcatenatedMatrix(e), o.setTransform(e.a, e.b, e.c, e.d, e.tx - n, e.ty - t), o.globalAlpha = e.alpha, this.draw(o), this._testHit(o)) {
            if (s.width = 0, s.width = 1, h) return this
        } else return null;
        for (c = this.children.length - 1; c >= 0; c--) if (f = this.children[c], f.isVisible() && f.mouseEnabled) if (f instanceof i) {
            if (h) {
                if (f = f._getObjectsUnderPoint(n, t)) return this
            } else if (f = f._getObjectsUnderPoint(n, t, r, u), !r && f) return f
        } else if ((!u || h || u & 1 && (f.onPress || f.onClick || f.onDoubleClick) || u & 2 && (f.onMouseOver || f.onMouseOut)) && (f.getConcatenatedMatrix(e), o.setTransform(e.a, e.b, e.c, e.d, e.tx - n, e.ty - t), o.globalAlpha = e.alpha, f.draw(o), this._testHit(o))) {
            if (s.width = 0, s.width = 1, h) return this;
            if (r) r.push(f);
            else return f
        }
        return null
    }, n.Container = i
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype = new Container;
    i._snapToPixelEnabled = !1, t.autoClear = !0, t.canvas = null, t.mouseX = null, t.mouseY = null, t.onMouseMove = null, t.onMouseUp = null, t.onMouseDown = null, t.snapToPixelEnabled = !1, t.mouseInBounds = !1, t.tickOnUpdate = !0, t._activeMouseEvent = null, t._activeMouseTarget = null, t._mouseOverIntervalID = null, t._mouseOverX = 0, t._mouseOverY = 0, t._mouseOverTarget = null, t.Container_initialize = t.initialize, t.initialize = function (n) {
        this.Container_initialize(), this.canvas = n instanceof HTMLCanvasElement ? n : document.getElementById(n), this._enableMouseEvents(!0)
    }, t.update = function (n) {
        this.canvas && (this.autoClear && this.clear(), i._snapToPixelEnabled = this.snapToPixelEnabled, this.tickOnUpdate && this._tick(n), this.draw(this.canvas.getContext("2d"), !1, this.getConcatenatedMatrix(this._matrix)))
    }, t.tick = t.update, t.clear = function () {
        if (this.canvas) {
            var n = this.canvas.getContext("2d");
            n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }, t.toDataURL = function (n, t) {
        var e, o;
        t || (t = "image/png");
        var i = this.canvas.getContext("2d"),
            r = this.canvas.width,
            u = this.canvas.height,
            f;
        return n && (f = i.getImageData(0, 0, r, u), e = i.globalCompositeOperation, i.globalCompositeOperation = "destination-over", i.fillStyle = n, i.fillRect(0, 0, r, u)), o = this.canvas.toDataURL(t), n && (i.clearRect(0, 0, r, u), i.putImageData(f, 0, 0), i.globalCompositeOperation = e), o
    }, t.enableMouseOver = function (n) {
        if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null), n == null) n = 20;
        else if (n <= 0) return;
        var t = this;
        this._mouseOverIntervalID = setInterval(function () {
            t._testMouseOver()
        }, 1e3 / Math.min(50, n)), this._mouseOverX = NaN, this._mouseOverTarget = null
    }, t.clone = function () {
        var n = new i(null);
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[Stage (name=" + this.name + ")]"
    }, t._enableMouseEvents = function () {
        var t = this,
            i = n.addEventListener ? n : document;
        i.addEventListener("mouseup", function (n) {
            t._handleMouseUp(n)
        }, !1), i.addEventListener("mousemove", function (n) {
            t._handleMouseMove(n)
        }, !1), i.addEventListener("dblclick", function (n) {
            t._handleDoubleClick(n)
        }, !1), this.canvas && this.canvas.addEventListener("mousedown", function (n) {
            t._handleMouseDown(n)
        }, !1)
    }, t._handleMouseMove = function (t) {
        if (this.canvas) {
            t || (t = n.event);
            var i = this.mouseInBounds;
            if (this._updateMousePosition(t.pageX, t.pageY), i || this.mouseInBounds) {
                if (t = new MouseEvent("onMouseMove", this.mouseX, this.mouseY, this, t), this.onMouseMove) this.onMouseMove(t);
                if (this._activeMouseEvent && this._activeMouseEvent.onMouseMove) this._activeMouseEvent.onMouseMove(t)
            }
        } else this.mouseX = this.mouseY = null
    }, t._updateMousePosition = function (n, t) {
        var i = this.canvas;
        do n -= i.offsetLeft, t -= i.offsetTop;
        while (i = i.offsetParent);
        (this.mouseInBounds = n >= 0 && t >= 0 && n < this.canvas.width && t < this.canvas.height) && (this.mouseX = n, this.mouseY = t)
    }, t._handleMouseUp = function (n) {
        var t = new MouseEvent("onMouseUp", this.mouseX, this.mouseY, this, n);
        if (this.onMouseUp) this.onMouseUp(t);
        if (this._activeMouseEvent && this._activeMouseEvent.onMouseUp) this._activeMouseEvent.onMouseUp(t);
        if (this._activeMouseTarget && this._activeMouseTarget.onClick && this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0, this._mouseOverIntervalID ? 3 : 1) == this._activeMouseTarget) this._activeMouseTarget.onClick(new MouseEvent("onClick", this.mouseX, this.mouseY, this._activeMouseTarget, n));
        this._activeMouseEvent = this._activeMouseTarget = null
    }, t._handleMouseDown = function (n) {
        if (this.onMouseDown) this.onMouseDown(new MouseEvent("onMouseDown", this.mouseX, this.mouseY, this, n));
        var t = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
        t && (t.onPress instanceof Function && (n = new MouseEvent("onPress", this.mouseX, this.mouseY, t, n), t.onPress(n), n.onMouseMove || n.onMouseUp) && (this._activeMouseEvent = n), this._activeMouseTarget = t)
    }, t._testMouseOver = function () {
        if (!(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
            var n = null;
            if (this.mouseInBounds && (n = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY), this._mouseOverTarget != n) {
                if (this._mouseOverTarget && this._mouseOverTarget.onMouseOut) this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOut", this.mouseX, this.mouseY, this._mouseOverTarget));
                if (n && n.onMouseOver) n.onMouseOver(new MouseEvent("onMouseOver", this.mouseX, this.mouseY, n));
                this._mouseOverTarget = n
            }
        }
    }, t._handleDoubleClick = function (n) {
        if (this.onDoubleClick) this.onDoubleClick(new MouseEvent("onDoubleClick", this.mouseX, this.mouseY, this, n));
        var t = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
        if (t && t.onDoubleClick instanceof Function) t.onDoubleClick(new MouseEvent("onPress", this.mouseX, this.mouseY, t, n))
    }, n.Stage = i
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype = new DisplayObject;
    t.image = null, t.snapToPixel = !0, t.sourceRect = null, t.DisplayObject_initialize = t.initialize, t.initialize = function (n) {
        this.DisplayObject_initialize(), typeof n == "string" ? (this.image = new Image, this.image.src = n) : this.image = n
    }, t.isVisible = function () {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2)
    }, t.DisplayObject_draw = t.draw, t.draw = function (n, t) {
        if (this.DisplayObject_draw(n, t)) return !0;
        var i = this.sourceRect;
        return i ? n.drawImage(this.image, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height) : n.drawImage(this.image, 0, 0), !0
    }, t.clone = function () {
        var n = new i(this.image);
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[Bitmap (name=" + this.name + ")]"
    }, n.Bitmap = i
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype = new DisplayObject;
    t.onAnimationEnd = null, t.currentFrame = -1, t.currentAnimation = null, t.paused = !0, t.spriteSheet = null, t.snapToPixel = !0, t.offset = 0, t.currentAnimationFrame = 0, t._advanceCount = 0, t._animation = null, t.DisplayObject_initialize = t.initialize, t.initialize = function (n) {
        this.DisplayObject_initialize(), this.spriteSheet = n
    }, t.isVisible = function () {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.spriteSheet.complete && this.currentFrame >= 0
    }, t.DisplayObject_draw = t.draw, t.draw = function (n, t) {
        var r, i;
        return this.DisplayObject_draw(n, t) ? !0 : (this._normalizeFrame(), r = this.spriteSheet.getFrame(this.currentFrame), r != null ? (i = r.rect, n.drawImage(r.image, i.x, i.y, i.width, i.height, -r.regX, -r.regY, i.width, i.height), !0) : void 0)
    }, t.play = function () {
        this.paused = !1
    }, t.stop = function () {
        this.paused = !0
    }, t.gotoAndPlay = function (n) {
        this.paused = !1, this._goto(n)
    }, t.gotoAndStop = function (n) {
        this.paused = !0, this._goto(n)
    }, t.advance = function () {
        this._animation ? this.currentAnimationFrame++ : this.currentFrame++, this._normalizeFrame()
    }, t.clone = function () {
        var n = new i(this.spriteSheet);
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[BitmapAnimation (name=" + this.name + ")]"
    }, t._tick = function (n) {
        var t = this._animation ? this._animation.frequency : 1;
        if (this.paused || (++this._advanceCount + this.offset) % t != 0 || this.advance(), this.onTick) this.onTick(n)
    }, t._normalizeFrame = function () {
        var n = this._animation;
        if (n) if (this.currentAnimationFrame >= n.frames.length) {
            if (n.next ? this._goto(n.next) : (this.paused = !0, this.currentAnimationFrame = n.frames.length - 1, this.currentFrame = n.frames[this.currentAnimationFrame]), this.onAnimationEnd) this.onAnimationEnd(this, n.name)
        } else this.currentFrame = n.frames[this.currentAnimationFrame];
        else if (this.currentFrame >= this.spriteSheet.getNumFrames() && (this.currentFrame = 0, this.onAnimationEnd)) this.onAnimationEnd(this, null)
    }, t.DisplayObject_cloneProps = t.cloneProps, t.cloneProps = function (n) {
        this.DisplayObject_cloneProps(n), n.onAnimationEnd = this.onAnimationEnd, n.currentFrame = this.currentFrame, n.currentAnimation = this.currentAnimation, n.paused = this.paused, n.offset = this.offset, n._animation = this._animation, n.currentAnimationFrame = this.currentAnimationFrame
    }, t._goto = function (n) {
        if (isNaN(n)) {
            var t = this.spriteSheet.getAnimation(n);
            t && (this.currentAnimationFrame = 0, this._animation = t, this.currentAnimation = n, this._normalizeFrame())
        } else this.currentAnimation = this._animation = null, this.currentFrame = n
    }, n.BitmapAnimation = i
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype = new DisplayObject;
    t.graphics = null, t.DisplayObject_initialize = t.initialize, t.initialize = function (n) {
        this.DisplayObject_initialize(), this.graphics = n ? n : new Graphics
    }, t.isVisible = function () {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics
    }, t.DisplayObject_draw = t.draw, t.draw = function (n, t) {
        return this.DisplayObject_draw(n, t) ? !0 : (this.graphics.draw(n), !0)
    }, t.clone = function (n) {
        return n = new i(n && this.graphics ? this.graphics.clone() : this.graphics), this.cloneProps(n), n
    }, t.toString = function () {
        return "[Shape (name=" + this.name + ")]"
    }, n.Shape = i
}(window), function (n) {
    var i = function (n, t, i) {
            this.initialize(n, t, i)
        },
        t = i.prototype = new DisplayObject;
    i._workingContext = document.createElement("canvas").getContext("2d"), t.text = "", t.font = null, t.color = null, t.textAlign = null, t.textBaseline = null, t.maxWidth = null, t.outline = !1, t.lineHeight = null, t.lineWidth = null, t.DisplayObject_initialize = t.initialize, t.initialize = function (n, t, i) {
        this.DisplayObject_initialize(), this.text = n, this.font = t, this.color = i ? i : "#000"
    }, t.isVisible = function () {
        return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text != "")
    }, t.DisplayObject_draw = t.draw, t.draw = function (n, t) {
        var i;
        if (this.DisplayObject_draw(n, t)) return !0;
        this.outline ? n.strokeStyle = this.color : n.fillStyle = this.color, n.font = this.font, n.textAlign = this.textAlign ? this.textAlign : "start", n.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic";
        for (var o = String(this.text).split(/(?:\r\n|\r|\n)/), s = this.lineHeight == null ? this.getMeasuredLineHeight() : this.lineHeight, u = 0, f = 0, h = o.length; f < h; f++) {
            if (i = n.measureText(o[f]).width, this.lineWidth == null || i < this.lineWidth) this._drawTextLine(n, o[f], u);
            else {
                for (var i = o[f].split(/(\s)/), e = i[0], r = 1, c = i.length; r < c; r += 2) n.measureText(e + i[r] + i[r + 1]).width > this.lineWidth ? (this._drawTextLine(n, e, u), u += s, e = i[r + 1]) : e += i[r] + i[r + 1];
                this._drawTextLine(n, e, u)
            }
            u += s
        }
        return !0
    }, t.getMeasuredWidth = function () {
        return this._getWorkingContext().measureText(this.text).width
    }, t.getMeasuredLineHeight = function () {
        return this._getWorkingContext().measureText("M").width * 1.2
    }, t.clone = function () {
        var n = new i(this.text, this.font, this.color);
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    }, t.DisplayObject_cloneProps = t.cloneProps, t.cloneProps = function (n) {
        this.DisplayObject_cloneProps(n), n.textAlign = this.textAlign, n.textBaseline = this.textBaseline, n.maxWidth = this.maxWidth, n.outline = this.outline, n.lineHeight = this.lineHeight, n.lineWidth = this.lineWidth
    }, t._getWorkingContext = function () {
        var n = i._workingContext;
        return n.font = this.font, n.textAlign = this.textAlign ? this.textAlign : "start", n.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic", n
    }, t._drawTextLine = function (n, t, i) {
        this.outline ? n.strokeText(t, 0, i, this.maxWidth) : n.fillText(t, 0, i, this.maxWidth || 65535)
    }, n.Text = i
}(window), function (n) {
    var t = function () {
            throw "SpriteSheetUtils cannot be instantiated";
        };
    t._workingCanvas = document.createElement("canvas"), t._workingContext = t._workingCanvas.getContext("2d"), t.addFlippedFrames = function (n, i, r, u) {
        if (i || r || u) {
            var f = 0;
            i && t._flip(n, ++f, !0, !1), r && t._flip(n, ++f, !1, !0), u && t._flip(n, ++f, !0, !0)
        }
    }, t.extractFrame = function (n, i) {
        var u, r, f;
        return (isNaN(i) && (i = n.getAnimation(i).frames[0]), u = n.getFrame(i), !u) ? null : (r = u.rect, f = t._workingCanvas, f.width = r.width, f.height = r.height, t._workingContext.drawImage(u.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height), u = new Image, u.src = f.toDataURL("image/png"), u)
    }, t._flip = function (n, i, r, u) {
        for (var f, s, l = n._images, a = t._workingCanvas, e = t._workingContext, c = l.length / i, o = 0; o < c; o++) f = l[o], f.__tmp = o, a.width = f.width, a.height = f.height, e.setTransform(r ? -1 : 1, 0, 0, u ? -1 : 1, r ? f.width : 0, u ? f.height : 0), e.drawImage(f, 0, 0), s = new Image, s.src = a.toDataURL("image/png"), s.width = f.width, s.height = f.height, l.push(s);
        for (e = n._frames, a = e.length / i, o = 0; o < a; o++) {
            var f = e[o],
                h = f.rect.clone(),
                s = l[f.image.__tmp + c * i],
                v = {
                    image: s,
                    rect: h,
                    regX: f.regX,
                    regY: f.regY
                };
            r && (h.x = s.width - h.x - h.width, v.regX = h.width - f.regX), u && (h.y = s.height - h.y - h.height, v.regY = h.height - f.regY), e.push(v)
        }
        for (r = "_" + (r ? "h" : "") + (u ? "v" : ""), u = n._animations, n = n._data, l = u.length / i, o = 0; o < l; o++) {
            for (e = u[o], f = n[e], c = {
                name: e + r,
                frequency: f.frequency,
                next: f.next,
                frames: []
            }, f.next && (c.next += r), e = f.frames, f = 0, s = e.length; f < s; f++) c.frames.push(e[f] + a * i);
            n[c.name] = c, u.push(c.name)
        }
    }, n.SpriteSheetUtils = t
}(window), function (n) {
    var i = function (n) {
            this.initialize(n)
        },
        t = i.prototype = new DisplayObject;
    t.htmlElement = null, t._style = null, t.DisplayObject_initialize = t.initialize, t.initialize = function (n) {
        typeof n == "string" && (n = document.getElementById(n)), this.DisplayObject_initialize(), this.mouseEnabled = !1, (this.htmlElement = n) && (this._style = n.style, this._style.position = "absolute", this._style.transformOrigin = this._style.webkitTransformOrigin = this._style.msTransformOrigin = this._style.MozTransformOrigin = "0% 0%")
    }, t.isVisible = function () {
        return this.htmlElement != null
    }, t.draw = function () {
        if (this.htmlElement != null) {
            var n = this._matrix,
                t = this.htmlElement;
            return t.style.opacity = "" + n.alpha, t.style.visibility = this.visible ? "visible" : "hidden", t.style.transform = t.style.webkitTransform = t.style.oTransform = t.style.msTransform = ["matrix(" + n.a, n.b, n.c, n.d, n.tx, n.ty + ")"].join(","), t.style.MozTransform = ["matrix(" + n.a, n.b, n.c, n.d, n.tx + "px", n.ty + "px)"].join(","), !0
        }
    }, t.cache = function () {}, t.uncache = function () {}, t.updateCache = function () {}, t.hitTest = function () {}, t.localToGlobal = function () {}, t.globalToLocal = function () {}, t.localToLocal = function () {}, t.clone = function () {
        var n = new i;
        return this.cloneProps(n), n
    }, t.toString = function () {
        return "[DOMElement (name=" + this.name + ")]"
    }, t._tick = function (n) {
        if (this.htmlElement != null && (this.htmlElement.style.visibility = "hidden", this.onTick)) this.onTick(n)
    }, n.DOMElement = i
}(window), function (n) {
    var i = function () {
            this.initialize()
        },
        t = i.prototype;
    t.initialize = function () {}, t.getBounds = function () {
        return new Rectangle(0, 0, 0, 0)
    }, t.applyFilter = function () {}, t.toString = function () {
        return "[Filter]"
    }, t.clone = function () {
        return new i
    }, n.Filter = i
}(window), function (n) {
    var t = function () {
            throw "Touch cannot be instantiated";
        };
    t.isSupported = function () {
        return "ontouchstart" in n
    }, t.enable = function (n) {
        n != null && t.isSupported() && (n._primaryTouchId = -1, n._handleTouchMoveListener = null, n.canvas.addEventListener("touchstart", function (i) {
            t._handleTouchStart(n, i)
        }, !1), document.addEventListener("touchend", function (i) {
            t._handleTouchEnd(n, i)
        }, !1))
    }, t._handleTouchStart = function (n, i) {
        if (i.preventDefault(), n._primaryTouchId == -1) {
            n._handleTouchMoveListener = n._handleTouchMoveListener ||
            function (i) {
                t._handleTouchMove(n, i)
            }, document.addEventListener("touchmove", n._handleTouchMoveListener, !1);
            var r = i.changedTouches[0];
            n._primaryTouchId = r.identifier, n._updateMousePosition(r.pageX, r.pageY), n._handleMouseDown(r)
        }
    }, t._handleTouchMove = function (n, i) {
        var r = t._findPrimaryTouch(n, i.changedTouches);
        r && n._handleMouseMove(r)
    }, t._handleTouchEnd = function (n, i) {
        var r = t._findPrimaryTouch(n, i.changedTouches);
        r && (n._primaryTouchId = -1, n._handleMouseUp(r), document.removeEventListener("touchmove", n._handleTouchMoveListener), n._handleTouchMoveListener = null)
    }, t._findPrimaryTouch = function (n, t) {
        for (var r, u = t.length, i = 0; i < u; i++) if (r = t[i], r.identifier == n._primaryTouchId) return r;
        return null
    }, n.Touch = t
}(window), function (t) {
    Tween = function (n, t) {
        this.initialize(n, t)
    };
    var i = Tween.prototype;
    Tween.NONE = 0, Tween.LOOP = 1, Tween.REVERSE = 2, Tween._tweens = [], Tween.cssSuffixMap = {
        top: "px",
        left: "px",
        bottom: "px",
        right: "px",
        width: "px",
        height: "px",
        opacity: ""
    }, Tween.get = function (n, t) {
        return new Tween(n, t)
    }, Tween.tick = function (n, t) {
        for (var r, u = Tween._tweens, i = u.length - 1; i >= 0; i--) r = u[i], (!t || r.ignoreGlobalPause) && r.tick(r._useTicks ? 1 : n)
    }, Ticker && Ticker.addListener(Tween, !1), Tween.removeTweens = function (n) {
        if (n.tweenjs_count) {
            for (var i = Tween._tweens, t = i.length - 1; t >= 0; t--) i[t]._target == n && i.splice(t, 1);
            n.tweenjs_count = 0
        }
    }, Tween._register = function (n, t) {
        var i = n._target;
        t ? (i && (i.tweenjs_count = i.tweenjs_count ? i.tweenjs_count + 1 : 1), Tween._tweens.push(n)) : (i && i.tweenjs_count--, i = Tween._tweens.indexOf(n), i != -1 && Tween._tweens.splice(i, 1))
    }, i.ignoreGlobalPause = !1, i.loop = !1, i.cssSuffixMap = null, i.duration = 0, i._paused = !1, i._curQueueProps = null, i._initQueueProps = null, i._steps = null, i._actions = null, i._prevPosition = 0, i._prevPos = -1, i._prevIndex = -1, i._target = null, i._css = !1, i._useTicks = !1, i.initialize = function (n, t) {
        this._target = n, t && (this._useTicks = t.useTicks, this._css = t.css, this.ignoreGlobalPause = t.ignoreGlobalPause, this.loop = t.loop, t.override && Tween.removeTweens(n)), this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], this._catalog = [], Tween._register(this, !0)
    }, i.wait = function (n) {
        if (n == null || n <= 0) return this;
        var t = this._cloneProps(this._curQueueProps);
        return this._addStep({
            d: n,
            p0: t,
            e: this._linearEase,
            p1: t
        })
    }, i.to = function (n, t, i) {
        return (isNaN(t) || t < 0) && (t = 0), this._addStep({
            d: t || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: i,
            p1: this._cloneProps(this._appendQueueProps(n))
        })
    }, i.call = function (n, t, i) {
        return this._addAction({
            f: n,
            p: t ? t : [this],
            o: i ? i : this._target
        })
    }, i.set = function (n, t) {
        return this._addAction({
            f: this._set,
            o: this,
            p: [n, t ? t : this._target]
        })
    }, i.play = function (n) {
        return this.call(n.setPaused, [!1], n)
    }, i.pause = function (n) {
        return n || (n = this), this.call(n.setPaused, [!0], n)
    }, i.setPosition = function (n, t) {
        var i, u, r, f;
        if (t == null && (t = 1), i = n, u = !1, i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration, u = !0)), i == this._prevPos) return u;
        if (i != this._prevPos) if (u) this._updateTargetProps(null, 1);
        else if (this._steps.length > 0) {
            for (r = 0, f = this._steps.length; r < f; r++) if (this._steps[r].t > i) break;
            r = this._steps[r - 1], this._updateTargetProps(r, (i - r.t) / r.d)
        }
        return r = this._prevPos, this._prevPos = i, this._prevPosition = n, t != 0 && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : t == 1 && i < r ? (r != this.duration && this._runActions(r, this.duration), this._runActions(0, i, !0)) : this._runActions(r, i)), u && this.setPaused(!0), u
    }, i.tick = function (n) {
        this._paused || this.setPosition(this._prevPosition + n)
    }, i.setPaused = function (n) {
        this._paused != !! n && (this._paused = !! n, Tween._register(this, !n))
    }, i.w = i.wait, i.t = i.to, i.c = i.call, i.s = i.set, i.toString = function () {
        return "[Tween]"
    }, i.clone = function () {
        throw "Tween can not be cloned.";
    }, i._updateTargetProps = function (t, i) {
        var f, e, o, r, u;
        this._css && (f = this.cssSuffixMap || Tween.cssSuffixMap), !t && i == 1 ? e = o = this._curQueueProps : (t.e && (i = t.e(i, 0, 1, 1)), e = t.p0, o = t.p1);
        for (n in this._initQueueProps)(r = e[n]) == null && (e[n] = r = this._initQueueProps[n]), (u = o[n]) == null && (o[n] = u = r), r == u || i == 0 || i == 1 || typeof r != "number" ? i == 1 && (r = u) : r += (u - r) * i, this._target[n] = f && f[n] ? r + f[n] : r
    }, i._runActions = function (n, t, i) {
        var o = n,
            u = t,
            f = -1,
            e = this._actions.length,
            s = 1,
            t, r;
        for (n > t && (o = t, u = n, f = e, e = s = -1);
        (f += s) != e;) t = this._actions[f], r = t.t, (r == u || r > o && r < u || i && r == n) && t.f.apply(t.o, t.p)
    }, i._appendQueueProps = function (n) {
        var u, i, e, t, r, f;
        this._css && (u = this.cssSuffixMap || Tween.cssSuffixMap);
        for (t in n) {
            if (this._initQueueProps[t] == null) if (u && (i = u[t]) != null) if (r = this._target[t], f = r.length - i.length, (e = r.substr(f)) != i) throw "TweenJS Error: Suffixes do not match. (" + i + ":" + e + ")";
            else this._initQueueProps[t] = parseInt(r.substr(0, f));
            else this._initQueueProps[t] = this._target[t];
            this._curQueueProps[t] = n[t]
        }
        return this._curQueueProps
    }, i._cloneProps = function (n) {
        var i = {},
            t;
        for (t in n) i[t] = n[t];
        return i
    }, i._addStep = function (n) {
        return n.d > 0 && (this._steps.push(n), n.t = this.duration, this.duration += n.d), this
    }, i._addAction = function (n) {
        return n.t = this.duration, this._actions.push(n), this
    }, i._set = function (n, t) {
        for (var i in n) t[i] = n[i]
    }, t.Tween = Tween
}(window), function (n) {
    Timeline = function (n, t, i) {
        this.initialize(n, t, i)
    };
    var t = Timeline.prototype;
    t.ignoreGlobalPause = !1, t.duration = 0, t.loop = !1, t._paused = !0, t._tweens = null, t._labels = null, t._prevPosition = 0, t._prevPos = 0, t._useTicks = !1, t.initialize = function (n, t, i) {
        this._tweens = [], n && this.addTween.apply(this, n), this.setLabels(t), this.setPaused(!1), i && (this._useTicks = i.useTicks, this.loop = i.loop, this.ignoreGlobalPause = i.ignoreGlobalPause)
    }, t.addTween = function (n) {
        var i = arguments.length,
            t;
        if (i > 1) {
            for (t = 0; t < i; t++) this.addTween(arguments[t]);
            return arguments[0]
        }
        return i == 0 ? null : (this.removeTween(n), this._tweens.push(n), n.setPaused(!0), n._paused = !1, n.duration > this.duration && (this.duration = n.duration), n)
    }, t.removeTween = function (n) {
        var t = arguments.length,
            i, r;
        if (t > 1) {
            for (i = !0, r = 0; r < t; r++) i = i && this.removeTween(arguments[r]);
            return i
        }
        return t == 0 ? !1 : (t = this._tweens.indexOf(n), t != -1 ? (this._tweens.splice(t, 1), n.duration >= this.duration && this.updateDuration(), !0) : !1)
    }, t.addLabel = function (n, t) {
        this._labels[n] = t
    }, t.setLabels = function (n) {
        this._labels = n ? n : {}
    }, t.gotoAndPlay = function (n) {
        this.setPaused(!1), this._goto(n)
    }, t.gotoAndStop = function (n) {
        this.setPaused(!0), this._goto(n)
    }, t.setPosition = function (n) {
        var t = this.loop ? n % this.duration : n,
            i = !this.loop && n >= this.duration,
            n, r;
        for (this._prevPosition = n, this._prevPos = t, n = 0, r = this._tweens.length; n < r; n++) if (this._tweens[n].setPosition(t), t != this._prevPos) return !1;
        return i && this.setPaused(!0), i
    }, t.setPaused = function (n) {
        this._paused != !! n && (this._paused = !! n, Tween._register(this, !n))
    }, t.updateDuration = function () {
        for (var n = this.duration = 0, t = this._tweens.length; n < t; n++)(tween = this._tweens[n], tween.duration > this.duration) && (this.duration = tween.duration)
    }, t.tick = function (n) {
        this.setPosition(this._prevPosition + n)
    }, t.toString = function () {
        return "[Timeline]"
    }, t.clone = function () {
        throw "Timeline can not be cloned.";
    }, t._goto = function (n) {
        var t = parseFloat(n);
        isNaN(t) && (t = this._labels[n]), t != null && this.setPosition(t)
    }, n.Timeline = Timeline
}(window), function (n) {
    var t = function () {
            throw "Ease cannot be instantiated.";
        };
    t.linear = function (n) {
        return n
    }, t.none = t.linear, t.get = function (n) {
        return n < -1 && (n = -1), n > 1 && (n = 1), function (t) {
            return n == 0 ? t : n < 0 ? t * (t * -n + 1 + n) : t * ((2 - t) * n + (1 - n))
        }
    }, t.getPowIn = function (n) {
        return function (t) {
            return Math.pow(t, n)
        }
    }, t.getPowOut = function (n) {
        return function (t) {
            return 1 - Math.pow(1 - t, n)
        }
    }, t.getPowInOut = function (n) {
        return function (t) {
            return (t *= 2) < 1 ? .5 * Math.pow(t, n) : 1 - .5 * Math.abs(Math.pow(2 - t, n))
        }
    }, t.quadIn = t.getPowIn(2), t.quadOut = t.getPowOut(2), t.quadInOut = t.getPowInOut(2), t.cubicIn = t.getPowIn(3), t.cubicOut = t.getPowOut(3), t.cubicInOut = t.getPowInOut(3), t.quartIn = t.getPowIn(4), t.quartOut = t.getPowOut(4), t.quartInOut = t.getPowInOut(4), t.quintIn = t.getPowIn(5), t.quintOut = t.getPowOut(5), t.quintInOut = t.getPowInOut(5), t.sineIn = function (n) {
        return 1 - Math.cos(n * Math.PI / 2)
    }, t.sineOut = function (n) {
        return Math.sin(n * Math.PI / 2)
    }, t.sineInOut = function (n) {
        return -.5 * (Math.cos(Math.PI * n) - 1)
    }, t.getBackIn = function (n) {
        return function (t) {
            return t * t * ((n + 1) * t - n)
        }
    }, t.backIn = t.getBackIn(1.7), t.getBackOut = function (n) {
        return function (t) {
            return --t * t * ((n + 1) * t + n) + 1
        }
    }, t.backOut = t.getBackOut(1.7), t.getBackInOut = function (n) {
        return n *= 1.525, function (t) {
            return (t *= 2) < 1 ? .5 * t * t * ((n + 1) * t - n) : .5 * ((t -= 2) * t * ((n + 1) * t + n) + 2)
        }
    }, t.backInOut = t.getBackInOut(1.7), t.circIn = function (n) {
        return -(Math.sqrt(1 - n * n) - 1)
    }, t.circOut = function (n) {
        return Math.sqrt(1 - --n * n)
    }, t.circInOut = function (n) {
        return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
    }, t.bounceIn = function (n) {
        return 1 - t.bounceOut(1 - n)
    }, t.bounceOut = function (n) {
        return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
    }, t.bounceInOut = function (n) {
        return n < .5 ? t.bounceIn(n * 2) * .5 : t.bounceOut(n * 2 - 1) * .5 + .5
    }, t.getElasticIn = function (n, t) {
        var i = Math.PI * 2;
        return function (r) {
            if (r == 0 || r == 1) return r;
            var u = t / i * Math.asin(1 / n);
            return -(n * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - u) * i / t))
        }
    }, t.elasticIn = t.getElasticIn(1, .3), t.getElasticOut = function (n, t) {
        var i = Math.PI * 2;
        return function (r) {
            if (r == 0 || r == 1) return r;
            var u = t / i * Math.asin(1 / n);
            return n * Math.pow(2, -10 * r) * Math.sin((r - u) * i / t) + 1
        }
    }, t.elasticOut = t.getElasticOut(1, .3), t.getElasticInOut = function (n, t) {
        var i = Math.PI * 2;
        return function (r) {
            var u = t / i * Math.asin(1 / n);
            return (r *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - u) * i / t) : n * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - u) * i / t) * .5 + 1
        }
    }, t.elasticInOut = t.getElasticInOut(1, .3 * 1.5), n.Ease = t
}(window), function (n) {
    var t = function (n, t, i) {
            this.initialize(n, t, i)
        },
        i = t.prototype;
    i.initialize = function (n, t, i) {
        this.bitmaps = n, this.container = t, this.intervalCallback = i
    }, i.play = function (m, n) {
        var code = "Tween.get(c, { loop: true })",
            bitmaps = this.bitmaps,
            ic = this.intervalCallback,
            c = this.container,
            i;
        if (m && n && m < n && n < bitmaps.length) for (i = m; i < n; i++) code += "  .wait(100).call(function () {ic(); c.removeAllChildren(); c.addChild(bitmaps[" + i + "]);})";
        else for (i = 0; i < bitmaps.length; i++) code += "  .wait(100).call(function () {ic(" + (i + 1) + "); c.removeAllChildren(); c.addChild(bitmaps[" + i + "]);})";
        eval(code)
    }, n.TweenAnimation = t
}(window), $(function () {
    $("#dialog").dialog({
        autoOpen: !1,
        width: 600,
        modal: !0,
        buttons: {
            Ok: function () {
                $(this).dialog("close")
            },
            Cancel: function () {
                $(this).dialog("close")
            }
        }
    }), $("#exportBtn").click(function () {
        return $("#dialog").dialog("open"), !1
    }), $("#dialog_link, ul#icons li").hover(function () {
        $(this).addClass("ui-state-hover")
    }, function () {
        $(this).removeClass("ui-state-hover")
    })
});
var currentFrameIndex = 0,
    allImage, canvas, stage, anmCanvas, anmStage, mouseDown = !1,
    bcr, shapeContainer, shapeContainer2, shapeContainerOnPress = !1,
    allBitmap, anm = [],
    imageUrl, clipContainer, imageData, anmPlaying = !1;
hidHand();
var clickPoint = {
    x: 0,
    y: 0
},
    startXY = {
        x: 0,
        y: 0
    },
    endXY = {
        x: 0,
        y: 0
    },
    increasePixel = 1,
    leftIncreasePixel = 2,
    rightIncreasePixel = 2,
    upIncreasePixel = 2,
    downIncreasePixel = 2,
    KEYCODE_UP = 38,
    KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_DOWN = 40,
    KEYCODE_W = 87,
    KEYCODE_A = 65,
    KEYCODE_D = 68,
    KEYCODE_S = 83;
document.onkeydown = handleKeyDown, document.onkeyup = handleKeyUp