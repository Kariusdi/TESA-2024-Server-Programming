import datetime
import random

def getTimeStamp():
    delta = datetime.datetime.now()
    return {
        "timestamp": str(delta),
        "hour": str(delta.hour),
        "minute": str(delta.minute),
        "date": str(delta.date())
    }
    