import os

import datetime

date = str(datetime.datetime.today())

cmds = [
    'git add .',
    'git commit -m "New commit at {0}"'.format(date),
    'git push origin -u -f design'
]

for cmd in cmds:
    os.system(cmd)
