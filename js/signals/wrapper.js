/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false*/

//::LICENSE:://
(function(global){

//::SIGNALS_JS:://

//::SIGNAL_BINDING_JS:://

//::SIGNAL_JS:://

    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define('signals', [], signals);
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['signals'] = signals;
    }

}(this));
