from datetime import datetime, timedelta, timezone
import random

# def getTimeStamp():
#     delta = datetime.datetime.now()
#     return {
#         "timestamp": str(delta),
#         "hour": str(delta.hour),
#         "minute": str(delta.minute),
#         "date": str(delta.date())
#     }

def getTimeStamp():
    offset = timezone(timedelta(hours=7))
    current_time = datetime.now(offset)
    date_string = current_time.strftime("%d/%m/%Y %H:%M:%S%zZ")
    formatted_date = date_string[:-3] + ':' + date_string[-3:]

    print({"date": formatted_date})
    
    return formatted_date