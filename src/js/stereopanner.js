/**
 * Created by cgcladera on 01/12/13.
 */
/**
 * AudioContext helper
 * @type {*|void|Object}
 */
videojs.AudioContext = videojs.CoreObject.extend({
    init: function(){
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
        }
        catch(e) {
            console.log(e);
            throw new Error(e);
        }
        this.context = new AudioContext();
        this.gainL = this.context.createGainNode();
        this.gainR = this.context.createGainNode();
        this.gainL.gain.value = 1;
        this.gainR.gain.value = 1;
        this.merger = this.context.createChannelMerger(2);
        this.splitter = this.context.createChannelSplitter(2);
    }
});
/**
 * Create MediaElementSourceNode and connect the splitter, channels gains
 * and merger to AudioContext destination
 * @param node
 * @param output
 * @param input
 */
videojs.AudioContext.prototype.connect = function (node, output, input){
    //Gets media audio Source Node
    this.source = this.context.createMediaElementSource(node);
    //Connect the source to the splitter
    this.source.connect(this.splitter, 0, 0);
    //Connect splitter' outputs to each Gain Nodes
    this.splitter.connect(this.gainL, 0);
    this.splitter.connect(this.gainR, 1);

    //Connect Left and Right Nodes to the Merger Node inputs
    //Asuming stereo as initial status
    this.gainL.connect(this.merger, 0, 0);
    this.gainR.connect(this.merger, 0, 1);

    //Connect Merger output to context destination
    this.merger.connect(this.context.destination, 0, 0);
};
/**
 * Mute right channel and pan audio to left
 */
videojs.AudioContext.prototype.panToLeft = function(){
    this.gainR.disconnect();
    this.gainL.connect(this.merger, 0, 0);
};
/**
 * Mute left channel and pan audio to right
 */
videojs.AudioContext.prototype.panToRight = function(){
    this.gainL.disconnect();
    this.gainR.connect(this.merger, 0, 1);
};
/**
 * Enable stereo mode
 */
videojs.AudioContext.prototype.panToStereo = function(){
    this.gainL.connect(this.merger, 0, 0);
    this.gainR.connect(this.merger, 0, 1);
};

/**
 * Mute right channel and pan audio to left
 */
videojs.Player.prototype.panToLeft = function(){
    this.ac.panToLeft();
};
/**
 * Mute left channel and pan audio to right
 */
videojs.Player.prototype.panToRight = function(){
    this.ac.panToRight();
};
/**
 * Enable stereo mode
 */
videojs.Player.prototype.panToStereo = function(){
    this.ac.panToStereo();
};

videojs.plugin('stereopanner', function(options){
    var player = this;
    player.ac = player.ac || videojs.AudioContext.create();

    //TODO: Merge options with defaults
    options = options || {};

    //TODO: Find the right way to get media element.
    player.ac.connect(player.M);

    //TODO: Find right option key for starting channel
    if(options.starting === 'right'){
        player.panToRight();
    }else {
        player.panToLeft();
    }

});