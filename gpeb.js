//=======================================================================================================================
// 関数群
//=======================================================================================================================
//言語を取得する jaで日本
var language = this.lang = document.getElementsByTagName("html")[0].lang;

// 自動ポスト _elementはポストID、 _textにはテキスト _flagに1を指定するとコメント返信モードになります。
function autopost(_element, _text, _flag, _ge) {
    try {
        if(_flag == 0) {
            // 通常の実行
            try {
                var a = _element.parentNode.parentNode;
                var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            }
            catch (_error) {
                console.error("Google+ Extreme Button - Error : ストリームへの返信に失敗しました");
            }
        }
        else if(_flag == 1) {
            // 返信の実行
            try {
                // ポストエレメントの取得
                var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                var a = (function(_element) {
                    var a = _element.getElementsByTagName("Button");
                    var b = a.length;
                    for(var c = 0; c < b; c++) {
                        if(a[c].getAttribute("g:entity").match(/buzz:.*/)) {
                            return a[c];
                        }
                    }
                })(b);
            }
            catch (_error) {
                console.error("Google+ Extreme Button - Error : お知らせウィンドウへの返信に失敗しました");
            }
            // 返信IDの取得
            var reply = (function(_element) {
                return _element.parentNode.parentNode.previousSibling.firstChild.getAttribute("oid");
            })(_element);

            // 返信するユーザー名の取得
            var username = (function(_element) {
                return _element.parentNode.parentNode.previousSibling.firstChild.innerHTML;
            })(_element);

        }
        else if(_flag == 2) {
            // 返信の実行
            try {
                // ポストエレメントの取得
                var post = _ge.post().elm(_element);
                var b = post.element;
                var a = (function(_element) {
                    var a = _element.getElementsByTagName("Button");
                    var b = a.length;
                    for(var c = 0; c < b; c++) {
                        if(a[c].getAttribute("g:entity").match(/buzz:.*/)) {
                            return a[c];
                        }
                    }
                })(b);
            }
            catch (_error) {
                console.error("Google+ Extreme Button - Error");
            }
            // 返信IDの取得
            var reply = post.userid();

            // 返信するユーザー名の取得
            var username = post.auther();
        }

        // 「.editor」要素があるか調べる
        var d = b.getElementsByTagName("div");
        var e = d.length;
        var f = 0;
        for(var g = 0; g < e; g++) {
            if(d[g].id.match(/.*\.editor/)) {
                f = 1;
            }
        }

        if(f == 0) {
            // 投稿ボタンが見つかるまで実行
            a = a.parentNode.firstChild;
            while(1) {
                try {
                    a = a.nextSibling;
                }
                catch (_error) {
                    // 見つからなかった場合ループを抜ける
                    break;
                }
                try {
                    // コメントリンクボタンが見つかるまで繰り返す
                    if(a.getAttribute("role") == "button") {

                        // コメントリンクボタンをクリックする
                        var c = document.createEvent("MouseEvents");
                        c.initEvent("click", true, false);
                        a.dispatchEvent(c);
                        break;
                    }
                }
                catch (_error) {
                }
            }
        }

        // 遅延させる
        setTimeout(function() {

            // 「.editor」エレメントを探す
            var d = b.getElementsByTagName("div");
            var e = d.length;
            for(var f = 0; f < e; f++) {

                // .editorが見つかった
                if(d[f].id.match(/.*\.editor/)) {
                    try {

                        // .editorをクリックする
                        (function(_elm) {
                            var a = document.createEvent("MouseEvents");
                            a.initEvent("click", true, false);
                            _elm.dispatchEvent(a);
                        })(d[f].firstChild);

                    }
                    catch (_error) {
                        console.error("Google+ Extreme Button - Error : .editorのフォーカスの取得に失敗しました");
                    }

                    try {
                        if(_flag) {
                            // Firefoxの場合
                            if(navigator.userAgent.indexOf("Firefox") > -1) {
                                // テキストを入力する(Firefox)
                                try {
                                    d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = "+" + reply + " <br>";

                                }
                                catch (_error) {
                                    console.error("Google+ Extreme Button - Error : 返信時の操作に失敗しました");
                                }
                            }
                            else {
                                // スペースを挿入
                                (function() {
                                    var a = document.createTextNode(" ");
                                    d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
                                })(d[f]); (function() {
                                    var a = document.createElement("button");
                                    a.setAttribute("tabindex", "-1");
                                    a.setAttribute("id", "btnplus" + reply);
                                    a.setAttribute("contenteditable", "false");
                                    a.innerHTML = "+<span style=\"display:none\">" + reply + "</span><style>button#btnplus" + reply + " { white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-top-left-radius: 2px 2px; border-top-right-radius: 2px 2px; border-bottom-right-radius: 2px 2px; border-bottom-left-radius: 2px 2px; display: inline-block; font: normal normal normal 13px/1.4 Arial, sans-serif; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; } button#btnplus" + reply + ":after { content:\"" + username + "\" }</style>";
                                    d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
                                })();

                            }
                        }
                        else {
                            if(navigator.userAgent.indexOf("Firefox") > -1) {
                                // テキストを入力する(Firefox)
                                try {
                                    d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = _text + "<br>";

                                    // 入力エリアのアクティベート
                                    var g = document.createEvent("KeyboardEvent");
                                    g.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, 13);
                                    d[f].firstChild.firstChild.firstChild.contentDocument.body.dispatchEvent(g);

                                }
                                catch (_error) {
                                    console.error("Google+ Extreme Button - Error : 自動ポストに失敗しました");
                                }

                            }
                            else {
                                // テキストを入力する(Chrome)
                                try {
                                    var g = document.createEvent("TextEvent");
                                    g.initTextEvent('textInput', true, true, null, (function() {
                                        return _text;
                                    })());
                                    d[f].firstChild.firstChild.dispatchEvent(g);

                                    // 入力エリアのアクティベート
                                    var g = document.createEvent("KeyboardEvent");
                                    g.initKeyboardEvent("keypress", true, false, window, 13, false, false, false, "", false);
                                    d[f].firstChild.firstChild.dispatchEvent(g);
                                }
                                catch (_error) {
                                    console.error("Google+ Extreme Button - Error : テキストの入力に失敗しました");
                                }
                            }
                        }
                    }
                    catch (_error) {
                        console.error("Google+ Extreme Button - Error : 自動ポスト中に例外エラーが発生しました");
                    }

                    //powered by oov
                    (function(elem) {
                        var ev = document.createEvent("MouseEvents");
                        ev.initEvent("keypress", true, true);
                        ev.keyCode = 27;
                        elem.dispatchEvent(ev);
                    })(d[f].firstChild.firstChild);

                    // 投稿ボタンを押す
                    if(_flag == 0) {
                        var c = document.createEvent("MouseEvents");
                        c.initEvent("mousedown", true, true);
                        d[f].nextSibling.dispatchEvent(c);

                        var c = document.createEvent("MouseEvents");
                        c.initEvent("click", true, true);
                        d[f].nextSibling.dispatchEvent(c);

                        var c = document.createEvent("MouseEvents");
                        c.initEvent("mouseup", true, true);
                        d[f].nextSibling.dispatchEvent(c);
                    }
                    break;
                }
            }
        }, 150);

        return;
    }
    catch (_error) {
        console.error("Google+ Extreme Button - Error : 自動ポストで原因不明のエラーが発生しました");
    }
}

// 指定したエレメントにクリックイベントを送信する
function click(_elm) {
    try {
        var me = document.createEvent("MouseEvents");
        me.initEvent("mousedown", true, true);
        _elm.dispatchEvent(me);
    }
    catch (_error) {
    }

    try {
        var me = document.createEvent("MouseEvents");
        me.initEvent("click", true, true);
        _elm.dispatchEvent(me);
    }
    catch (_error) {
    }

    try {
        var me = document.createEvent("MouseEvents");
        me.initEvent("mouseup", true, true);
        _elm.dispatchEvent(me);
    }
    catch (_error) {
    }
}

// 指定したエレメントに文字列を送信する
function keysend(_elm, _str) {
    var te = document.createEvent("TextEvent");
    te.initTextEvent('textInput', true, true, null, (function() {
        return _text;
    })());
    _elm.dispatchEvent(te);

    // 入力エリアのアクティベート
    var te = document.createEvent("KeyboardEvent");
    te.initKeyboardEvent("keypress", true, false, window, null, false, false, false, 8, 8);
    _elm.dispatchEvent(te);
}

// GoogleのURLからクラス名とメソッド名を取り出すパーサ
function gpurlparser(_url) {
    url = _url.replace("https://plus.google.com", "");
    url = url.replace(/u\/\d+\//, "");
    if(url.slice(0, 3) == "/_/") {
        mode = 0
        url = url.replace("/_/", "");
        func = url.slice(0, url.indexOf("/"));
        url = url.replace(/[^\/]+/, "");
        pos = url.indexOf("/", 1);
        if(pos != -1) {
            method = url.slice(1, url.indexOf("/", 1));
        }
        else {
            method = url.slice(1);
        }
    }
    else {
        mode = 1
        func = ""
        method = ""
    }
    return [mode, func, method]
}

//=======================================================================================================================
// ローカルストレージ
//=======================================================================================================================
function _Storage() {
};

_Storage.prototype.get = function(_key, _callback) {
    chrome.extension.sendRequest({
        action : "get",
        key : _key
    }, _callback);

};

_Storage.prototype.set = function(_key, _value) {
    chrome.extension.sendRequest({
        action : "set",
        key : _key,
        value : _value
    });
};

_Storage.prototype.aisatsu = function(_callback) {
    chrome.extension.sendRequest({
        action : "aisatsu"
    }, _callback);
};

_Storage.prototype.buttonlist = function(_callback) {
    chrome.extension.sendRequest({
        action : "buttonlist"
    }, _callback);
};

_Storage.prototype.settings = function(_callback) {
    chrome.extension.sendRequest({
        action : "settings"
    }, _callback);

};

// =======================================================================================================================
// ボタンで呼び出されるアプリケーション
// =======================================================================================================================
function GpButtonApp() {

}

// フルサイズ画像を開く
GpButtonApp.prototype.OpenFullsizeImage = function(_t, _postdata, _post, _elm) {
    var url = _postdata[5];
    if(url[0] == "")
        return;
    for(var b = 0; b < url.length; b++) {
        window.open(url[b], '_blank', 'width=' + (screen.width / 2) + ',height=' + (screen.width / 2.66666) + ',scrollbars=yes');
    }
}

// フルサイズ画像をダウンロード
GpButtonApp.prototype.FullsizeDownload = function(_t, _postdata, _post, _elm) {
    var url = _postdata[6];
    if(url[0] == "")
        return;
    for(var b = 0; b < url.length; b++) {
        window.open(url[b], '_blank', '');
        window.focus();
    }
}

// Tumblr
GpButtonApp.prototype.tumblr = function(_t, _postdata, _post, _elm) {
    var imgurl = encodeURIComponent(_postdata[5][0]);
    var url = encodeURIComponent(_postdata[3]);
    var body = encodeURIComponent(_postdata[2]);
    var name = encodeURIComponent(_postdata[1]);
    var time = encodeURIComponent(_postdata[4]);
    if(imgurl == ""){
        window.open("http://www.tumblr.com/share?v=3&u="+url+"&t=Google%20Plus%20%28"+time+"%29%20&s="+body, "_blank", "width=500,height=450,scrollbars=yes");
    }
    else {
        window.open("http://www.tumblr.com/share/photo?source="+imgurl+"&caption=%20%3Ca%20href%3D%22"+url+"%22%3EGoogle%20Plus%20%28"+time+"%29%3C%2Fa%3E", "_blank", "width=500,height=450,scrollbars=yes");
    }
}

// readitlater
GpButtonApp.prototype.readitlater = function(_t, _postdata, _post, _elm) {
    var a = _elm;
    a.removeEventListener("click", arguments.callee);
    if(a.className == "Read") {
        return;
    }

    var ne = document.createElement("img");
    ne.src = chrome.extension.getURL("button/RIL2.png");
    ne.className = "Read";
    ne.style.paddingLeft = "2px";
    ne.style.marginTop = "0px";
    ne.style.cursor = "pointer";
    ne.style.display = "inline";
    ne.style.overflow = "hidden";
    ne.style.verticalAlign = "top";

    // エレメントを置換する
    _elm.parentNode.replaceChild(ne, _elm);

    var b = document.createElement("img");
    b.src = "http://readitlaterlist.com/v2/r.gif?v=1&h=bf6b&u=" + encodeURIComponent(_postdata[3]) + "&t=" + encodeURIComponent(_postdata[1]) + "+-+" + encodeURIComponent("Google+ (" + _postdata[4]) + "%29&rand=" + Math.random();
    b.style.display = "none";
}

// evernote
GpButtonApp.prototype.evernote = function(_t, _postdata, _post, _elm) {

    /*
    //XMLHTTP非同期通信
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    console.log(xmlhttp.responseText);
    }
    }

    var prm = "";
    prm += "url=" + encodeURIComponent("http://test.com/")+"&";
    prm += "body=" + encodeURIComponent("<div>a</div>")+"&";
    prm += "title=" + encodeURIComponent("abc")+"&";
    prm += "format=" + encodeURIComponent("microclip")+"&";
    prm += "quicknote=" + encodeURIComponent("true")+"&";

    */
    //xmlhttp.open('POST', "https://www.evernote.com/clip.action", true);
    //xmlhttp.setRequestHeader("Content-Type", "multipart/form-data;");
    //xmlhttp.setRequestHeader("Pragma", "no-cache");
    //xmlhttp.setRequestHeader("Accept",
    // "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    //xmlhttp.setRequestHeader("Accept-Language", "ja,en;q=0.8,en-US;q=0.6");
    //xmlhttp.setRequestHeader("Cache-Control", "no-cache");
    //xmlhttp.send(prm);

    //送信テスト
    //new Evernote().send("http://homepage3.nifty.com/takahashinoG/index.html/",
    // "", "神のように", "シンプルなページ");
    //return;

    //var reg_m = /gpme-.*/;
    /*
     try {
     var a = _post;
     }
     catch (_error) {
     }

     // 選択範囲オブジェクト
     var b = document.createRange();

     // 両方インストールされている
     try {
     if(a.firstChild.className.match(reg_m) && a.firstChild.className ==
     "fp_buttons") {
     b.setStart(a.firstChild.nextSibling, 0);
     b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling,
     0);
     }
     else {

     // G+ meがインストールされているかどうか調べる
     if(a.className.match(reg_m)) {
     b.setStart(a.firstChild, 0);
     b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling,
     0);
     }

     // favoがインストールされているかどうか調べる
     try {
     if(a.firstChild.className == "fp_buttons") {
     b.setStart(a.firstChild.nextSibling, 0);
     b.setEnd(a.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling,
     0);
     }
     else {
     b.setStart(a.firstChild, 0);
     b.setEnd(a.firstChild.firstChild.nextSibling.firstChild.nextSibling, 0);
     }
     }
     catch (_error) {
     console.error("アップデートエレメントの取得に失敗しました(error:018 - " + _error + ")");
     }

     }
     }
     catch (_error) {
     console.error("G+meとFavoの互換性が不安定になっています");
     }
     */

    var plusone = _t.ge.post().post(_post).plusone();
    plusone.style.display = "none";
    
    
    //イベント実行
    setTimeout(function(){
        //
        (function(_plusone){
             window.addEventListener("mousedown", function(_event) {
                removeEventListener("mousedown", arguments.callee);
                _plusone.style.display = "block";
            }, false);
        })(plusone);
    }, 1);


    var ra = document.createRange();
    ra.setStart(_post, 0);
    ra.setEnd(_post.nextSibling, 0);

    // 選択の実行
    var gs = getSelection();
    gs.removeAllRanges();
    gs.addRange(ra);

    // クリップの実行
    //location.href =
    // "javascript:(function()%7BEN_CLIP_HOST='http://www.evernote.com';try%7Bvar%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')%5B0%5D.appendChild(x);%7Dcatch(e)%7Blocation.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);%7D%7D)();";

    // 1秒後に選択を消す
    //setTimeout(function() {
    //    c.removeAllRanges();
    //}, 2000);

};

// テスト用
GpButtonApp.prototype.test = function() {
    alert("hello! world!");
}

// 挨拶ボタン
GpButtonApp.prototype.aisatsu = function(_t, _postdata, _post, _elm) {

    var text = _postdata[2];

    // 繰り返す
    var flag = 0;
    for(var i = 0; i < this.aisatsustr.length; i++) {

        //脆弱性対策
        try {
            if(this.aisatsustr[i][1].indexOf("/") != 0 || this.aisatsustr[i][1].indexOf("alert") != -1 || this.aisatsustr[i][1].indexOf("localStorage") != -1 || this.aisatsustr[i][1].indexOf("window") != -1 || this.aisatsustr[i][1].indexOf("document") != -1)
                throw new Error();
        }
        catch (_error) {
            continue;
        }

        // _textに含まれていた場合
        try {
            if(eval(this.aisatsustr[i][1]).test(text)) {
                autopost(_elm, this.aisatsustr[i][2], 0);
                flag = 1;
                break;
            }
        }
        catch (_error) {
        }

        if(flag)
            break;
    }
    if(flag == 0)
        alert("挨拶するメッセージが見つかりませんでした");

}

// 挨拶ボタン用オブジェクト
GpButtonApp.prototype.aisatsustr = "";

// =======================================================================================================================
// 各要素の取得
// =======================================================================================================================
function GpElements() {
}

// content要素の取得
GpElements.prototype.content = document.getElementById("content");

// ContentPane要素の取得
GpElements.prototype.contentpane = document.getElementById("contentPane");

// ストリームの取得
GpElements.prototype.stream = function() {

    //ストリーム
    try {
        var elm = this.contentpane.firstChild.childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //ストリーム
    try {
        var elm = this.contentpane.firstChild.firstChild.childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //ストリーム
    try {
        var elm = this.contentpane.childNodes[1].firstChild.childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //ストリーム
    try {
        var elm = this.contentpane.childNodes[2].firstChild.childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //サークル
    try {
        var elm = this.contentpane.firstChild.firstChild.childNodes[2].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //プロフィール
    try {
        var elm = this.contentpane.firstChild.firstChild.childNodes[5].childNodes[4].childNodes[1].childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //
    try {
        var elm = this.contentpane.firstChild.firstChild.firstChild.childNodes[5].childNodes[5].childNodes[1].childNodes[2].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //プロフィール
    try {
        var elm = this.contentpane.childNodes[1].firstChild.firstChild.childNodes[5].childNodes[5].childNodes[1].childNodes[2].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //パーマリンク
    try {
        var elm = this.contentpane.firstChild.firstChild;
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //DownloadHelperと競合(Stream)
    try {
        var elm = this.contentpane.childNodes[1].childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //DownloadHelperと競合(Circle)
    try {
        var elm = this.contentpane.childNodes[1].firstChild.childNodes[2].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //DownloadHelperと競合(検索)
    try {
        var elm = contentPane.childNodes[1].firstChild.childNodes[2].childNodes[2].childNodes[2].childNodes[3].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    
    //DownloadHelperと競合(検索)
    try {
        var elm = contentPane.childNodes[1].firstChild.childNodes[2].childNodes[2].childNodes[2].childNodes[4].childNodes[1];
        if(elm != undefined)
            return elm;
    }
    catch (_error) {
    }
    return undefined;
}

// 右カラムの要素を取得
GpElements.prototype.rcolumn = function() {
    try {
        return this.contentpane.nextSibling;
    }
    catch (_error) {
    }
}

// 左カラムの要素を取得
GpElements.prototype.lcolumn = function() {
    try {
        return this.content.firstChild.firstChild;
    }
    catch (_error) {
    }
}

// ポスト投稿の要素を取得
GpElements.prototype.sharebox = function() {
    try {
        return this.contentpane.firstChild.childNodes[1].firstChild.childNodes[6].firstChild.firstChild.firstChild.firstChild;
    }
    catch (_error) {
    }
    
    try {
        return this.contentpane.firstChild.firstChild.childNodes[1].firstChild.childNodes[6].firstChild.firstChild.firstChild.firstChild;
    }
    catch (_error) {
    }
    return undefined;

}

// 共有ボタンのエレメントを取得
GpElements.prototype.sharebutton = function() {
    try {
        return this.contentpane.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild;
    }
    catch (_error) {
    }
    
    try {
        return this.contentpane.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild;
    }
    catch (_error) {
    }
    return undefined;
}

// 再共有ボタンのエレメントを取得
GpElements.prototype.resharebutton = function(_elm) {
    try {
        var b = _elm.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName("div");
        for(var i = 0; i < b.length; i++) {
            try {
                if(b[i].getAttribute("role") == "button") {
                    return b[i];
                }
            }
            catch (_error) {
            }
        }

        throw new Error();
    }
    catch (_error) {
        return undefined;
    }
}

// 編集ボタンの保存ボタンのエレメントを取得する _elmは編集のエレメント
GpElements.prototype.editbutton = function(_elm) {
    try {
        return _elm.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild;
    }
    catch (_error) {
        return undefined;
    }
}

// コメント投稿ボタンのエレメントを取得する _elmは入力画面のエレメント
GpElements.prototype.commentbutton = function(_elm) {
    try {
        return _elm.parentNode.parentNode.nextSibling;
    }
    catch (_error) {
        return undefined;
    }
}

// 個別のポストの処理を行うオブジェクトを生成
GpElements.prototype.post = function() {
    try {
        // postの処理を行うオブジェクトを返す
        return new _ElementPost();
    }
    catch (_error) {
        return undefined;
    }

}

// 通知の操作を行うオブジェクトを生成
GpElements.prototype.notify = function() {
    try {
        // _ElementNotifyオブジェクトを作成
        return new _ElementNotify();
    }
    catch (_error) {
        return undefined;
    }

}

// =======================================================================================================================
// ポスト処理を行うオブジェクト
// =======================================================================================================================
function _ElementPost() {
}

// 個別ポストに対する処理を行うオブジェクト
_ElementPost.prototype.post = function(_elm) {
    return new _SingleElementPost(_elm);
}

// 指定したエレメントのポストエレメントのポスト処理を行うオブジェクトを生成する
_ElementPost.prototype.elm = function(_elm) {
    var elm = _elm;

    while(1) {
        // 親のエレメントを取得する
        try {
            elm = elm.parentNode;
        }
        catch (_error) {
            return 0;
        }

        try {
            // ポストエレメントが見つかった
            if(elm.id.indexOf("update-") == 0) {
                return new _SingleElementPost(elm);
            }
        }
        catch (_error) {
        }

    }
}

// +1リストから指定した項目を全て除外する
_ElementPost.prototype.plusoneremove = function(_postlist, _reg) {
    try {
        var li = _postlist.childNodes;
        for(var i = 0; i < li.length; i++) {
            try {
                var pp = this.post(li[i]);
                pp.plusoneremove(_reg);
            }
            catch (_error) {
            }

        }
    }
    catch (_error) {
    }

}

// =======================================================================================================================
// 個別ポストエレメントオブジェクト _elmには個別ポストの要素を渡す
// =======================================================================================================================
function _SingleElementPost(_elm) {
    this.element = _elm;
}

// 指定した個別ポストの+1エレメントを削除
_SingleElementPost.prototype.plusoneremove = function(_reg) {
    try {
        var plusone = this.plusone();
        var pl = plusone.childNodes;
        for(var ii = 0; ii < pl.length; ii++) {

            // 正規表現であるかどうか調べる
            if(_reg.test(pl[ii].innerHTML)) {

                // 要素を削除する
                plusone.removeChild(pl[ii]);
                plusone.removeChild(pl[ii]);
                break;
            }
        }
    }
    catch (_error) {
    }

}

// フルサイズ画像URLの取得
_SingleElementPost.prototype.image = function() {

    try {
        var a = this.element.getElementsByTagName("img");
        // img要素の取得
        var b = a.length;

        if(b == 0)
            return [[""], [""]];

        // フルサイズ画像URLの取得：変数の初期化
        var c = 0;
        var imageurl = new Array();
        var imageurl_d = new Array();
        imageurl[0] = "";
        imageurl_d[0] = "";
        for(var e = 0; e < b; e++) {

            // フルサイズ画像URLの取得：URLの取得
            if(a[e].src.match(/https:\/\/lh\d*\.googleusercontent.com\/.*\/.*\/.*\/.*\/.*\/.*[^photo.jpg]/)) {
                imageurl[c] = a[e].src;
                imageurl_d[c] = imageurl[c].replace(/\/h\d*\//, "/s0-d/");
                imageurl_d[c] = imageurl_d[c].replace(/\/w\d*\//, "/s0-d/");
                imageurl_d[c] = imageurl_d[c].replace(/\/w\d*-h\d*-p\//, "/s0-d/");
                imageurl[c] = imageurl[c].replace(/\/h\d*\//, "/s0/");
                imageurl[c] = imageurl[c].replace(/\/w\d*\//, "/s0/");
                imageurl[c] = imageurl[c].replace(/\/w\d*-h\d*-p\//, "/s0/");
                c++;
            }
        }
        return [imageurl, imageurl_d];
    }
    catch (_error) {
        return [[""], [""]];
    }
    return [[""], [""]];
}

// 個別ポストの本文を取得
_SingleElementPost.prototype.body = function() {
    try {
        body = this.element.firstChild.childNodes[1].firstChild.firstChild.firstChild.innerHTML;
        body = body.replace(/<br>/g, "\n");
        body = body.replace(/(<wbr>|<a href="|" class=".*">|<\/a>|<b>|<\/b>|<i>|<\/i>|<span class=".*">編集<\/span>|<a class="ot-hashtag" href=".*">)/g, "");
        return body;
    }
    catch (_error) {
        return "";
    }
}

// 投稿者名を取得
_SingleElementPost.prototype.auther = function() {
    try {
        var li = this.element.getElementsByTagName("a");
        return li[1].innerHTML;
    }
    catch (_error) {
        return "";
    }
}

// 個別ポストのパーマリンクを取得
_SingleElementPost.prototype.permalink = function() {
    try {
        var li = this.element.getElementsByTagName("a");
        for(var i = 0; i < li.length; i++) {
            try {
                if(li[i].href.indexOf("/posts/") != -1) {
                    return li[i].href;
                }
            }
            catch (_error) {
            }

        }
        return "";
    }
    catch (_error) {
        return "";
    }
}

// 個別ポストのUSERIDを取得
_SingleElementPost.prototype.userid = function() {
    try {
        var li = this.element.getElementsByTagName("a");
        for(var i = 0; i < li.length; i++) {
            try {
                if(li[i].getAttribute("oid")) {
                    return li[i].getAttribute("oid");
                }
            }
            catch (_error) {
            }
        }
    }
    catch (_error) {
        return "";
    }
}

// 投稿時間を取得
_SingleElementPost.prototype.time = function() {
    try {
        var li = this.element.getElementsByTagName("a");
        for(var i = 0; i < li.length; i++) {
            try {
                if(li[i].href.indexOf("/posts/") != -1) {
                    return li[i].title;
                }
            }
            catch (_error) {
            }

        }
        return "";
    }
    catch (_error) {
        return "";
    }
}

// 個別ポストの+1リストの取得
_SingleElementPost.prototype.plusone = function() {
    try {
        var elm = this.element.firstChild.childNodes[1].childNodes[1];
        try {
            //+1ボタンが存在するエレメントである場合実行
            if(elm.firstChild.id.indexOf("po-" == 0)) {
                return this.element.firstChild.childNodes[1].childNodes[1];
            }
        }
        catch (_error) {
        }
        throw new Error();
    }
    catch (_error) {
        return null;
    }
}

// 個別ポストからコメント+1リストを取得するメソッドを追加する
_SingleElementPost.prototype._commentplusone = _commentplusone;

// 指定したポストのコメント一覧を取得
_SingleElementPost.prototype.comment = function() {
    try {
        return this.element.firstChild.childNodes[2].childNodes[1].childNodes[1];
    }
    catch (_error) {
        return null;
    }
}

// =======================================================================================================================
// 通知エレメントオブジェクト
// =======================================================================================================================
function _ElementNotify() {
}

// 個別の通知ポストを処理するオブジェクトを生成する _elmは個別のエレメント
_ElementNotify.prototype.notify = function(_elm) {
    return new _SingleElementNotify(_elm);
}

// エレメントを取得
_ElementNotify.prototype._notifyelement = function() {
    try {
        return document.getElementById("gbsf").contentDocument;
    }
    catch (_error) {
    }

}

// 通知のwidgetエレメントの取得
_ElementNotify.prototype.widget = function() {
    try {
        return this._notifyelement().getElementById("widget");
    }
    catch (_error) {
        return null;
    }
}

// 通知のポスト一覧の要素
_ElementNotify.prototype.postlist = function() {
    try {
        return this.widget().childNodes[1].childNodes[2];
    }
    catch (_error) {
        return null;
    }
}

// 通知コメントリストの取得(ajax) _elmはajaxの個別ポストの要素
// document.getElementById("gbsf").contentDocument.getElementById("widget").childNodes[1].childNodes[2].childNodes[0]
_ElementNotify.prototype.comment = function(_elm) {
    try {
        return _elm.firstChild.childNodes[2].childNodes[1].childNodes[1];
    }
    catch (_error) {
        return null;
    }
}

// =======================================================================================================================
// 個別通知処理オブジェクト _elmは個別エレメント要素
// =======================================================================================================================
function _SingleElementNotify(_elm) {
    try {
        this.element = _elm;
    }
    catch (_error) {
        this.element = 0;
    }

}

// 通知コメントリストの取得(全体) _elmは個別ポストの要素
// document.getElementById("gbsf").contentDocument.getElementById("widget").childNodes[1].childNodes[2].childNodes[0]
_SingleElementNotify.prototype.comment = function() {
    try {
        return this.element.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.firstChild.firstChild.childNodes[2].childNodes[1].childNodes[1];
    }
    catch (_error) {
        return null;
    }
}

//通知コメントリストの+1リストを取得
_SingleElementNotify.prototype.plusone = function() {
    try {
        return this.element.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.firstChild.firstChild.childNodes[1].childNodes[1];
    }
    catch (_error) {
        return null;
    }
}

// コメント+1リストを取得するメソッドを追加する
_SingleElementNotify.prototype._commentplusone = _commentplusone;

// =======================================================================================================================
// 共通メソッド用
// =======================================================================================================================

// コメントのマウスオーバー要素を取得 _elm = 各コメント要素
function _commentplusone() {
    try {
        var elm = this.element.getElementsByTagName("button");
        for(var i = 0; i < elm.length; i++) {
            try {
                if(elm[i].id.indexOf("po-") == 0) {
                    return elm[i].parentNode;
                }
            }
            catch (_error) {
            }
        }

        return null;
    }
    catch (_error) {
        return null;
    }
}

// =======================================================================================================================
// エレメントが何であるか調べる
// =======================================================================================================================
function ElmChecker() {
}

// Editorであるか調べる
ElmChecker.prototype.editor = function(_elm) {
    try {
        if(_elm.id.indexOf(".f") != -1)
            return true;
        else
            throw new Error();
    }
    catch (_error) {
        return false;
    }

}

// ポストであるか調べる
ElmChecker.prototype.post = function(_elm) {
    try {
        if(/update-.+/.test(_elm.id) && _elm.id.indexOf("#") == -1)
            return true;
        else
            throw new Error();
    }
    catch (_error) {
        return false;
    }

}

// コメントであるか調べる
ElmChecker.prototype.comment = function(_elm) {
    try {
        if(/z.+#\d+/.test(_elm.id))
            return true;
        else
            throw new Error();
    }
    catch (_error) {
        return false;
    }
}

// 時刻データであるか調べる
ElmChecker.prototype.time = function(_elm) {
    try {
        if(_elm.tagName == "A" && /\/posts\//.test(_elm.href))
            return true;
        else
            throw new Error();
    }
    catch (_error) {
        return false;
    }
}

// =======================================================================================================================
// ボタンを挿入する
// =======================================================================================================================
function ButtonInsert(_ge, _ga, _buttonlist, _settings) {

    // エレメントを操作するためのオブジェクト
    this.ge = _ge;

    // アプリケーションオブジェクト
    this.ga = _ga;

    // ボタンリスト
    this.buttonlist = _buttonlist;

    this.se = _settings;

    var flag = 0;
    // ボタンを追加する
    for(var i = 0; i < this.buttonlist.length; i++) {

        var data = this.buttonlist[i];

        // ボタンが表示されるかどうかのフラグ
        if(data[1]) {

            // 表示言語の選択
            if(language == "ja") {
                var text = data[0][0][0];
                var desc = data[0][0][1];
            }
            else {
                var text = data[0][1][0];
                var desc = data[0][1][1];
            }

            // 画像がなかった場合リンクにする
            if(data[2][0] == "") {

                // セパレータを挿入する
                this.buttonelm.appendChild(this.separator.cloneNode(true));

                // ボタンを挿入する
                this.buttonelm.innerHTML += "<a class=\"Gpeb" + i + "\"><span>" + text + "</span></a>";

                // 画像なし表示専用ボタン
                // ボタンを挿入する
                if(data[3] != 1) {
                    this.buttonelmnoimg.appendChild(this.separator.cloneNode(true));
                    this.buttonelmnoimg.innerHTML += "<a class=\"Gpeb" + i + "\"><span>" + text + "</span></a>";

                }
            }
            // 画像の場合
            else {

                // ボタンを挿入する
                this.buttonelm.innerHTML += "<a class=\"Gpeb" + i + "\"><img src=\"" + chrome.extension.getURL("button/" + data[2][0]) + "\" title=\"" + desc + "\" style=\"padding-left:2px;margin-top:0px;cursor: pointer;display: inline;overflow: hidden;vertical-align: top;\" /></a>";
                if(this.se[6]) {
                    this.flagbutton = true;
                }

                // 画像なし表示専用ボタン
                // ボタンを挿入する
                if(data[3] != 1)
                    this.buttonelmnoimg.innerHTML += "<a class=\"Gpeb" + i + "\"><img src=\"" + chrome.extension.getURL("button/" + data[2][0]) + "\" title=\"" + desc + "\" style=\"padding-left:2px;margin-top:0px;cursor: pointer;display: inline;overflow: hidden;vertical-align: top;\" /></a>";
                if(this.se[6]) {
                    this.flagbuttonnoimg = true;
                }
            }
        }
        flag = 1;
    }

    // ボタンを作成する

}

// SeparatorElementの作成
ButtonInsert.prototype.separator = document.createElement("span");
ButtonInsert.prototype.separator.innerHTML = '&nbsp;&nbsp;-&nbsp;&nbsp;';

// ButtonElementの作成(画像なし)
ButtonInsert.prototype.buttonelmnoimg = document.createElement("span");
ButtonInsert.prototype.buttonelmnoimg.className = "GooglePlusExtremeButton";
ButtonInsert.prototype.buttonelmnoimg.innerHTML += '';

// ButtonElementの作成(画像あり)
ButtonInsert.prototype.buttonelm = document.createElement("span");
ButtonInsert.prototype.buttonelm.className = "GooglePlusExtremeButton";
ButtonInsert.prototype.buttonelm.innerHTML += '';

// CommentButtonElementの作成
ButtonInsert.prototype.commentelm = document.createElement("span");
ButtonInsert.prototype.commentelm.className = "GpebReply";
ButtonInsert.prototype.commentelm.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;';
if(language == "ja")
    ButtonInsert.prototype.commentelm.innerHTML += "<a>返信</a>";
else
    ButtonInsert.prototype.commentelm.innerHTML += "<a>Reply</a>";

// ストリーム上の全てのポストに新たな要素を追加する
ButtonInsert.prototype.all = function(_elm) {
    try {
        var elm = _elm.childNodes;
        for(var i = 0; i < elm.length; i++) {

            // classNameに GooglePlusExtremeButton が含まれていたら追加しない
            var pl = this.ge.post().post(elm[i]).plusone();
            try {
                var pe = pl.getElementsByTagName("span");

                var flag = 0;
                for(var ii = 0; ii < pe.length; ii++) {
                    try {
                        if(pe[ii].className == "GooglePlusExtremeButton") {
                            flag = 1;
                            break;
                        }
                    }
                    catch (_error) {
                    }

                }
                if(flag == 0) {
                    try {
                        this.post(elm[i]);
                    }
                    catch (_error) {
                    }
                }
            }
            catch (_error) {
            }

            if(this.se[1]) {
                //ポストコメントへ返信の追加
                try {
                    var comment = this.ge.post().post(elm[i]).comment().childNodes;
                    for(var iii = 0; iii < comment.length; iii++) {
                        // 一つ一つのコメントに追加する
                        var spanlist = comment[iii].getElementsByTagName("span");
                        var flag = 0;
                        for(var iiii = 0; iiii < spanlist.length; iiii++) {
                            try {

                                if(spanlist[iiii].className == "GpebReply") {
                                    flag = 1;
                                    break;
                                }
                            }
                            catch (_error) {
                            }

                        }
                        if(flag) {
                            break;
                        }
                        this.postcomment(comment[iii]);
                    }

                }
                catch (_error) {
                }
            }

        }
    }
    catch (_error) {
    }

}

// 指定したポストに新たな要素を追加し、イベントを登録する
ButtonInsert.prototype.post = function(_elm) {

    //個別ポストを操作するためのオブジェクトを生成
    var pp = this.ge.post().post(_elm);

    //+1リストを取得する
    var plusone = pp.plusone();
    
    if (!plusone)
        return;

    //すでに追加されてあるか調べる
    try {
        var pl = plusone.getElementsByTagName("span");
        for(var i = 0; i < pl.length; i++) {
            if(pl[i].className == "GooglePlusExtremeButton")
                return;
        };
    }
    catch (_error) {
    }

    //改行しないようにする
    plusone.style.whiteSpace = "nowrap";

    //plusone span list.
    var li = plusone.getElementsByTagName("span");

    //返信ボタンの追加
    if(this.se[0]) {
        try {
            plusone.insertBefore(this.commentelm.cloneNode(true), plusone.firstChild.nextSibling.nextSibling.nextSibling);
            for(var i = 0; i < li.length; i++) {
                try {
                    if(li[i].className == "GpebReply") {
                        //イベント登録
                        (function(_ge) {
                            li[i].addEventListener("click", function(_event) {
                                autopost(_event.target, "", 2, _ge);
                            }, false);

                        })(this.ge);
                        break;
                    }
                }
                catch (_error) {
                }
            }
        }
        catch (_error) {
        }
    }

    try {
        // エレメントの追加
        if(pp.image()[0] == "") {
            plusone.insertBefore(this.buttonelmnoimg.cloneNode(true), plusone.firstChild.nextSibling);
            if(this.flagbuttonnoimg) {
                plusone.insertBefore(this.separator.cloneNode(true), plusone.firstChild.nextSibling);
            }
        }
        else {
            plusone.insertBefore(this.buttonelm.cloneNode(true), plusone.firstChild.nextSibling);
            if(this.flagbutton) {
                plusone.insertBefore(this.separator.cloneNode(true), plusone.firstChild.nextSibling);
            }
        }
    }
    catch (_error) {
    }

    try {

        // イベントの追加
        for(var i = 0; i < li.length; i++) {
            try {
                if(li[i].className == "GooglePlusExtremeButton") {
                    // エレメントが見つかった
                    var gp = li[i].getElementsByTagName("a");
                    for(var ii = 0; ii < gp.length; ii++) {
                        for(var iii = 0; iii < this.buttonlist.length; iii++) {
                            try {
                                if(gp[ii].className == "Gpeb" + iii) {
                                    var data = this.buttonlist[iii];
                                    try {
                                        // アプリケーション名が入力されていた場合
                                        if(data[4][0]) {
                                            // イベントの登録
                                            (function(_elm, _t, _appname) {
                                                _elm.addEventListener("click", function(_event) {
                                                    var elm = _event.target;
                                                    var post = _t.ge.post().elm(_elm);
                                                    var image = post.image();
                                                    var postdata = [post.userid(), post.auther(), post.body(), post.permalink(), post.time(), image[0], image[1]];
                                                    eval("_t.ga." + _appname + "(_t, postdata, post.element, elm);");
                                                }, false);

                                            })(gp[ii], this, data[4][0]);

                                        }
                                        //自動投稿ボタンが入力されていた場合
                                        else if(data[4][1]) {
                                            //イベントの登録
                                            (function(_elm, _text) {
                                                _elm.addEventListener("click", function(_event) {
                                                    autopost(_event.target, _text, 0);
                                                }, false);

                                            })(gp[ii], data[4][1]);
                                        }
                                        // URLが入力されていた場合
                                        else if(data[4][2][0]) {
                                            // イベントの登録
                                            (function(_elm, _t, _url, _x, _y) {
                                                _elm.addEventListener("click", function(_event) {
                                                    var elm = _event.target;
                                                    var post = _t.ge.post().elm(_elm);
                                                    url = _url.replace("<URL>", encodeURIComponent(post.permalink()));
                                                    url = url.replace("<BODY>", encodeURIComponent(post.body()));
                                                    url = url.replace("<NAME>", encodeURIComponent(post.auther()));
                                                    url = url.replace("<USERID>", encodeURIComponent(post.userid()));
                                                    url = url.replace("<TIME>", encodeURIComponent(post.time()));
                                                    var image = post.image();
                                                    url = url.replace("<IMG>", encodeURIComponent(image[0][0]));
                                                    post.time().match(/(^.*)[ ]/);
                                                    url = url.replace("<TIME2>", encodeURIComponent(RegExp.$1));
                                                    post.permalink().match(/https:\/\/plus\.google\.com(\/u\/\d+)?\/\d+\/posts\/(.+)/);
                                                    url = url.replace("<ACTIVITY>", RegExp.$2);
                                                    if(_x != 0 || _y != 0)
                                                        window.open(url, "_blank", "width=" + _x + ",height=" + _y + ",scrollbars=yes");
                                                    else
                                                        window.open(url, '_blank', '');

                                                }, false);

                                            })(gp[ii], this, data[4][2][0], data[4][2][1], data[4][2][2]);
                                        }
                                    }
                                    catch (_error) {
                                    }
                                }
                            }
                            catch (_error) {
                            }
                        }
                    }
                    break;
                }

            }
            catch (_error) {
            }
        }

    }
    catch (_error) {
    }

}

//指定した通知ポストにボタンを追加する
ButtonInsert.prototype.notify = function(_elm) {

    //notify個別操作オブジェクト生成
    var nt = this.ge.notify().notify(_elm);

    //plusone取得
    var plusone = nt.plusone();

    //見つからない場合飛ばす
    if(plusone == null)
        return;

    //すでに追加されてあるか調べる
    try {
        var pl = plusone.getElementsByTagName("span");
        for(var i = 0; i < pl.length; i++) {
            if(pl[i].className == "GpebReply")
                return;
        };
    }
    catch (_error) {
    }

    if(this.se[0]) {
        //ポストに返信ボタンの追加
        try {
            plusone.insertBefore(this.commentelm.cloneNode(true), plusone.firstChild.nextSibling.nextSibling.nextSibling);
            var li = plusone.getElementsByTagName("span");
            for(var i = 0; i < li.length; i++) {
                try {
                    if(li[i].className == "GpebReply") {
                        //イベント登録
                        (function(_ge) {
                            li[i].addEventListener("click", function(_event) {
                                autopost(_event.target, "", 2, _ge);
                            }, false);

                        })(this.ge);
                        break;
                    }
                }
                catch (_error) {
                }
            }
        }
        catch (_error) {
        }
    }

}

// 指定したコメント欄に要素を追加する _elm = 各コメント要素
ButtonInsert.prototype.notifycomment = function(_elm) {
    var t = this;
    // ボタンの挿入
    (function() {
        var count = 0;
        var tid = setInterval(function() {
            
            var mouseover = t.ge.notify().notify(_elm)._commentplusone();
            if(!mouseover)
                return false;

            // すでにあった場合スルーする
            var bl = mouseover.getElementsByTagName("span");
            if(bl.length || count == 10) {
                clearInterval(tid);
                try {
                    for(var i = 0; i < bl.length; i++) {
                        try {
                            if(bl[i].className == "GpebReply") {
                                return;
                            }
                        }
                        catch (_error) {
                        }
                    }

                    //通知に返信の追加
                    if(t.se[1]) {
                        mouseover.appendChild(t.commentelm.cloneNode(true));
                        var bl = mouseover.getElementsByTagName("span");
                        for(var i = 0; i < bl.length; i++) {
                            try {
                                if(bl[i].className == "GpebReply") {
                                    bl[i].addEventListener("click", function(_event) {
                                        autopost(mouseover.firstChild, "", 1);
                                    }, false);

                                    break;
                                }
                            }
                            catch (_error) {
                            }
                        }
                    }
                    return true;
                }
                catch (_error) {
                    return false;
                }
            }
            count++;
        }, 10);

    })();
}

// 指定したコメント欄に要素を追加する _elm = 各コメント要素
ButtonInsert.prototype.postcomment = function(_elm) {

    try {
        var mouseover = this.ge.post().post(_elm)._commentplusone();
        if(!mouseover)
            return false;

        if(this.se[1]) {
            mouseover.appendChild(this.commentelm.cloneNode(true));
            var bl = mouseover.getElementsByTagName("span");
            for(var i = 0; i < bl.length; i++) {
                try {
                    if(bl[i].className == "GpebReply") {
                        bl[i].addEventListener("click", function(_event) {
                            autopost(mouseover.firstChild, "", 1);
                        }, false);

                        break;
                    }
                }
                catch (_error) {
                }
            };
        }

        return true;
    }
    catch (_error) {
        return false;
    }
}

//=======================================================================================================================
// アクティブフラグ
//=======================================================================================================================
function GpActive() {
}

GpActive.prototype.active = true;

// =======================================================================================================================
// Google+のイベント動作
// =======================================================================================================================
function GpEvent(_ge, _ec, _bi, _settings) {
    this.ge = _ge;
    this.ec = _ec;
    this.bi = _bi;
    this.se = _settings;

};

GpEvent.prototype.elmflag = 0;
GpEvent.prototype.notifyelmflag = 0;
GpEvent.prototype.notifyelmflag2 = 0;

// DOMが挿入されたときに実行
GpEvent.prototype.dom = function(_active) {
    // DOMの更新チェック
    var t = this;
    var nt = t.ge.notify();
    var po = t.ge.post();
    var contentpane = this.ge.contentpane;
    document.addEventListener("DOMNodeInserted", function(_event) {

        // 要素を取得
        var elm = _event.target;
       
        
        // コメントか確認する
        if(t.ec.comment(elm)) {(function() {
            
                var count = 0;

                var tid = setInterval(function() {
                    
                    if (count == 1000)
                        return;
                    
                    // 一個しか見つからないためこのままで良い
                    if(t.bi.postcomment(elm)) {
                        clearInterval(tid);
                    }
                    count++;
                }, 100);

            })();

        }

        // ポストか確認する
        if(t.ec.time(elm)) {

            //postエレメントに変換
            var post = po.elm(elm).element;

            // ポストに要素を追加
            t.bi.post(post);

            // エレメント削除
            if(t.se[2]) {
                t.ge.post().post(post).plusoneremove(/ハングアウト|Hang[ ]out|hangout/);
            }

            //古いポストを自動的に非表示にする
            try {
                if(t.se[5]) {
                    //スクロールサイズの取得
                    var scsize = document.documentElement.scrollTop || document.body.scrollTop;
                    if(scsize <= 100 || _active.active == false) {

                        //ポストリストの取得
                        var gs = t.ge.stream()
                        var pl = gs.childNodes;

                        while(1) {
                            if(pl.length > 50) {
                                //最後のエレメントを削除
                                gs.removeChild(gs.lastChild);
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
            catch (_error) {
            }
        }

        // 通知のエレメントが取得された場合実行

        if(nt.widget()) {

            if(notifyelmflag == 0) {
                notifyelmflag = 1
                var elm = nt.widget();

                // 通知イベントの登録
                elm.addEventListener("DOMNodeInserted", function(_event) {

                    // 初回以外実行
                    if(notifyelmflag2 == 1) {
                        // 通知の要素
                        var elm = _event.target;

                        // ポストの取得
                        if(t.ec.post(elm)) {
                            // 実行
                            (function(_elm) {
                                var count = 0;
                                var tid = setInterval(function() {
                                    
                                    if (count == 1000)
                                        return;

                                    //全ての通知にボタンを追加
                                    try {

                                        t.bi.notify(li[i]);
                                    }
                                    catch (_error) {
                                    }

                                    if(t.se[1]) {
                                        //コメント欄に返信ボタンを追加
                                        try {
                                            var ci = nt.comment(_elm).childNodes;
                                            var ce = ci.length;
                                            for(var i = 0; i < ce; i++) {
                                                try {
                                                    t.bi.notifycomment(ci[i]);
                                                }
                                                catch (_error) {
                                                }
                                            }
                                            clearInterval(tid);
                                        }
                                        catch (_error) {
                                        }
                                    }
                                    count++;

                                }, 100);

                            })(elm);
                        }

                    }

                    // 通知コメントの取得
                    if(t.ec.comment(elm)) {(function() {
                            var count = 0;
                            var tid = setInterval(function() {
                                if (count == 1000)
                                    return;
                                if(t.bi.notifycomment(elm)) {
                                    clearInterval(tid);
                                }
                                count++;
                            }, 100)

                        })();
                    }

                    // 通知初回実行
                    if(notifyelmflag2 == 0) {
                        notifyelmflag2 = 1;

                        // 読み込み
                        (function() {
                            var count = 0;
                            var tid = setInterval(function() {
                                
                                if (count == 1000)
                                    return;
                                
                                // 通知ポストリストの取得
                                try {
                                    var li = nt.postlist().childNodes;
                                    try {
                                        for(var i = 0; i < li.length; i++) {

                                            //全ての通知にボタンを追加
                                            t.bi.notify(li[i]);

                                            //コメントリストの取得
                                            try {
                                                var ci = nt.notify(li[i]).comment().childNodes;
                                                var ce = ci.length;
                                                for(var j = 0; j < ce; j++) {
                                                    t.bi.notifycomment(ci[j]);
                                                }
                                            }
                                            catch (_error) {
                                            }
                                        }
                                    }
                                    catch (_error) {
                                    }
                                    clearInterval(tid);
                                }
                                catch (_error) {
                                }
                                count++;

                            }, 100);

                        })();
                    }

                }, false);

            }

        }
        else {
            // エレメントが無効になった場合フラグをリセットする
            notifyelmflag = 0;
            notifyelmflag2 = 0;
        }

        // ストリーム初回起動
        if(t.elmflag == 0) {
            t.elmflag = 1;

            // ストリームポスト一覧の取得
            var li = t.ge.stream();

            // ボタンの挿入
            t.bi.all(li);

            // エレメント削除
            if(t.se[2]) {
                po.plusoneremove(li, /ハングアウト|Hang[ ]out|hangout/);
            }

        }

    }, false);

}

// キーが入力されたときに実行
GpEvent.prototype.key = function() {
    // キーイベントの処理
    var t = this;
    document.addEventListener("keydown", function(_event) {

        // 要素の取得
        var elm = _event.target;

        // キーコード取得
        var key = _event.keyCode;
        var shiftkey = _event.shiftKey;
        var ctrlkey = _event.ctrlKey;
        var cmdkey = _event.metaKey;

        // エディタか調べる
        if(t.ec.editor(elm)) {

            // 投稿画面の場合
            if(elm == t.ge.sharebox()) {
                // 投稿画面のエディターでTABキーが押された
                if(key == 9) {

                    // 投稿ボタンをフォーカスにする
                    setTimeout(function() {

                        if(t.se[4]) {
                            try {
                                t.ge.sharebutton().focus();
                            }
                            catch (_error) {
                            }
                        }

                    }, 1);

                }
                //投稿画面のエディターでShift+Enterが押された
                else if(key == 13) {
                    if(shiftkey || cmdkey || ctrlkey) {
                        // Shift+Enterによる投稿
                        if(t.se[3]) {
                            click(t.ge.sharebutton());
                            setTimeout(function() {
                                click(t.ge.sharebutton());
                            }, 10);

                        }
                    }
                }
            }
            else {
                // ポストと共有ボタン以外(コメント欄エディタ、編集画面エディタ、再共有画面エディタ)
                //Enterキー
                if(key == 13) {
                    //ShiftKey Cmdkey
                    if(shiftkey || cmdkey || ctrlkey) {
                        try {

                            if(t.se[3]) {

                                // コメント欄をShift+Enterで投稿する
                                try {
                                    click(t.ge.commentbutton(elm));
                                }
                                catch (_error) {
                                }

                                //再共有の保存ボタンのエレメントを取得する
                                try {
                                    click(t.ge.resharebutton(elm));
                                }
                                catch (_error) {
                                }

                                //編集の保存ボタンのエレメントを取得する
                                try {
                                    click(t.ge.editbutton(elm).focus());
                                }
                                catch (_error) {
                                }
                            }
                        }
                        catch (_error) {
                        }
                    }
                }
                //TABキー
                else if(key == 9) {
                    setTimeout(function() {
                        if(t.se[4]) {
                            //再共有の保存ボタンのエレメントを取得する
                            try {
                                t.ge.resharebutton(elm).focus();
                            }
                            catch (_error) {
                            }

                            //編集の保存ボタンのエレメントを取得する
                            try {
                                t.ge.editbutton(elm).focus();
                            }
                            catch (_error) {
                            }
                        }

                    }, 1);

                }
            }
        }
        //共有ボタンでキーが押された
        else if(elm == t.ge.sharebutton()) {
            //共有ボタンでTABキーを押した
            if(key == 9) {
                if(t.se[4]) {
                    //フォーカスをエディタに戻す
                    setTimeout(function() {
                        try {
                            t.ge.sharebox().focus();
                        }
                        catch (_error) {
                        }
                    }, 1);

                }

            }
        }
    }, false);

    // 通知のキーイベント
    (function() {
        var nt = t.ge.notify();
        var count = 0;
        var tid = setInterval(function() {
            
            if (count == 1000)
                return;
            
            var widget = nt.widget();
            if(widget) {
                widget.addEventListener("keydown", function(_event) {
                    // 要素の取得
                    var elm = _event.target;
                    var key = _event.keyCode;
                    var shiftkey = _event.shiftKey;
                    var cmdkey = _event.metaKey;

                    if(key == 13) {
                        if(shiftkey || cmdkey) {
                            try {
                                // コメント欄をShift+Enterで投稿する
                                if(t.se[3]) {
                                    click(t.ge.commentbutton(elm));
                                }
                            }
                            catch (_error) {
                            }
                        }
                    }

                    //矢印キーを押された場合実行
                    if(key == 37 || key == 39) {
                        //繰り返す
                        (function() {
                            var count = 0;
                            var tid = setInterval(function() {
                                
                                if (count == 1000)
                                    return;

                                // 通知ポストリストの取得
                                try {
                                    var li = nt.postlist().childNodes;

                                    try {
                                        for(var i = 0; i < li.length; i++) {

                                            //全ての通知にボタンを追加
                                            try {
                                                t.bi.notify(li[i]);
                                            }
                                            catch (_error) {
                                            }

                                            //通知のコメントに返信を追加
                                            if(t.se[1]) {
                                                try {
                                                    var pn = nt.notify(li[i]);
                                                    var ci = pn.comment().childNodes;
                                                    var ce = ci.length;
                                                    for(var j = 0; j < ce; j++) {
                                                        t.bi.notifycomment(ci[j]);
                                                    }
                                                }
                                                catch (_error) {
                                                }
                                            }
                                        }
                                    }
                                    catch (_error) {
                                    }
                                    clearInterval(tid);
                                }
                                catch (_error) {
                                }
                                count++;

                            }, 100);

                        })();
                    };

                }, false);

                clearInterval(tid);
            }
            count++;
        }, 100);

    })();

}

// 画面をクリックされたときに実行
GpEvent.prototype.click = function() {
    // クリックイベントの処理
    t = this;
    var nt = t.ge.notify();
    var po = t.ge.post();

    document.addEventListener("click", function(_event) {
        var elm = _event.target;

        // 実行フラグ
        var flag = 0;

        // リンク
        try {
            if(elm.tagName == "A")
                flag = 1;
        }
        catch (_error) {
        }

        // ボタン
        try {
            if(elm.getAttribute("data-tooltip"))
                flag = 1;
        }
        catch (_error) {
        }

        // ボタン
        try {
            if(elm.getAttribute("aria-label"))
                flag = 1;
        }
        catch (_error) {
        }

        // [最優先]Google+ Extreme Button
        try {
            if(elm.className == "GooglePlusExtremeButton")
                flag = 0;
        }
        catch (_error) {
        }

        // [最優先]Google+ Extreme Button
        try {
            if(elm.parentNode.className == "GpebReply")
                flag = 0;
        }
        catch (_error) {
        }
        if(flag) {

            // 実行
            (function() {
                setTimeout(function() {
                    var count = 0;
                    var tid = setInterval(function() {
                        var li = t.ge.stream();
                        try {
                            if(li.firstChild) {
                                t.bi.all(li);
                                if(t.se[2]) {
                                    po.plusoneremove(li, /ハングアウト|Hang[ ]out|hangout/);
                                }
                                clearInterval(tid);
                            }
                        }
                        catch (_error) {
                            if(count == 100)
                                clearInterval(tid);
                            count++;
                        }

                    }, 100);

                }, 2000);

            })();

        }
    }, false);

    // 通知のclickイベント
    (function() {
        var nt = t.ge.notify();
        var count = 0;
        var tid = setInterval(function() {
            
            if (count == 1000)
                return;
            
            var widget = nt.widget();
            if(widget) {
                widget.addEventListener("click", function(_event) {

                    // 要素の取得
                    var elm = _event.target;

                    //繰り返す
                    (function() {
                        var count = 0;
                        var tid = setInterval(function() {
                            
                            if (count == 1000)
                                return;

                            // 通知ポストリストの取得
                            try {
                                //コメント+1に返信ボタンを追加
                                var li = nt.postlist().childNodes;
                                try {

                                    for(var i = 0; i < li.length; i++) {

                                        //全ての通知の+1リストに返信ボタンを追加
                                        if(t.se[0]) {
                                            try {
                                                t.bi.notify(li[i]);
                                            }
                                            catch (_error) {
                                            }
                                        }

                                        //コメント欄に返信ボタンを追加
                                        if(t.se[1]) {
                                            try {
                                                var pn = nt.notify(li[i]);
                                                var ci = pn.comment().childNodes;
                                                var ce = ci.length;
                                                for(var j = 0; j < ce; j++) {
                                                    t.bi.notifycomment(ci[j]);
                                                }
                                            }
                                            catch (_error) {
                                            }
                                        }
                                    }
                                }
                                catch (_error) {
                                }

                                clearInterval(tid);
                            }
                            catch (_error) {
                            }
                            count++;

                        }, 100);

                    })();

                }, false);

                clearInterval(tid);
            }
            count++;
        }, 100);

    })();

}

//ページ推移
GpEvent.prototype.page = function() {
    var t = this;
    var po = t.ge.post();

    window.addEventListener('__internalGRPEvent', function(_event) {
        var count = 0;
        var tid = setInterval(function() {
            try {

                // ストリームポスト一覧の取得
                var li = t.ge.stream();
                if(li.firstChild) {

                    // ボタンの挿入
                    t.bi.all(li);

                    // エレメント削除
                    if(t.se[2]) {
                        po.plusoneremove(li, /ハングアウト|Hang[ ]out|hangout/);
                    }

                    clearInterval(tid);
                }
            }
            catch (_error) {
                if(count == 100)
                    clearInterval(tid);
                count++;
            }
        }, 100);

    }, false);

}

//アクティブ
GpEvent.prototype.active = function(_active) {

    window.addEventListener("focus", function(_event) {
        _active.active = true;
    }, false);


    window.addEventListener("blur", function(_event) {
        _active.active = false;
    }, false);

}

// =======================================================================================================================
// main
// =======================================================================================================================
function main() {

    // ロケーションの取得
    var gl = location.href;

    // URLParser
    function gp() {
    }


    gp.r = gpurlparser(gl);
    gp.mode = gp.r[0];
    gp.func = gp.r[1];
    gp.method = gp.r[2];

    // Google+の画面のみ実行
    if(gp.mode) {

        //ローカルストレージ
        var storage = new _Storage();

        //storage.get("aa", function(_response){alert(_response);});
        //storage.set("aa", "1111111");

        //機能の読み込み
        var settings;
        storage.get("GooglePlusExtremeButton.settings", function(_response) {

            var settingsstr = _response

            //あった場合
            if(settingsstr) {

                //読み込む
                try {
                    settings = JSON.parse(settingsstr);
                }
                catch (_error) {

                    //うまく読み込めなかった場合
                    alert("Google+ Extreme Button の 設定の読み込みに失敗しました");

                    //スクリプト実行を終了する
                    return;
                }

            }
            //定義されていなかった場合
            else {
                storage.settings(function(_response) {
                    settings = _response;
                    storage.set("GooglePlusExtremeButton.settings", JSON.stringify(settings));
                });

            }

        });

        //ボタンデータの読み込み
        var buttonlist;
        storage.get("GooglePlusExtremeButton.buttonlist", function(_response) {
            var buttonliststr = _response;

            //ボタンがあった場合
            if(buttonliststr) {

                //読み込む
                try {
                    buttonlist = JSON.parse(buttonliststr);
                }
                catch (_error) {

                    //うまく読み込めなかった場合
                    alert("Google+ Extreme Button の ボタンの読み込みに失敗しました");

                    //スクリプト実行を終了する
                    return;
                }

            }
            //定義されていなかった場合
            else {

                // ボタンリスト
                storage.buttonlist(function(_response) {
                    buttonlist = _response;

                    //ローカルストレージに保存する
                    storage.set("GooglePlusExtremeButton.buttonlist", JSON.stringify(buttonlist));
                });

            }

        });

        // ストリーム読み込みフラグ
        var elmflag = 0;

        // エレメントの取得
        var ge = new GpElements();

        // チェッカー
        var ec = new ElmChecker();

        // ボタンアプリケーション
        var ga = new GpButtonApp();

        //挨拶の読み込み
        storage.get("GooglePlusExtremeButton.aisatsu", function(_response) {
            var aisatsustr = _response;

            if(aisatsustr) {

                //読み込む
                try {
                    ga.aisatsustr = JSON.parse(aisatsustr);
                }
                catch (_error) {

                    //うまく読み込めなかった場合
                    alert("Google+ Extreme Button の 挨拶データの読み込みに失敗しました");

                    //スクリプト実行を終了する
                    return;
                }

            }
            //定義されていなかった場合
            else {

                storage.aisatsu(function(_response) {
                    ga.aisatsustr = _response;

                    //ローカルストレージに保存する
                    storage.set("GooglePlusExtremeButton.aisatsu", JSON.stringify(ga.aisatsustr));
                });

            }

        });

        //論理値チェック
        function checkBool(val) {
            if(val) {
                return "true";
            }
            else {
                return "false";
            }
        }

        // ボタンの挿入
        (function() {
            var count = 0;
            var tid = setInterval(function() {
                
                if (count == 1000)
                    return;
                
                if(buttonlist && ga.aisatsustr && settings) {

                    clearInterval(tid);

                    //アクティブかどうかのフラグ
                    var gac = new GpActive();

                    //ボタン追加オブジェクト
                    var bi = new ButtonInsert(ge, ga, buttonlist, settings);

                    // イベントの実行
                    var Gv = new GpEvent(ge, ec, bi, settings);

                    // DOMの読み込み実行
                    Gv.dom(gac);

                    //ページ推移イベント
                    Gv.page();

                    // キーイベント
                    Gv.key();

                    // クリックイベント
                    Gv.click();

                    //アクティブイベント
                    Gv.active(gac);

                }
                count++;
            }, 100);

        })();

    }

}

// 実行
main();
