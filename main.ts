radio.setGroup(243)
let myid = control.deviceSerialNumber()
let myidS = myid.toString()
let others: string[] = []

function executeCommand (cmd: number) {
	
}

function add_to_others (other: number) {
    let otherS = other.toString()
    for (let i = 0; i <= others.length - 1; i++) {
        if (others[i] == otherS) {
            return
        }
    }
    others.push(otherS)
}
radio.onReceivedValue(function (name, value) {
    
    let rssn = radio.receivedPacket(RadioPacketProperty.SerialNumber)

    serial.writeValue(name , value )

    if (name == "iam") {
        add_to_others(value)
        
    } else if (name == myidS) {

        basic.showNumber(value )

    	if ( value == 0) {

        } else if ( value == 1) {

        } else if (value == 2 ) {
            
        } else if ( value ==3 ) {
            
        }
    }
})

basic.forever(function () {
    let other = others[randint(0, others.length)] // Pick a random target

    if(input.buttonIsPressed(Button.A)){
        radio.sendValue(other, 0)
    } else if (input.buttonIsPressed(Button.B)) {
        radio.sendValue(other, 1)
    } else if (input.buttonIsPressed(Button.AB)) {
        radio.sendValue(other, 2)              
    } else if (input.logoIsPressed()) {
        radio.sendValue(other, 3)
    } 
})
control.inBackground(function () {
    radio.sendValue("iam", myid)
    basic.pause(2000)
})
