////////////////////////////////////////////////////////////////////////////////
//
//  Google+ Extreme Button
//  
//  description: Google+ にボタンを付ける拡張
//  
//  Takehiro Takahashi(Akicansoft) nacika.inscatolare@gmail.com
//
////////////////////////////////////////////////////////////////////////////////

/* 言語取得
-------------------------------------------------------------------------------*/
    try {
        var language = document.getElementsByTagName("html")[0].innerHTML
        .match(/OZ_jsVersion[ ]=[ ]'.*\.(.*)\.';/)[1];
    }
    catch (_error) {
        var language = "en";
    }

/* デバッグモード
-------------------------------------------------------------------------------*/
var DEBUG = 0;

/* 関数群
//-------------------------------------------------------------------------------*/

    /* 自動ポストスクリプト
    -------------------------------------------------------------------------------*/
    function autopost(_element, _text, _flag, _ge, _isRecursive) {
        try {

            var elm = _element;
            for(var i = 0; i < 200; i++) {
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
                        var b = elm;
                        break;
                    }
                }
                catch (_error) {
                }

            }

            // 通常の実行
            if(_flag == 0) {
                try {
                    var a = _element.parentNode.parentNode;
                    // //////console.log("a", a);
                }
                catch (_error) {
                    console.error("Google+ Extreme Button - Error : ストリームへの返信に失敗しました");
                }
            }

            // 返信の実行
            else if(_flag == 1) {

                // //////console.log("返信を実行します");

                // 返信IDの取得
                try {
                    var reply = _element.parentNode.parentNode.parentNode.firstChild.getAttribute("oid");
                    // //////console.log("返信ID", reply);
                }
                catch (_error) {
                    // //////console.log("返信IDの取得に失敗しました");
                }

                // 返信するユーザー名の取得
                try {
                    var username = _element.parentNode.parentNode.parentNode.firstChild.innerHTML;
                    // //////console.log("ユーザーID", username);
                }
                catch (_error) {
                    // //////console.log("返信するユーザー名の取得に失敗しました");
                }

            }
            // ポストによる返信の実行
            else if(_flag == 2) {

                var post = _ge.post().elm(_element);

                // 返信IDの取得
                var reply = post.userid();

                // 返信するユーザー名の取得
                var username = post.auther();
            }

            // 全体処理
            // //////console.log("全体処理を行います");

            // コメント欄を開く
            // //////console.log("コメント欄を開いています");
            // //////console.log("b", b);
            var cl = b.firstChild.childNodes[1].childNodes[2].getElementsByTagName("div");
            for(var i = 0; i < cl.length; i++) {
                try {
                    if(cl[i].innerHTML != "Reply to Author") {
                        var comarea = cl[i];
                        break;
                    }
                }
                catch (_error) {
                    // console.error("コメント投稿欄の位置が不明です");
                }
            }
            // //////console.log("comarea", comarea);
            click(comarea);

            // 「.editor」要素があるか調べる
            // //////console.log(".editor要素", b);
            var d = b.getElementsByTagName("div");
            var e = d.length;
            var f = 0;
            for(var g = 0; g < e; g++) {
                if(d[g].id.match(/.*\.editor/)) {
                    // //////console.log("editor", d[g]);
                    f = 1;
                    break;
                }
            }

            var commentLink;

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
                            commentLink = c;
                            c.initEvent("click", true, false);
                            a.dispatchEvent(c);
                            break;
                        }
                    }
                    catch (_error) {
                    }
                }
            }

            //再帰処理
            if (_isRecursive) {
                return;
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
                                
                                //Chromeの場合
                                else {
                                    
                                    
                                    //リプライが存在していなかった場合のみ実行
                                    if (d[f].firstChild.firstChild.innerHTML.indexOf('<button tabindex="-1" oid="'+reply+'" contenteditable="false" data-token-entity="@'+reply+'" data-sbxm="1"') == -1) {
                                        
                                        //リプライボタンを挿入
                                        (function() {
                                            var a = document.createElement("button");
                                            a.setAttribute("tabindex", "-1");
                                            a.setAttribute("oid", reply);
                                            a.setAttribute("contenteditable", "false");
                                            a.setAttribute("data-token-entity", "@"+reply);
                                            a.setAttribute("data-sbxm", "1");
                                            a.setAttribute("style", 'letter-spacing: normal;box-sizing: border-box;cursor: default;text-align: center;-webkit-box-align: center;-webkit-user-modify: read-only;white-space: nowrap;background: #EEE;border: 1px solid #DDD;-webkit-border-radius: 2px;-moz-border-radius: 2px;border-radius: 2px;display: inline-block;font: normal 13px/1.4 Arial,sans-serif;margin: 0 1px;padding: 0 1px;vertical-align: baseline;color: #36C;"><span style="color: #888;');
                                            a.innerHTML = '<span style="color: #888;">+</span>'+username+"";
                                            //a.innerHTML = "+<span style=\"display:none\">" + reply + "</span><style>button#btnplus" + reply + " { white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-top-left-radius: 2px 2px; border-top-right-radius: 2px 2px; border-bottom-right-radius: 2px 2px; border-bottom-left-radius: 2px 2px; display: inline-block; font: normal normal normal 13px/1.4 Arial, sans-serif; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; } button#btnplus" + reply + ":after { content:\"" + username + "\" }</style>";
                                            d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
                                        })();
                                        
                                        d[f].firstChild.firstChild.innerHTML += "&nbsp;";
                                        
                                        click(d[f].firstChild.firstChild);
                                        

                                        //再帰処理
                                 
                                        console.log(d[f].firstChild.firstChild);
                                        d[f].firstChild.firstChild.blur();
                   
                                        //console.log(_element.parentNode.getElementsByClassName("GpebReply")[0]);
                                        //click(_element.parentNode.getElementsByClassName("GpebReply")[0].getElementsByTagName("a")[0]);
                                        autopost(_element, _text, _flag, _ge, true);




                                        
                                        
                                    }
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
                        
                       
                        
                        // powered by oov
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

    /* 自動クリックスクリプト
    -------------------------------------------------------------------------------*/
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

    /* 自動キー送信スクリプト
    -------------------------------------------------------------------------------*/
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

    /* URLパラメータ取得パーサ
    -------------------------------------------------------------------------------*/
    function gpurlparser(_url) {
        url = _url.replace("https://plus.google.com", "");
        url = url.replace(/u\/\d+\//, "");
        if(url.slice(0, 3) == "/_/") {
            mode = 0;
            page = "";
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
            mode = 1;
            func = "";
            method = "";
            page = url.slice(1, url.indexOf("/", 1));
        }
        return [mode, func, method, page];
    }

    /* ローカルストレージ関数
    -------------------------------------------------------------------------------*/
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

/* ボタンによって呼び出されるアプリケーション群
-------------------------------------------------------------------------------*/
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
        if(imgurl == "") {

            window.open("http://www.tumblr.com/share?v=3&u=" + url + "&t=Google%20Plus%20%28" + time + "%29%20&s=" + body, "_blank", "width=500,height=450,scrollbars=yes");
        }
        else {
            window.open("http://www.tumblr.com/share/photo?source=" + imgurl + "&caption=%20%3Ca%20href%3D%22" + url + "%22%3EGoogle%20Plus%20%28" + time + "%29%3C%2Fa%3E", "_blank", "width=500,height=450,scrollbars=yes");
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
        * //XMLHTTP非同期通信 var xmlhttp = new XMLHttpRequest();
        * xmlhttp.onreadystatechange = function() { if(xmlhttp.readyState == 4 &&
        * xmlhttp.status == 200) { } }
        *
        * var prm = ""; prm += "url=" + encodeURIComponent("http://test.com/")+"&";
        * prm += "body=" + encodeURIComponent("<div>a</div>")+"&"; prm +=
        * "title=" + encodeURIComponent("abc")+"&"; prm += "format=" +
        * encodeURIComponent("microclip")+"&"; prm += "quicknote=" +
        * encodeURIComponent("true")+"&";
        *
        */
        // xmlhttp.open('POST', "https://www.evernote.com/clip.action", true);
        // xmlhttp.setRequestHeader("Content-Type", "multipart/form-data;");
        // xmlhttp.setRequestHeader("Pragma", "no-cache");
        // xmlhttp.setRequestHeader("Accept",
        // "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        // xmlhttp.setRequestHeader("Accept-Language", "ja,en;q=0.8,en-US;q=0.6");
        // xmlhttp.setRequestHeader("Cache-Control", "no-cache");
        // xmlhttp.send(prm);
        // 送信テスト
        // new
        // Evernote().send("http://homepage3.nifty.com/takahashinoG/index.html/",
        // "", "神のように", "シンプルなページ");
        // return;
        // var reg_m = /gpme-.*/;
        /*
         * try { var a = _post; } catch (_error) { } // 選択範囲オブジェクト var b =
         * document.createRange(); // 両方インストールされている try {
         * if(a.firstChild.className.match(reg_m) && a.firstChild.className ==
         * "fp_buttons") { b.setStart(a.firstChild.nextSibling, 0);
         * b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling,
         * 0); } else { // G+ meがインストールされているかどうか調べる if(a.className.match(reg_m)) {
         * b.setStart(a.firstChild, 0);
         * b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling,
         * 0); } // favoがインストールされているかどうか調べる try { if(a.firstChild.className ==
         * "fp_buttons") { b.setStart(a.firstChild.nextSibling, 0);
         * b.setEnd(a.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling,
         * 0); } else { b.setStart(a.firstChild, 0);
         * b.setEnd(a.firstChild.firstChild.nextSibling.firstChild.nextSibling, 0); }
         * }
         * catch (_error) { console.error("アップデートエレメントの取得に失敗しました(error:018 - " +
         * _error + ")"); } } } catch (_error) {
         * console.error("G+meとFavoの互換性が不安定になっています"); }
         */

        var plusone = _t.ge.post().post(_post).plusone();
        plusone.style.display = "none";

        // イベント実行
        setTimeout(function() {
            //
            (function(_plusone) {
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
        // location.href =
        // "javascript:(function()%7BEN_CLIP_HOST='http://www.evernote.com';try%7Bvar%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')%5B0%5D.appendChild(x);%7Dcatch(e)%7Blocation.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);%7D%7D)();";

        // 1秒後に選択を消す
        // setTimeout(function() {
        // c.removeAllRanges();
        // }, 2000);
    };

    /* テストアプリケーション
    -------------------------------------------------------------------------------*/
    GpButtonApp.prototype.test = function() {
        alert("hello! world!");
    }

    /* ミュート機能
    -------------------------------------------------------------------------------*/
    GpButtonApp.prototype.mute = function(_t, _postdata, _post, _elm) {
        click(_post.firstChild.firstChild.firstChild);
        var li = _post.getElementsByTagName("div");
        for(var i = 0; i < li.length; i++) {
            if(li[i].getAttribute("role") == "menu") {
                if(li[i].childNodes.length == 3) {
                    click(li[i].lastChild.previousSibling.previousSibling);
                }
                else if(li[i].childNodes.length == 1) {
                    click(li[i].lastChild);
                }
                else {
                    click(li[i].lastChild.previousSibling);
                    alert("この投稿はミュートできません");
                }
                return;
            }
        }
    }

    /* 挨拶アプリケーション
    -------------------------------------------------------------------------------*/
    GpButtonApp.prototype.aisatsu = function(_t, _postdata, _post, _elm) {

        var text = _postdata[2];

        // 繰り返す
        var flag = 0;
        for(var i = 0; i < this.aisatsustr.length; i++) {

            // 脆弱性対策
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
                    return false;
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

/* 挨拶ボタン用オブジェクト
-------------------------------------------------------------------------------*/
GpButtonApp.prototype.aisatsustr = "";

/* 要素取得オブジェクト
-------------------------------------------------------------------------------*/
function GpElements() {
}

    // content要素の取得(2012/04 新UI動作確認済み)
    GpElements.prototype.content = function() {
        return document.getElementById("content");
    };

    // ContentPane要素の取得(2012/04 新UI動作確認済み)
    GpElements.prototype.contentpane = function() {
        return document.getElementById("contentPane");
    };

    // ストリームの取得(2012/04 新UI動作確認済み)
    GpElements.prototype.stream = function() {
        try {
            var el = this.contentpane().getElementsByTagName("div");
            //// //////////console.log("ストリームを取得しています");
        }
        catch (_error) {
            //// //////////console.log("ストリームの取得に失敗しました");
            return undefined;
        }

        for(var i = 0; i < el.length; i++) {
            try {
                if(el[i] != undefined && el[i].firstChild.id.indexOf("update-") == 0) {
                    //// //////////console.log(el[i]);
                    return el[i];
                }
            }
            catch (_error) {
            }
        }
        return undefined;
    }

    // 右カラムの要素を取得
    GpElements.prototype.rcolumn = function() {
        try {
            //// ////////console.log("右カラムの要素を取得しています");
            return this.contentpane().nextSibling;
        }
        catch (_error) {
        }
    }

    // 左カラムの要素を取得
    GpElements.prototype.lcolumn = function() {
        try {
            //// ////////console.log("左カラムの要素を取得しています");
            return this.content().firstChild.firstChild;
        }
        catch (_error) {
        }
    }

    // ポスト投稿の要素を取得(2012/04 新UI動作確認済み)
    GpElements.prototype.sharebox = function() {
        try {
            var elm = this.contentpane().getElementsByTagName("div");
            for(var i = 0; i < elm.length; i++) {
                try {
                    if(elm[i].id.indexOf(".f") != -1) {
                        if(elm[i].parentNode.parentNode.parentNode.parentNode.getAttribute("guidedhelpid") == "sharebox") {
                            //// ////////console.log("el[i]", elm[i]);
                            return elm[i];
                        }

                    }
                }
                catch (_error) {
                }

            }
            ;
        }
        catch (_error) {
        }

        return undefined;

    }

    // 共有ボタンのエレメントを取得(2012/04 新UI動作確認済み)
    GpElements.prototype.sharebutton = function() {
        try {
            var elm = this.contentpane().getElementsByTagName("div");
            for(var i = 0; i < elm.length; i++) {
                try {
                    if(elm[i].getAttribute("guidedhelpid") == "sharebutton") {
                        return elm[i];
                    }
                }
                catch (_error) {
                }

            }
            ;
        }
        catch (_error) {
        }
    }

    // 再共有ボタンのエレメントを取得(2012/04 新UI動作確認済み)
    GpElements.prototype.nextbutton = function(_elm) {
        try {
            var next = 0;

            // 編集、または再共有時の親要素を取得する
            var b = _elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("div");
            for(var i = 0; i < b.length; i++) {
                try {
                    if(b[i].getAttribute("role") == "button") {
                        if(next != 2) {
                            next++;
                            continue;
                        }
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
            ////console.log(_elm.parentNode.parentNode.parentNode.nextSibling);
            ////console.log(_elm.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("div")[1]);
            return _elm.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("div")[1];
        }
        catch (_error) {
        }
        
        try {
            return _elm.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild;
        }
        catch (_error) {
        }
        
        
        
    }

    // コメント投稿ボタンのエレメントを取得する _elmは入力画面のエレメント
    GpElements.prototype.commentbutton = function(_elm) {
        try {
            var elm = _elm.parentNode.parentNode.parentNode.childNodes;
            for(var i = 0; i < elm.length; i++) {
                if(elm[i].id.indexOf(".post") != -1) {
                    return elm[i];
                }
                ;
            }
            ;

        }
        catch (_error) {
            return undefined;
        }
        return undefined;
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

/* ポスト処理を行うオブジェクト
-------------------------------------------------------------------------------*/
function _ElementPost() {
}

    // 個別ポストに対する処理を行うオブジェクト
    _ElementPost.prototype.post = function(_elm) {
        return new _SingleElementPost(_elm);
    }

    // 指定したエレメントのポストエレメントのポスト処理を行うオブジェクトを生成する
    _ElementPost.prototype.elm = function(_elm) {
        //// //////////////////console.log("エレメントを調べています");
        var elm = _elm;

        for(var i = 0; i < 200; i++) {
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
                    //// //////////////////console.log("elm", elm);
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

/* 個別ポストオブジェクト
-------------------------------------------------------------------------------*/
function _SingleElementPost(_elm) {
    this.element = _elm;
}

    // 指定した個別ポストの+1エレメントを削除 2012/04/19修正
    _SingleElementPost.prototype.plusoneremove = function(_reg) {
        try {
            var plusone = this.plusone();
            setTimeout(function() {
                var pl = plusone.childNodes;
                for(var ii = 0; ii < pl.length; ii++) {

                    try {
                        // 正規表現であるかどうか調べる
                        if(_reg.test(pl[ii].innerHTML)) {

                            // 要素を削除する
                            plusone.removeChild(pl[ii]);
                            break;
                        }
                    }
                    catch (_error) {
                    }

                    try {

                        // 正規表現であるかどうか調べる
                        if(pl[ii].getAttribute("aria-label")) {
                            if(_reg.test(pl[ii].getAttribute("aria-label"))) {
                                // 要素を削除する
                                plusone.removeChild(pl[ii]);
                                break;
                            }
                        }

                    }
                    catch (_error) {
                    }

                }
            }, 100);

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
                if(a[e].src.match(/https:\/\/lh\d*\.googleusercontent.com\/.*\/.*\/.*\/.*\/.*\/.*[^photo.(jpg|gif)]/)) {
                    src = a[e].src;
                    var dl = src.replace(/\/h\d*\//, "/s0-d/");
                    dl = dl.replace(/\/w\d*\//, "/s0-d/");
                    dl = dl.replace(/\/w\d*-h\d*-p\//, "/s0-d/");
                    dl = dl.replace(/\/w\d*-h\d*\//, "/s0-d/");
                    op = src.replace(/\/h\d*\//, "/s0/");
                    op = op.replace(/\/w\d*\//, "/s0/");
                    op = op.replace(/\/w\d*-h\d*-p\//, "/s0/");
                    op = op.replace(/\/w\d*-h\d*\//, "/s0/");

                    // 同一画像が２つ以上含まれていたばあい除外する
                    var flag = 0;
                    for(var ii = 0; ii < imageurl.length; ii++) {
                        if(imageurl[ii] == op) {
                            flag = 1;
                            break;
                        }
                    }
                    if(flag) {
                        continue;
                    }

                    imageurl_d[c] = dl;
                    imageurl[c] = op;
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
            body = this.element.firstChild.firstChild.childNodes[4].firstChild.firstChild.innerHTML;
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

    // 個別ポストのポストIDを取得
    _SingleElementPost.prototype.postid = function() {
        try {
            return this.element.id.replace("update-", "");
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
            var li = this.element.getElementsByTagName("div");
            for(var i = 0; i < li.length; i++) {
                try {
                    if(li[i].id.indexOf("po-") == 0) {
                        return li[i].parentNode;
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

    // 個別ポストからコメント+1リストを取得するメソッドを追加する
    _SingleElementPost.prototype._commentplusone = _commentplusone;

    // 指定したポストのコメント一覧を取得
    _SingleElementPost.prototype.comment = function() {
        try {
            var elm = this.element.getElementsByTagName("span");
            for(var i = 0; i < elm.length; i++) {
                try {
                    if(elm[i].getAttribute("role") == "button" && elm[i].nextSibling.firstChild.id.indexOf("z") == 0) {
                        return elm[i].nextSibling;
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

/* 通知エレメントオブジェクト
-------------------------------------------------------------------------------*/
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

    // 通知のwidgetエレメントの取得 2012/05/10 修正
    _ElementNotify.prototype.widget = function() {
        try {
            return this._notifyelement().getElementById("notify-widget-pane").nextSibling;
        }
        catch (_error) {
            return null;
        }
    }

    // 通知のポスト一覧の要素 2012/05/10 修正
    _ElementNotify.prototype.postlist = function() {
        try {
            return this.widget().childNodes[3].childNodes[2];
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

/* 個別通知処理オブジェクト
-------------------------------------------------------------------------------*/
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
            var elm = this.element.getElementsByTagName("span");
            for(var i = 0; i < elm.length; i++) {
                try {
                    if(elm[i].getAttribute("role") == "button" && elm[i].nextSibling.firstChild.id.indexOf("z") == 0) {
                        return elm[i].nextSibling;
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

    // 通知コメントリストの+1リストを取得 2012/04/19修正
    _SingleElementNotify.prototype.plusone = function() {
        try {
            var elm = this.element.getElementsByTagName("div");
            for(var i = 0; i < elm.length; i++) {
                try {
                    if(elm[i].id.indexOf("po-") == 0) {
                        ////console.log("notify +1", elm[i]);
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

    // コメント+1リストを取得するメソッドを追加する
    _SingleElementNotify.prototype._commentplusone = _commentplusone;

/* コメントのマウスオーバー要素を取得 _elm = 各コメント要素
-------------------------------------------------------------------------------*/
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

/* エレメントチェッカー
-------------------------------------------------------------------------------*/
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

    // 検索ボックスであるか調べる
    ElmChecker.prototype.searchbox = function(_elm) {
        try {
            if(_elm.tagName == "INPUT" && _elm.name == "q")
                return true;
            else
                throw new Error();
        }
        catch (_error) {
            return false;
        }
    }

/* ボタンを挿入する
-------------------------------------------------------------------------------*/
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

                // 画像なし表示専用ボタン
                // ボタンを挿入する
                if(data[3] != 1)
                    this.buttonelmnoimg.innerHTML += "<a class=\"Gpeb" + i + "\"><img src=\"" + chrome.extension.getURL("button/" + data[2][0]) + "\" title=\"" + desc + "\" style=\"padding-left:2px;margin-top:0px;cursor: pointer;display: inline;overflow: hidden;vertical-align: top;\" /></a>";
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
    ButtonInsert.prototype.buttonelmnoimg = document.createElement("div");
    ButtonInsert.prototype.buttonelmnoimg.className = "GooglePlusExtremeButton";
    ButtonInsert.prototype.buttonelmnoimg.style.marginTop = "12px";
    ButtonInsert.prototype.buttonelmnoimg.style.marginLeft = "8px";
    ButtonInsert.prototype.buttonelmnoimg.style.display = "inline-block";

    ButtonInsert.prototype.buttonelmnoimg.innerHTML += '';

    // ButtonElementの作成(画像あり)
    ButtonInsert.prototype.buttonelm = document.createElement("div");
    ButtonInsert.prototype.buttonelm.className = "GooglePlusExtremeButton";
    ButtonInsert.prototype.buttonelm.style.marginTop = "12px";
    ButtonInsert.prototype.buttonelm.style.marginLeft = "8px";
    ButtonInsert.prototype.buttonelm.style.display = "inline-block";
    ButtonInsert.prototype.buttonelm.innerHTML += '';

    // CommentButtonElementの作成
    ButtonInsert.prototype.commentelm = document.createElement("span");
    ButtonInsert.prototype.commentelm.className = "GpebReply";
    ButtonInsert.prototype.commentelm.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;';
    //// ////////////console.log(language);
    if(language == "ja")
        ButtonInsert.prototype.commentelm.innerHTML += "<a href='javascript:;'>返信</a>";
    else if(language == "zh_CN")
        ButtonInsert.prototype.commentelm.innerHTML += "<a href='javascript:;'>回复</a>";
    else if(language == "zh_TW")
        ButtonInsert.prototype.commentelm.innerHTML += "<a href='javascript:;'>回覆</a>";
    else
        ButtonInsert.prototype.commentelm.innerHTML += "<a href='javascript:;'>Reply</a>";

    // CommentButtonElementの作成
    ButtonInsert.prototype.replyelm = document.createElement("div");
    ButtonInsert.prototype.replyelm.className = "GpebReply";
    ButtonInsert.prototype.replyelm.style.display = "inline-block";
    ButtonInsert.prototype.replyelm.style.marginTop = "12px";

    ButtonInsert.prototype.replyelm.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;';
    //// ////////////console.log(language);
    if(language == "ja")
        ButtonInsert.prototype.replyelm.innerHTML += "<a>返信</a>";
    else if(language == "zh_CN")
        ButtonInsert.prototype.replyelm.innerHTML += "<a>回复</a>";
    else if(language == "zh_TW")
        ButtonInsert.prototype.replyelm.innerHTML += "<a>回覆</a>";
    else
        ButtonInsert.prototype.replyelm.innerHTML += "<a>Reply</a>";

    // ストリーム上の全てのポストに新たな要素を追加する
    ButtonInsert.prototype.all = function(_elm) {
        try {
            var elm = _elm.childNodes;
            for(var i = 0; i < elm.length; i++) {

                // classNameに GooglePlusExtremeButton が含まれていたら追加しない
                var pl = this.ge.post().post(elm[i]).plusone();
                try {
                    var pe = pl.getElementsByTagName("div");

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

            }
        }
        catch (_error) {
        }

    }

    // 指定したポストに新たな要素を追加し、イベントを登録する
    ButtonInsert.prototype.post = function(_elm) {

        // 個別ポストを操作するためのオブジェクトを生成
        var pp = this.ge.post().post(_elm);

        // +1リストを取得する
        var plusone = pp.plusone();

        if(!plusone)
            return;

        // すでに追加されてあるか調べる
        try {
            var pl = plusone.getElementsByTagName("div");
            for(var i = 0; i < pl.length; i++) {
                if(pl[i].className == "GooglePlusExtremeButton")
                    return;
            }
            ;
        }
        catch (_error) {
        }

        // 改行しないようにする
        plusone.style.whiteSpace = "nowrap";

        // 飛田天さん拡張に対応
        try {
            var pc = plusone.childNodes;
            for(var i = 0; i < pc.length; i++) {
                if(pc[i].tagName = "DIV" && pc[i].getAttribute("role") == "button") {
                    pc[i].style.display = "inline-block";
                    if(pc[i].childNodes.length == 0) {
                        pc[i].style.height = "22px";
                    }
                    pc[i].style.overflow = "visible";

                }
            }
        }
        catch (_error) {
        }

        // plusone span list.
        var li = plusone.getElementsByTagName("div");

        // ボタンエレメントの追加
        try {

            if(pp.image()[0] == "") {
                plusone.insertBefore(this.buttonelmnoimg.cloneNode(true), plusone.lastChild);
            }
            else {
                plusone.insertBefore(this.buttonelm.cloneNode(true), plusone.lastChild);
            }
        }
        catch (_error) {
        }

        // 返信ボタンの追加
        if(this.se[0]) {
            try {
                plusone.insertBefore(this.replyelm.cloneNode(true), plusone.lastChild);
                for(var i = 0; i < li.length; i++) {
                    try {
                        if(li[i].className == "GpebReply") {
                            // イベント登録
                            (function(_ge) {
                                li[i].addEventListener("click", function(_event) {
                                    autopost(_event.target, "", 2, _ge);
                                    return false;
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
                                            // 自動投稿ボタンが入力されていた場合
                                            else if(data[4][1]) {
                                                // イベントの登録
                                                (function(_elm, _text) {
                                                    _elm.addEventListener("click", function(_event) {
                                                        autopost(_event.target, _text, 0);
                                                        return false;
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
                                                        url = _url.replace(/<URL>/g, encodeURIComponent(post.permalink()));
                                                        url = url.replace(/<BODY>/g, encodeURIComponent(post.body()));
                                                        url = url.replace(/<NAME>/g, encodeURIComponent(post.auther()));
                                                        url = url.replace(/<USERID>/g, encodeURIComponent(post.userid()));
                                                        url = url.replace(/<TIME>/g, encodeURIComponent(post.time()));
                                                        var image = post.image();
                                                        url = url.replace(/<IMG>/g, encodeURIComponent(image[0][0]));
                                                        post.time().match(/(^.*)[ ]/);
                                                        url = url.replace(/<TIME2>/g, encodeURIComponent(RegExp.$1));
                                                        url = url.replace(/<ACTIVITY>/g, post.postid());
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

        if(this.se[1]) {
            // ポストコメントへ返信の追加
            try {
                var comment = this.ge.post().post(_elm).comment().childNodes;
                for(var i = 0; i < comment.length; i++) {
                    // 一つ一つのコメントに追加する
                    var spanlist = comment[i].getElementsByTagName("span");
                    var flag = 0;
                    for(var ii = 0; ii < spanlist.length; ii++) {
                        try {

                            if(spanlist[ii].className == "GpebReply") {
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
                    this.postcomment(comment[i]);
                }

            }
            catch (_error) {
            }
        }

    }

    // 指定した通知ポストにボタンを追加する
    ButtonInsert.prototype.notify = function(_elm) {

        // notify個別操作オブジェクト生成
        var nt = this.ge.notify().notify(_elm);

        // plusone取得
        var plusone = nt.plusone();
        ////console.log("plusone", plusone);

        // 見つからない場合飛ばす
        if(plusone == null)
            return;

        // すでに追加されてあるか調べる
        try {
            var pl = plusone.getElementsByTagName("div");
            for(var i = 0; i < pl.length; i++) {
                if(pl[i].className == "GpebReply")
                    return;
            }
            ;
        }
        catch (_error) {
        }

        if(this.se[0]) {
            // ポストに返信ボタンの追加
            try {

                //ボタンの追加
                plusone.insertBefore(this.replyelm.cloneNode(true), plusone.lastChild);

                //中身に何もない場合空カラムを非表示にする
                if(plusone.lastChild.childNodes.length == 0) {
                    plusone.lastChild.style.display = "none";
                }

                var li = plusone.getElementsByTagName("div");
                for(var i = 0; i < li.length; i++) {
                    try {
                        if(li[i].className == "GpebReply") {
                            // イベント登録
                            (function(_ge) {
                                li[i].addEventListener("click", function(_event) {
                                    autopost(_event.target, "", 2, _ge);
                                    return false;
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

                if(count == 100) {
                    console.error("エラーが発生しました");
                }

                var mouseover = t.ge.notify().notify(_elm)._commentplusone();
                if(!mouseover) {
                    return false;
                }

                // すでにあった場合スルーする
                var bl = mouseover.getElementsByTagName("span");
                if(bl.length || count == 10) {
                    clearInterval(tid);
                    try {
                        for(var i = 0; i < bl.length; i++) {
                            try {
                                if(bl[i].className == "GpebReply") {
                                    clearInterval(tid);
                                    return true;
                                }
                            }
                            catch (_error) {
                            }
                        }

                        // 通知に返信の追加
                        if(t.se[1]) {
                            mouseover.appendChild(t.commentelm.cloneNode(true));
                            var bl = mouseover.getElementsByTagName("span");
                            for(var i = 0; i < bl.length; i++) {
                                try {
                                    if(bl[i].className == "GpebReply") {
                                        bl[i].addEventListener("click", function(_event) {
                                            autopost(mouseover.firstChild, "", 1);
                                            return false;
                                        }, false);

                                        break;
                                    }
                                }
                                catch (_error) {
                                }
                            }
                        }
                        clearInterval(tid);
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

                // ポストにclassGpebReplyがすでに含まれている場合はflagを0にする
                var flag = 1;
                var bl = mouseover.getElementsByTagName("span");
                for(var i = 0; i < bl.length; i++) {
                    try {
                        if(bl[i].className == "GpebReply") {
                            flag = 0;
                        }
                    }
                    catch (_error) {
                    }
                }
                ;

                // 各ポストコメントに返信ボタンを追加する
                if(flag) {
                    mouseover.appendChild(this.commentelm.cloneNode(true));
                    var bl = mouseover.getElementsByTagName("span");
                    for(var i = 0; i < bl.length; i++) {
                        try {
                            if(bl[i].className == "GpebReply") {
                                bl[i].addEventListener("click", function(_event) {
                                    autopost(mouseover.firstChild, "", 1);
                                    return false;
                                }, false);

                                break;
                            }
                        }
                        catch (_error) {
                        }
                    }
                    ;
                }
            }

            return true;
        }
        catch (_error) {
            return false;
        }
    }

/* アクティブフラグ
-------------------------------------------------------------------------------*/
function GpActive() {
}

    GpActive.prototype.active = true;

/* イベント
-------------------------------------------------------------------------------*/
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
        var contentpane = this.ge.contentpane();
        document.addEventListener("DOMNodeInserted", function(_event) {

            // 要素を取得
            var elm = _event.target;

            // コメントか確認する
            if(t.ec.comment(elm)) {(function() {
                    var count = 0;

                    var tid = setInterval(function() {

                        if(count == 100) {
                            if(DEBUG)
                                console.error("Google+ Extreme Button - エラーが発生しました ID:1");
                            return;
                        }

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

                // postエレメントに変換
                var post = po.elm(elm).element;

                // ポストに要素を追加
                t.bi.post(post);

                // エレメント削除
                if(t.se[2]) {
                    t.ge.post().post(post).plusoneremove(/この投稿のアクティビティ|Activity[ ]on[ ]this[ ]post|關於這則訊息的活動/);
                }

                // 古いポストを自動的に非表示にする
                try {
                    if(t.se[5]) {
                        // スクロールサイズの取得
                        var scsize = document.documentElement.scrollTop || document.body.scrollTop;
                        if(scsize <= 100 || _active.active == false) {

                            // ポストリストの取得
                            var gs = t.ge.stream()
                            //// //////////console.log("gs", gs);
                            var pl = gs.childNodes;

                            while(1) {
                                if(pl.length >= 50) {
                                    // 最後のエレメントを削除
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

                                        if(count == 100) {
                                            if(DEBUG)
                                                console.error("Google+ Extreme Button - エラーが発生しました ID:2");
                                            return;
                                        }

                                        // 全ての通知にボタンを追加
                                        try {
                                            t.bi.notify(_elm);
                                        }
                                        catch (_error) {
                                        }

                                        if(t.se[1]) {
                                            // コメント欄に返信ボタンを追加
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
                        if(t.ec.comment(elm)) {
                            t.bi.notifycomment(elm);
                        }

                        // 通知初回実行
                        if(notifyelmflag2 == 0) {
                            notifyelmflag2 = 1;

                            // 読み込み
                            // 通知ポストリストの取得
                            try {
                                var li = nt.postlist().childNodes;
                                try {
                                    for(var i = 0; i < li.length; i++) {

                                        // 全ての通知にボタンを追加
                                        t.bi.notify(li[i]);

                                        // コメントリストの取得
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
                            }
                            catch (_error) {
                            }
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

                // 待機
                (function() {
                    var count = 0;
                    var tid = setInterval(function() {

                        if(count == 100) {
                            if(DEBUG)
                                console.error("Google+ Extreme Button - エラーが発生しました ID:5");
                            return;
                        }

                        // ストリームポスト一覧の取得
                        var li = t.ge.stream();

                        try {
                            if(li.firstChild) {
                                clearInterval(tid);

                                // ボタンの挿入
                                t.bi.all(li);

                                // エレメント削除
                                if(t.se[2]) {
                                    po.plusoneremove(li, /この投稿のアクティビティ|Activity[ ]on[ ]this[ ]post|關於這則訊息的活動/);
                                }

                            }
                        }
                        catch (_error) {
                        }
                        count++;

                    }, 100);

                })();
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
                if (DEBUG) {
                    //console.log("エディタです");
                }

                // 投稿画面の場合
                if (DEBUG) {
                    //console.log("t.ge.sharebox()", t.ge.sharebox());
                }
                if(elm === t.ge.sharebox()) {

                    if (DEBUG) {
                        //console.log("投稿画面です");
                        //console.log("elm", elm);
                        
                    }

                    // 投稿画面のエディターでTABキーが押された
                    if(key == 9) {
                        
                        if (DEBUG) {
                            //console.log("投稿画面のエディタでTABキーが押されました");
                        }

                        // 投稿ボタンをフォーカスにする
                        setTimeout(function() {

                            if(t.se[4]) {
                                try {
                                    if(DEBUG){
                                        //console.log("投稿ボタンにフォーカスを当てます");
                                        //console.log(t.ge.sharebutton());
                                    }
                                    t.ge.sharebutton().focus();
                                }
                                catch (_error) {
                                }
                            }

                        }, 1);

                    }
                    // 投稿画面のエディターでShift+Enterが押された
                    else if(key == 13) {
                        if(shiftkey || cmdkey || ctrlkey) {
                            // Shift+Enterによる投稿
                            if(t.se[3]) {
                                if (DEBUG) {
                                    //console.log("通常のShift+Enterで投稿しようとしています");
                                    //console.log("クリックを行います");
                                    //console.log("sharebutton", t.ge.sharebutton());
                                }
                                click(t.ge.sharebutton());
                                setTimeout(function() {
                                    click(t.ge.sharebutton());
                                    
                                    if (DEBUG) {
                                        //console.log("遅延投稿機能を実行します");
                                    }
                                    
                                    //遅延投稿
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 100);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 200);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 300);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 400);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 500);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 600);
                                    setTimeout(function(){
                                        click(t.ge.sharebutton());
                                    }, 700);
                                }, 10);

                            }
                        }
                    }
                }
                else {
                    // ポストと共有ボタン以外(コメント欄エディタ、編集画面エディタ、再共有画面エディタ)
                    
                    if (DEBUG) {
                        //console.log("ポストと共有ボタン以外(コメント欄エディタ、編集画面エディタ、再共有画面エディタ)です。");
                    }
                    
                    // Enterキー
                    if(key == 13) {
                        // ShiftKey Cmdkey
                        if(shiftkey || cmdkey || ctrlkey) {
                            
                            if (DEBUG) {
                                //console.log("シフトキー、コマンドキー、コントロールキーが押されました");
                            }
                            
                            try {

                                if(t.se[3]) {

                                    //コメント欄をShift+Enterで投稿する
                                    if (DEBUG) {
                                        //console.log("コメント欄をShift+Enterで投稿します");
                                    }
                                    try {
                                        var buttonelm = t.ge.commentbutton(elm)
                                        //// ////////console.log("コメント欄のエレメント",
                                        // buttonelm);
                                        if(buttonelm == undefined) {
                                            throw new Error();
                                        }

                                        click(buttonelm);
                                        return;
                                    }
                                    catch (_error) {
                                    }

                                    // 再共有の保存ボタンのエレメントを取得する
                                    //// ////////console.log("再共有の保存ボタンのエレメントを取得します");
                                    try {
                                        var buttonelm = t.ge.nextbutton(elm);
                                        if(buttonelm == undefined) {
                                            throw new Error();
                                        }

                                        click(buttonelm);
                                        return;
                                    }
                                    catch (_error) {
                                    }
                                }
                            }
                            catch (_error) {
                            }
                        }
                    }
                    // TABキー
                    else if(key == 9) {
                        if (DEBUG) {
                            //console.log("TABキーが押されました");
                        }
                        setTimeout(function() {
                            if(t.se[4]) {

                                try {
                                    // 投稿ボタンか調べる
                                    if(elm.parentNode.parentNode.nextSibling.id.indexOf(".post") != -1) {
                                        if(DEBUG){
                                            //console.log("投稿ボタンだったためスルーしました。");
                                        }
                                        return;
                                    }
                                }
                                catch (_error) {
                                }

                                // 編集の保存ボタンのエレメントを取得する
                                try {
                                    if (DEBUG) {
                                        //console.log("エディタボタンにフォーカスを合わせました");
                                    }
                                    //console.log(elm);
                                    //console.log(t.ge.editbutton(elm));
                                    t.ge.editbutton(elm).focus();
                                    return;
                                }
                                catch (_error) {
                                }

                                // 再共有の保存ボタンのエレメントを取得する
                                try {
                                    if (DEBUG) {
                                        //console.log("次のボタンにフォーカスを合わせました");
                                    }
                                    t.ge.nextbutton(elm).focus();
                                    return;

                                }
                                catch (_error) {
                                }


                            }

                        }, 1);

                    }
                }
            }
            // 共有ボタンでキーが押された
            else if(elm == t.ge.sharebutton()) {
                // 共有ボタンでTABキーを押した
                if(key == 9) {
                    if(t.se[4]) {
                        // フォーカスをエディタに戻す
                        setTimeout(function() {
                            try {
                                //// ////////console.log("フォーカスをエディタに戻します");
                                t.ge.sharebox().focus();
                            }
                            catch (_error) {
                            }
                        }, 1);

                    }

                }
            }
            // 検索ボックスが入力された
            else if(t.ec.searchbox(elm)) {
                if(key == 13) {
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
                                            po.plusoneremove(li, /この投稿のアクティビティ|Activity[ ]on[ ]this[ ]post|關於這則訊息的活動/);
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

                        }, 3000);

                    })();
                }
            }
        }, false);

        // 通知のキーイベント
        (function() {
            var nt = t.ge.notify();
            //////console.log(nt);
            var count = 0;
            var tid = setInterval(function() {

                if(count == 100) {
                    if(DEBUG)
                        console.error("Google+ Extreme Button - エラーが発生しました ID:6");
                    return;
                }
                var widget = nt.widget();

                if(widget) {
                    //////console.log(widget);
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

                        // 矢印キーを押された場合実行
                        if(key == 37 || key == 39) {
                            // 繰り返す
                            (function() {
                                var count = 0;
                                var tid = setInterval(function() {

                                    if(count == 100) {
                                        if(DEBUG)
                                            console.error("Google+ Extreme Button - エラーが発生しました ID:7");
                                        return;
                                    }

                                    // 通知ポストリストの取得
                                    try {
                                        var li = nt.postlist().childNodes;

                                        try {
                                            for(var i = 0; i < li.length; i++) {

                                                // 全ての通知にボタンを追加
                                                try {
                                                    t.bi.notify(li[i]);
                                                }
                                                catch (_error) {
                                                }

                                                // 通知のコメントに返信を追加
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
                        }
                        ;

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
                                        po.plusoneremove(li, /この投稿のアクティビティ|Activity[ ]on[ ]this[ ]post|關於這則訊息的活動/);
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

                if(count == 100) {
                    if(DEBUG)
                        console.error("Google+ Extreme Button - エラーが発生しました ID:8");
                    return;
                }

                var widget = nt.widget();
                if(widget) {
                    widget.addEventListener("click", function(_event) {

                        // 要素の取得
                        var elm = _event.target;

                        // 繰り返す
                        (function() {
                            var count = 0;
                            var tid = setInterval(function() {

                                if(count == 100) {
                                    if(DEBUG)
                                        console.error("Google+ Extreme Button - エラーが発生しました ID:9");
                                    return;
                                }

                                // 通知ポストリストの取得
                                try {
                                    // コメント+1に返信ボタンを追加
                                    var li = nt.postlist().childNodes;
                                    ////console.log("nt.postlist()", nt.postlist());
                                    try {

                                        for(var i = 0; i < li.length; i++) {

                                            // 全ての通知の+1リストに返信ボタンを追加
                                            if(t.se[0]) {
                                                try {
                                                    t.bi.notify(li[i]);
                                                }
                                                catch (_error) {
                                                }
                                            }

                                            // コメント欄に返信ボタンを追加
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

    // ページ推移
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
                            po.plusoneremove(li, /この投稿のアクティビティ|Activity[ ]on[ ]this[ ]post|關於這則訊息的活動/);
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

    // アクティブ
    GpEvent.prototype.active = function(_active) {

        window.addEventListener("focus", function(_event) {
            _active.active = true;
        }, false);


        window.addEventListener("blur", function(_event) {
            _active.active = false;
        }, false);

    }

/* main
-------------------------------------------------------------------------------*/
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
    gp.page = gp.r[3];
    // Google+の画面のみ実行
    if(gp.mode && gp.page != "hangouts" && gp.page != "talkgadget" && gp.func != "apps-static" && gp.func != "notifications") {

        // ローカルストレージ
        var storage = new _Storage();

        // storage.get("aa", function(_response){alert(_response);});
        // storage.set("aa", "1111111");

        // 機能の読み込み
        var settings;
        storage.get("GooglePlusExtremeButton.settings", function(_response) {

            var settingsstr = _response

            // あった場合
            if(settingsstr) {

                // 読み込む
                try {
                    settings = JSON.parse(settingsstr);
                }
                catch (_error) {

                    // うまく読み込めなかった場合
                    alert("Google+ Extreme Button の 設定の読み込みに失敗しました");

                    // スクリプト実行を終了する
                    return;
                }

            }
            // 定義されていなかった場合
            else {
                storage.settings(function(_response) {
                    settings = _response;
                    storage.set("GooglePlusExtremeButton.settings", JSON.stringify(settings));
                });

            }

        });

        // ボタンデータの読み込み
        var buttonlist;
        storage.get("GooglePlusExtremeButton.buttonlist", function(_response) {
            var buttonliststr = _response;

            // ボタンがあった場合
            if(buttonliststr) {

                // 読み込む
                try {
                    buttonlist = JSON.parse(buttonliststr);
                }
                catch (_error) {

                    // うまく読み込めなかった場合
                    alert("Google+ Extreme Button の ボタンの読み込みに失敗しました");

                    // スクリプト実行を終了する
                    return;
                }

            }
            // 定義されていなかった場合
            else {

                // ボタンリスト
                storage.buttonlist(function(_response) {
                    buttonlist = _response;

                    // ローカルストレージに保存する
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

        // 挨拶の読み込み
        storage.get("GooglePlusExtremeButton.aisatsu", function(_response) {
            var aisatsustr = _response;

            if(aisatsustr) {

                // 読み込む
                try {
                    ga.aisatsustr = JSON.parse(aisatsustr);
                }
                catch (_error) {

                    // うまく読み込めなかった場合
                    alert("Google+ Extreme Button の 挨拶データの読み込みに失敗しました");

                    // スクリプト実行を終了する
                    return;
                }

            }
            // 定義されていなかった場合
            else {

                storage.aisatsu(function(_response) {
                    ga.aisatsustr = _response;

                    // ローカルストレージに保存する
                    storage.set("GooglePlusExtremeButton.aisatsu", JSON.stringify(ga.aisatsustr));
                });

            }

        });

        // 論理値チェック
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

                if(count == 100) {
                    if(DEBUG)
                        console.error("Google+ Extreme Button - エラーが発生しました ID:10");
                    return;
                }

                if(buttonlist && ga.aisatsustr && settings) {

                    clearInterval(tid);

                    // アクティブかどうかのフラグ
                    var gac = new GpActive();

                    // ボタン追加オブジェクト
                    var bi = new ButtonInsert(ge, ga, buttonlist, settings);

                    // イベントの実行
                    var Gv = new GpEvent(ge, ec, bi, settings);

                    // DOMの読み込み実行
                    Gv.dom(gac);

                    // ページ推移イベント
                    Gv.page();

                    // キーイベント
                    Gv.key();

                    // クリックイベント
                    Gv.click();

                    // アクティブイベント
                    Gv.active(gac);

                }
                count++;
            }, 100);

        })();

    }
}
main();
