(function(d){if(!d.support.validity){var p=parseInt("a",10),l=function(a){return typeof a=="number"||a&&a==a*1},u={radio:1,checkbox:1},i=function(a){return(a.getAttribute("type")||"").toLowerCase()},o=function(a,b){var c=d.attr(a,"step");if(c==="any")return c;b=b||i(a);if(!f[b]||!f[b].step)return c;c=f.number.asNumber(c);return(!isNaN(c)&&c>0?c:f[b].step)*f[b].stepScaleFactor},n=function(a,b,c){if(!(a+"AsNumber"in c)){c[a+"AsNumber"]=f[c.type].asNumber(b.attr(a));if(isNaN(c[a+"AsNumber"])&&a+"Default"in
f[c.type])c[a+"AsNumber"]=f[c.type][a+"Default"]}},k=function(a,b){a=""+a;b-=a.length;for(var c=0;c<b;c++)a="0"+a;return a};(function(){var a={11:"INVALID_STATE_ERR"};return function(b){throw{code:b,name:a[b],message:a[b]+": DOM Exception "+b};}})();var f={};d.htmlExt.addInputType=function(a,b){f[a]=b};var r={customError:false,typeMismatch:false,rangeUnderflow:false,rangeOverflow:false,stepMismatch:false,tooLong:false,patternMismatch:false,valueMissing:false,valid:true},q={valueMissing:function(a,
b){if(!a.attr("required"))return false;return u[a[0].type]?!d(a[0].form&&a[0].name?a[0].form[a[0].name]:[]).filter(":checked")[0]:!b},tooLong:function(a,b){if(b==="")return false;var c=a.attr("maxlength"),h=false,e=b.length;if(e&&c>=0&&b.replace&&l(c)){if(h=e>c)return h;b.replace(/\u0A/g,function(){e++});h=e>c}return h},typeMismatch:function(a,b,c){if(b==="")return false;var h=false;if(!("type"in c))c.type=i(a[0]);if(f[c.type]&&f[c.type].mismatch)h=f[c.type].mismatch(b,a);return h},stepMismatch:function(a,
b,c){if(b==="")return false;if(!("type"in c))c.type=i(a[0]);if(c.type=="date")return false;var h=false;if(f[c.type]&&f[c.type].step){if(!("step"in c))c.step=o(a[0],c.type);if(c.step=="any")return false;if(!("valueAsNumber"in c))c.valueAsNumber=f[c.type].asNumber(b);if(isNaN(c.valueAsNumber))return false;n("min",a,c);a=c.minAsNumber;if(isNaN(a))a=f[c.type].stepBase||0;h=Math.abs((c.valueAsNumber-a)%c.step);h=!(h<=1.0E-7||Math.abs(h-c.step)<=1.0E-7)}return h},patternMismatch:function(a,b){if(b==="")return false;
var c=a.attr("pattern");if(!c)return false;return!RegExp("^(?:"+c+")$").test(b)}};d.each([{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}],function(a,b){q[b.name]=function(c,h,e){var j=false;if(h==="")return j;if(!("type"in e))e.type=i(c[0]);if(f[e.type]&&f[e.type].asNumber){if(!("valueAsNumber"in e))e.valueAsNumber=f[e.type].asNumber(h);if(isNaN(e.valueAsNumber))return false;n(b.attr,c,e);if(isNaN(e[b.attr+"AsNumber"]))return j;j=e[b.attr+"AsNumber"]*b.factor<=
e.valueAsNumber*b.factor-1.0E-7}return j}});d.htmlExt.addMethod("checkValidity",function(){var a,b=function(c){var h,e=d.attr(c,"validity");if(e)d.data(c,"cachedValidity",e);else e={valid:true};if(!e.valid){h=d.Event("invalid");var j=d(c).trigger(h);if(!h.isDefaultPrevented()){a||d.htmlExt.validityAlert.showFor(j);a=true}}d.data(c,"cachedValidity",false);return e.valid};return function(){a=false;if(d.nodeName(this,"form")||d.nodeName(this,"fieldset")){for(var c=true,h=this.elements||d("input, textarea, select",
this),e=0,j=h.length;e<j;e++)b(h[e])||(c=false);return c}else return this.form?b(this):true}}());d.event.special.invalid={add:function(){d.data(this,"invalidEventShim")||d.event.special.invalid.setup.call(this)},setup:function(){d(this).bind("submit",d.event.special.invalid.handler).data("invalidEventShim",true);var a=d(this).data("events").submit;a&&a.length>1&&a.unshift(a.pop())},teardown:function(){d(this).unbind("submit",d.event.special.invalid.handler).data("invalidEventShim",false)},handler:function(a){if(!(a.type!=
"submit"||!d.nodeName(a.target,"form")||d.attr(a.target,"novalidate")))if(!d(a.target).checkValidity()){!a.originalEvent&&!window.debugValidityShim&&window.console&&console.log&&console.log("submit");a.stopImmediatePropagation();return false}}};d.htmlExt.attr("validity",{elementNames:["input","select","textarea"],getter:function(a){var b=d.data(a,"cachedValidity");if(b)return b;b=d.extend({},r);if(!d.attr(a,"willValidate"))return b;var c=d(a),h=c.val(),e={};b.customError=!!d.data(a,"customvalidationMessage");
if(b.customError)b.valid=false;if((a.nodeName||"").toLowerCase()=="select")return b;d.each(q,function(j,g){if(g(c,h,e)){b[j]=true;b.valid=false}});return b}});d.htmlExt.addMethod("setCustomValidity",function(a){d.data(this,"customvalidationMessage",""+a)});d.htmlExt.attr("validationMessage",{elementNames:["input","select","textarea"],getter:function(a,b){var c=b()||d.data(a,"customvalidationMessage");return!c||!d.attr(a,"willValidate")?"":c}});d.htmlExt.createBooleanAttrs("required",["input","textarea"]);
d.htmlExt.attr("willValidate",{elementNames:["input","select","textarea"],getter:function(){var a={button:1,reset:1,add:1,remove:1,"move-up":1,"move-down":1,hidden:1,submit:1};return function(b){return!!(b.name&&b.form&&!b.disabled&&!b.readonly&&!a[b.type]&&!d.attr(b.form,"novalidate"))}}()});d.htmlExt.attr("valueAsNumber",{elementNames:["input"],getter:function(a){var b=i(a);return f[b]&&f[b].asNumber?f[b].asNumber(d.attr(a,"value")):p},setter:function(a,b,c){var h=i(a);if(f[h]&&f[h].numberToString){b=
f[h].numberToString(b);b!==false&&d.attr(a,"value",b)}else c()}});d.htmlExt.attr("valueAsDate",{elementNames:["input"],getter:function(a){var b=i(a);return f[b]&&f[b].asDate&&!f[b].noAsDate?f[b].asDate(d.attr(a,"value")):null},setter:function(a,b,c){var h=i(a);if(f[h]&&f[h].dateToString){b=f[h].dateToString(b);b!==false&&d.attr(a,"value",b)}else c()}});d.htmlExt.attr("type",{elementNames:["input"],getter:function(a){var b=i(a);return f[b]?b:a.type||a.getAttribute("type")},setter:true});d.htmlExt.addInputType("email",
{mismatch:function(){var a=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|(\x22((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?\x22))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
return function(b){return!a.test(b)}}()});d.htmlExt.addInputType("url",{mismatch:function(){var a=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
return function(b){return!a.test(b)}}()});d.htmlExt.addInputType("number",{mismatch:function(a){return!l(a)},step:1,stepScaleFactor:1,asNumber:function(a){return l(a)?a*1:p},numberToString:function(a){return l(a)?a:false}});d.htmlExt.addInputType("range",d.extend({},f.number,{minDefault:0,maxDefault:100}));d.htmlExt.addInputType("date",{mismatch:function(a){if(!a||!a.split||!/\d$/.test(a))return true;var b=a.split(/\u002D/);if(b.length!==3)return true;var c=false;d.each(b,function(h,e){if(!(l(e)||
e&&e=="0"+e*1)){c=true;return false}});if(c)return c;if(b[0].length!==4||b[1].length!=2||b[1]>12||b[2].length!=2||b[2]>33)c=true;return a!==this.dateToString(this.asDate(a,true))},step:1,stepScaleFactor:864E5,asDate:function(a,b){if(!b&&this.mismatch(a))return null;a=a.split(/\u002D/);var c=new Date;c.setUTCMilliseconds(0);c.setUTCSeconds(0);c.setUTCMinutes(0);c.setUTCHours(0);c.setUTCDate(a[2]);c.setUTCMonth(a[1]-1);c.setUTCFullYear(a[0]);return c},asNumber:function(a){a=this.asDate(a);return a===
null?p:a.getTime()},numberToString:function(a){return l(a)?this.dateToString(new Date(a)):false},dateToString:function(a){return a&&a.getUTCFullYear?a.getUTCFullYear()+"-"+k(a.getUTCMonth()+1,2)+"-"+k(a.getUTCDate(),2):false}});d.htmlExt.addInputType("time",d.extend({},f.date,{mismatch:function(a,b){if(!a||!a.split||!/\d$/.test(a))return true;a=a.split(/\u003A/);if(a.length<2||a.length>3)return true;var c=false,h;if(a[2]){a[2]=a[2].split(/\u002E/);h=a[2][1];a[2]=a[2][0]}d.each(a,function(e,j){if(!(l(j)||
j&&j=="0"+j*1)||j.length!==2){c=true;return false}});if(c)return true;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return true;if(a[2]&&(a[2]>59||a[2]<0))return true;if(h&&!l(h))return true;return b===true?[a,h]:false},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=this.mismatch(a,true);if(a===true)return null;var b=new Date;b.setUTCMilliseconds(a[1]||0);b.setUTCSeconds(a[0][2]||0);b.setUTCMinutes(a[0][1]);b.setUTCHours(a[0][0]);b.setUTCDate("1");b.setUTCMonth(0);b.setUTCFullYear("1970");return b},
dateToString:function(a){if(a&&a.getUTCHours){var b=k(a.getUTCHours(),2)+":"+k(a.getUTCMinutes(),2),c=a.getUTCSeconds();if(c!="0")b+=":"+k(c,2);c=a.getUTCMilliseconds();if(c!="0")b+="."+k(c,3);return b}else return false}}));d.htmlExt.addInputType("datetime-local",d.extend({},f.time,{mismatch:function(a,b){if(!a||!a.split||(a+"special").split(/\u0054/).length!==2)return true;a=a.split(/\u0054/);return f.date.mismatch(a[0])||f.time.mismatch(a[1],b)},noAsDate:true,asDate:function(a){var b=this.mismatch(a,
true);if(b===true)return null;var c=new Date;c.setUTCMilliseconds(b[1]||0);c.setUTCSeconds(b[0][2]||0);c.setUTCMinutes(b[0][1]);c.setUTCHours(b[0][0]);a=a.split(/\u0054/)[0].split(/\u002D/);c.setUTCDate(a[2]);c.setUTCMonth(a[1]-1);c.setUTCFullYear(a[0]);return c},dateToString:function(a,b){return f.date.dateToString(a)+"T"+f.time.dateToString(a,b)}}));(function(){var a=d.htmlExt.loader.modules.validity.options,b=function(e,j,g){g=g||{};if(!("type"in g))g.type=i(e);if(!("step"in g))g.step=o(e,g.type);
if(!("valueAsNumber"in g))g.valueAsNumber=f[g.type].asNumber(d.attr(e,"value"));var m=g.step=="any"?f[g.type].step*f[g.type].stepScaleFactor:g.step;n("min",d(e),g);n("max",d(e),g);if(isNaN(g.valueAsNumber))g.valueAsNumber=f[g.type].stepBase||0;if(g.step!=="any")g.valueAsNumber=Math.round((g.valueAsNumber-(g.valueAsNumber-(g.minAsnumber||0))%g.step)*1E7)/1E7;e=g.valueAsNumber+m*j;if(e<g.minAsNumber)e=g.valueAsNumber>g.minAsNumber?g.minAsNumber:g.maxAsNumber;else if(e>g.maxAsNumber)e=g.valueAsNumber<
g.maxAsNumber?g.maxAsNumber:g.minAsNumber;return e},c=function(e,j,g){if(!(e.disabled||e.readOnly||d(g).hasClass("step-controls"))){d.attr(e,"value",f[j].numberToString(b(e,d(g).hasClass("step-up")?1:-1,{type:j})));d(e).unbind("blur.stepeventshim").trigger("input");if(document.activeElement){if(document.activeElement!==e)try{e.focus()}catch(m){}setTimeout(function(){if(document.activeElement!==e)try{e.focus()}catch(s){}d(e).one("blur.stepeventshim",function(){d(e).trigger("change")})},0)}}};if(a.stepArrows){var h=
{elementNames:["input"],setter:function(e,j,g){g();if(j=d.data(e,"step-controls"))j[e.disabled||e.readonly?"addClass":"removeClass"]("disabled-step-control")}};d.htmlExt.attr("disabled",h);d.htmlExt.attr("readonly",h)}d.htmlExt.addReady(function(e){d("form",e).bind("invalid",d.noop);a.stepArrows&&d("input",e).each(function(){var j=i(this);if(!(!f[j]||!f[j].asNumber||!a.stepArrows||a.stepArrows!==true&&!a.stepArrows[j])){var g=this,m=d(this).css("direction")=="rtl"?{action:"insertBefore",side:"Left",
otherSide:"right"}:{action:"insertAfter",side:"Right",otherSide:"left"},s=d('<span class="step-controls" unselectable><span class="step-up" tabindex="-1" /><span class="step-down" tabindex="-1" /></span>')[m.action](this).bind("mousedown mousepress",function(v){c(g,j,v.target);return false});d(this).addClass("has-step-controls").data("step-controls",s).attr({readonly:this.readOnly,disabled:this.disabled});if(a.recalcWidth){var t=s.outerWidth(true)+(parseInt(d(this).css("padding"+m.side),10)||0),w=
parseInt(d(this).css("border"+m.side+"width"),10)||0;s.css(m.otherSide,(w+t)*-1);t++;d(this).css("width",d(this).width()-t).css("padding"+m.side,t)}}})})})()}})(jQuery);
(function(d){if(d.support.validity!==true){d.support.validity="shim";d.support.fieldsetValidation="shim";var p={input:1,textarea:1},l={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1,range:1},u=function(i){var o;i[0].getAttribute("type");var n=i.val(),k=function(r){if(i){var q=i.val();if(q!==n){n=q;if(!r||r.type!="input")i.trigger("input")}}},f=function(){i.unbind("focusout",f).unbind("input",k);clearInterval(o);k();i=null};clearInterval(o);o=setInterval(k,150);setTimeout(k,9);i.bind("focusout",
f).bind("input",k)};d(document).bind("focusin",function(i){if(i.target&&i.target.type&&!i.target.readonly&&!i.target.readOnly&&!i.target.disabled&&p[(i.target.nodeName||"").toLowerCase()]&&!l[i.target.type])u(d(i.target))})}})(jQuery);
