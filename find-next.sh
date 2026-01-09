#!/usr/bin/expect -f

set timeout 60

spawn ssh root@72.56.92.136
expect "password:"
send "aAwSKo@-1bsL2t\r"
expect "#"

send "find /root /var/www /home -name 'next.config.*' 2>/dev/null\r"
expect "#"

send "ls -la /root\r"
expect "#"

send "ls -la /var/www 2>/dev/null\r"
expect "#"

send "exit\r"
expect eof
