pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pfTransmitter.connectIrSenderLed(AnalogPin.P0)

let isOpen = true;
let lastState = 1;
let lastStateTime = 0;

basic.forever(function () {
    let state = pins.digitalReadPin(DigitalPin.P1);
    let time = input.runningTime();

    if (lastState != state){
        lastStateTime = time;
        lastState = state;

        if (state == 0){
            pfTransmitter.singleOutputMode(PfChannel.Channel4, PfOutput.Blue, PfSingleOutput.Backward3)
            basic.pause(1000);
            pfTransmitter.singleOutputMode(PfChannel.Channel4, PfOutput.Blue, PfSingleOutput.BrakeThenFloat)
            basic.showNumber(1)
        }

        if (state == 1) {
            basic.pause(7000);
            pfTransmitter.singleOutputMode(PfChannel.Channel4, PfOutput.Blue, PfSingleOutput.Forward3)
            basic.pause(3000);
            pfTransmitter.singleOutputMode(PfChannel.Channel4, PfOutput.Blue, PfSingleOutput.BrakeThenFloat)
            basic.showNumber(0)
        }
    }
})

