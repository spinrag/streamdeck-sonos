define(class extends SonosAction {
    async onDialDown({context, payload: {settings, state}}) {
        const sonosHost = settings.actionHost
        const { CurrentMute: muteState } = await this.sonosList[sonosHost].getMute()
        return parseInt(muteState) === 0 ?
            this.sonosList[sonosHost].setMute(1) :
            this.sonosList[sonosHost].setMute(0);
    }
    async onDialRotate( {context, payload: {settings, ticks}}) {
        const sonosHost = settings.actionHost
        const {CurrentVolume: volume} = await this.sonosList[sonosHost].getVolume();
        const newVolume = parseInt(volume) + parseInt(ticks)
        const indicator = {
            value: newVolume,
            opacity: 1,
            bar_bg_c: null
        }

        const payload = {
            // title: title,
            value: newVolume + '%',
            indicator
            // icon
        };
        this.streamDeck.setFeedback(context, payload)
        return this.sonosList[sonosHost].setVolume(newVolume);
    }
});