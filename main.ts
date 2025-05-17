radio.setGroup(243)
let myid = randint(0,1000)
let myidS = myid.toString()
let others: string[] = []

function executeCommand (value: number) {
	
    if (value == 0) {
        basic.showIcon(IconNames.Ghost)
        music.play(music.builtinPlayableSoundEffect(soundExpression.mysterious), music.PlaybackMode.UntilDone)
    } else if (value == 1) {
        basic.showIcon(IconNames.Butterfly)
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
    } else if (value == 2) {
        basic.showIcon(IconNames.Confused)
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)

    } else if (value == 3) {
        basic.showIcon(IconNames.Duck)
        music.play(music.builtinPlayableSoundEffect(soundExpression.soaring), music.PlaybackMode.UntilDone)

    }

}

function add_to_others (other: number) {
    let otherS = other.toString()
    for (let i = 0; i <= others.length - 1; i++) {
        if (others[i] == otherS) {
            return
        }
    }
    music.play(music.tonePlayable(Note.C, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    others.push(otherS)

    serial.writeValue("others", others.length)

}
radio.onReceivedValue(function (name, value) {
    
    let rssn = radio.receivedPacket(RadioPacketProperty.SerialNumber)

    serial.writeValue(name , value )

    if (name == "iam") {
        basic.showIcon(IconNames.SmallHeart)
        add_to_others(value)
        
    } else if (name == myidS) {

        basic.showNumber(value )

        executeCommand(value)
    
    }
    basic.clearScreen()
})

function sendValue(value: number){
    let idx = randint(0, others.length-1)
    
    let other = others[idx] // Pick a random target
    
    radio.sendValue(other, value)

    basic.pause(250)
}

basic.forever(function () {
    
    if(input.buttonIsPressed(Button.A)){
        sendValue(0)
    } else if (input.buttonIsPressed(Button.B)) {
        sendValue(1)
    } else if (input.buttonIsPressed(Button.AB)) {
        sendValue(2)
    } else if (input.logoIsPressed()) {
        sendValue(3)
    } 
})
control.inBackground(function () {

    while (true) {
        radio.sendValue("iam", myid)
        basic.pause(4000)
        basic.showIcon(IconNames.Heart)
        basic.pause(300)

        basic.clearScreen()
        
    }
    
})
