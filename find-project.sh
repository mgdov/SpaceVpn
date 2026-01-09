#!/usr/bin/expect -f

set timeout -1

spawn ssh root@72.56.92.136
expect "password:"
send "aAwSKo@-1bsL2t\r"
expect "#"

send "find / -name 'package.json' -path '*/space*' -o -name 'package.json' -path '*/pixel*' 2>/dev/null | head -5\r"
expect "#"

send "exit\r"
expect eof
