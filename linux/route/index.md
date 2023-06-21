# Static route setting

## Linux

1. Use `ip` command:
   ```bash
   # 10.0.0.0/24 -> network scope
   # 192.168.1.1 -> network gateway
   # eth0 -> network card
   sudo ip route add 10.0.0.0/24 via 192.168.1.1 dev eth0
   ```
2. Use `ip` to check:
   ```bash
   ip route show
   ```

### Add route permanent

There are two case: `sysconfig` version or `systemd` version. Check which version your linux is.

1. `sysconfig`
   a. Edit `/etc/sysconfig/network-scripts/route-eth0`, maybe not be eth0, decided by your network.

   ```bash
   sudo vi /etc/sysconfig/network-scripts/route-eth0
   ```

   /etc/sysconfig/network-scripts/route-eth0:

   ```makefile
   x.x.x.x/x via x.x.x.x/x dev eth0
   x.x.x.x/x via x.x.x.x/x dev eth0
   ```

   b. Restart network

   ```bash
   sudo systemctl restart network
   ```

2. `systemd`
   a. Edit `/etc/systemd/system/myroute.service`

   ```bash
   sudo vi /etc/systemd/system/myroute.service
   ```

   /etc/systemd/system/myroute.service:

   ```makefile
   [Unit]
   Description=Add static routes at boot time
   After=network.target

   [Service]
   Type=oneshot
   ExecStart=/sbin/ip route add x.x.x.x/x via x.x.x.x dev eth0
   ExecStart=/sbin/ip route add x.x.x.x/x via x.x.x.x dev eth0
   RemainAfterExit=yes

   [Install]
   WantedBy=multi-user.target
   ```

   b. Start service

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable myroute.service
   sudo systemctl start myroute.service
   ```

> Command reference:

```bash
# Show route
route -n
# Del route
sudo ip route del x.x.x.x/x via x.x.x.x dev eth0
```

## Mac

1. Use `route` command:
   ```csharp
   sudo route -n add -net destination_ip_address gateway_ip_address
   # Example: sudo route -n add -net 10.0.0.0/24 192.168.1.1
   ```
   Use `route add` will permanent add route on mac.

> Command reference:
> sudo route delete -net destination_ip_address
