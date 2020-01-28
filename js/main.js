
$(document).ready(function(){
    $(".menu-toggle").on('click', function(e){
        var closenav = document.getElementById("mySidenav");
        
        if(closenav.style.display != "block"){
            closenav.style.display ="block";
            document.getElementById("wrappers").style.marginLeft = "300px";
            document.getElementById("foot").style.marginLeft ="209px";
        }else{
            closenav.style.display = "none";
            document.getElementById("wrappers").style.margin = "auto";
            document.getElementById("foot").style.marginLeft ="auto";
            // post.style.marginLeft ="0px";
        }
    })
})

function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(el) {
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return false
}

function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        requestFullScreen(elem);
    }
    return false;
}

window.onload = function() {

        const tablets = window.matchMedia("(max-width:800px)");
        
        const laptops = window.matchMedia("(max-1024px)");

        const mop = window.matchMedia("(min-width:360px)");

        if(tablets.matches){
            var yesme = document.getElementById("mySidenav").style.display ="none";
            document.getElementById("wrappers").style.margin = "auto";
            foots.style.background = "red";
        }

        if(laptops.matches){
            document.getElementById("footer-colo").style.width = "200px";
        }

        if(mop.matches){
            // document.getElementById("modules").style.display = "none";
            document.getElementById("panel-top").style.marginTop ="100px";
        }else{
            // document.getElementById("modules").style.display = "block";
        }
}



$(function () {
    $('#modules').on('click', function (event){
        event.preventDefault();
        $(this).toggleClass('selected');
        $(this).parent().find('#panel-top').first().toggle("slow");
        $(this).parent().siblings().find('#panel-top').hide('slow');
        //Hide menu when clicked outside
        $(this).parent().find('#panel-top').parent().mouseleave(function () {
            var thisUI = $(this);
            $('html').click(function () {
                thisUI.children("#panel-top").hide('slow');
                thisUI.children("a").removeClass('selected');
                $('html').unbind('click');
            });
        });
        event.stopPropagation();
    });
});

$(document).ready(function(){
     
    d = Date.now();
    d = new Date(d);
    document.getElementById('getdate').innerHTML = d.getHours() + ':' + d.getMinutes() + ' ' + (d.getHours() >= 12 ? "PM" : "AM");
    
})

// service worker script 

const cacheName = 'v1';

self.addEventListener('install',(e)=>{});

self.addEventListener('activate', (e) => {
    // REMOVE UNWANTED CACHES FROM THE SERVER CLIENT FORNT END 
        e.waitUntil(
            caches.keys().then(cacheName =>{
            return Promise.all(
                cacheName.map(cache =>{
                    if(cache !== cacheName){
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).then(res =>{
        const resClone = res.clone();
        caches.open(cacheName).then(cache =>{
            cache.put(e.request, resClone);
        });
        return res;
    }).catch(err => caches.match(e.request).then(res => res))
    );
});