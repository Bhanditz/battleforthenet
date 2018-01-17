function AJAX(params) {
    this.async = params.async || true;
    this.error = params.error;
    this.method = params.method || 'GET';
    this.success = params.success;
    this.form = params.form;
    this.url = params.url;

    this.request = new XMLHttpRequest();
    this.request.open(this.method, this.url, this.async);

    if (this.success) {
        this.request.onload = this.success;
    }

    if (this.error) {
        this.request.onerror = this.error;
    }

    if (this.form) {
        var params = this.serializeForm(this.form);
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        this.request.send(params);
    } else {
        this.request.send();
    }

}

AJAX.prototype.serializeForm = function(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }

    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
        case 'INPUT':
            switch (form.elements[i].type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'checkbox':
            case 'radio':
                if (form.elements[i].checked) {
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                }
                break;
            case 'file':
                break;
            }
            break;
        case 'TEXTAREA':
            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            break;
        case 'SELECT':
            switch (form.elements[i].type) {
            case 'select-one':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                    if (form.elements[i].options[j].selected) {
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                    }
                }
                break;
            }
            break;
        case 'BUTTON':
            switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            }
            break;
        }
    }

    return q.join("&");
};

function $(query, callback) {
    var node = document.querySelector(query);

    if (callback && node) {
        callback(node);
    }

    return node;
}

function $$(query, callback) {
    var nodeList = document.querySelectorAll(query);
    var nodes = Array.prototype.slice.call(nodeList);

    if (callback) {
        nodes.forEach(callback);
    }

    return nodes;
}

// Setup AJAX form submissions
function modal_show(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.style.display = 'table';
    setTimeout(function() {
        overlayNode.className = overlayNode.className.replace(/ ?invisible ?/, ' ');
    }, 50);
};
function modal_hide(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.className += 'invisible';
    setTimeout(function() {
        overlayNode.style.display = 'none';
    }, 400);
}


var form = $('#form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    $('.signup').style.display = 'none';
    $('.signup-thanks').style.display = 'inline-block';

    new AJAX({
        form: form,
        method: 'POST',
        success: function(res) {
            console.log(res);
        },
        url: form.getAttribute('action')
    });
    if (ga) ga('send', 'event', 'form', 'submit', 'countdown_email');
}, false);

document.getElementById('twitter-button').addEventListener('click', function(e) {
    modal_show('twitter_modal');
    if (ga) ga('send', 'event', 'button', 'click', 'connect_twitter');
}, false);

var modal = document.getElementById('twitter_modal');

modal.querySelector('.gutter').addEventListener('click', function(e) {
    if (e.target === e.currentTarget) {
        e.preventDefault();
        modal_hide(modal.id);
    }
}.bind(this), false);

modal.querySelector('.modal .close').addEventListener('click', function(e) {
    e.preventDefault();
    modal_hide(modal.id);
}.bind(this), false);

/*
modal.querySelector('.modal .no_thanks').addEventListener('click', function(e) {
    e.preventDefault();
    modal_hide(modal.id);
    if (ga) ga('send', 'event', 'button', 'click', 'dismiss_twitter');
}.bind(this), false);
*/


var tweets = document.getElementsByClassName('twitter');

var bindTweetEvents = function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://twitter.com/intent/tweet?text='+ encodeURIComponent(GLOBAL_TWEET_TEXT) +'&related=fightfortheftr');
        if (ga) ga('send', 'event', 'button', 'click', 'share_twitter');
    }, false);
}

for (var i = 0; i < tweets.length; i++) {
    if (tweets[i].tagName == 'A')
        bindTweetEvents(tweets[i]);
}

var facebooks = document.getElementsByClassName('facebook');

var bindFacebookEvents = function(link) {
    link.addEventListener('click', function(e) {
        if (ga) ga('send', 'event', 'button', 'click', 'share_facebook');
    }, false);
}

for (var i = 0; i < facebooks.length; i++) {
    if (facebooks[i].tagName == 'A')
        bindFacebookEvents(facebooks[i]);
}

// Rotate organizations
(function(){
    var loc = window.location.href;
    random_org = null;
    if (loc.indexOf('org=') == -1) {
        var coin_toss = Math.random();
        if (coin_toss < 0) {
            random_org = 'fp';
        } else if (coin_toss < 0.5) {
            random_org = 'dp';
        } else {
            random_org = 'fftf';
        }
    }

    if (loc.indexOf('org=fp') != -1 || random_org == 'fp') {
        document.getElementById('org').value = 'fp';
        document.getElementById('randomize_disclosure').style.display = 'none';
        document.getElementById('fp_disclosure').style.display = 'block';
    } else if (loc.indexOf('org=dp') != -1 || random_org == 'dp') {
        document.getElementById('org').value = 'dp';
        document.getElementById('randomize_disclosure').style.display = 'none';
        document.getElementById('dp_disclosure').style.display = 'block';
    } else if (loc.indexOf('org=fftf') != -1 || random_org == 'fftf') {
        document.getElementById('org').value = 'fftf';
        document.getElementById('randomize_disclosure').style.display = 'none';
        document.getElementById('fftf_disclosure').style.display = 'block';
    }

    if (document.referrer.indexOf('//t.co') != -1)
        modal_show('twitter_modal');

    new AJAX({
        method: 'GET',
        success: function(res) {
            var data = res.target.responseText;
            var d = document.getElementById;
            var c = function(nStr)
            {
                nStr += '';
                var x = nStr.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            }
            var s = function(str) {
                var rex = /(<([^>]+)>)/ig;
                str = str.replace(rex, "");
                str = str.replace("javascript:", "");
                return str;
            }

            try {
                data = JSON.parse(data);
            } catch(err) {
                return console.error('Could not parse leaderboard data :(');
            }
            console.log('leaderboard', data);

            document.getElementById('sites_participating').innerHTML = c(data.sites_participating);
            document.getElementById('sites_total_actions').innerHTML = c(data.sites_total_actions);
            document.getElementById('total_calls').innerHTML = c(data.total_calls);
            document.getElementById('total_calls_last_24').innerHTML = c(data.total_calls_last_24);
            document.getElementById('total_emails').innerHTML = c(data.total_emails);

            for (var site in data.sites_top) {
                if (data.sites_top.hasOwnProperty(site)) {

                    var val = c(data.sites_top[site].toString().replace('.0', ''));
                    var site = s(site);
                    var li = document.createElement('li');
                    li.innerHTML = '<a href="http://'+ site +'" target="_blank">'+ site +' ('+val+')</a>';
                    document.getElementById('sites_top').appendChild(li);
                }
            }

            for (var site in data.sites_top_today) {
                if (data.sites_top_today.hasOwnProperty(site)) {
                    var val = c(data.sites_top_today[site].toString().replace('.0', ''));
                    var site = s(site);
                    var li = document.createElement('li');
                    li.innerHTML = '<a href="http://'+ site +'" target="_blank">'+ site +' ('+val+')</a>';
                    document.getElementById('sites_top_today').appendChild(li);
                }
            }

            document.getElementById('show_all').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('show_all').style.display = 'none';
                document.getElementById('columns').className = document.getElementById('columns').className.replace(/obscured/g, '');
                document.getElementById('columns').style.height = 'auto';
            }.bind(this), false);
        },
        url: 'https://battleforthenet.s3.amazonaws.com/leaderboards/internetcountdown.click.json'
    });


})();
