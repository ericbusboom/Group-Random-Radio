others: List[number] = []

def on_received_value(name: str, value: int):
    if name == "iam":
        pass
radio.on_received_value(on_received_value)


radio.set_group(243)
myid  = randint(0, 1000000)

def on_forever():
    pass
basic.forever(on_forever)

def on_in_background():
    radio.send_value("iam", myid)
    basic.pause(2000)
control.in_background(on_in_background)
