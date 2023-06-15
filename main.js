window.onresize = function(ev) {
    //document.getElementById("sMain").style.scale = Math.min(window.innerWidth, window.innerHeight) / 700
}

var timeUntilVanish = 0
var isHidden = true;

var encryption;

function vanishFrame(dt) {
    requestAnimationFrame(vanishFrame);

    timeUntilVanish -= 0.016;

    if (timeUntilVanish <= 0 && !isHidden) {
        document.getElementById("sWrong").classList.remove("sShown");
        document.getElementById("sWrong").classList.add("sHidden");
        isHidden = true;
    }
    else if (timeUntilVanish > 0 && isHidden) {
        document.getElementById("sWrong").classList.remove("sHidden");
        document.getElementById("sWrong").classList.add("sShown");
        isHidden = false;
    }
}

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

var password = 8608013800682884;

function loaded() {
    requestAnimationFrame(vanishFrame);
    if (document.getElementById("IS_SECRET") != null) {
        if (location.href.substring(location.href.lastIndexOf("?") + 1) != "enter=" + cyrb53("auhdad", 34720)) {
            location.href = location.href.substring(0, location.href.indexOf("22")) + "gdat.html";
        }
    }
    //document.getElementById("sPassword").value = "SECRETPASS36";
    if (location.href.includes("?enter") && document.getElementById("IS_SECRET") == null) {
        location.href = location.href.substring(0, location.href.indexOf("?enter"));
    }
}

var usable = true;
var ready = false;

function checkPassword() {
    if (document.getElementById("IS_GDAT") != null) {
        location.href = location.href.substring(0, location.href.indexOf("gdat"));
    }
    if (document.getElementById("IS_INDEX") == null) {
        if (document.getElementById("IS_SECRET") != null)
            location.pathname = location.pathname.substring(0, location.pathname.length - document.getElementById("IS_SECRET").innerHTML.length);
        if (document.getElementById("IS_GDAT") != null)
            location.pathname = location.pathname.substring(0, location.pathname.length - document.getElementById("IS_GDAT").innerHTML.length);
    }
    if (ready) {
        document.getElementById("sTitle").classList.add("sVanish");
        document.getElementById("sContinue").classList.add("sVanish");

        setTimeout(function() {
            document.location += cyrb53(cyrb53(cyrb53(password.toString(), cyrb53("segsgsrdhdhs4aesawfawf", 6436362323452)), cyrb53("ssrhdjedseawta", 555231723)), cyrb53("fajdhdhfhdssedagaf", 42347282)) + ".html?enter=" + cyrb53("auhdad", 34720);
        }, 400)
    }
    else {
        if (usable) {
            var input = document.getElementById("sPassword").value.toString();
            input = cyrb53(input.substring(0, input.lastIndexOf("SS") + 2), input.substring(input.lastIndexOf("SS") + 2, input.length));
            if (cyrb53(input.toString(), cyrb53("fajdhdhfhdssedagaf", 42347282)) == cyrb53(password.toString(), cyrb53("fajdhdhfhdssedagaf", 42347282))) {
                usable = false;
    
                document.getElementById("sTitle").classList.add("sVanish");
                document.getElementById("sPassword").classList.add("sVanish");
                document.getElementById("sWrong").classList.add("sVanish");
                document.getElementById("sContinue").classList.add("sVanish");
                document.getElementById("sPassText").classList.add("sVanish");
    
                setTimeout(function() {
                    document.getElementById("sTitle").classList.remove("sVanish");
                    document.getElementById("sTitle").classList.add("sSuccess");
                    document.getElementById("sTitle").innerHTML = "Password accepted"
                    document.getElementById("sPassword").remove();
                    document.getElementById("sWrong").remove();
                    document.getElementById("sContinue").classList.remove("sVanish");
                    document.getElementById("sPassText").remove();
    
                    ready = true;
                    usable = true;
                }, 400)
            }
            else {
                timeUntilVanish = 3;
            }
        }
    }
}